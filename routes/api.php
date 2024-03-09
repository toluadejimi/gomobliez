<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SmsController;
use App\Http\Controllers\CallController;
use App\Http\Controllers\TopupController;
use App\Http\Controllers\VoiceController;
use App\Http\Controllers\NumberController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CallbackController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterationController;
use App\Http\Controllers\Transaction\EnkpayposController;
use App\Http\Controllers\Virtual\VirtualaccountController;
use App\Http\Controllers\Transaction\TransactionController;

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


Route::post('verify-payment', [PaymentController::class, 'charge']);



Route::get('token', [VoiceController::class, 'token']);

Route::post('callback', [VoiceController::class, 'callback']);
Route::get('fallback', [VoiceController::class, 'fallback']);
Route::post('voice_url', [VoiceController::class, 'voice_url']);


Route::post('afri-callback', [CallbackController::class, 'callback']);


Route::post('sms-webhook', [VoiceController::class, 'sms_webhook']);
Route::post('sms-webhook2', [VoiceController::class, 'sms_webhook2']);


//login
Route::post('login', [LoginController::class, 'login']);

Route::get('get-network', [TopupController::class, 'get_network']);







Route::group(['middleware' => ['auth:api', 'acess']], function () {


    //Payment
    Route::post('pay-now', [PaymentController::class, 'create_order']);
    Route::post('verify-payment', [PaymentController::class, 'verify_payment']);
    Route::post('saved-card-payment', [PaymentController::class, 'saved_card_charge']);
    Route::get('saved-cards', [PaymentController::class, 'saved_cards']);
    Route::post('delete-card', [PaymentController::class, 'delete_card']);
    Route::post('charge-saved-cards', [PaymentController::class, 'charge_saved_cards']);
    Route::post('verify-account', [PaymentController::class, 'verify_account']);
    Route::post('send-to-inapp', [PaymentController::class, 'send_inapp']);
    Route::any('conversion-rate', [PaymentController::class, 'conversion_rate']);
    Route::post('send-to-bank', [PaymentController::class, 'send_to_bank']);

    Route::post('create-transfer-pin', [ProfileController::class, 'create_transfer_pin']);
    Route::post('subscribe', [ProfileController::class, 'subscribe_plan']);
    Route::post('reset-pin', [ProfileController::class, 'reset_pin']);
    Route::post('reset-password', [ProfileController::class, 'reset_password']);



    Route::get('countries', [TopupController::class, 'get_top_up_countries']);
    Route::post('services', [TopupController::class, 'get_services']);
    Route::post('service-cost', [TopupController::class, 'get_service_cost']);
    Route::post('data-network', [TopupController::class, 'get_data_network']);
    Route::post('buy-airtime', [TopupController::class, 'buy_airtime']);
    Route::post('buy-data', [TopupController::class, 'buy_airtime']);




    //subscribtion
    Route::get('my-subscription', [ProfileController::class, 'my_subscription']);
    Route::get('get-plans', [ProfileController::class, 'get_plans']);
    Route::post('cancle-subscription', [ProfileController::class, 'cancle_subscription']);
    Route::post('change-plan', [ProfileController::class, 'change_plan']);


    //sms messages
    Route::post('send-message', [SmsController::class, 'send_message']);
    Route::get('get-messages', [SmsController::class, 'get_message']);
    Route::post('open-message', [SmsController::class, 'open_message']);


    //Call
    Route::post('initiate-call', [CallController::class, 'start_call']);
    Route::get('recent-call', [CallController::class, 'recent_calls']);


    //Numbers
    Route::get('get-countries', [NumberController::class, 'get_countries']);
    Route::post('get-list-numbers', [NumberController::class, 'get_list_numbers']);
    Route::post('buy-number', [NumberController::class, 'buy_number']);
    Route::post('delete-number', [NumberController::class, 'delete_number']);


    //PROFILE
    Route::get('get-user', [ProfileController::class, 'get_user']);
    Route::get('contact-us', [ProfileController::class, 'contact_us']);
    Route::get('delete-account', [ProfileController::class, 'delete_account']);
    Route::get('log-out', [ProfileController::class, 'log_out']);
    Route::get('legal', [ProfileController::class, 'legal']);


    //TRANSACTIONS
    Route::get('all-transaction', [TransactionController::class, 'recent_transaction']);



});
