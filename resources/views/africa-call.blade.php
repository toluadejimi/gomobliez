<!DOCTYPE html>
<html>

<head>
    <title>Telnyx WebRTC Call </title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

    <!-- Cross Browser WebRTC Adapter -->
    <script src="https://unpkg.com/africastalking-client@1.0.7/build/africastalking.js"></script>


    <!-- To style up the demo a little -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />

    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

</head>

<body style="padding: 0px; margin: 0px; background-color: #FFC700;">
    <div class="container"
        style="background-color: #FFC700; max-width: 400px; display: flex; flex-direction: column; align-items: center; justify-content: center; height:100vh">
        <div id="connectStatus">
            Connecting...
        </div>

        <div style="font-weight: 700; font-size: 20px;" id="callTimer">
            0:00
        </div>


        <div style="height: 50px;"></div>
        <div>
            <img src="https://gomobilez.bplux.store/public/assets/svg/web_call_image.svg" alt="My Happy SVG" />
        </div>
        <div style="height: 20px;"></div>
        <div id="name" style="font-weight: 700; font-size: 18px;">
            {{ $name ?? "No Name" }}
        </div>
        <div id="number" style="font-weight: 600; font-size: 16px;">
            {{ $phone_no }}
        </div>
        <div style="height: 45px;"></div>
        <div style="display: flex;">
            <div id="audio" style="background-color: #0000007e; padding: 12px; border-radius: 100%;" onclick="mute()">
                <img src="https://gomobilez.bplux.store/public/assets/svg/web_mute.svg" alt="My Happy SVG" />
            </div>
            <div style="width: 50px;"></div>
            <div id="loudspeaker" style="background-color: #0000007e; padding: 12px; border-radius: 100%;"
                onclick="loudspeaker()">
                <img src="https://gomobilez.bplux.store/public/assets/svg/web_loudspeaker.svg" alt="My Happy SVG" />
            </div>

        </div>
        <div style="height: 60px;"></div>



        <div id='end' onclick="hangup()">
            <img src="https://gomobilez.bplux.store/public/assets/svg/web_cancel.svg" alt="My Happy SVG" />
        </div>

        <button onclick="makeCall()">Make Voice Call</button>


        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
            Launch demo modal
          </button>

          <!-- Modal -->
          <div class="modal fade "  id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div  class="modal-dialog modal-dialog-centered" role="document">
              <div style="padding: 0px; margin: 0px; background-color: #FFC700;" class="modal-content">
                <div class="modal-header">


                </div>
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;" class="modal-body border-0">
                  <p>hi</p>
                </div>



                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>





        <div style="visibility: hidden;">
            <div>
                <video id="localVideo" autoplay="true" playsinline="true" muted="true" class="w-100" style="
            background-color: #000;
            border: 1px solid #ccc;
            border-radius: 5px;
            height: 0px;
          "></video>
          <video id="remoteVideo" autoplay="true" playsinline="true" muted="true" class="w-100" style="
            background-color: #000;
            border: 1px solid #ccc;
            border-radius: 5px;
            height: 0px;
          "></video>
            </div>

        </div>


        <script type="text/javascript">
            var token = "{{ $token }}"
            var phone = "+{{$phone_no}}";
            let phoneNo = phone.replace(/\s/g, '');

        var client;

        /**

            if (typeof Africastalking !== 'undefined') {
                const params = {
                    sounds: {
                        dialing: "{{ url('') }}/public/assets/calling.mp3",
                        ringing: "{{ url('') }}/public/assets/calling.mp3",
                    },
                };

                try {
                    // Initialize the client variable
                    client = new Africastalking.Client(token, params);
                    console.log(client);


                    // Call the function on page load
                    //makeCall();
                } catch (error) {
                    console.error('Error initializing Africastalking client:', error);
                }
            } else {
                console.error('Africastalking SDK is not loaded.');
            }

            function makeCall() {
                // Check if the client is defined
                if (client) {


                    try {
                        client.call(phoneNo);
                       console.log(phoneNo);

                    } catch (error) {
                        console.error('Error making the call:', error);
                    }



                } else {
                    console.error('Africastalking client is not initialized.');
                }
            }

        */



        if (typeof Africastalking !== 'undefined') {
            const params = {
                sounds: {
                    dialing: "{{ url('') }}/public/assets/calling.mp3",
                    ringing: "{{ url('') }}/public/assets/calling.mp3",
                },
            };


                try {
                    // Initialize the client variable
                    client = new Africastalking.Client(token, params);
                    console.log(client);
                    makeCall();

                } catch (error) {
                    console.error('Error initializing Africastalking client:', error);
                }

            } else {
                console.error('Africastalking SDK is not loaded.');
            }

            function makeCall() {
                // Check if the client is defined
                if (client) {
                    try {
                        client.call(phoneNo);
                    } catch (error) {
                        console.error('Error making the call:', error);
                    }
                } else {
                    console.error('Africastalking client is not initialized.');
                }
            }

            function startTimer() {
                let startTime = new Date().getTime();

                // Update the timer every second
                setInterval(() => {
                    let currentTime = new Date().getTime();
                    let elapsedTime = Math.floor((currentTime - startTime) / 1000);

                    // Display the elapsed time or perform any other actions
                    console.log('Elapsed Time:', elapsedTime, 'seconds');
                }, 1000);
            }

            function endCall() {
                // Check if the client is defined
                if (client) {
                    try {
                        client.hangup();
                    } catch (error) {
                        console.error('Error ending the call:', error);
                    }
                } else {
                    console.error('Africastalking client is not initialized.');
                }
            }

            function updateCallStatus(status) {
                document.getElementById('callStatus').innerText = 'Call Status: ' + status;
            }















        @if($plan == 0)
        function chargeUser() {
            // Perform the logic to charge the user
            // You can make an AJAX request to your server here
            // For example, using the Fetch API
            fetch('/api/charge', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any additional headers if needed
                },
                // Add the user ID or any other data needed for the charging process
                body: JSON.stringify({ userId: "{{ $user_id }}" }),
            })
                .then(response => response.json())
                .then(data => {


                    if (data.data === false) {
                        endCall();
                        window.location.href = "/home";
                     } else {
                         // Continue charging with a delay
                         setTimeout(chargeUser, 60000);
                     }
                    // Handle the response from the server if needed
                    console.log(data);


                })
                .catch(error => {
                    // Handle errors if the request fails
                    console.error('Error:', error);
                });
        }
        @endif



        </script>





</body>

</html>
