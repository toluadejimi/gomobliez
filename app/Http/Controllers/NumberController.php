<?php

namespace App\Http\Controllers;

use App\Models\Country;
use Illuminate\Http\Request;
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
            'body' => $data


        ], 200);
    }


    public function get_list_numbers(request $request)
    {


        try {



            $accountSid = env('TWILO_ACCT_SID');
            $authToken = env('TWILO_AUTH');


            $twilio = new Client($accountSid, $authToken);

            $mobile = $twilio->availablePhoneNumbers($request->code)
            ->mobile
            ->read([], 20) ?? null;


    

            foreach ($mobile as $record) {
                $data[] = $record->phoneNumber;
            }



            $number['phone_numbers'] = $data;

            $number['amount'] = 30;




            return response()->json([

                'status' => true,
                'body' => $number


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
}
