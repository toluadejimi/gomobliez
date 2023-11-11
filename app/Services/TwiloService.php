<?php
use Twilio\Rest\Client;

class TwiloService
{
    protected $account_sid;
    protected $auth_token;
    protected $from;
    protected $client;

    public function __construct()
    {
        $this->initializeTwilio();
    }

    protected function initializeTwilio()
    {
        // Twilio credentials
        $this->account_sid = env('TWILO_ACCT_SID');
        $this->auth_token = env('TWILO_AUTH');

        // The twilio number you purchased
        $this->from = env('TWILIO_PHONE_NUMBER');

        // Initialize the Programmable Voice API
        $this->client = new Client($this->account_sid, $this->auth_token);
    }


    
}