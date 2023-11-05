<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\User;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;




class PaymentController extends Controller
{

    public function create_order(request $request)
    {

        $token = pay_pal_token();
        $trxID = "GFUND-".date('ymd-his');


        if($request->amount == null){


            return response()->json([
                'status' => false,
                'message' => "Amount can not be empty",
            ], 500);


        }


        if($request->amount > 1000){


            return response()->json([
                'status' => false,
                'message' => "Amount can not be be more than $1000",
            ], 500);


        }


        if($request->amount < 10){


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
                "cancel_url" => "$url/cancel?status=false",
                "return_url" => "$url/return?status=true"
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

        $trx = new Transaction();
        $trx->trx_id = $trxID;
        $trx->user_id = Auth::id();
        $trx->amount = $request->amount;
        $trx->status = 3; //initiated;
        $trx->type = 2;//credit
        $trx->token = $token;
        $trx->save();




        if($link != null){

            return response()->json([
                'status' => true,
                'href' => "$link",
            ], 200);


        }else{


            return response()->json([
                'status' => false,
                'message' => "Something Went Wrong",
            ], 500);


        }




    }


    public function verify_payment(request $request)
    {




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


            dd($var, $request->all());


            if($ss == "COMPLETED"){
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


            }else{


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

        if($ss == "false"){

            Transaction::where('token', $request->token)->update([
                'status' => 4
            ]);

            $data = "Payment Declined";

            return view ('decline', compact('data'));

        }else{


            return response()->json([
                'status' => false,
                'message' => "Something Went Wrong",
            ], 500);
        }


    }




    public function return(request $request)
    {

        $data = "Payment processing...";
        $url = url('')."/verify-payment"."?order_token=$request->token&status=$request->status";


        return view('success', compact('data', 'url'));












    }
    // public function save_customer_id(Request $request)
    // {




    //     if ($request->has('callback')) {
    //         Order::where(['id' => $request->order_id])->update(['callback' => $request['callback']]);
    //     }

    //     session()->put('customer_id', $request['customer_id']);
    //     session()->put('order_id', $request->order_id);

    //     $customer = User::find($request['customer_id']);

    //     $order = Order::where(['id' => $request->order_id, 'user_id' => $request['customer_id']])->first();

    //     if (isset($customer) && isset($order)) {
    //         $data = [
    //             'name' => $customer['f_name'],
    //             'email' => $customer['email'],
    //             'phone' => $customer['phone'],
    //         ];
    //         session()->put('data', $data);
    //         return view('payment-view');
    //     }

    //     return response()->json(['errors' => ['code' => 'order-payment', 'message' => 'Data not found']], 403);




    // }

    // public function success()
    // {
    //     $order = Order::where(['id' => session('order_id'), 'user_id'=>session('customer_id')])->first();
    //     /*if ($order->callback != null) {
    //         return redirect($order->callback . '&status=success');
    //     }
    //     return response()->json(['message' => 'Payment succeeded'], 200); */
    //      return redirect('&status=success');
    // }

    // public function fail()
    // {
    //     $order = Order::where(['id' => session('order_id'), 'user_id'=>session('customer_id')])->first();
    //     /*if ($order->callback != null) {
    //         return redirect($order->callback . '&status=fail');
    //     }
    //     return response()->json(['message' => 'Payment failed'], 403);*/
    //      return redirect('&status=success');
    // }
}
