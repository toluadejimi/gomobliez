<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\ApiKey;
use App\Models\Feature;
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


        Passport::tokensExpireIn(Carbon::now()->addMinutes(20));
        Passport::refreshTokensExpireIn(Carbon::now()->addMinutes(20));

        $check_status = User::where('email', $email)->first()->status ?? null;

        if ($check_status == 3) {

            return response()->json([
                'status' => $this->failed,
                'message' => 'Your account has restricted on Gomobliez',
            ], 500);
        }


        if (!auth()->attempt($credentials)) {
            return response()->json([
                'status' => $this->failed,
                'message' => 'Phone No or Password Incorrect'
            ], 500);
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

            ], 500);
        }

            $token = auth()->user()->createToken('API Token')->accessToken;

            $myplan = MyPlan::select('id','user_id', 'plan_id', 'amount', 'status')->where('user_id', Auth::id())->first() ?? null;
            $plans = Plan::select('id','title','amount', 'period')->get();


            $user = Auth()->user();
            $user['token'] = $token;
            $user['my_plan'] = $myplan;
            $user['plans'] = $plans;


            $keys = ApiKey::select('vendor', 'encrypted_public', 'encrypted_secret')->get();
            foreach ($keys as $data){

                $key[] = $data;

            }





            return response()->json([
                'status' => $this->success,
                'data' => $user,
                'keys' => $key
            ], 200);

    }

}
