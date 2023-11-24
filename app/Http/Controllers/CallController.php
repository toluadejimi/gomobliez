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

            $call_url = url('')."/call-africa?phone=$request->phone_no&name=$request->name&plan=$plan&user_id=$user_id&parameters=skipMediaPermissionPrompt";

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


    




}
