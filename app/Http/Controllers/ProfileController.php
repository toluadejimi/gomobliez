<?php

namespace App\Http\Controllers;

use DateTime;
use DateInterval;
use Carbon\Carbon;
use App\Models\Plan;
use App\Models\User;
use App\Models\MyPlan;
use App\Models\Message;
use App\Models\OldUser;
use App\Models\PayInfo;
use App\Models\Setting;
use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Models\MyPhoneNumber;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

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



        $p = MyPlan::where('user_id', Auth::id())->first() ?? null;

        if ($p != null) {
            if ($p->status == 1) {


                $e_date = MyPlan::where('user_id', Auth::id())->first()->expires_at ?? null;
                $nowDate = date('Y-m-d');
                $endDate = Carbon::parse($e_date);
                $differenceInDays = $endDate->diffInDays($nowDate);

                MyPlan::where('user_id', Auth::id())->update([
                    'days_remaining' => $differenceInDays,
                ]);

                MyPlan::where('user_id', Auth::id())->update([
                    'days_remaining' => $differenceInDays,
                ]);
            }
        }


        $token = $request->header('Authorization');


        $phone_no = MyPhoneNumber::where('user_id', Auth::id())->first()->phone_no ?? null;
        $pending_messages = Message::where('from_no', $phone_no)->orWhere('to_no', $phone_no)->count();
        $myplan = MyPlan::select('id', 'plan_id', 'sms_credit', 'days_remaining', 'expires_at', 'amount', 'status')->where('user_id', Auth::id())->first() ?? null;
        $phone_number = MyPhoneNumber::select('phone_no', 'status')->where('user_id', Auth::id())->first() ?? null;
        $m_credit = MyPlan::where('user_id', Auth::id())->first()->message_credit ?? null;
        $saved_cards = PayInfo::latest()->select('id', 'name', 'customer_id', 'last4', 'exp_month', 'exp_year')->where('user_id', Auth::id())->get();

        if ($m_credit == 0) {
            $message_credit = null;
        } else {
            $message_credit = $m_credit;
        }
        $plans = Plan::select('id', 'title', 'amount', 'period')->get();
        $billing = User::select('first_name', 'last_name', 'city', 'street', 'zipcode', 'country', 'state', 'phone')->where('id', Auth::id())->get();
        $user = Auth()->user();
        $user['token'] = $token;
        $user['my_plan'] = $myplan;
        $user['billing_information'] = $billing;
        $user['my_number'] = $phone_number;
        $user['pending_messages'] = $pending_messages;
        $user['message_credit'] = $message_credit;
        $user['plans'] = $plans;
        $user['saved_cards'] = $saved_cards;



        return response()->json([
            'status' => true,
            'data' => $user,
            'pending_messages' => $pending_messages
        ], 200);

    }


    public function my_subscription(Request $request)
    {


        $p = MyPlan::where('user_id', Auth::id())->first()->status ?? null;
        if ($p == 1) {


            $e_date = MyPlan::where('user_id', Auth::id())->first()->expires_at ?? null;
            $nowDate = date('Y-m-d');
            $endDate = Carbon::parse($e_date);
            $differenceInDays = $endDate->diffInDays($nowDate);

            MyPlan::where('user_id', Auth::id())->update([
                'days_remaining' => $differenceInDays,
            ]);

            MyPlan::where('user_id', Auth::id())->update([
                'days_remaining' => $differenceInDays,
            ]);
        }

        $active = MyPlan::select('id', 'title', 'days_remaining', 'subscribe_at', 'expires_at', 'status')->where('user_id', Auth::id())->where('status', 1)->get();
        $sub_list = Transaction::where('type', 4)->where('user_id', 2)->get();



        $data['active_plan'] = $active;
        $data['subscription_list'] = $sub_list;

        return response()->json([
            'status' => true,
            'data' => $data,
        ], 200);


    }



    public function cancle_subscription(Request $request)
    {

        $p = MyPlan::where('id', $request->id)->first() ?? null;
        $amount = Setting::where('id', 1)->first()->call_cost ?? 0;

        if ($p->status == 1) {

            $days = $p->days_remaining;
            $amt = $amount * 60 * $days;

            User::where('id', Auth::id())->increment('wallet', $amt);
            $p = MyPlan::where('id', $request->id)->delete();


            $trx = new Transaction();
            $trx->type = 8;
            $trx->amount = $amt;
            $trx->status = 1;
            $trx->save();


            $body['message'] = "USD $amt has been refunded back to your wallet";
            return response()->json([
                'status' => true,
                'data' => $body,
            ], 200);





        }


    }


    public function get_plans(Request $request)
    {

        $comboplans = Plan::select('id', 'title', 'type', 'amount', 'sms_credit', 'period', 'note')->where('type', 1)->get();
        $smsplans = Plan::select('id', 'title', 'type', 'amount', 'sms_credit', 'period', 'note')->where('type', 2)->get();
        $callplans = Plan::select('id', 'title', 'type', 'amount', 'sms_credit', 'period', 'note')->where('type', 3)->get();



        $body['combo_plans'] = $comboplans;
        $body['sms_plan'] = $smsplans;
        $body['call_plan'] = $callplans;



            return response()->json([
                'status' => true,
                'data' => $body,
            ], 200);


    }



    public function contact_us(Request $request)
    {

        $set = Setting::where('id', 1)->first();

        $body['phone_no'] = $set->phone_no;
        $body['email'] = $set->email;


            return response()->json([
                'status' => true,
                'data' => $body,
            ], 200);


    }



    public function delete_account(Request $request)
    {

        $usr = new OldUser();
        $usr->email = Auth::user()->email ?? null;
        $usr->save();

        $request->user()->token()->revoke();

        User::where('id', Auth::id())->delete();

        $body['message'] = "Account has been successfully deleted";
        return response()->json([
            'status' => true,
            'data' => $body,
        ], 200);



    }



    public function legal(Request $request)
    {

        $data['gdpr'] = url('')."/gdpr";
        $data['policy'] = url('')."/policy";
        $data['copyrite'] = url('')."/copyrite";


            return response()->json([
                'status' => true,
                'data' => $data,
            ], 200);


    }



    public function create_transfer_pin(Request $request)
    {

        try {
            $validator = Validator::make($request->all(), [
                'pin' => 'required|numeric|digits:4',
            ], [
                'pin.required' => 'PIN is required.',
                'pin.numeric' => 'PIN must be a number.',
                'pin.digits' => 'PIN must be a maximum of 4 digits.',
            ]);

            if ($validator->fails()) {
                throw ValidationException::withMessages($validator->errors()->messages());
            }



        $pin = bcrypt($request->pin);
        User::where('id', Auth::id())->update(['pin'=> $pin]);
        $data['message'] = "Transfer pin has been successfully created";

        return response()->json([
            'status' => true,
            'data' => $data,
        ], 200);

        } catch (ValidationException $e) {

            $data['message'] = $e->getMessage();
            return response()->json([
                    'status' => false,
                    'data' => $data,
            ], 422);

        }





    }



    public function subscribe_plan(Request $request)
    {

        try {


            $plan = Plan::where('id', $request->id)->first();
            if($plan->amount > Auth::user()->wallet){
                $data['message'] = "Insufficient Funds, Fund your wallet";
                return response()->json([
                    'status' => false,
                    'data' => $data,
                ], 422);
            }


         
            $currentDate = new DateTime();
            $oneMonthLater = $currentDate->add(new DateInterval('P1M'));
            $currentDateString = $currentDate->format('Y-m-d');
            $oneMonthLaterString = $oneMonthLater->format('Y-m-d');
            $dateDifference = $oneMonthLater->diff($currentDate)->days;

        
            User::where('id', Auth::id())->decrement('wallet', $plan->amount);

            MyPlan::where('user_id', Auth::id())->update([
                'title' => $plan->title,
                'sms_credit' => $plan->sms_credit,
                'type' => $plan->type,
                'days_remaining' => $dateDifference,
                'subscribe_at' => date('Y-m-d'),
                'expires_at' => $oneMonthLaterString,
            ]);



            $trx = new Transaction();
            $trx->user_id = Auth::id();
            $trx->trx_id = "SUB-".random_int(00000, 99999);
            $trx->amount = $plan->amount;
            $trx->type = 3;
            $trx->save();



        $data['message'] = "Monthly Plan Subscribed Successfully expires at $oneMonthLaterString";

        return response()->json([
            'status' => true,
            'data' => $data,
        ], 200);

        } catch (ValidationException $e) {

            $data['message'] = $e->getMessage();
            return response()->json([
                    'status' => false,
                    'data' => $data,
            ], 422);

        }





    }


    public function change_plan(Request $request){



        $new_plan = Plan::where('id', $request->id)->first();
        $my_plan = MyPlan::where('user_id', Auth::id())->first();
        $r_amount = $my_plan->days_remaining * $my_plan->amount;
        $d_amount = $new_plan->amount - $r_amount;


        if($my_plan->status == 1){

            if($new_plan->amount < $r_amount){


                if(Auth::user()->wallet < $new_plan->amount){
                    $data['message'] = "Insufficient Funds, Fund $".$d_amount." to continue the change of plan";
                    return response()->json([
                            'status' => false,
                            'data' => $data,
                    ], 422);
                }else{


                    try {
     
                        $currentDate = new DateTime();
                        $oneMonthLater = $currentDate->add(new DateInterval('P1M'));
                        $currentDateString = $currentDate->format('Y-m-d');
                        $oneMonthLaterString = $oneMonthLater->format('Y-m-d');
                        $dateDifference = $oneMonthLater->diff($currentDate)->days;
            
                    
                        User::where('id', Auth::id())->decrement('wallet', $new_plan->amount);
            
                        MyPlan::where('user_id', Auth::id())->update([
                            'title' => $new_plan->title,
                            'sms_credit' => $new_plan->sms_credit,
                            'type' => $new_plan->type,
                            'days_remaining' => $dateDifference,
                            'subscribe_at' => date('Y-m-d'),
                            'expires_at' => $oneMonthLaterString,
                        ]);
            
            
            
                        $trx = new Transaction();
                        $trx->user_id = Auth::id();
                        $trx->trx_id = "SUB-".random_int(00000, 99999);
                        $trx->amount = $new_plan->amount;
                        $trx->type = 3;
                        $trx->save();
            
            
            
                    $data['message'] = "Monthly Plan Subscribed Successfully expires at $oneMonthLaterString";
            
                    return response()->json([
                        'status' => true,
                        'data' => $data,
                    ], 200);
            
                    } catch (ValidationException $e) {
            
                        $data['message'] = $e->getMessage();
                        return response()->json([
                                'status' => false,
                                'data' => $data,
                        ], 422);
            
                    }


                }



            }



        }



    


    }




}
