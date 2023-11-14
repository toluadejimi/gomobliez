<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\MyPhoneNumber;
use App\Models\MyPlan;
use App\Models\Plan;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function get_user(Request $request)
    {

        if (Auth::user()->status == 5) {
            return response()->json([

                'status' => false,
                'message' => 'You can not login at the moment, Please contact  support',

            ], 401);
        }


            $myplan = MyPlan::select('id','user_id', 'plan_id', 'amount', 'status')->where('user_id', Auth::id())->first() ?? null;
            $phone_number = MyPhoneNumber::select('phone_no', 'status')->where('user_id', Auth::id())->first() ?? null;
            $plans = Plan::select('id','title','amount', 'period')->get();
            $billing = User::select('first_name', 'last_name','city', 'street', 'zipcode', 'country', 'state', 'phone')->where('id', Auth::id())->get();
            $user = Auth()->user();
            $user['my_plan'] = $myplan;
            $user['billing_information'] = $billing;
            $user['my_number'] = $phone_number;
            $user['plans'] = $plans;


            $phone_no = MyPhoneNumber::where('user_id', Auth::id())->first()->phone_no ?? null;
            $pending_messages = Message::where('from_no', $phone_no)->orWhere('to_no', $phone_no)->count();




            return response()->json([
                'status' => true,
                'data' => $user,
                'pending_messages' => $pending_messages
            ], 200);

    }
}
