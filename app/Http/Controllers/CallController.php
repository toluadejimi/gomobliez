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

            $clientName = auth()->user()?->name ?? 'Browser';
            $token = africastalking()
                ->voice()
                ->webrtc()
                ->for($clientName)
                ->token();

            $call_token = Str::random('200');
            $call_url = url('') . "/call-africa?phone=$request->phone_no&call_token=$call_token&name=$request->name&plan=$plan&user_id=$user_id&parameters=skipMediaPermissionPrompt";

            $call = new Call();
            $call->user_id = Auth::id();
            $call->name = $request->name;
            $call->time_initiated = date('h:i');
            $call->call_time = "0:00";
            $call->end_time = "0:00";
            $call->to_phone = $request->phone_no;
            $call->call_url = $call_url;
            $call->call_token = $call_token;
            $call->call_url = $call_url;
            $call->save();

            $data['call_url'] = $call_url;
            $data['call_url'] = $call_url;
            $data['id'] = 2;
            $data['time'] = 200;

            return response()->json([
                'status' => true,
                'data' => $data
            ], 200);
        } else {

            $call_token = Str::random('200');
            $call_url = url('') . "/call-other?phone=$request->phone_no&call_token=$call_token&name=$request->name&plan=$plan&user_id=$user_id&parameters=skipMediaPermissionPrompt";

            $call = new Call();
            $call->user_id = Auth::id();
            $call->name = $request->name;
            $call->time_initiated = date('h:i');
            $call->call_time = "0:00";
            $call->end_time = "0:00";
            $call->to_phone = $request->phone_no;
            $call->call_url = $call_url;
            $call->call_token = $call_token;
            $call->call_url = $call_url;
            $call->save();



            $costPerSecond = Setting::where('id', 1)->first()->call_cost;
            $walletAmount = Auth::user()->wallet;
            $callTime = calculateCallTime($costPerSecond, $walletAmount);


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


            $data['call_url'] = $call_url;
            $data['id'] = 1;
            $data['time'] = 200;

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



        $chktoken = Call::where('to_phone', $request->phone)->where('call_token', $request->call_token)->first()->status ?? null;

        dd($chktoken, $request->call_token);

        if ($chktoken == 1 || $chktoken == null) {
            return redirect('error-call');
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
