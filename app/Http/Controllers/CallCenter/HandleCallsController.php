<?php

namespace App\Http\Controllers\CallCenter;

use SamuelMwangiW\Africastalking\Http\Requests\VoiceCallRequest;

class HandleCallsController
{
    public function __invoke(VoiceCallRequest $request)
    {
        if ($request->input('isActive')){
            return africastalking()->voice()
                       ->say('Welcome to Unicorn bank.')
                       ->getDigits(
                           say:'Please enter your account Number followed by the # key',
                           finishOnKey: '#'
                       )
        }

        return response('OK');
    }
}
