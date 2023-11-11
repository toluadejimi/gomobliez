<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Twilio\Rest\Client;
use app\Services\TwiloService;
use Twilio\Exceptions\RestException;


class VoiceController extends Controller
{


    public function call(request $request)
    {
        return view('call');
    }



    public function initiateCall(request $request)
    {
      
        $accountSid = env('TWILO_ACCT_SID');
        $authToken = env('TWILO_AUTH');
        $from = env('TWILIO_PHONE_NUMBER');


        $this->validate($request, [
            'phone_number' => 'required|string',
          ]);


        $twilio = new Client($accountSid, $authToken);

        try {

            $phone_number = $twilio->lookups->v1->phoneNumbers($request->phone_number)->fetch();
            if($phone_number) {
              $call = $twilio->account->calls->create(
                $request->phone_number, // Destination phone number
                $from, // Valid Twilio phone number
                array(
                    "record" => True,
                    "url" => "http://demo.twilio.com/docs/voice.xml")
                );
      
              if($call) {
                echo 'Call initiated successfully';
              } else {
                echo 'Call failed!';
              }
            }
          } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage();
          } catch (RestException $rest) {
            echo 'Error: ' . $rest->getMessage();
        }
    }
}
