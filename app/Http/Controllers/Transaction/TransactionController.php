<?php

namespace App\Http\Controllers\Transaction;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;



class TransactionController extends Controller
{



    public function recent_transaction(request $request)
    {


        $trx = Transaction::latest()->select('trx_id', 'status', 'type','created_at', 'amount')->where('user_id', Auth::id())->get() ?? null;

        if($trx == null){
            $data['transactions'] = [];
        }else{
            $data['transactions'] = $trx;
        }

         return response()->json([
          'status' => true,
           'data' => $data
        ], 200);





    }

    






    }

