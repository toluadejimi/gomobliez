<?php


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
