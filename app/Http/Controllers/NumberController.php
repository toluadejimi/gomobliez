<?php

namespace App\Http\Controllers;

use App\Models\Call;
use App\Models\Country;
use App\Models\Message;
use App\Models\MyPhoneNumber;
use App\Models\MyPlan;
use App\Models\Price;
use App\Models\Recent;
use App\Models\Setting;
use App\Models\Transaction;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Twilio\Exceptions\RestException;
use Twilio\Rest\Client;
use Illuminate\Support\Str;


class NumberController extends Controller
{

    public function get_countries(request $request)
    {




        $countries = Country::select('code', 'name', 'flag')->orderByDesc('name')->get();

        $data['countries'] = $countries;


        return response()->json([

            'status' => true,
            'data' => $data


        ], 200);
    }


    public function get_list_numbers(request $request)
    {

        $settings = Setting::where('id', 1)->first()->sms;

        if ($settings == 'twilio') {

            try {



                $accountSid = env('TWILO_ACCT_SID');
                $authToken = env('TWILO_AUTH');

                $twilio = new Client($accountSid, $authToken);

                $mobile = $twilio->availablePhoneNumbers($request->code)
                    ->local
                    ->read(["areaCode" => $request->area_code], 50);

                foreach ($mobile as $record) {
                    $data[] = $record->phoneNumber;
                }
                $number['phone_numbers'] = $data;
                $number['amount'] = 30;
                return response()->json([

                    'status' => true,
                    'data' => $number


                ], 200);
            } catch (RestException $e) {
                $statusCode = $e->getStatusCode();
                $errorMessage = $e->getMessage();

                return response()->json([

                    'status' => false,
                    'message' => "No Number Available for the selected country"


                ], 404);
            }
        }



        if ($settings == 'telnyx') {

            $auth = env('TELNYX');


            $query = array(
                "page[number]" => 1,
                "page[size]" => 20
            );


            $url = "https://api.telnyx.com/v2/available_phone_numbers?filter[country_code]=$request->code&filter[national_destination_code]=$request->area_code";

            //dd($url);

            $curl = curl_init();

            curl_setopt_array($curl, [
                CURLOPT_HTTPHEADER => [
                    "Authorization: Bearer $auth"
                ],
                CURLOPT_URL => $url, //"https://api.telnyx.com/v2/channel_zones?" . http_build_query($query),
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_CUSTOMREQUEST => "GET",
            ]);

            $var = curl_exec($curl);
            curl_close($curl);

            $var = json_decode($var);


            foreach ($var->data as $record) {
                $data[] = $record->phone_number;
            }

            $amount = Setting::where('id', 1)->first()->number_amount;
            $number['phone_numbers'] = $data;
            $number['amount'] = $amount;


            return response()->json([

                'status' => true,
                'data' => $number


            ], 200);
        }
    }




    public function buy_number(request $request)
    {

        $settings = Setting::where('id', 1)->first()->sms;
        if ($settings == 'twilio') {

            try {

                $amount = Setting::where('id', 1)->first()->number_amount;
                if (Auth::user()->wallet < $amount) {

                    return response()->json([
                        'status' => true,
                        'message' => "Insufficient Funds, Fund your wallet"
                    ], 422);
                }



                $accountSid = env('TWILO_ACCT_SID');
                $authToken = env('TWILO_AUTH');


                $twilio = new Client($accountSid, $authToken);

                $incoming_phone_number = $twilio->incomingPhoneNumbers
                    ->create(["phoneNumber" => $request->phone_no]);


                User::where('id', Auth::id())->decrement('wallet', $amount);
                MyPhoneNumber::create([
                    'user_id' => Auth::id(),
                    'accountSid' => $incoming_phone_number->accountSid,
                    'phone_no' => $request->phone_no,
                    'sid' => $incoming_phone_number->sid,
                    'amount' => $amount,
                    'status' => 1
                ]);


                $trx_id = "TRX" . date("yis");
                Transaction::create([
                    'trx_id' => $trx_id,
                    'user_id' => Auth::id(),
                    'amount' => $amount,
                    'status' => 1,
                    'type' => 1

                ]);






                $data['message'] = "$request->phone_no is now yours";
                return response()->json([

                    'status' => true,
                    'data' => $data


                ], 200);
            } catch (RestException $e) {
                $statusCode = $e->getStatusCode();
                $errorMessage = $e->getMessage();


                return response()->json([
                    'status' => false,
                    'message' => "$errorMessage"
                ], 404);
            }
        }


        if ($settings == 'telnyx') {


            $amount = Setting::where('id', 1)->first()->number_amount;
            if (Auth::user()->wallet < $amount) {

                return response()->json([
                    'status' => true,
                    'message' => "Insufficient Funds, Fund your wallet"
                ], 422);
            }


            // $auth = env('TELNYX');


            // $data = [


            //     "phone_numbers" => [
            //         "phone_number" => $request->phone_no,
            //     ]
            // ];

            // $post_data = json_encode($data);


            // $curl = curl_init();

            // curl_setopt_array($curl, [
            //     CURLOPT_HTTPHEADER => [
            //         "Authorization: Bearer $auth"
            //     ],
            //     CURLOPT_URL => "https://api.telnyx.com/v2/number_orders",
            //     CURLOPT_RETURNTRANSFER => true,
            //     CURLOPT_CUSTOMREQUEST => 'POST',
            //     CURLOPT_POSTFIELDS => $post_data

            // ]);

            // $var = curl_exec($curl);
            // curl_close($curl);


            // User::where('id', Auth::id())->decrement('wallet', $amount);
            //     MyPhoneNumber::create([
            //         'user_id' => Auth::id(),
            //         'accountSid' => $incoming_phone_number->accountSid,
            //         'phone_no' => $request->phone_no,
            //         'sid' => $incoming_phone_number->sid,
            //         'amount' => $amount,
            //         'status' => 1
            //     ]);


            //     $trx_id = "TRX" . date("yis");
            //     Transaction::create([
            //         'trx_id' => $trx_id,
            //         'user_id' => Auth::id(),
            //         'amount' => $amount,
            //         'status' => 1,
            //         'type' => 1

            //     ]);


            $data['message'] = "$request->phone_no is now yours";
            return response()->json([

                'status' => true,
                'data' => $data


            ], 200);
        }
    }






    public function delete_number(request $request)
    {


        MyPhoneNumber::where('user_id', Auth::id())->delete();

        $data['message'] = "Phone Number Deleted Successfully";
        return response()->json([

            'status' => true,
            'data' => $data


        ], 200);
    }




    public function send_message(request $request)
    {




        if ($request->hasFile('file')) {

            try {


                $user_email = Auth::user()->email;
                $file = $request->file('file');
                $fileName = time() . '.' . $file->getClientOriginalExtension();
                $file->move(public_path("/public/assets/img/$user_email/"), $fileName); // Save the image to the "uploads" directory in the public folder


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
                        'status' => true,
                        'message' => "Insufficient Funds, Fund your wallet"
                    ], 422);
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
                    if($check == null){
                        $recent= new Recent();
                        $recent->user_id = Auth::id();
                        $recent->from_no = $sender;
                        $recent->to_no = $request->receiver;
                        $recent->status = 1;
                        $recent->text = $request->message;
                        $recent->name = $request->name;
                        $recent->save();

                    }else{

                        Recent::where('user_id', Auth::id())->where('to_no', $request->receiver)->update([
                            'text' => $request->message
                        ]);


                    }





                    $plan = MyPlan::where('user_id', Auth::id())->first()->plan_id ?? null;
                    if ($plan == null) {
                        User::where('id', Auth::id())->decrement('wallet', $cost);
                        $data['message'] = "MMS Sent Successfully";
                        return response()->json([
                            'status' => true,
                            'data' => $data
                        ], 200);
                    }


                    if ($plan == 3 || $plan == 4 || $plan == 5) {

                        $data['message'] = "MMS Sent Successfully";
                        return response()->json([
                            'status' => true,
                            'data' => $data
                        ], 200);
                    } else {

                        User::where('id', Auth::id())->decrement('wallet', $cost);
                        $data['message'] = "MMS Sent Successfully";
                        return response()->json([
                            'status' => true,
                            'data' => $data
                        ], 200);
                    }
                }



            } catch (Exception $e) {

                return response()->json([
                    'status' => false,
                    'message' => "$error"
                ], 404);
            }
        } else {


            try {

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
                        'status' => true,
                        'message' => "Insufficient Funds, Fund your wallet"
                    ], 422);
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
                    if($check == null){
                        $recent= new Recent();
                        $recent->user_id = Auth::id();
                        $recent->from_no = $sender;
                        $recent->to_no = $request->receiver;
                        $recent->status = 1;
                        $recent->text = $request->message;
                        $recent->name = $request->name;
                        $recent->save();

                    }else{

                        Recent::where('user_id', Auth::id())->where('to_no', $request->receiver)->update([
                            'text' => $request->message
                        ]);


                    }


                    $plan = MyPlan::where('user_id', Auth::id())->first()->plan_id ?? null;
                    if ($plan == null) {
                        User::where('id', Auth::id())->decrement('wallet',  $cost);
                        $data['message'] = "SMS Sent Successfully";
                        return response()->json([
                            'status' => true,
                            'data' => $data
                        ], 200);
                    }


                    if ($plan == 3 || $plan == 4 || $plan == 5) {

                        $data['message'] = "SMS Sent Successfully";
                        return response()->json([
                            'status' => true,
                            'data' => $data
                        ], 200);
                    } else {

                        User::where('id', Auth::id())->decrement('wallet',  $cost);
                        $data['message'] = "SMS Sent Successfully";
                        return response()->json([
                            'status' => true,
                            'data' => $data
                        ], 200);
                    }
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
        if($number == null){
                $data['message']="Phone number not registered";
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


        if($result == []){
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


        $conversation = Message::select('id', 'from_no', 'to_no','status', 'media', 'text','created_at')
        ->where('to_no', $request->phone_no)
        ->orWhere('from_no', $request->phone_no)
        ->get();
        $result = [];
        foreach ($conversation as $data) {
            $result[] = $data;
        }



        if($result == []){
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



    public function start_call(request $request)
    {


        $plans = MyPlan::where('user_id', Auth::id())->first()->status ?? null;
        if($plans == null || $plans == 0){
            $plan = 0;
        }else{
            $plan = 0;
        }

        $user_id = Auth::id();


        $call = new Call();
        $call->user_id = Auth::id();
        $call->name = $request->name;
        $call->to_phone = $request->phone_no;
        $call->save();





        $phone = ['+234', '+254', '+256', '+255'];
        if (Str::contains($request->phone_no, $phone)) {

            $call_url = url('')."/call-africa?phone=$request->phone_no&name=$request->name&plan=$plan&user_id=$user_id&parameters=skipMediaPermissionPrompt";

        } else {

            $call_url = url('')."/call-other?phone=$request->phone_no&name=$request->name&plan=$plan&user_id=$user_id&parameters=skipMediaPermissionPrompt";

        }


        $data['url'] = $call_url;
        return response()->json([
          'status' => true,
           'data' => $data
        ], 200);




    }




    public function charge(request $request)
    {

        $wallet = User::where('id', $request->userId)->first()->wallet;
        $call_cost = Setting::where('id', 1)->first()->call_cost;


        if($call_cost > $wallet){

            return response()->json([
                'data' => false,
                'wallet' => $wallet

            ]);

        }

        User::where('id', $request->userId)->decrement('wallet', $call_cost);

        return response()->json([
            'data' => true,
            'wallet' => $wallet

        ]);



    }



    public function recent_calls(request $request)
    {}







}
