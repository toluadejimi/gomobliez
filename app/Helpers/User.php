<?php

use Illuminate\Http\Request;
use Twilio\Jwt\AccessToken;
use Twilio\Jwt\Grants\VoiceGrant;





function send_notification($message)
{

    $curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://api.telegram.org/bot6140179825:AAGfAmHK6JQTLegsdpnaklnhBZ4qA1m2c64/sendMessage?chat_id=1316552414',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => array(
            'chat_id' => "1316552414",
            'text' => $message,

        ),
        CURLOPT_HTTPHEADER => array(),
    ));

    $var = curl_exec($curl);
    curl_close($curl);

    $var = json_decode($var);
}




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

function get_sms_profile(){
             

    $auth = env('TELNYX');

    $curl = curl_init();

    curl_setopt_array($curl, [
        CURLOPT_HTTPHEADER => [
            "Authorization: Bearer $auth"
        ],
        CURLOPT_URL => "https://api.telnyx.com/v2/messaging_profiles",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CUSTOMREQUEST => "GET",

    ]);

    $var = curl_exec($curl);
    curl_close($curl);
    $var = json_decode($var);


    return $var->data[0]->id;



}


function sip_token(){

    $auth = env('TELNYX');
    $apiUrl = "https://api.telnyx.com/v2/telephony_credentials";
    $connt_id = env('CONNTID');

    $data = [
        'connection_id' => $connt_id,
    ];


    


    $options = [
        CURLOPT_URL => $apiUrl,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query($data),
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/x-www-form-urlencoded',
            'Authorization: Basic ' . $auth,
        ],
    ];

    $ch = curl_init();
    curl_setopt_array($ch, $options);

    $var = curl_exec($ch);

    $var = json_decode($var);

    dd($var, $connt_id, $auth);

    curl_close($ch);




}
