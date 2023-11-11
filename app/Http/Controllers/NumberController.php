<?php

namespace App\Http\Controllers;

use App\Models\Country;
use App\Models\MyPhoneNumber;
use App\Models\Price;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Twilio\Rest\Client;
use Twilio\Exceptions\RestException;

class NumberController extends Controller
{

    public function get_countries(request $request)
    {


        $countries = Country::select('code', 'name', 'flag')->orderByDesc('name')->get();

        $data['countries'] = $countries;


        // $accountSid = env('TWILO_ACCT_SID');
        // $authToken = env('TWILO_AUTH');

        // $twilio = new Client($accountSid, $authToken);

        // // $available_phone_number_country = $twilio->availablePhoneNumbers("US")
        // // ->fetch();

        // $availablePhoneNumbers = $twilio->availablePhoneNumbers
        //                         ->read(100);

        // foreach ($availablePhoneNumbers as $record) {
        // $count[] = $record->countryCode;
        // Country::create(['name' => $record->countryCode]);


        // }





        return response()->json([

            'status' => true,
            'data' => $data


        ], 200);
    }


    public function get_list_numbers(request $request)
    {


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




    public function buy_number(request $request)
    {


        try {



            $number_price = Price::where('id', 1)->first()->amount;

            if (Auth::user()->wallet < $number_price) {

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


            User::where('id', Auth::id())->decrement('wallet', $number_price);
            MyPhoneNumber::create([
                'user_id' => Auth::id(),
                'accountSid' => $incoming_phone_number->accountSid,
                'phone_no' => $request->phone_no,
                'sid' => $incoming_phone_number->sid,
                'amount' => $number_price,
                'status' => 1
            ]);


            $trx_id = "TRX" . date("yis");
            Transaction::create([
                'trx_id' => $trx_id,
                'user_id' => Auth::id(),
                'amount' => $number_price,
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

        try {


            $sender = MyPhoneNumber::where('user_id', Auth::id())->first()->phone_no ?? null;
            if ($sender == null) {

                return response()->json([
                    'status' => false,
                    'message' => "No Number found, Get a phone number"
                ], 404);
            }

            $accountSid = env('TWILO_ACCT_SID');
            $authToken = env('TWILO_AUTH');



            $twilio = new Client($accountSid, $authToken);
            $message = $twilio->messages->create(
                $request->receiver, // to
                ["from" => "$sender", "body" => $request->message]
            );


            dd($message->sid);

            $data['message'] = "Message Sent Successfully";
            return response()->json([
                'status' => true,
                'data' => $data
            ], 200);
        } catch (RestException $e) {
            $statusCode = $e->getStatusCode();
            $errorMessage = $e->getMessage();

            return response()->json([
                'status' => false,
                'message' => $errorMessage
            ], 404);
        }
    }
}
