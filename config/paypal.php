<?php

return [

    'client_id' => env('PAYPAL_CLIENT_ID', ''),
    'secret' => env('PAYPAL_SECRET', ''),
    'settings' => array(

        'mode' => env('PAYPAL_MODE', 'sandbox'),
        'http.ConnectionTimeOut' => 30,
        'Log.LogEnabled' => true,
        'Log.FileName' => storage_path(). '/log/paypal.log',
        'Log.LogLevel' => 'ERROR'

    ),




];