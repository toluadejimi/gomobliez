<?php

namespace App\Http\Controllers;

use Stripe;
use Session;
use App\Models\Plan;
use App\Models\User;
use GuzzleHttp\Client;
use App\Models\PayInfo;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;





class PaymentController extends Controller
{

    public function create_order(request $request)
    {


        if ($request->vendor == 'pay_pal') {
            $token = pay_pal_token();
            $trxID = "GFUND-" . date('ymd-his');


            if ($request->amount == null) {


                return response()->json([
                    'status' => false,
                    'message' => "Amount can not be empty",
                ], 500);
            }


            if ($request->amount > 1000) {


                return response()->json([
                    'status' => false,
                    'message' => "Amount can not be be more than $1000",
                ], 500);
            }


            if ($request->amount < 10) {


                return response()->json([
                    'status' => false,
                    'message' => "Amount can not be be less than $10",
                ], 500);
            }


            $url = url('');




            $curl = curl_init();
            $data = [
                "intent" => "CAPTURE",
                "purchase_units" => [[
                    "reference_id" => "$trxID",
                    "amount" => [
                        "value" => "$request->amount",
                        "currency_code" => "USD"
                    ]
                ]],
                "application_context" => [
                    "cancel_url" => "$url/cancel?status=false&ref=$trxID",
                    "return_url" => "$url/success?status=true&ref=$trxID&amount=$request->amount"
                ]
            ];

            $post_data = json_encode($data);

            curl_setopt_array($curl, array(
                CURLOPT_URL => 'https://api-m.sandbox.paypal.com/v2/checkout/orders',
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => '',
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 0,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => 'POST',
                CURLOPT_POSTFIELDS => $post_data,
                CURLOPT_HTTPHEADER => array(
                    "Authorization:Bearer" . " " . $token,
                    'Content-Type: application/json',
                ),
            ));


            $var = curl_exec($curl);

            curl_close($curl);

            $var = json_decode($var);
            $link = $var->links[1]->href ?? null;
            $query = parse_url($link, PHP_URL_QUERY);
            parse_str($query, $query_params);
            $token = $query_params['token'];

            // $final = json_encode($link);



            $body['href'] = $link;


            $trx = new Transaction();
            $trx->trx_id = $trxID;
            $trx->user_id = Auth::id();
            $trx->amount = $request->amount;
            $trx->status = 3; //initiated;
            $trx->type = 2; //credit
            $trx->token = $token;
            $trx->save();




            if ($link != null) {

                return response()->json([
                    'status' => true,
                    'data' => $body,
                ], 200);
            } else {


                return response()->json([
                    'status' => false,
                    'message' => "Something Went Wrong",
                ], 500);
            }
        }

        if ($request->vendor == "stripe") {


            $email = Auth::user()->email;
            $id = Auth::user()->id;
            $body['href'] = url('') . "/stripe?amount=$request->amount&email=$email&id=$id";



            return response()->json([
                'status' => true,
                'data' => $body,
            ], 200);
        }
    }


    public function charge(request $request)
    {


        \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
        $cost = Plan::where('id', 1)->first()->amount;
        $tok = $request->stripeToken;
        $final = str_replace(" ", "", $tok);


        if ($request->save_payinfo == 'on') {

            $customer = \Stripe\Customer::create([
                'source' => $tok,
                'email' => $request->email,
            ]);


            $stripe = \Stripe\Charge::create([
                'amount' => $request->amount * 100,
                'currency' => 'usd',
                'customer' => $customer->id,
            ]);


            $ck = PayInfo::where("last4", $stripe->source->last4)->first()->last4 ?? null;
            if ($ck != $stripe->source->last4) {
                $pay = new PayInfo();
                $pay->user_id = $request->id;
                $pay->customer_id = $customer->id;
                $pay->name = $request->name_on_card;
                $pay->brand = $stripe->source->brand;
                $pay->last4 = $stripe->source->last4;
                $pay->exp_month = $stripe->source->exp_month;
                $pay->exp_year = $stripe->source->exp_year;
                $pay->save();
            }

            $status = $stripe->status ?? null;

            if ($status == 'succeeded') {

                User::where('email', $request->email)->increment('wallet', $request->amount);

                $ref = "FUND" . random_int(0000, 9999) . date("his");

                $amount = $request->amount;


                $trx = new Transaction();
                $trx->type = 1;
                $trx->amount = $amount;
                $trx->status = 1;
                $trx->save();

                return view('success', compact('ref', 'amount'));
            } else {
                return view('decline', compact('ref', 'amount'));
            }
        }


        $stripe =  Stripe\Charge::create([
            "amount" => $request->amount * 100,
            "currency" => "USD",
            'source' => $tok,
            "description" => "Wallet funding on Gomobilez",
        ]);


        $status = $stripe->status ?? null;

        if ($status == 'succeeded') {


            User::where('email', $request->email)->increment('wallet', $request->amount);

            $ref = "FUND" . random_int(0000, 9999) . date("his");

            $amount = $request->amount;


            $trx = new Transaction();
            $trx->type = 1;
            $trx->amount = $amount;
            $trx->status = 1;
            $trx->save();


            return view('success', compact('ref', 'amount'));


            echo "Payment_successful";
        } else {
            echo "Payment_declined";
        }
    }



    public function charge_saved_cards(request $request)
    {

        try {

            \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
            $customerId = $request->customer_id;

            $stripe = \Stripe\Charge::create([
                'amount' => $request->amount * 100,
                'currency' => 'usd',
                'customer' => $customerId,
                'description' => 'Charge for Subscription',
            ]);


            $status = $stripe->status ?? null;


            if ($status == 'succeeded') {


                User::where('email', $request->email)->increment('wallet', $request->amount);

                $ref = "FUND" . random_int(0000, 9999) . date("his");

                $amount = $request->amount;


                $trx = new Transaction();
                $trx->type = 1;
                $trx->amount = $amount;
                $trx->status = 1;
                $trx->save();


                return response()->json([
                    'status' => true,
                    'message' => "Payment completed"
                ], 200);
            } else {

                return response()->json([
                    'status' => false,
                    'message' => $th->getMessage()
                ], 500);
            }
        } catch (\Exception $th) {

            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function saved_card_charge(request $request)
    {


        Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));


        $stripe = \Stripe\Charge::create([
            'amount' => $request->amount * 100,
            'currency' => 'usd',
            'customer' => $request->customer_id,
            'description' => 'Wallet Funding',
        ]);


        $status = $stripe->status ?? null;

        if ($status == 'succeeded') {

            User::where('email', $request->email)->increment('wallet', $request->amount);

            $ref = "FUND" . random_int(0000, 9999) . date("his");
            $amount = $request->amount;


            $trx = new Transaction();
            $trx->type = 1;
            $trx->amount = $amount;
            $trx->status = 1;
            $trx->save();





            return view('success', compact('ref', 'amount'));
        } else {
            echo "Payment_declined";
        }
    }


    public function saved_cards(request $request)
    {

        $info = PayInfo::where('user_id', Auth::id())->select('id','customer_id', 'brand', 'last4', 'exp_month', 'exp_year', 'name')->get();
        $body['info'] = $info;

        return response()->json([
            'status' => true,
            'data' => $body,
        ], 200);
    }

    


    public function delete_card(request $request)
    {

        PayInfo::where('id', $request->card_id)->delete() ?? null;
        $body['message'] = "Card deleted successfully";

        return response()->json([
            'status' => true,
            'data' => $body,
        ], 200);
    }




    public function success(request $request)
    {


        if ($request->ref == null || $request->amount == null) {
            $ref = "FUND" . random_int(0000, 9999) . date("his");
        } else {
            $ref = $request->ref;
            $amount = $request->amount;
        }




        return view('success', compact('ref', 'amount'));
    }


    public function decline()
    {

        $ref = "FUND" . random_int(0000, 9999) . date("his");


        return view('decline', compact('ref'));
    }

    public function processing()
    {

        $ref = "FUND" . random_int(0000, 9999) . date("his");


        return view('processing', compact('ref'));
    }


    public function stripe(request $request)
    {
        $amount = $request->amount;
        $email = $request->email;
        $id = $request->id;


        //$save_cards =


        return view('stripe', compact('amount', 'email', 'id'));
    }






    public function verify_payment(request $request)
    {


        if ($request->status == 'false') {


            echo "Payment_declined";
        }



        if ($request->status == 'true') {

            $token = pay_pal_token();

            $curl = curl_init();

            curl_setopt_array($curl, array(
                CURLOPT_URL => "https://api-m.sandbox.paypal.com/v2/checkout/orders/$request->order_token/capture",
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => '',
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 0,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => 'POST',
                CURLOPT_HTTPHEADER => array(
                    "Authorization:Bearer" . " " . $token,
                    'Content-Type: application/json',
                ),
            ));

            $var = curl_exec($curl);

            curl_close($curl);

            $var = json_decode($var);


            $ss = $var->status ?? null;
            $status = $var->details[0]->issue ?? null;
            $amount = $var->purchase_units[0]->payments->captures[0]->amount->value ?? null;
            $order_amount = (int)$amount;




            if ($ss == "COMPLETED") {
                $user_id =  Transaction::where('token', $request->token)->first()->user_id ?? null;
                User::where('id', $user_id)->increment('wallet', $order_amount);
                Transaction::where('token', $request->token)->update([
                    'status' => 2
                ]);


                echo "Payment_successful";


                // return response()->json([
                //     'status' => true,
                //     'message' => "Payment successful",
                // ], 200);


            } else {


                echo  $status ?? "Somthingwent wrong";

                // return response()->json([
                //     'status' => false,
                //     'message' => "$status",
                // ], 500);



            }
        }
    }





    public function payment_decline(request $request)
    {


        $ss = $request->status;

        if ($ss == "false") {

            Transaction::where('token', $request->token)->update([
                'status' => 4
            ]);

            $data = "Your payment was not processed, try again";
            $order_token = $request->token;
            $status = $request->status;



            return view('decline', compact('data', 'order_token', 'status'));
        } else {


            return response()->json([
                'status' => false,
                'message' => "Something Went Wrong",
            ], 500);
        }
    }




    public function return(request $request)
    {

        $data = "Payment processing...";
        $order_token = $request->token;
        $status = $request->status;


        return view('success', compact('data', 'order_token', 'status'));
    }
}
