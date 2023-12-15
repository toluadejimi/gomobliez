<?php

use App\Events\NewMessage;
use App\Events\RealTimeMessage;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CallController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\VoiceController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\Auth\ProfileController;
use App\Http\Controllers\ProxyController;



/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/



Route::get('/proxy', [ProxyController::class, 'proxy']);




Route::get('/t', function () {

    event(new \App\Events\SendMessage());

    dd('Event Run Successfully.');

});



Route::group(['prefix' => 'payment-mobile'], function () {
    Route::get('/', 'PaymentController@payment')->name('payment-mobile');
    Route::get('set-payment-method/{name}', 'PaymentController@set_payment_method')->name('set-payment-method');
});

Route::get('return', [PaymentController::class, 'return']);
Route::get('cancel', [PaymentController::class, 'payment_decline']);

Route::get('verify-payment', [PaymentController::class, 'verify_payment']);

Route::get('stripe', [PaymentController::class, 'stripe']);

Route::post('charge', [PaymentController::class, 'charge']);

Route::get('success', [PaymentController::class, 'success']);

Route::get('decline', [PaymentController::class, 'decline']);

Route::get('processing', [PaymentController::class, 'processing']);



Route::get('call-africa', [CallController::class, 'call_africa']);
Route::get('call-other', [CallController::class, 'call_other']);





Route::get('verify-id', [PaymentController::class, 'verify_id']);
Route::get('upload-id', [PaymentController::class, 'upload_id']);
Route::get('id-success', [PaymentController::class, 'id_success']);



Route::post('verify-account-id', [PaymentController::class, 'verify_account_id']);


//NGN
Route::get('transfer-ngn', [PaymentController::class, 'transfer_ngn']);
Route::post('send-funds-ngn', [PaymentController::class, 'send_transfer_ngn']);











// Route::post('call', [VoiceController::class, 'initiateCall']);
// Route::get('africa-call', [VoiceController::class, 'call_other']);



//Route::livewire('dialer', 'dialer');


// After
//Route::get('/dialer', \App\Http\Livewire\Dialer::class);



















Route::post('pay-paypal', 'PaypalPaymentController@payWithpaypal')->name('pay-paypal');
Route::get('payment-success', 'PaymentController@success')->name('payment-success');
Route::get('payment-fail', 'PaymentController@fail')->name('payment-fail');
