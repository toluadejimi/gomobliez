<?php

namespace App\Http\Controllers;

use App\Models\Call;
use App\Models\User;
use App\Models\MyPlan;
use App\Models\Setting;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\CallLimit;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;
use SamuelMwangiW\Africastalking\Response\VoiceResponse;

class CallController extends Controller
{
    public function start_call(request $request)
    {

        $plans = MyPlan::where('user_id', Auth::id())->first()->status ?? null;
        if ($plans == null || $plans == 0) {
            $plan = 0;
        } else {
            $plan = $plans;
        }


        if ($plans == 1) {

            $ck = CallLimit::where('user_id', Auth::id())->whereDate('created_at', Carbon::today())->first() ?? null;
            if ($ck == null) {
                $cl = new CallLimit();
                $cl->user_id = Auth::id();
                $cl->call_limit = 0;
                $cl->save();
            }
        }

        $user_id = Auth::id();
        $phone = ['+234', '+254', '+256', '+255'];
        if (Str::contains($request->phone_no, $phone)) {

            $costPerSecond = Setting::where('id', 1)->first()->call_cost;
            $walletAmount = Auth::user()->wallet;
            $wallet = User::where('id', Auth::id())->first()->wallet ?? null;
            $time_to_call =  calculateCallTime($costPerSecond, $walletAmount);

            if($time_to_call == 0){
                return response()->json([
                    'status' => false,
                    'message' => "Insufficient funds to make call, Fund your wallet"
                ], 422);
            }


            $call = new Call();
            $call->user_id = Auth::id();
            $call->name = $request->name;
            $call->time_initiated = date('h:i');
            $call->call_time = "0:00";
            $call->end_time = "0:00";
            $call->to_phone = $request->phone_no;
            $call->time_to_call = $time_to_call;
            $call->save();


            if ($plan == 1) {

                $dailylimit = CallLimit::where('user_id', Auth::id())->first()->call_limit;
                $setLimit = Setting::where('id', 1)->first()->call_limit;
                $planlimit = $setLimit - $dailylimit;

                if ($dailylimit >= $setLimit) {
                    $tk = 0;
                } else {
                    $tk = $planlimit;
                }
            } else {

                $dailycalllimit = CallLimit::where('user_id', Auth::id())->first()->call_limit;
                $setLimit = Setting::where('id', 1)->first()->call_limit;
                $userwallet = User::where('id', Auth::id())->first()->wallet;
                $callcost = Setting::where('id', 1)->first()->call_cost;
                $walletlimit = $userwallet * $callcost;
                if ($dailycalllimit >= $setLimit) {
                    $tk = 0;
                } else {
                    $tk = $walletlimit;
                }
            }


            $data['id'] = 1;
            $data['time'] = $time_to_call;

            return response()->json([
                'status' => true,
                'data' => $data
            ], 200);
        }
    }




    public function charge(request $request)
    {

        $wallet = User::where('id', $request->userId)->first()->wallet;
        $call_cost = Setting::where('id', 1)->first()->call_cost;


        if ($call_cost > $wallet) {

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

        if ($calls == null) {
            $data['calls'] = [];
        } else {
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

        return view('africa-call', compact('name', 'token', 'phone_no', 'number', 'plan', 'user_id'));
    }

    public function call_other(request $request)
    {

        if ($request->call_token == null) {
            $error_message = "Token can not be null";
            return view('error-call', compact('error_message'));
        }



        $chktoken = Call::where('call_token', $request->call_token)->first()->status ?? null;
        $token = Call::where('call_token', $request->call_token)->first() ?? null;

        if($token == null){
            $error_message = "Call Token is missing";
            return view('error-call', compact('error_message'));
        }


        if ($chktoken == 1) {
            $error_message = "Token not valid";
            return view('error-call', compact('error_message'));
        }





        function localize_us_number($phone)
        {
            // $numbers_only = preg_replace("/[^\d]/", "", $phone);
            return preg_replace("/^1?(\d{3})(\d{3})(\d{4})$/", "$1-$2-$3", $phone);
        }

        $name = $request->name;
        $phone = $request->phone;
        $phone_no = localize_us_number($phone);
        $number = $request->phone;
        $plan = $request->plan;
        $user_id = $request->user_id;
        $tk = $request->tk;


        return view('call', compact('name', 'phone_no', 'number', 'plan', 'tk', 'user_id'));
    }


    public function error_call()
    {
        return view('error-call');
    }
}
