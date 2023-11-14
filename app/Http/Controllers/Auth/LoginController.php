<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\ApiKey;
use App\Models\Feature;
use App\Models\Message;
use App\Models\MyPhoneNumber;
use App\Models\MyPlan;
use App\Models\OauthAccessToken;
use App\Models\Plan;
use App\Models\Setting;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Passport\Passport;

class LoginController extends Controller
{



    public $success = true;
    public $failed = false;



    public function login(Request $request)
    {




        $email = $request->email;
        $credentials = request(['email', 'password']);


        Passport::tokensExpireIn(Carbon::now()->addMinutes(50));
        Passport::refreshTokensExpireIn(Carbon::now()->addMinutes(50));

        $check_status = User::where('email', $email)->first()->status ?? null;

        if ($check_status == 3) {

            return response()->json([
                'status' => $this->failed,
                'message' => 'Your account has restricted on Gomobliez',
            ], 401);
        }


        if (!auth()->attempt($credentials)) {
            return response()->json([
                'status' => $this->failed,
                'message' => 'Phone No or Password Incorrect'
            ], 401);
        }


        $get_token = OauthAccessToken::where('user_id', Auth::id())->first()->user_id ?? null;

        if($get_token != null){
            OauthAccessToken::where('user_id', Auth::id())->delete();
        }


        $get_device_id = Auth::user()->device_id ?? null;
        $get_deviceIdentifier = Auth::user()->deviceIdentifier ?? null;
        $get_deviceName = Auth::user()->deviceName ?? null;
        $get_ip = Auth::user()->ip_address ?? null;


        $get_device_id = User::where('device_id', $request->device_id)
            ->first()->device_id ?? null;

        if ($get_device_id == null) {

            $update = User::where('id', Auth::id())
                ->update([
                    'device_id' => $request->device_id ?? null,
                ]);
        }




        if (Auth::user()->status == 5) {


            return response()->json([

                'status' => $this->failed,
                'message' => 'You can not login at the moment, Please contact  support',

            ], 401);
        }

            $token = auth()->user()->createToken('API Token')->accessToken;

            $myplan = MyPlan::select('id','user_id', 'plan_id', 'amount', 'status')->where('user_id', Auth::id())->first() ?? null;
            $phone_number = MyPhoneNumber::select('phone_no', 'status')->where('user_id', Auth::id())->first() ?? null;
            $plans = Plan::select('id','title','amount', 'period')->get();
            $billing = User::select('first_name', 'last_name','city', 'street', 'zipcode', 'country', 'state', 'phone')->where('id', Auth::id())->get();
            $user = Auth()->user();
            $user['token'] = $token;
            $user['my_plan'] = $myplan;
            $user['billing_information'] = $billing;
            $user['my_number'] = $phone_number;



            $phone_no = MyPhoneNumber::where('user_id', Auth::id())->first()->phone_no ?? null;
            $pending_messages = Message::where('from_no', $phone_no)->orWhere('to_no', $phone_no)->count();

            return response()->json([
                'status' => $this->success,
                'data' => $user,
                'pending_messages' => $pending_messages
            ], 200);

    }

}
