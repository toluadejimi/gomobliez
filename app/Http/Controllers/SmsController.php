<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\MyPlan;
use App\Models\Recent;
use App\Models\Message;
use App\Models\Setting;
use Braintree\Exception;
use Illuminate\Http\Request;
use App\Models\MyPhoneNumber;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class SmsController extends Controller
{
    public function send_message(request $request)
    {




        if ($request->hasFile('file')) {

            try {



                $sender = MyPhoneNumber::where('user_id', Auth::id())->first()->phone_no ?? null;
                if ($sender == null) {

                    $data['message'] = "No Number found, Get a phone number";
                    return response()->json([
                        'status' => false,
                        'data' => $data
                    ], 404);
                }

                $mms_cost = Setting::where('id', 1)->first()->mms_cost ?? null;
                $ck_sub = MyPlan::where('user_id', Auth::id())->first()->message_credit ?? null;

                if ($ck_sub == null) {

                    $ck_wallet = User::where('id', Auth::id())->first()->wallet ?? null;
                    if ($ck_wallet < $mms_cost) {


                        $data['message'] = "Insufficient fund to send MMS, Fund your wallet";
                        return response()->json([
                            'status' => false,
                            'data' => $data
                        ], 422);
                    }
                }



                $user_email = Auth::user()->email;
                $file = $request->file('file');
                $fileName = time() . '.' . $file->getClientOriginalExtension();
                $file->move(public_path("/public/assets/img/$user_email/"), $fileName); // Save the image to the "uploads" directory in the public folder


                $auth = env('TELNYX');

                $sender = MyPhoneNumber::where('user_id', Auth::id())->first()->phone_no ?? null;
                if ($sender == null) {


                    $data['message'] = "No Number found, Get a phone number";
                    return response()->json([
                        'status' => false,
                        'data' => $data
                    ], 404);
                }

                $sms_cost = Setting::where('id', 1)->first()->sms_cost;
                if (Auth::user()->wallet < $sms_cost) {


                    $data['message'] = "Insufficient Funds to Send SMS, Fund your wallet";
                    return response()->json([
                        'status' => true,
                        'data' => $data
                    ], 422);
                }




                if($ck_sub > 0){
                    MyPlan::where('user_id', Auth::id())->decrement('message_credit', 1) ?? null;
                }else{
                    User::where('id', Auth::id())->decrement('wallet', $mms_cost);
                }



                $user_email = Auth::user()->email;
                $media_url = url('') . "/public/public/assets/img/$user_email/" . $fileName;

                $profile = get_sms_profile();
                $payload = array(
                    "from" => $sender,
                    "media_urls" => array(
                        $media_url
                    ),
                    "messaging_profile_id" => $profile,
                    "text" => $request->message,
                    "to" => $request->receiver,
                    "type" => "MMS",
                    "use_profile_webhooks" => true,
                    "webhook_failover_url" => url('') . "/api/sms-webhook2",
                    "webhook_url" => url('') . "/api/sms-webhook"
                );

                $curl = curl_init();
                curl_setopt_array($curl, [
                    CURLOPT_HTTPHEADER => [
                        "Authorization: Bearer $auth",
                        "Content-Type: application/json"
                    ],
                    CURLOPT_POSTFIELDS => json_encode($payload),
                    CURLOPT_URL => "https://api.telnyx.com/v2/messages",
                    CURLOPT_RETURNTRANSFER => true,
                    CURLOPT_CUSTOMREQUEST => "POST",
                ]);



                $var = curl_exec($curl);
                $error = curl_error($curl);
                curl_close($curl);
                $var = json_decode($var);
                $error = $var->errors[0]->detail ?? null;



                if ($error) {
                    return response()->json([
                        'status' => false,
                        'message' => "$error"
                    ], 404);
                } else {

                    $cost = $var->data->cost->amount;
                    $message = new Message();
                    $message->from_no = $sender;
                    $message->to_no = $request->receiver;
                    $message->media = $media_url;
                    $message->text = $request->message;
                    $message->user_id = Auth::id();
                    $message->cost = $cost;
                    $message->name = $request->name;
                    $message->save();



                    $check = Recent::where('user_id', Auth::id())->where('to_no', $request->receiver)->first()->to_no ?? null;
                    if ($check == null) {
                        $recent = new Recent();
                        $recent->user_id = Auth::id();
                        $recent->from_no = $sender;
                        $recent->to_no = $request->receiver;
                        $recent->status = 1;
                        $recent->text = $request->message;
                        $recent->name = $request->name;
                        $recent->save();
                    } else {

                        Recent::where('user_id', Auth::id())->where('to_no', $request->receiver)->update([
                            'text' => $request->message
                        ]);
                    }



                    $data['message'] = "MMS Sent Successfully";
                    return response()->json([
                        'status' => true,
                        'data' => $data
                    ], 200);


                    
                }
            } catch (Exception $e) {

                return response()->json([
                    'status' => false,
                    'message' => "$error"
                ], 404);
            }
        } else {


            try {


                $sms_cost = Setting::where('id', 1)->first()->sms_cost ?? null;
                $ck_sub = MyPlan::where('user_id', Auth::id())->first()->message_credit ?? null;

                if ($ck_sub == null) {

                    $ck_wallet = User::where('id', Auth::id())->first()->wallet ?? null;
                    if ($ck_wallet < $sms_cost) {
                        return response()->json([
                            'status' => false,
                            'message' => "Insufficient Funds to Send SMS, Fund your wallet"
                        ], 422);
                    }
                }


                $auth = env('TELNYX');

                $sender = MyPhoneNumber::where('user_id', Auth::id())->first()->phone_no ?? null;
                if ($sender == null) {
                    return response()->json([
                        'status' => false,
                        'message' => "No Number found, Get a phone number"
                    ], 404);
                }

                $sms_cost = Setting::where('id', 1)->first()->sms_cost;
                if (Auth::user()->wallet < $sms_cost) {

                    return response()->json([
                        'status' => false,
                        'message' => "Insufficient Funds to Send SMS, Fund your wallet"
                    ], 422);
                }


                if($ck_sub > 0){
                    MyPlan::where('user_id', Auth::id())->decrement('message_credit', 1) ?? null;
                }else{
                    User::where('id', Auth::id())->decrement('wallet', $sms_cost);
                }



                $profile = get_sms_profile();
                $payload = array(
                    "from" => $sender,
                    "messaging_profile_id" => $profile,
                    "text" => $request->message,
                    "to" => $request->receiver,
                    "type" => "SMS",
                    "use_profile_webhooks" => true,
                    "webhook_failover_url" => url('') . "/api/sms-webhook2",
                    "webhook_url" => url('') . "/api/sms-webhook"
                );

                $curl = curl_init();
                curl_setopt_array($curl, [
                    CURLOPT_HTTPHEADER => [
                        "Authorization: Bearer $auth",
                        "Content-Type: application/json"
                    ],
                    CURLOPT_POSTFIELDS => json_encode($payload),
                    CURLOPT_URL => "https://api.telnyx.com/v2/messages",
                    CURLOPT_RETURNTRANSFER => true,
                    CURLOPT_CUSTOMREQUEST => "POST",
                ]);



                $var = curl_exec($curl);
                $error = curl_error($curl);
                curl_close($curl);
                $var = json_decode($var);

                if ($error) {
                    return response()->json([
                        'status' => false,
                        'message' => "$error"
                    ], 404);
                } else {

                    $cost = $var->data->cost->amount;
                    $message = new Message();
                    $message->from_no = $sender;
                    $message->to_no = $request->receiver;
                    $message->text = $request->message;
                    $message->user_id = Auth::id();
                    $message->cost = $cost;
                    $message->save();


                    $check = Recent::where('user_id', Auth::id())->where('to_no', $request->receiver)->first()->to_no ?? null;
                    if ($check == null) {
                        $recent = new Recent();
                        $recent->user_id = Auth::id();
                        $recent->from_no = $sender;
                        $recent->to_no = $request->receiver;
                        $recent->status = 1;
                        $recent->text = $request->message;
                        $recent->name = $request->name;
                        $recent->save();
                    } else {

                        Recent::where('user_id', Auth::id())->where('to_no', $request->receiver)->update([
                            'text' => $request->message
                        ]);
                    }


                        User::where('id', Auth::id())->decrement('wallet',  $cost);
                        $data['message'] = "SMS Sent Successfully";
                        return response()->json([
                            'status' => true,
                            'data' => $data
                        ], 200);
                    
                }
            } catch (Exception $e) {

                return response()->json([
                    'status' => false,
                    'message' => "$error"
                ], 404);
            }
        }
    }

    public function get_message(request $request)
    {


        $number = MyPhoneNumber::where('user_id', Auth::id())->first()->phone_no ?? null;
        if ($number == null) {
            $data['message'] = "Phone number not registered";
            return response()->json([
                'status' => true,
                'data' => $data
            ], 401);
        }


        $messages = Recent::select('name', 'from_no', 'to_no', 'status', 'text')->where('from_no', $number)
            ->orWhere('to_no', $number)
            ->get();



        $result = [];
        foreach ($messages as $data) {
            $result[] = $data;
        }


        if ($result == []) {
            return response()->json([
                'status' => true,
                'data' => []
            ], 404);
        }


        return response()->json([
            'status' => true,
            'data' => $result
        ], 200);
    }

    public function open_message(request $request)
    {


        Message::where('from_no', $request->phone_no)->update([
            'status' => 1
        ]);

        Recent::where('user_id', Auth::id())->where('from_no', $request->phone_no)->update([
            'status' => 1
        ]);


        $conversation = Message::select('id', 'from_no', 'to_no', 'status', 'media', 'text', 'created_at')
            ->where('to_no', $request->phone_no)
            ->orWhere('from_no', $request->phone_no)
            ->get();
        $result = [];
        foreach ($conversation as $data) {
            $result[] = $data;
        }



        if ($result == []) {
            return response()->json([
                'status' => true,
                'data' => []
            ], 200);
        }


        return response()->json([
            'status' => true,
            'data' => $result
        ], 200);
    }
}
