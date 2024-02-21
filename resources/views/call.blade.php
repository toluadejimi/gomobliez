<!DOCTYPE html>
<html>

<head>
    <title>Telnyx WebRTC Call </title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

    <script type="text/javascript" src="https://webrtc.github.io/adapter/adapter-latest.js"></script>

    <!-- Include the Telnyx WEBRTC JS SDK -->
    <script type="text/javascript" src="https://unpkg.com/@telnyx/webrtc"></script>


    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <!-- Bootstrap JS and jQuery (required for Bootstrap) -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>


</head>

<body style="padding: 0px; margin: 0px; background-color: #FFC700;">
    <div class="container" style="background-color: #FFC700; max-width: 400px; display: flex; flex-direction: column; align-items: center; justify-content: center; height:100vh">
        <div id="connectStatus">
            Connecting...
        </div>

        <div style="font-weight: 700; font-size: 20px;" id="callTimer">
            0:00
        </div>


        <div style="height: 50px;"></div>
        <div>
            <img src="{{ url('') }}/public/assets/svg/web_call_image.svg" alt="My Happy SVG" />
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
                <img src="{{ url('') }}/public/assets/svg/web_mute.svg" alt="My Happy SVG" />
            </div>
            <div style="width: 50px;"></div>
            <div id="loudspeaker" style="background-color: #0000007e; padding: 12px; border-radius: 100%;" onclick="loudspeaker()">
                <img src="{{ url('') }}/public/assets/svg/web_loudspeaker.svg" alt="My Happy SVG" />
            </div>

        </div>
        <div style="height: 60px;"></div>

        <div id='end' onclick="hangup()">
            <img src="{{ url('') }}/public/assets/svg/web_cancel.svg" alt="My Happy SVG" />
        </div>
        <div style="visibility: hidden;">
            <div>
                <video id="localVideo" autoplay="true" playsinline="true" class="w-100" style="
                background-color: #000;
                border: 1px solid #ccc;
                border-radius: 5px;
                height: 0px;
              "></video>
                <video id="remoteVideo" autoplay="true" playsinline="true" class="w-100" style="
                background-color: #000;
                border: 1px solid #ccc;
                border-radius: 5px;
                height: 0px;
              "></video>
            </div>

        </div>


        <div class="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content" style="padding: 0px; margin: 0px; background-color: #FFC700;">
                    <div class="modal-header">

                    </div>
                    <div class="modal-body">
                        You are about call to +{{ $number }}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Cancle</button>
                        <button type="button" id='start' onclick="makeCall()" data-dismiss="modal" class="btn btn-success" id="modalActionButton">Continue</button>
                    </div>
                </div>
            </div>
        </div>













        <script type="text/javascript">
            function showModal() {
                $('#exampleModal').modal('show');
            }





            var client;
            var currentCall = null;

            var username = localStorage.getItem('telnyx.example.username') || '';
            var password = localStorage.getItem('telnyx.example.password') || '';
            var number = localStorage.getItem('telnyx.example.number') || '';
            var audio = localStorage.getItem('telnyx.example.audio') || '1';
            var video = localStorage.getItem('telnyx.example.video') || '1';

            ready(function() {
                showModal();
                document.getElementById('audio').checked = audio === '1';
                document.getElementById('remoteVideo').volume = 0.3;
                connect();

            });



            function checkAudio() {
                check.classList.toggle('playing', window.isAudioPlaying());
                window.requestAnimationFrame(checkAudio);
            }



            function detachListeners(client) {
                if (client) {
                    client.off('telnyx.error');
                    client.off('telnyx.ready');
                    client.off('telnyx.notification');
                    client.off('telnyx.socket.close');

                }
            }



            function connect() {
                const env = 'production';
                client = new TelnyxWebRTC.TelnyxRTC({
                    env: 'production'
                    , login: "{{ env('SIPUSERNAME') }}"
                    , password: "{{ env('SIPPASS') }}"
                    , ringtoneFile: "{{ url('') }}/public/assets/ringback_tone.mp3"
                , });


                client.remoteElement = 'remoteVideo';
                client.localElement = 'localVideo';

                document.getElementById('remoteVideo').mute = false;

                if (document.getElementById('audio').checked) {
                    console.log('audio')
                    console.log(document.getElementById('audio'))
                    client.enableMicrophone();
                } else {
                    client.disableMicrophone();
                }

                client.on('telnyx.ready', function() {
                    document.getElementById('connectStatus').innerHTML = 'Call Initialized';
                    showModal();
                });

                client.on('telnyx.socket.close', function() {
                    document.getElementById('connectStatus').innerHTML = 'Call Disconnected';
                    client.disconnect();
                    detachListeners(client);
                });

                client.on('telnyx.error', function(error) {
                    console.error('telnyx error:', error);
                    alert(error.message)
                    document.getElementById('connectStatus').innerHTML = 'Call Disconnected';
                    client.disconnect();
                    detachListeners(client);
                });

                client.on('telnyx.notification', handleNotification);

                document.getElementById('connectStatus').innerHTML = 'Call Initializing';
                client.connect();
            }

            function disconnect() {
                document.getElementById('connectStatus').innerHTML = 'Call Disconnecting...';
                client.disconnect();
            }

            function mute() {
                if (document.getElementById('audio').style.backgroundColor == 'rgba(0, 0, 0, 0.494)') {
                    client.disableMicrophone();
                    document.getElementById('audio').style.backgroundColor = '#000';
                } else {
                    client.enableMicrophone();
                    document.getElementById('audio').style.backgroundColor = '#0000007e';
                }
            }

            function loudspeaker() {
                if (document.getElementById('loudspeaker').style.backgroundColor == 'rgba(0, 0, 0, 0.494)') {
                    document.getElementById('loudspeaker').style.backgroundColor = '#000';
                    document.getElementById('remoteVideo').volume = 1;

                } else {
                    document.getElementById('loudspeaker').style.backgroundColor = '#0000007e';
                    document.getElementById('remoteVideo').volume = 0.3;
                }
            }

            function handleNotification(notification) {
                switch (notification.type) {
                    case 'callUpdate':
                        handleCallUpdate(notification.call);
                        break;
                    case 'userMediaError':
                        console.log(
                            'Permission denied or invalid audio/video params on getUserMedia'
                        );
                        break;
                }
            }

            function handleCallUpdate(call) {
                currentCall = call;
                switch (call.state) {
                    case 'new': // Setup the UI
                        break;
                    case 'trying': // You are trying to call someone and he's ringing now
                        break;
                    case 'recovering': // Call is recovering from a previous session
                        if (confirm('Recover the previous call?')) {
                            currentCall.answer();
                        } else {
                            currentCall.hangup();
                        }
                        break;
                    case 'ringing': // Someone is calling you
                        //used to avoid alert block audio play, I delayed to audio play first.
                        setTimeout(function() {
                            if (confirm('Pick up the call?')) {
                                currentCall.answer();
                            } else {
                                currentCall.hangup();
                            }
                        }, 1000);
                        break;
                    case 'active': // Call has become active
                        document.getElementById('connectStatus').innerHTML = 'Call Connected'
                        break;
                    case 'hangup': // Call is over
                        document.getElementById('connectStatus').innerHTML = 'Call Ended'
                        break;
                    case 'destroy': // Call has been destroyed
                        //   route to home
                        currentCall = null;
                        break;
                }
            }

            function makeCall() {
                const params = {
                    callerName: 'Caller Name'
                    , callerNumber: 'Caller Number'
                    , destinationNumber: "{{ $number }}"
                , };

                client.enableMicrophone();
                currentCall = client.newCall(params);
            }

            /**
             * Hangup the currentCall if present
             */
            function hangup() {
                if (currentCall) {
                    currentCall.hangup();
                }

                //window.location.href = "/home";
            }

            function saveInLocalStorage(e) {
                var key = e.target.name || e.target.id;
                localStorage.setItem('telnyx.example.' + key, e.target.value);
            }

            function ready(callback) {
                if (document.readyState != 'loading') {
                    callback();
                } else if (document.addEventListener) {
                    document.addEventListener('DOMContentLoaded', callback);
                } else {
                    document.attachEvent('onreadystatechange', function() {
                        if (document.readyState != 'loading') {
                            callback();
                        }
                    });
                }
            }


            function endCall() {
                if (currentCall) {
                    currentCall.hangup();
                }
            }

            var startTime;
            var timerInterval;

            function handleCallUpdate(call) {
                currentCall = call;
                switch (call.state) {
                    // ... Existing cases ...

                    case 'active': // Call has become active
                        document.getElementById('connectStatus').innerHTML = 'Call Connected';
                        startTimer();
                        break;

                    case 'hangup': // Call is over
                        document.getElementById('connectStatus').innerHTML = 'Call Ended';
                        stopTimer();
                        break;

                        // ... Existing cases ...
                }
            }

            function startTimer() {
                startTime = new Date();

                // Update the timer every second
                timerInterval = setInterval(function() {
                    updateTimer();

                    // Charge the user every 60 seconds
                    if (Math.floor((new Date() - startTime) / 1000) % 60 === 0) {
                        chargeUser();
                    }
                }, 1000);
            }

            function stopTimer() {
                clearInterval(timerInterval);
            }

            function updateTimer() {
                var currentTime = new Date();
                var elapsedSeconds = Math.floor((currentTime - startTime) / 1000);

                var minutes = Math.floor(elapsedSeconds / 60);
                var seconds = elapsedSeconds % 60;

                // Format the timer display
                var timerDisplay = String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');

                // Update the timer element
                document.getElementById('callTimer').innerHTML = timerDisplay;
            }


            @if($plan == 0)

            function chargeUser() {
                fetch('/api/charge', {
                        method: 'POST'
                        , headers: {
                            'Content-Type': 'application/json'
                        , }
                        , body: JSON.stringify({
                            userId: "{{ $user_id }}"
                        })
                    , })
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
