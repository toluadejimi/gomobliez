<?php

namespace App\Http\Controllers;

use App\Models\TopupCountry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;

class TopupController extends Controller
{
    public function get_network(){

            $curl = curl_init();
    
            curl_setopt_array($curl, array(
                CURLOPT_URL => 'https://api-service.vtpass.com/api/get-international-airtime-countries',
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


         
            $countries = $var->content->countries ?? null;

    
            $status = $var->code ?? null;
    
                $history = [];
                foreach ($countries as $key => $value) {
                    $history[] = array(
                        "name" => $value->name,
                        "code" => $value->code,
                    );
                }
    
                $rr =  DB::table('topup_countries')->insert($history);
    
                return  $rr;
            }
        

    
}
