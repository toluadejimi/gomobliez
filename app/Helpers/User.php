<?php

use Illuminate\Http\Request;
use Twilio\Jwt\AccessToken;
use Twilio\Jwt\Grants\VoiceGrant;










function generateAccessToken(Request $request)
    {
        $twilioAccountSid = getenv('TWILIO_ACCOUNT_SID');
        $twilioApiKey = getenv('TWILIO_API_KEY');
        $twilioApiSecret = getenv('TWILIO_API_KEY_SECRET');

        // Required for Voice grant
        $outgoingApplicationSid = 'APxxxxxxxxxxxx';
        // An identifier for your app - can be anything you'd like
        $identity = "john_doe";

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
        echo $token->toJWT();
    }





function pay_pal_token()
{


    $secret =
    $id =


        $clientId = base64_encode(env('PAYPAL_CLIENT_ID'));
        $clientSecret = base64_encode(env('PAYPAL_SECRET'));

        $apiUrl = "https://api-m.sandbox.paypal.com/v1/oauth2/token";
        $credentials = "$clientId:$clientSecret";

        $data = [
            'grant_type' => 'client_credentials',
        ];

        $options = [
            CURLOPT_URL => $apiUrl,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => http_build_query($data),
            CURLOPT_HTTPHEADER => [
                'Content-Type: application/x-www-form-urlencoded',
                'Authorization: Basic ' . $credentials,
            ],
        ];

        $ch = curl_init();
        curl_setopt_array($ch, $options);

        $var = curl_exec($ch);

        $var = json_decode($var);
        curl_close($ch);

        return $var->access_token;











}
