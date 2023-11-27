<?php

namespace App\Http\Controllers;
ob_clean();

use Illuminate\Http\Request;

class CallbackController extends Controller
{
    
    public function callback(request $request)
    {

         $isActive  = $request->isActive;
        $phoneNo =   $request->clientDialedNumber;
        $destinationNumber = $request->destinationNumber;
        $url_ring =  "https://gomobilez.bplux.store/public/assets/calling.mp3";
        $record =  "false";
        $duration =  "5";
        $sequential = "true";

        if ($request->input('isActive')){
            return africastalking()->voice()
                       //->say('Welcome to Gomobilez Call Center')
                       ->dial(
                        phoneNumbers: [$phoneNo],
                        record: true,
                        ringBackTone: 'https://gomobilez.bplux.store/public/assets/calling.mp3',
                        maxDuration: 300,
                        sequential: false,
                        callerId: $destinationNumber,
                       );
        }
        
        return response('OK');

       // $message ="Callback====>>>>".json_encode($request->all());
        //send_notification($message);

    }
}
