<!doctype html>
<html lang="{{ app()->getLocale() }}">

<head>
    <title>Payment</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
    <link rel="stylesheet" href="{{ url('') }}/public/assets/app.css">
    <script src="https://js.stripe.com/v3/"></script>



    <style>

        #button2 {
            float: right;
            line-height: 12px;
            width: 18px;
            font-size: 8pt;
            font-family: tahoma;
            margin-top: 1px;
            margin-right: 1px;
          }

       
        body {
            margin: 0;
            padding: 0;
            background-color: rgb(243, 239, 7);
            font-family: 'Poppins';

        }

        .payment-form .products {
            background-color: #FFC700;
            padding: 25px;
        }

        .payment-form .card-details {
            padding: 25px 25px 15px;
            background-color: #fec606;

        }

        .btn {
            background-color: rgb(0 0 0);
            border-color: black;
           
        }


        .btn:hover {
            background-color: #000000;
        }

        .loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgb(0, 0, 0);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 999;
            opacity: 1;
            transition: opacity 1s ease;
        }

        .loader.active {
            opacity: 0;
            pointer-events: none;
            transition: opacity 1s ease;
        }

        .spinner {
            border: 6px solid #f3f3f3;
            border-top: 6px solid #FFC700;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 2s linear infinite;
        }

        .content {
            display: none;
            padding: 20px;
            text-align: center;
        }

        h1 {
            color: #333;
            font-size: 24px;
        }

        h5 {
            color: #030200;
            font-size: 20px;
        }

        p {
            color: #000000;
            font-size: 12px;
        }


        label {
            color: #000000;
            font-size: 12px;
        }

        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(360deg);
            }
        }

        .center {
            display: block;
            margin-left: auto;
            margin-right: auto;
            width: auto;
        }



        .switch {
            position: relative;
            display: inline-block;
            width: 60px;
            height: 34px;
          }
          
          .switch input { 
            opacity: 0;
            width: 0;
            height: 0;
          }
          
          .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            -webkit-transition: .4s;
            transition: .4s;
          }
          
          .slider:before {
            position: absolute;
            content: "";
            height: 26px;
            width: 26px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            -webkit-transition: .4s;
            transition: .4s;
          }
          
          input:checked + .slider {
            background-color: #01070d;
          }
          
          input:focus + .slider {
            box-shadow: 0 0 1px #2196F3;
          }
          
          input:checked + .slider:before {
            -webkit-transform: translateX(26px);
            -ms-transform: translateX(26px);
            transform: translateX(26px);
          }
          
          /* Rounded sliders */
          .slider.round {
            border-radius: 34px;
          }
          
          .slider.round:before {
            border-radius: 50%;
          }

    


    </style>


    <script>
        setTimeout(function() {
            document.querySelector('.loader').classList.add('active');
            document.querySelector('.content').style.display = 'block';
        }, 5000); // 3 seconds
    </script>

  </head>
  <body style="padding: 0px; margin: 0px; background-color: #FFC700;">

    <div class="loader">
        <div class="spinner"></div>
    </div>

    <style>
        .spacer {
            margin-bottom: 24px;
        }

        /**
             * The CSS shown here will not be introduced in the Quickstart guide, but shows
             * how you can use CSS to style your Element's container.
             */
        .StripeElement {
            background-color: white;
            padding: 10px 12px;
            border-radius: 4px;
            border: 1px solid #ccd0d2;
            box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
            -webkit-transition: box-shadow 150ms ease;
            transition: box-shadow 150ms ease;
        }

        .StripeElement--focus {
            box-shadow: 0 1px 3px 0 #cfd7df;
        }

        .StripeElement--invalid {
            border-color: #fa755a;
        }

        .StripeElement--webkit-autofill {
            background-color: #fefde5 !important;
        }

        #card-errors {
            color: #fa755a;
        }
    </style>



    <style>
        .loaders {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: none;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #FFC700;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            animation: spin 1s linear infinite;
        }


        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>





        <main class="page payment-page">
          <section class="payment-form dark">
            <div class="container" style="background-color: #FFC700; max-width: 400px; display: flex; flex-direction: column; align-items: center; justify-content: center; height:100vh">
              <form action="/charge" method="POST" id="payment-form" class="my-5">
                @csrf
                <div class="products">
                  <h5 class="title">Total to pay </h5>
                  <div class="item">
                    <span class="price">${{ number_format($amount, 2) }}</span>
                  </div>
                </div>




                <div class="card-details">
                  <h5 class="title">Debit / Credit Card Details</h5>
                  <div class="row">
                    {{-- <div class="form-group col-sm-12">
                      <label for="email">Email Address</label>
                      <input type="email"  disabled class="form-control" value="{{ $email }}" id="email">
                    </div> --}}

                    <div class="form-group col-sm-12">
                        <label for="name_on_card">Name on Card</label>
                        <input type="text" class="form-control" id="name_on_card" name="name_on_card">
                        <input type="number" hidden name="amount" value={{ $amount }}>
                        <input type="text" hidden name="email" value={{ $email }}>
                        <input type="text" hidden name="id" value={{ $id }}>

                    </div>


                    <div class="form-group col-sm-12">
                        <label for="card-element">Debit / Credit Card</label>
                        <div id="card-element">
                            <!-- a Stripe Element will be inserted here. -->
                        </div>

                        <!-- Used to display form errors -->
                        <div id="card-errors" role="alert"></div>
                    </div>

                    <div class="form-group col-sm-12">

                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            Save Card
                            <label class="switch">
                                <input type="checkbox" class="mt-1" name="save_payinfo">
                                <span class="slider round"></span>
                              </label>
                            </div>
                          </li>


                    

                    <div class="spacer"></div>

                    <div class="form-group col-sm-12">

                    <button type="submit" id="myButton" class="btn btn-primary btn-block">
                        Pay ${{ number_format($amount) }}
                        <div id="loaders" class="loaders"></div>
                    </button>

                    </div>
                  </div>
                </div>
              </form>
            </div>
          </section>
        </main>

        <div ></div>

        <script>
            function startLoading() {
                var button = document.getElementById('myButton');
                var loader = document.getElementById('loaders');
    
                // Disable the button
                button.disabled = true;
    
                // Show the loader
                loader.style.display = 'inline-block';
    
                // Simulate some async task (e.g., API call, data processing)
                setTimeout(function () {
                    // Re-enable the button
                    button.disabled = false;
    
                    // Hide the loader
                    loader.style.display = 'none';
                }, 5000); // Adjust the timeout based on your task duration
            }
        </script>


      </body>
      <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>





    <script>
        // Create a Stripe client
                var stripe = Stripe('{{ config('services.stripe.publish') }}');

                // Create an instance of Elements
                var elements = stripe.elements();

                // Custom styling can be passed to options when creating an Element.
                // (Note that this demo uses a wider set of styles than the guide below.)
                var style = {
                base: {
                    color: '#242424',
                    lineHeight: '24px',
                    fontFamily: '"Lato", sans-serif',
                    fontSmoothing: 'antialiased',
                    fontSize: '14px',
                    '::placeholder': {
                    color: '#D4D4D4'
                    }
                },
                invalid: {
                    color: '#FF0033',
                    iconColor: '#FF0033'
                }
                };

                // Create an instance of the card Element
                var card = elements.create('card', {style: style});

                // Add an instance of the card Element into the `card-element` <div>
                card.mount('#card-element');

                // Handle real-time validation errors from the card Element.
                card.addEventListener('change', function(event) {
                var displayError = document.getElementById('card-errors');
                if (event.error) {
                    displayError.textContent = event.error.message;
                } else {
                    displayError.textContent = '';
                }
                });

                // Handle form submission
                var form = document.getElementById('payment-form');
                form.addEventListener('submit', function(event) {
                  event.preventDefault();

                  var options = {
                    name: document.getElementById('name_on_card').value,
                  }


                  stripe.createToken(card, options).then(function(result) {
                    if (result.error) {
                      // Inform the user if there was an error
                      var errorElement = document.getElementById('card-errors');
                      errorElement.textContent = result.error.message;
                    } else {
                      // Send the token to your server
                      stripeTokenHandler(result.token);
                    }
                  });


                stripe.createToken(card).then(function(result) {
                    if (result.error) {
                    // Inform the user if there was an error
                    var errorElement = document.getElementById('card-errors');
                    errorElement.textContent = result.error.message;
                    } else {
                    // Send the token to your server
                    stripeTokenHandler(result.token);
                    }



                    function stripeTokenHandler(token) {
                        // Insert the token ID into the form so it gets submitted to the server
                        var form = document.getElementById('payment-form');
                        var hiddenInput = document.createElement('input');
                        hiddenInput.setAttribute('type', 'hidden');
                        hiddenInput.setAttribute('name', 'stripeToken');
                        hiddenInput.setAttribute('value', token.id);

                        form.appendChild(hiddenInput);

                        // Submit the form
                        form.submit();
                        }




                });
                });
    </script>
</body>

</html>










