<?php

use App\Events\RealTimeMessage;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\VoiceController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\ProfileController;
use App\Events\NewMessage;
use App\Http\Controllers\TestController;


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



Route::get('make-call', [VoiceController::class, 'call']);

Route::post('call', [VoiceController::class, 'initiateCall']);


//Route::livewire('dialer', 'dialer');


// After
//Route::get('/dialer', \App\Http\Livewire\Dialer::class);  



















Route::post('pay-paypal', 'PaypalPaymentController@payWithpaypal')->name('pay-paypal');
Route::get('payment-success', 'PaymentController@success')->name('payment-success');
Route::get('payment-fail', 'PaymentController@fail')->name('payment-fail');
