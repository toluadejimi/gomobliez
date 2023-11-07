<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\MyPlan;
use App\Models\MyPlans;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class RegisterationController extends Controller
{

    public $success = true;
    public $failed = false;



    public function email_verification(Request $request)
    {

        try {


            $email = $request->email;

            $sms_code = random_int(1000, 9999);

            $check_email = User::where('email', $email)->first()->email ?? null;
            $check_email_verification = User::where('email', $email)->first()->is_email_verified ?? null;
            $check_status = User::where('email', $email)->first()->status ?? null;



            if ($check_email == $email && $check_status == 3) {

                return response()->json([
                    'status' => $this->failed,
                    'message' => 'Account has been Restricted on Gomobliez',
                ], 401);
            }

            if ($check_email == $email && $check_status == 1) {

                return response()->json([
                    'status' => $this->failed,
                    'message' => 'Email Already Exist, Login your account to continue',
                ], 409);
            }

            if ($check_email == null) {

                $user = new User();
                $user->email = $email;
                $user->code = $sms_code;
                $user->save();

                $token = $user->createToken('API Token')->accessToken;
            }

            if ($check_email == $email && $check_email_verification == 0) {

                $update_code = User::where('email', $email)
                    ->update([
                        'code' => $sms_code,
                    ]);

                $data = array(
                    'fromsender' => 'noreply@gomobilez.bplux.store', 'Gomobilez',
                    'subject' => "One Time Password",
                    'toreceiver' => $email,
                    'sms_code' => $sms_code,
                );

                Mail::send('emails.registration.otpcode', ["data1" => $data], function ($message) use ($data) {
                    $message->from($data['fromsender']);
                    $message->to($data['toreceiver']);
                    $message->subject($data['subject']);
                });

                return response()->json([
                    'status' => $this->success,
                    'message' => 'OTP Code has been sent successfully',
                ], 200);
            }


            $update_code = User::where('email', $email)
                ->update([
                    'code' => $sms_code,
                ]);

            $data = array(
                'fromsender' => 'noreply@gomobilez.bplux.store', 'Gomobilez',
                'subject' => "One Time Password",
                'toreceiver' => $email,
                'sms_code' => $sms_code,
            );

            Mail::send('emails.registration.otpcode', ["data1" => $data], function ($message) use ($data) {
                $message->from($data['fromsender']);
                $message->to($data['toreceiver']);
                $message->subject($data['subject']);
            });

            return response()->json([
                'status' => $this->success,
                'message' => 'OTP Code has been sent successfully',
            ], 200);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }


    public function register(Request $request)
    {

        try {




            $validator = Validator::make($request->all(), [
                'first_name' => 'required|string|max:50',
                'last_name' => 'required|string|max:50',
                'gender' => 'required|string|max:50',
                'email' => 'required|string|max:50',
                'password' => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => $this->failed,
                    'message' => $validator->messages()->first(),
                ], 400);
            }

            $ck = User::where('email', $request->email)->first()->is_email_verified;
            if ($ck == 0) {
                return response()->json([
                    'status' => $this->failed,
                    'message' => 'Your Email has not been verified, Kindly verify your email to register',
                ], 409);
            }




            $check_email = User::where('email', $request->email)->first()->first_name ?? null;

            $email = $request->email;
            $device_id = $request->device_id;
            $first_name = $request->first_name;
            $last_name = $request->last_name;
            $gender = $request->gender;
            $password = $request->password;



            if ($check_email == null) {


                User::where('email', $request->email)->update([

                    'first_name' => $first_name,
                    'last_name' => $last_name,
                    'gender' => $gender,
                    'password' => bcrypt($password),
                    'device_id' => $device_id

                ]);


            $user_id = User::where('email', $request->email)->first()->id;


            $chl_plan = MyPlan::where('user_id', $user_id)->first()->user_id ?? null;

            if($chl_plan == null){

                $plan = new MyPlan();
                $plan->user_id = $user_id;
                $plan->plan_id = 0;
                $plan->amount = 0;
                $plan->save();
            }


            $data = array(
                'fromsender' => 'noreply@gomobilez.bplux.store', 'Gomobilez',
                'subject' => "Account Creation",
                'toreceiver' => $email,
                'name' => $first_name,
            );

            Mail::send('emails.registration.account-creation', ["data1" => $data], function ($message) use ($data) {
                $message->from($data['fromsender']);
                $message->to($data['toreceiver']);
                $message->subject($data['subject']);
            });



                return response()->json([
                    'status' => $this->success,
                    'message' => 'Your account has been successfully created',
                ], 201);
            }



            return response()->json([
                'status' => $this->failed,
                'message' => 'Email Already Exist',
            ], 409);



        } catch (\Exception $th) {
            return $th->getMessage();
        }
    }



    public function resend_email_otp(Request $request)
    {


        try {

            $check_email = User::where('email', $request->email)->first()->email ?? null;

            if ($check_email == null) {

                return response()->json([
                    'status' => $this->failed,
                    'message' => 'Email could not be found on Gomobilez',
                ], 401);
            }

            if ($check_email == $request->email) {


                $code = User::where('email', $request->email)->first()->code ?? null;

                $data = array(
                    'fromsender' => 'noreply@gomobilez.bplux.store', 'Gomobilez',
                    'subject' => "One Time Password",
                    'toreceiver' => $request->email,
                    'sms_code' => $code,
                );

                Mail::send('emails.registration.otpcode', ["data1" => $data], function ($message) use ($data) {
                    $message->from($data['fromsender']);
                    $message->to($data['toreceiver']);
                    $message->subject($data['subject']);
                });

                return response()->json([
                    'status' => $this->success,
                    'message' => 'OTP Code has been resent successfully',
                ], 200);


            } else {

                return response()->json([
                    'status' => $this->failed,
                    'message' => 'Something Went wrong',
                ], 500);
            }
        } catch (\Exception $th) {
            return $th->getMessage();
        }
    }


    public function verify_email_otp(Request $request)
    {

        try {

            $user_id = Auth::id() ?? null;

            $email = $request->email;
            $code = $request->code;


            $get_code = User::where('email', $email)->first()->code ?? null;


            if ($email == null || $code == null) {
                return response()->json([
                    'status' => $this->failed,
                    'message' => 'Email or code can not be null',
                ], 400);
            }


            if ($get_code  != $code) {

                return response()->json([
                    'status' => $this->failed,
                    'message' => 'Invalid code, try again',
                ], 400);
            }

            if ($get_code  == $code) {

                User::where('email', $email)
                    ->update([

                        'is_email_verified' => 1,
                        'status' => 1,

                    ]);

                return response()->json([
                    'status' => $this->success,
                    'message' => 'OTP Code verified successfully',
                ], 200);
            }


        } catch (\Exception $th) {
            return $th->getMessage();
        }
    }



    public function forgot_password(request $request)
    {


        try {

            $email = $request->email;
            $code = random_int(1000, 9999);


            $check = User::where('email', $email)
                ->first()->email ?? null;


            if ($email == null) {

                return response()->json([

                    'status' => $this->failed,
                    'message' => 'Account not found, please sign up',

                ], 404);
            }


            User::where('email', $email)
                ->update(['code' => $code]);

            if ($check == $email) {

                $data = array(
                    'fromsender' => 'noreply@gomobilez.bplux.store', 'Gomobilez',
                    'subject' => "One Time Password",
                    'toreceiver' => $email,
                    'sms_code' => $code,
                );

                Mail::send('emails.registration.otpcode', ["data1" => $data], function ($message) use ($data) {
                    $message->from($data['fromsender']);
                    $message->to($data['toreceiver']);
                    $message->subject($data['subject']);
                });

                return response()->json([
                    'status' => $this->success,
                    'message' => 'Check your inbox or spam for OTP Code',
                ], 200);


            } else {

                return response()->json([

                    'status' => $this->failed,
                    'message' => 'User not found on our system',

                ], 404);
            }


        } catch (\Exception $e) {
            return response()->json([
                'status' => $this->failed,
                'message' => $e->getMessage(),
            ], 500);
        }
    }


    public function reset_password(request $request)
    {


        try {


            if ($request->password != $request->confirm_password) {

                return response()->json([
                    'status' => $this->failed,
                    'message' => 'Password does not match',
                ], 400);
            }


            $chk_user = User::where('email', $request->email)->first()->email ?? null;
            if ($chk_user == null) {

                return response()->json([
                    'status' => $this->failed,
                    'message' => 'Account not found',
                ], 404);
            }


            User::where('email', $request->email)->update([
                'password' => bcrypt($request->password)
            ]);

            return response()->json([
                'status' => $this->success,
                'message' => 'Your password has been successfully updated',
            ], 200);


        } catch (\Exception $e) {
            return response()->json([
                'status' => $this->failed,
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
