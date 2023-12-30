<?php

namespace App\Http\Controllers;

use App\Models\TopupCountry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;

class TopupController extends Controller
{
    public function get_top_up_countries(request $request)
    {

        $countries = get_countries();
        if($countries->status == true){

            return response()->json([
                'status' => true,
                'data' => $countries->countries,
            ], 200);


        }




    }



    public function get_services(request $request)
    {

        $country_code = $request->country_code;
        $services = get_services($country_code);
        if($services['status'] == true){

            return response()->json([
                'status' => true,
                'data' => $services['service'],
            ], 200);


        }

    }


    public function get_service_cost(request $request)
    {

        $operator_id = $request->operator_id;
        $service_cost = get_services_cost($operator_id);

        if($service_cost['status'] == true){

            return response()->json([
                'status' => true,
                'data' => $service_cost['service_cost'],
            ], 200);


        }

    }


    public function buy_airtime(request $request)
    {

        $email = env('EMAILTOK');
        $password = env('PASSTOK');

        $token = get_token($email, $password);

        $operator_id = $request->operator_id;
        $service_cost = get_services_cost($operator_id);

        if($service_cost['status'] == true){

            return response()->json([
                'status' => true,
                'data' => $service_cost['service_cost'],
            ], 200);


        }

    }









}
