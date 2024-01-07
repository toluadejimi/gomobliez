<?php

use App\Models\User;
use App\Models\Setting;
use App\Models\CallLimit;
use Twilio\Jwt\AccessToken;
use Illuminate\Http\Request;
use Twilio\Jwt\Grants\VoiceGrant;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;


function send_email($email, $sms_code)
{

    try {

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

        return true;
    } catch (\Exception $th) {
        return $th->getMessage();
    }
}



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


function get_banks()
{
    $curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://web.enkpay.com/api/get-banks',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'GET',
        CURLOPT_HTTPHEADER => array(
            'Content-Type: application/json',
        ),
    ));

    $var = curl_exec($curl);
    curl_close($curl);
    $var = json_decode($var);
    return $var->data;
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

function get_sms_profile()
{


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


function sip_token()
{

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



function africa_token()
{

    $apikey = env('AFRICA_APIKEY');
    $username = env('AFRICA_USERNAME');
    $clientName = env('AFRICA_CLIENTNAME');
    $phoneNumber = env('AFRICA_PHONE');



    $databody = array(

        "username" => $username,
        'clientName' => $clientName,
        'phoneNumber' => $phoneNumber

    );

    $body = json_encode($databody);
    $curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://webrtc.africastalking.com/capability-token/request',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => $body,
        CURLOPT_HTTPHEADER => array(
            'Accept: application/json',
            "apikey: $apikey",
            'Content-Type: application/json'
        ),
    ));


    $var = curl_exec($curl);
    curl_close($curl);
    $var = json_decode($var);


    return $var->token;
}


function calculateCallTime($costPerSecond, $walletAmount)
{
    if (Auth::user()->wallet < 0) {
        return "Insufficient funds";
    }
    $callTimeSeconds = $walletAmount / $costPerSecond * 60;
    $callTimeFormatted = $callTimeSeconds;
    return $callTimeFormatted;
}


function callLimit()
{
    $DailyCallLimit = Setting::where('id', 1)->first()->daily_call_limit;
    $UserCallLimit = CallLimit::where('id', Auth::id())->first()->call_limit ?? 0;
    $CallTimeRemains =  $DailyCallLimit - $UserCallLimit;
    return $CallTimeRemains;
}




function get_countries()
{

    $curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://web.enkpay.com/api/get-country',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'GET',

    ));

    $var = curl_exec($curl);

    curl_close($curl);
    $var = json_decode($var);

    return  $var;
}



function get_services($country_code)
{


    $databody = array(
        "country_code" => $country_code,
    );

    $body = json_encode($databody);
    $curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://web.enkpay.com/api/get-service',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'GET',
        CURLOPT_POSTFIELDS => $body,
        CURLOPT_HTTPHEADER => array(
            'Accept: application/json',
            'Content-Type: application/json'
        ),
    ));


    $var = curl_exec($curl);
    curl_close($curl);
    $var = json_decode($var);

    $data['status'] = $var->status ?? null;
    $data['service'] = $var->data ?? null;

    return  $data;
}


function get_services_cost($operator_id)
{


    $databody = array(
        "operator_id" => $operator_id,
    );

    $body = json_encode($databody);
    $curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://web.enkpay.com/api/get-service-cost',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'GET',
        CURLOPT_POSTFIELDS => $body,
        CURLOPT_HTTPHEADER => array(
            'Accept: application/json',
            'Content-Type: application/json'
        ),
    ));

    $var = curl_exec($curl);
    curl_close($curl);
    $var = json_decode($var);
    $data['status'] = $var->status ?? null;
    $data['service_cost'] = $var->data ?? null;
    return  $data;
}




function get_token($email, $password)
{


    $databody = array(
        "email" => $email,
        "password" => $password,

    );

    $body = json_encode($databody);
    $curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_URL => 'http://127.0.0.1:8001/api/auth',//'https://web.enkpay.com/api/auth',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => $body,
        CURLOPT_HTTPHEADER => array(
            'Accept: application/json',
            'Content-Type: application/json'
        ),
    ));

    $var = curl_exec($curl);
    curl_close($curl);
    $var = json_decode($var);
    $status = $var->status ?? null;

    if($status == true){
        return $var->Authorization;
    }else{

    return false;

    }

}



function buy_airtime($country_code, $service_id, $amount, $phone, $product_id, $rate, $operator_id)
{


    $email = env('EMAILTOK');
    $password = env('PASSTOK');
    $token = get_token($email, $password);


    $databody = array(
        "country_code" => $country_code,
        "service_id" => $service_id,
        "amount" => $amount,
        "phone" => $phone,
        "product_id" => $product_id,
        "rate" => $rate,
        "operator_id" => $operator_id,
    );

    $body = json_encode($databody);
    $curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_URL => 'http://127.0.0.1:8001/api/buy-airtime',//'https://web.enkpay.com/api/auth',//'http://127.0.0.1:8001/api/auth',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => $body,
        CURLOPT_HTTPHEADER => array(
            'Accept: application/json',
            'Content-Type: application/json',
            'Authorization: Bearer ' . $token,
        ),
    ));

    $var = curl_exec($curl);
    curl_close($curl);
    $var = json_decode($var);
    $status = $var->status ?? null;

    if($status == true){

        $data['status'] = $var->status ?? null;
        $data['message'] = $var->message ?? null;
        $data['ref_id'] = $var->ref_id ?? null;
        return  $data;

    }else{



        return  false;


    }
  
    
}



