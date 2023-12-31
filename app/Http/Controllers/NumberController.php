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
                        'status' => false,
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
                    'status' => false,
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



   
}
