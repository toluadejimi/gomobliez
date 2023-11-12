<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VoiceController;
use App\Http\Controllers\Auth\RegisterationController;
use App\Http\Controllers\NumberController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\Transaction\EnkpayposController;
use App\Http\Controllers\Transaction\TransactionController;
use App\Http\Controllers\Virtual\VirtualaccountController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });




//Registration
Route::post('verify-email', [RegisterationController::class, 'email_verification']);
Route::post('resend-otp-code', [RegisterationController::class, 'resend_email_otp']);
Route::post('verify-email-otp', [RegisterationController::class, 'verify_email_otp']);
Route::post('register', [RegisterationController::class, 'register']);
Route::post('forgot-password', [RegisterationController::class, 'forgot_password']);
Route::post('reset-password', [RegisterationController::class, 'reset_password']);


Route::get('token', [VoiceController::class, 'token']);

Route::post('callback', [VoiceController::class, 'callback']);
Route::get('fallback', [VoiceController::class, 'fallback']);
Route::post('voice_url', [VoiceController::class, 'voice_url']);

Route::get('sms-webhook', [VoiceController::class, 'sms_webhook']);
Route::get('sms-webhook2', [VoiceController::class, 'sms_webhook2']);














//login
Route::post('login', [LoginController::class, 'login']);




//Transactions
Route::post('transaction-status', [TransactionController::class, 'transactiion_status']);
Route::post('test-transaction', [TransactionController::class, 'test_transaction']);









Route::post('transfer-reverse', [TransactionController::class, 'transfer_reverse']);

Route::post('pending-transaction', [TransactionController::class, 'pending_transaction']);










//Get Pool Banalce
Route::get('pool-balance', [TransactionController::class, 'pool_account']);

//Get Data Plans

//Get State
Route::get('get-states', [RegisterationController::class, 'get_states']);

//Get Lga
Route::post('get-lga', [RegisterationController::class, 'get_lga']);


//ENKPAY POS
Route::post('pos', [EnkpayposController::class, 'enkpayPos']);
Route::post('pos-logs', [EnkpayposController::class, 'enkpayPosLogs']);





//Charges
Route::get('transfer-charges', [TransactionController::class, 'transfer_charges']);

//Get Token
Route::get('get-token', [TransactionController::class, 'get_token']);

//Get All virtual acount
Route::get('all-virtual-account', [VirtualaccountController::class, 'get_created_account']);
Route::get('account-history', [VirtualaccountController::class, 'virtual_acct_history']);

//Login
Route::post('phone-login', [LoginController::class, 'phone_login']);
Route::post('pin-login', [LoginController::class, 'pin_login']);

Route::post('email-login', [LoginController::class, 'email_login']);

Route::post('update-device', [LoginController::class, 'update_device_identifier']);


//Contact
Route::get('contact', [ProfileController::class, 'contact']);


Route::group(['middleware' => ['auth:api', 'acess']], function () {


    //Payment
    Route::post('pay-now', [PaymentController::class, 'create_order']);
    Route::post('verify-payment', [PaymentController::class, 'verify_payment']);

    Route::get('get-countries', [NumberController::class, 'get_countries']);
    Route::post('get-list-numbers', [NumberController::class, 'get_list_numbers']);
    Route::post('buy-number', [NumberController::class, 'buy_number']);
    Route::post('delete-number', [NumberController::class, 'delete_number']);
    Route::post('send-message', [NumberController::class, 'send_message']);
    Route::get('get-user', [ProfileController::class, 'get_user']);


    




    


    


    

    



});
