<?php

namespace App\Http\Controllers;

use App\Models\Call;
use App\Models\Message;
use App\Models\MyPhoneNumber;
use App\Models\Recent;
use Exception;
use Illuminate\Http\Request;
use Twilio\Rest\Client;
use app\Services\TwiloService;
use Twilio\Exceptions\RestException;
use Twilio\Jwt\Grants\VoiceGrant;
use Twilio\Jwt\AccessToken;
use Twilio\TwiML\VoiceResponse;





class VoiceController extends Controller
{


    public function call_africa(request $request)
    {

        $name = $request->name;
        $phone_no = $request->phone;

        return view('call', compact('name', 'phone_no'));
    }

    public function call_other(request $request)
    {
        $name = $request->name;
        $phone_no = $request->phone;

        return view('call', compact('name', 'phone_no'));
    }

    public function callback(request $request)
    {

        $response = new VoiceResponse();
        $response->say('An application error has occurred.Please call back later!');

        $message ="Callback====>>>>".json_encode($request->all());
        send_notification($message);


        return $response;



    }

    public function fallback(request $request)
    {


        $response = new VoiceResponse();
        $response->play('https://api.twilio.com/cowbell.mp3');

        return $response;


    }

    public function voice_url(request $request)
    {


        $message ="Voice====>>>>".json_encode($request->all());
        send_notification($message);

        $response = new VoiceResponse();
        $response->say('Hello, this is your Twilio voice response. Thank you for using Twilio.');
        return response($response);//->header('Content-Type', 'text/xml');

    }


    public function sms_webhook(request $request)
    {


        // $message ="SMS====>>>>".json_encode($request->all());
        // send_notification($message);


        if($request->data['event_type'] == 'message.received'){


            if($request->data['payload']['media'] == []){
                $media = null;
            }else{
                $media = $request->data['payload']['media'][0]['url'];
            }

            $user_id = MyPhoneNumber::where('phone_no',$request->data['payload']['to'][0]['phone_number'])->first()->user_id ?? null;

            $messages = new Message();
            $messages->from_no = $request->data['payload']['from']['phone_number'];
            $messages->to_no = $request->data['payload']['to'][0]['phone_number'];
            $messages->text = $request->data['payload']['text'];
            $messages->media = $media;
            $messages->user_id = $user_id;
            $messages->save();


            $check = Recent::where('user_id', $user_id)->where('to_no', $request->data['payload']['from']['phone_number'])->first()->to_no ?? null;
            if($check == null){
                $recent= new Recent();
                $recent->user_id = $user_id;
                $recent->from_no = $request->data['payload']['from']['phone_number'];
                $recent->to_no = $request->data['payload']['to'][0]['phone_number'];
                $recent->status = 0;
                $recent->text = $request->data['payload']['text'] ?? "image";
                $recent->save();

            }else{

                Recent::where('user_id', $user_id)->where('to_no', $request->data['payload']['from']['phone_number'])->update([
                    'text' => $request->data['payload']['text'] ?? "image",
                ]);


            }



        }



        if($request->data['event_type'] == 'call.initiated'){


            $user_id = Call::where('to_phone',$request->data['payload']['to'])->first()->user_id ?? null;
            Call::where('user_id', $user_id)->where('call_id', null)->update([

                'call_id' => $request->data['payload']['connection_id'],
                'time_initiated' => $request->data['occurred_at'],
                'status' => 1,

            ]);

        }


        if($request->data['event_type'] == 'call.answered'){






        }





    }

    public function sms_webhook2(request $request)
    {


        $message ="SMS2====>>>>".json_encode($request->all());
        send_notification($message);


    }




    public function token(request $request)
    {


        $twilioAccountSid = env('TWILO_ACCT_SID');
        $twilioApiKey = env('TWILO_API_SID');
        $twilioApiSecret = env('TWILO_APP_SECRET');

        // Required for Voice grant
        $outgoingApplicationSid = env('TWIML_ID');
        // An identifier for your app - can be anything you'd like
        $identity = "myapp";

        // Create access token, which we will serialize and send to the client
        $token = new AccessToken(
            $twilioAccountSid,
            $twilioApiKey,
            $twilioApiSecret,
            3600,
            $identity
        );

        // Create Voice grant
        $voiceGrant = new VoiceGrant();
        $voiceGrant->setOutgoingApplicationSid($outgoingApplicationSid);

        // Optional: add to allow incoming calls
        $voiceGrant->setIncomingAllow(true);

        // Add grant to token
        $token->addGrant($voiceGrant);

        // render token to string




        return response()->json([
          'token' => $token->toJWT()
        ]);
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
