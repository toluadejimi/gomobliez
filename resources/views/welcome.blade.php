<html>

<head>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous">
    </script>

    <style>


        body{
            background:#eee;
        }


        .card {
            box-shadow: 0 20px 27px 0 rgb(0 0 0 / 5%);
        }
        .card {
            position: relative;
            display: flex;
            flex-direction: column;
            min-width: 0;
            word-wrap: break-word;
            background-color: #fff;
            background-clip: border-box;
            border: 0 solid rgba(0,0,0,.125);
            border-radius: 1rem;
        }
        .img-thumbnail {
            padding: .25rem;
            background-color: #ecf2f5;
            border: 1px solid #dee2e6;
            border-radius: .25rem;
            max-width: 100%;
            height: auto;
        }
        .avatar-lg {
            height: 150px;
            width: 150px;
        }


       


    </style>
</head>

<body>
    <div class="container content" >
        <div class="row">
                <div class="card">
                    <div class="card-body my-4">

                       
                    </div>
            </div>
        </div>
    </div>



    <div class="container">
        <br>
        <div class="row">
            <div class="col-lg-5 col-md-7 mx-auto my-auto">
                <div class="card">
                    <div class="card-body px-lg-5 py-lg-5 text-center">
                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" class="rounded-circle avatar-lg img-thumbnail mb-4" alt="profile-image">
                        <h2 class="text-info">2FA Security</h2>
                        <p class="mb-4">Enter 6-digits code from your athenticatior app.</p>
                        <form>
                            <div class="row mb-4">
                                <div class="col-lg-2 col-md-2 col-2 ps-0 ps-md-2">
                                    <input type="text" class="form-control text-lg text-center" placeholder="_" aria-label="2fa">
                                </div>
                                <div class="col-lg-2 col-md-2 col-2 ps-0 ps-md-2">
                                    <input type="text" class="form-control text-lg text-center" placeholder="_" aria-label="2fa">
                                </div>
                                <div class="col-lg-2 col-md-2 col-2 ps-0 ps-md-2">
                                    <input type="text" class="form-control text-lg text-center" placeholder="_" aria-label="2fa">
                                </div>
                                <div class="col-lg-2 col-md-2 col-2 pe-0 pe-md-2">
                                    <input type="text" class="form-control text-lg text-center" placeholder="_" aria-label="2fa">
                                </div>
                                <div class="col-lg-2 col-md-2 col-2 pe-0 pe-md-2">
                                    <input type="text" class="form-control text-lg text-center" placeholder="_" aria-label="2fa">
                                </div>
                                <div class="col-lg-2 col-md-2 col-2 pe-0 pe-md-2">
                                    <input type="text" class="form-control text-lg text-center" placeholder="_" aria-label="2fa">
                                </div>
                            </div>
                            <div class="text-center">
                                <button type="button" class="btn bg-info btn-lg my-4">Continue</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>












</body>

</html>












</script>








<script type="text/javascript" src="https://js.stripe.com/v2/"></script>
<script type="text/javascript">
    $(function() {
  var $form = $(".require-validation");
  $('form.require-validation').bind('submit', function(e) {
    var $form = $(".require-validation"),
    inputSelector = ['input[type=email]', 'input[type=password]', 'input[type=text]', 'input[type=file]', 'textarea'].join(', '),
    $inputs = $form.find('.required').find(inputSelector),
    $errorMessage = $form.find('div.error'),
    valid = true;
    $errorMessage.addClass('hide');
    $('.has-error').removeClass('has-error');
    $inputs.each(function(i, el) {
        var $input = $(el);
        if ($input.val() === '') {
            $input.parent().addClass('has-error');
            $errorMessage.removeClass('hide');
            e.preventDefault();
        }
    });
    if (!$form.data('cc-on-file')) {
      e.preventDefault();
      Stripe.setPublishableKey($form.data('stripe-publishable-key'));
      Stripe.createToken({
          number: $('.card-number').val(),
          cvc: $('.card-cvc').val(),
          exp_month: $('.card-expiry-month').val(),
          exp_year: $('.card-expiry-year').val()
      }, stripeResponseHandler);
    }
  });

  function stripeResponseHandler(status, response) {
      if (response.error) {
          $('.error')
              .removeClass('hide')
              .find('.alert')
              .text(response.error.message);
      } else {
          /* token contains id, last4, and card type */
          var token = response['id'];
          $form.find('input[type=text]').empty();
          $form.append("<input type='hidden' name='stripeToken' value='" + token + "'/>");
          $form.get(0).submit();
      }
  }
});
</script>