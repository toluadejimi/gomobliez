<?php

namespace App\Http\Controllers\Auth;

use AfricasTalking\SDK\AfricasTalking;
use App\Http\Controllers\Controller;
use App\Models\State;
use App\Models\StateLga;
use App\Models\User;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Mail;

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
                ], 500);

            }

            if ($check_email == $email && $check_status == 1) {

                return response()->json([
                    'status' => $this->failed,
                    'message' => 'Email Already Exist, Login your account to continue',
                ], 500);

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
                    'fromsender' => 'noreply@enkpay.com', 'Gomobilez',
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
                    'message' => 'OTP Code has been sent succesfully',
                ], 200);

            }


            $update_code = User::where('email', $email)
            ->update([
                'code' => $sms_code,
            ]);

            $data = array(
                'fromsender' => 'noreply@enkpay.com', 'Gomobilez',
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
                'message' => 'OTP Code has been sent succesfully',
            ], 200);


        } catch (\Exception$e) {
            return $e->getMessage();
        }

    }


    public function register(Request $request)
    {

        // try {

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
                ], 500);
            }

            $check_phone = User::where('phone', $request->phone_no)
            ->first()->phone ?? null;


            $check_email = User::where('email', $request->email)->first()->email ?? null;



            $email = $request->email;
            $device_id = $request->devide_id;
            $first_name = $request->first_name;
            $last_name = $request->last_name;
            $gender = $request->gender;
            $password = $request->password;
            $email = $request->email;



            if($check_email == null ){

                $create = new User();
                $create->first_name = $first_name;
                $create->last_name = $last_name;
                $create->gender = $gender;
                $create->email = $email;
                $create->device_id = $device_id;
                $create->is_phone_verified = 1;
                $create->password = bcrypt($password);
                $create->save();

                return response()->json([
                    'status' => $this->success,
                    'message' => 'Your account has been successfully created',
                ], 200);

            }



            return response()->json([
                'status' => $this->failed,
                'message' => 'Email Already Exist',
            ], 200);

    }



    public function resend_email_otp(Request $request)
    {




        try {

            $api_key = env('EMAILKEY');

            $from = env('FROM_API');

            $email = $request->email;

            $sms_code = random_int(1000, 9999);

            $check_email = User::where('email', $email)->first()->email ?? null;

            if ($check_email == $email) {

                $update_code = User::where('email', $email)
                    ->update([
                        'sms_code' => $sms_code,
                    ]);

                // $data = array(
                //     'fromsender' => 'noreply@enkpayapp.enkwave.com', 'EnkPay',
                //     'subject' => "One Time Password",
                //     'toreceiver' => $email,
                //     'sms_code' => $sms_code,
                // );

                // Mail::send('emails.registration.otpcode', ["data1" => $data], function ($message) use ($data) {
                //     $message->from($data['fromsender']);
                //     $message->to($data['toreceiver']);
                //     $message->subject($data['subject']);
                // });


                $client = new Client([
                    'base_uri' => 'https://api.elasticemail.com',
                ]);

                // The response to get
                $res = $client->request('GET', '/v2/email/send', [
                    'query' => [

                        'apikey' => "$api_key",
                        'from' => "$from",
                        'fromName' => 'ENKPAY',
                        'sender' => "$email",
                        'senderName' => 'ENKPAY',
                        'subject' => 'Verification Code',
                        'to' => "$email",
                        'bodyHtml' => view('emails.registration.otpcode', compact('sms_code'))->render(),
                        'encodingType' => 0,

                    ],
                ]);

                $body = $res->getBody();
                $array_body = json_decode($body);

                return response()->json([
                    'status' => $this->success,
                    'message' => 'OTP Code has been sent succesfully',
                ], 200);

            } else {

                return response()->json([
                    'status' => $this->failed,
                    'message' => 'Email could not be found on Enkpay',
                ], 500);
            }

        } catch (\Exception$th) {
            return $th->getMessage();
        }

    }


    public function verify_email_otp(Request $request)
    {

        try {

            $user_id = Auth::id() ?? null;

            $email = $request->email;
            $code = $request->code;

            $get_auth_code = User::where('id', $user_id)->first()->sms_code ?? null;

            $get_code = User::where('email', $email)->first()->sms_code ?? null;

            if ($code == $get_code && $user_id == null) {

                $update = User::where('email', $email)
                    ->update([

                        'is_email_verified' => 1,
                        'status' => 1,

                    ]);

                return response()->json([
                    'status' => $this->success,
                    'message' => 'OTP Code verified successfully',
                ], 200);

            }

            return response()->json([
                'status' => $this->failed,
                'message' => 'Invalid code, try again',
            ], 500);

            if ($code == $get_auth_code && $user_id == Auth::id()) {

                $update = User::where('id', $user_id)
                    ->update([

                        'is_email_verified' => 1,
                        'status' => 1,

                    ]);

                return response()->json([
                    'status' => $this->success,
                    'message' => 'OTP Code verified successfully',
                ], 200);

            }

            return response()->json([
                'status' => $this->failed,
                'message' => 'Invalid code, try again',
            ], 500);

        } catch (\Exception$th) {
            return $th->getMessage();
        }
    }


    // public function register(Request $request)
    // {

    //     // try {

    //         $validator = Validator::make($request->all(), [
    //             'first_name' => 'required|string|max:50',
    //             'last_name' => 'required|string|max:50',
    //             'gender' => 'required|string|max:50',
    //             'email' => 'required|string|max:50',
    //             'password' => 'required',
    //         ]);

    //         if ($validator->fails()) {
    //             return response()->json([
    //                 'status' => $this->failed,
    //                 'message' => $validator->messages()->first(),
    //             ], 500);
    //         }

    //         $check_phone = User::where('phone', $request->phone_no)
    //         ->first()->phone ?? null;


    //         $check_email = User::where('email', $request->email)->first()->email ?? null;



    //         $email = $request->email;
    //         $device_id = $request->devide_id;
    //         $first_name = $request->first_name;
    //         $last_name = $request->last_name;
    //         $gender = $request->gender;
    //         $password = $request->password;
    //         $email = $request->email;



    //         if($check_email == null ){

    //             $create = new User();
    //             $create->first_name = $first_name;
    //             $create->last_name = $last_name;
    //             $create->gender = $gender;
    //             $create->email = $email;
    //             $create->device_id = $device_id;
    //             $create->is_phone_verified = 1;
    //             $create->password = bcrypt($password);
    //             $create->save();

    //             return response()->json([
    //                 'status' => $this->success,
    //                 'message' => 'Your account has been successfully created',
    //             ], 200);

    //         }



    //         return response()->json([
    //             'status' => $this->failed,
    //             'message' => 'Email Already Exist',
    //         ], 200);

    // }



    public function forgot_password(request $request){


        try {

            $email = $request->email;

            $check = User::where('email', $email)
            ->first()->email ?? null;


            if($email == null){

                return response()->json([

                    'status' => $this->failed,
                    'message' => 'Account not found, please sign up',

                ], 500);


            }


            $first_name = User::where('email', $email)
                ->first()->first_name ?? null;

            if ($check == $email) {

                //send email
                $data = array(
                    'fromsender' => 'noreply@enkpayapp.enkwave.com', 'EnkPay',
                    'subject' => "Reset Password",
                    'toreceiver' => $email,
                    'first_name' => $first_name,
                    'link' => url('') . "/reset-password/?email=$email",
                );

                Mail::send('emails.notify.passwordlink', ["data1" => $data], function ($message) use ($data) {
                    $message->from($data['fromsender']);
                    $message->to($data['toreceiver']);
                    $message->subject($data['subject']);
                });

                return response()->json([
                    'status' => $this->success,
                    'message' => 'Check your inbox or spam for futher instructions',
                ], 200);

            } else {

                return response()->json([

                    'status' => $this->failed,
                    'message' => 'User not found on our system',

                ], 500);

            }

        } catch (\Exception$e) {
            return response()->json([
                'status' => $this->failed,
                'message' => $e->getMessage(),
            ], 500);
        }



    }

}
