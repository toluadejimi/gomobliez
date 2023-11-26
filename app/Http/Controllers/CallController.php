<?php

namespace App\Http\Controllers;



use App\Models\Call;
use App\Models\User;
use App\Models\MyPlan;
use App\Models\Setting;
use App\Models\Transaction;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use SamuelMwangiW\Africastalking\Facades\Africastalking;
use SamuelMwangiW\Africastalking\Response\VoiceResponse;




class CallController extends Controller
{
    public function start_call(request $request)
    {


        $plans = MyPlan::where('user_id', Auth::id())->first()->status ?? null;
        if($plans == null || $plans == 0){
            $plan = 0;
        }else{
            $plan = 0;
        }

        $user_id = Auth::id();







        $phone = ['+234', '+254', '+256', '+255'];
        if (Str::contains($request->phone_no, $phone)) {


        $clientName = auth()->user()?->name ?? 'Browser';
        $token = africastalking()
            ->voice()
            ->webrtc()
            ->for($clientName)
            ->token();


        $call_url = url('')."/call-africa?phone=$request->phone_no&name=$request->name&plan=$plan&user_id=$user_id&parameters=skipMediaPermissionPrompt&token=$token->token&clientName=$token->clientName";

            $call = new Call();
            $call->user_id = Auth::id();
            $call->name = $request->name;
            $call->time_initiated = date('h:i');
            $call->call_time = "0:00";
            $call->end_time = "0:00";
            $call->to_phone = $request->phone_no;
            $call->call_url = $call_url;
            $call->save();

        } else {

            $call_url = url('')."/call-other?phone=$request->phone_no&name=$request->name&plan=$plan&user_id=$user_id&parameters=skipMediaPermissionPrompt";

            $call = new Call();
            $call->user_id = Auth::id();
            $call->name = $request->name;
            $call->time_initiated = date('h:i');
            $call->call_time = "0:00";
            $call->end_time = "0:00";
            $call->to_phone = $request->phone_no;
            $call->call_url = $call_url;
            $call->save();

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
    {

        $calls = Call::latest()->select('to_phone', 'name', 'call_url', 'created_at')->where('user_id', Auth::id())->get() ?? null;

        if($calls == null){
            $data['calls'] = [];
        }else{
            $data['calls'] = $calls;
        }


         return response()->json([
          'status' => true,
           'data' => $data
        ], 200);



    }



    public function call_africa(request $request)
    {


        $name = $request->name;
        $phone_no = $request->phone;
        $number = $request->phone;
        $plan = $request->plan;
        $user_id = $request->user_id;

        $token = $request->token; //africa_token() ?? null;

        return view('africa-call', compact('name', 'token', 'phone_no', 'number','plan','user_id'));
    }

    public function call_other(request $request)
    {


        function localize_us_number($phone) {
            // $numbers_only = preg_replace("/[^\d]/", "", $phone);
            return preg_replace("/^1?(\d{3})(\d{3})(\d{4})$/", "$1-$2-$3", $phone);
        }

        $name = $request->name;
        $phone = $request->phone;
        $phone_no = localize_us_number($phone);
        $number = $request->phone;
        $plan = $request->plan;
        $user_id = $request->user_id;

        return view('call', compact('name', 'phone_no', 'number','plan','user_id'));
    }




    public function callback(request $request)
    {


        $message ="Callback====>>>>".json_encode($request->all());
        send_notification($message);

        $isActive  = $request->isActive;
        $phoneNo =   $request->clientDialedNumber;
        $destinationNumber = $request->destinationNumber;
        $url_ring =  "https://gomobilez.bplux.store/public/assets/calling.mp3";
        $record =  "false";
        $duration =  "5";
        $sequential = "true";

        

        if ($isActive == 1)  {
        $response  = '<?xml version="1.0" encoding="UTF-8"?>';
        $response .= '<Response>';
        $response .= '<Say voice="en-US-Standard-C">Welcome to Gomobilez Call center</Say>';
        $response .= '<Dial phoneNumbers="+2348105059613" ringbackTone="https://gomobilez.bplux.store/public/assets/calling.mp3" />';
        $response .= '</Response>';

        // Print the response onto the page so that our gateway can read it
        header('Content-type: application/xml');
        echo $response;

     

        }





    }




}
