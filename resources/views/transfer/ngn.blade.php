<!DOCTYPE html>
<html lang="en" style="background: #ffc700;">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>Untitled</title>
    <link rel="stylesheet" href="{{ url('') }}/public/assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="{{ url('') }}/public/assets/Select-with-live-search.css">
</head>

<body style="background: #ffc700;">
    <section class="py-4 py-xl-5">
        <div class="container" style="margin-right: 7px;font-size: 12px;">
            <div class="row d-flex justify-content-center"
                style="margin-right: 13px;margin-left: 0px;padding-right: -101px;padding-bottom: 15px;">
                <div class="col-md-8 col-lg-6 col-xl-5 col-xxl-4" style="text-align: center;">
                    <img src="{{ url('') }}/public/assets/img/transfernig.png" height="100" width="170" class="mt-3" <p
                        style="margin-top: 0px;margin-bottom: 10px;"></p>
                    <div class="card"
                        style="border-radius: 20px;border-width: 8px;background: rgb(11,11,11);text-align: center;">
                        <div class="card-body"
                            style="text-align: center;background: #000000;border-radius: 363px;border-width: 4px;border-color: var(--bs-gray-500);color: rgb(11,11,11);">
                            <h1 style="color: var(--bs-warning);font-size: 12.4px;">Amount to send</h1>
                            <h1
                                style="color: var(--bs-card-bg);font-size: 15.4px;border-radius: 39px;border-style: solid;border-color: var(--bs-yellow);padding: 15px;padding-right: 22px;padding-top: 10px;padding-bottom: 16px;padding-left: 20px;margin: 23px;margin-left: 70px;margin-right: 70px;">
                                NGN {{number_format($amount, 2)}}</h1>
                            <hr style="border-width: 1px;border-color: rgb(255,199,0);">


                            <form action="/send-funds-ngn" method="POST">
                                @csrf

                            <h1 style="color: var(--bs-warning);font-size: 12.4px;">Select Bank</h1>

                            <select name="bank" required data-live-search="true" id="selectOption" onchange="updateForm2()"
                                class="form-control" data-width="100%"
                                style="background: rgb(255,199,0);border-radius: 10px;padding-top: 10px;padding-bottom: 10px;">
                                @foreach ($banks as $data)
                                <option value="{{$data->code}}">{{$data->bankName}}</option>
                                @endforeach
                            </select>





                            <h1 style="color: var(--bs-warning);font-size: 12.4px;margin-top: 27px; border-radius: 10px;">Enter Account
                                Number</h1>

                            <input type="number" maxlength="10" required name="account_no" class="form-control"
                                style="background: rgb(255,199,0);border-radius: 10px;" id="inputField"
                                onkeyup="updateForm3()"  oninput="limitInputLength()">


                                <input type="text" value="{{$token}}" name="token" hidden>
                                <input type="text" value="{{$amount}}" name="amount" hidden>


                            <h1 style="color: var(--bs-warning);font-size: 12.4px;margin-top: 27px;">Account Name</h1>
                            <input type="text" class="form-control" id="result" style="background: rgb(255,199,0);border-radius: 10px;"
                                readonly>
                                <div id="loadingIndicator" style="display: none; color: rgb(255, 255, 255);">fetching account...</div>

                            <hr style="border-width: 1px;border-color: rgb(255,199,0);">


                            <button class="btn btn-primary"
                                type="submit"
                                style="color: rgb(0,0,0);background: rgb(255,199,0);font-size: 13px;margin-top: 18px;margin-bottom: 24px;margin-right: 0px;padding-right: 70px;padding-left: 70px;padding-bottom: 15px;padding-top: 15px;border-radius: 10px;border-style: none;border-color: rgb(0,0,0);">Send
                                money</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
        <div class="container">
            <div class="row">
                <div class="col-md-12" style="text-align: center;"><a href="/home" class="btn btn-primary" type="button"
                        style="color: rgb(255,199,0);background: rgb(0,0,0);font-size: 13px;margin-top: 18px;margin-bottom: 24px;border-style: none;margin-right: 0px;padding-right: 30px;padding-left: 30px;">Back Home
                        </a></div>
            </div>
        </div>
    </section>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/fetch-jsonp/1.3.0/fetch-jsonp.min.js"></script>

    <script>

        window.onload = function () {
            document.getElementById('inputField').disabled = true;
          };
      
          function updateForm2() {
            document.getElementById('inputField').disabled = false;
          }


          function limitInputLength() {
            const inputValue = document.getElementById('inputField').value;
            if (inputValue.length > 10) {
              document.getElementById('inputField').value = inputValue.slice(0, 10);
            }
          }
          
        function updateForm3() {
            const selectValue = document.getElementById('selectOption').value;
            const inputValue = document.getElementById('inputField').value;
      
            if (inputValue.length === 10) {
                document.getElementById('loadingIndicator').style.display = 'block';
                const proxyUrl = `/proxy?callback=handleResponse&bank_code=${selectValue}&account_number=${inputValue}`;
      
              // Use fetch to make the request via the Laravel proxy
              fetch(proxyUrl)
                .then(response => response.json())
                .then(data => {

                    console.log(data.status);
                    if (data.status === true) {
                        document.getElementById('result').value = data.customer_name;
                    } else{
                        document.getElementById('result').value = JSON.stringify(data.message, null, 2);
                    }
                    })
                .catch(error => {
                  console.error('Error fetching data:', error);
                })
                .finally(() => {
                    document.getElementById('loadingIndicator').style.display = 'none';
                  });
            }
          }
      </script>



    <script src="{{ url('') }}/public/assets/bootstrap/js/bootstrap.min.js"></script>
    <script src="{{ url('') }}/public/assets/js/Select-with-live-search-bootstrap-select.min.js"></script>
    <script src="{{ url('') }}/public/assets/js/Select-with-live-search-zmain.js"></script>
    <script id="bs-live-reload" data-sseport="55965" data-lastchange="1702444227086" src="/js/livereload.js"></script>
</body>

</html>
