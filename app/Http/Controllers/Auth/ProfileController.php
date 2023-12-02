<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Models\DeletedUser;
use App\Models\ErrandKey;
use App\Models\User;
use App\Models\Verification;
use Illuminate\Http\Request;
use App\Models\VirtualAccount;
use App\Models\Terminal;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Mail;
use Illuminate\Support\Facades\Validator;


class ProfileController extends Controller
{





    public function update_billing(request $request)
    {

        try{

        User::where('id', Auth::id())->update([

            'city' => $request->city,
            'street' => $request->street,
            'zipcode' => $request->zipcode,
            'country' => $request->country,
            'state' => $request->state,
            'phone' => $request->phone,

        ]);



        return response()->json([

            'status' => true,
            'message' => "Billing Updated successfully",

        ], 200);

    } catch (\Exception $th) {
        return $th->getMessage();
    }


    }


    public function update_profile(request $request)
    {


        try {




            User::where('id', Auth::id())->update([

                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'gender' => $request->gender

            ]);



            return response()->json([

                'status' => true,
                'message' => "Profile Updated successfully",

            ], 200);
        } catch (\Exception $th) {
            return $th->getMessage();
        }
    }




}
