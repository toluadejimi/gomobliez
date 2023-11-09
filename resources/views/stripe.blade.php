<!doctype html>
<html lang="{{ app()->getLocale() }}">

<head>
    <title>Payment</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
    <link rel="stylesheet" href="{{ url('') }}/assets/app.css">
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
            overflow: hidden;
            font-family: Arial, sans-serif;
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
            border-top: 6px solid rgb(243, 239, 7);
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
            color: #737373;
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

        body {
            font-family: 'Poppins';
        }



    </style>


    <script>
        setTimeout(function() {
            document.querySelector('.loader').classList.add('active');
            document.querySelector('.content').style.display = 'block';
        }, 5000); // 3 seconds
    </script>

  </head>
  <body>

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





    {{-- <div class="container">
        <div class="col-md-6 col-md-offset-3">
            <h1>Payment Form</h1>
            <div class="spacer"></div>

            @if (session()->has('success_message'))
            <div class="alert alert-success">
                {{ session()->get('success_message') }}
            </div>
            @endif

            @if(count($errors) > 0)
            <div class="alert alert-danger">
                <ul>
                    @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
            @endif
            <form action="/charge" method="POST" id="payment-form">
                @csrf
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" class="form-control" value="{{ $email }}" id="email">
                </div>

                <div class="form-group">
                    <label for="name_on_card">Name on Card</label>
                    <input type="text" class="form-control" id="name_on_card" name="name_on_card">
                    <input type="number" hidden name="amount" value={{ $amount }}>
                    <input type="text" hidden name="email" value={{ $email }}>


                </div>







                <div class="form-group">
                    <label for="card-element">Debit / Credit Card</label>
                    <div id="card-element">
                        <!-- a Stripe Element will be inserted here. -->
                    </div>

                    <!-- Used to display form errors -->
                    <div id="card-errors" role="alert"></div>
                </div>

                <div class="spacer"></div>

                <button type="submit" class="btn btn-success">Pay ${{ $amount }}</button>
            </form>
        </div>
    </div> --}}





        <main class="page payment-page">
          <section class="payment-form dark">
            <div class="container">

              <form action="/charge" method="POST" id="payment-form" class="my-5">
                @csrf
                <div class="products">
                  <h3 class="title">Pay Now</h3>

                  <div class="item">
                    <span class="price">${{ $amount }}</span>
                    <p class="item-name">Wallet Funding</p>
                    <p class="item-description">Instant funding</p>
                  </div>
                  <div class="total">Total<span class="price">${{ number_format($amount, 2) }}</span></div>
                </div>




                <div class="card-details">
                  <h3 class="title">Credit Card Details</h3>
                  <div class="row">
                    <div class="form-group col-sm-12">
                      <label for="email">Email Address</label>
                      <input type="email"  disabled class="form-control" value="{{ $email }}" id="email">
                    </div>

                    <div class="form-group col-sm-12">
                        <label for="name_on_card">Name on Card</label>
                        <input type="text" class="form-control" id="name_on_card" name="name_on_card">
                        <input type="number" hidden name="amount" value={{ $amount }}>
                        <input type="text" hidden name="email" value={{ $email }}>
                    </div>


                    <div class="form-group col-sm-12">
                        <label for="card-element">Debit / Credit Card</label>
                        <div id="card-element">
                            <!-- a Stripe Element will be inserted here. -->
                        </div>

                        <!-- Used to display form errors -->
                        <div id="card-errors" role="alert"></div>
                    </div>

                    <div class="spacer"></div>


                    <div class="form-group col-sm-12">
                      <button type="submit" class="btn btn-primary btn-block">Pay ${{ number_format($amount) }}</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </section>
        </main>
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










