<?php


function pay_pal_token()
{


    $curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://api-m.sandbox.paypal.com/v1/oauth2/token',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => 'grant_type=client_credentials',
        CURLOPT_HTTPHEADER => array(
            'Content-Type: application/x-www-form-urlencoded',
            'Authorization: Bearer A21AAJpV4n5gjlRuC-QyPfKi4zjDEoj9JcwSYpYwkmbLU6Yy4Z7pb0JdWjaWPVB0E76_shn0H4McgSjgocwdmBB6BicopsRbA'
        ),
    ));


    $var = curl_exec($curl);

    curl_close($curl);

    $var = json_decode($var);
    
    return  $var->access_token;

}
