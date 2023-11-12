<!DOCTYPE html>
<html>
  <head>
    <title>Telnyx WebRTC Call Demo</title>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />

    <!-- Cross Browser WebRTC Adapter -->
    <script
      type="text/javascript"
      src="https://webrtc.github.io/adapter/adapter-latest.js"
    ></script>

    <!-- Include the Telnyx WEBRTC JS SDK -->
    <script
      type="text/javascript"
      src="https://unpkg.com/@telnyx/webrtc"
    ></script>

    <!-- <script
    type="text/javascript"
    src="../../lib/bundle.js"
  ></script> -->

    <!-- To style up the demo a little -->
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    />
    <link rel="stylesheet" href="./styles.css" />
    <link rel="shortcut icon" href="./favicon.ico" />
  </head>
  <body>
    <div class="container">
      <div id="logos" class="row pt-5 container-title">
        <!-- <h1>Telnyx JavaScript WebRTC Call Demo</h1> -->
        <img src="./logo_telnyx.svg" class="telnyx_logo" />
        <img src="./webrtc_logo.png" class="webrtc_logo" />
      </div>
      <div class="row pt-5">
        <div id="credentials" class="row w-100 utils-margin-top-bg">
          <div class="col-md-6 col-xs-12">
            <div class="card">
              <div class="card-body">
                <h5>Connect</h5>
                <div class="form-group">
                  <label class="telnyx-labels" for="username">Username</label>
                  <input
                    type="text"
                    class="form-control"
                    id="username"
                    placeholder="Enter your username"
                    onchange="saveInLocalStorage(event)"
                  />
                </div>
                <div class="form-group">
                  <label class="telnyx-labels" for="password">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    placeholder="Enter your password"
                    onchange="saveInLocalStorage(event)"
                  />
                </div>
                <div class="telnyx-labels">Environment Options:</div>
                <div class="form-check">
                  <input type="checkbox" id="env" value="1" />
                  <label class="form-check-label telnyx-labels" for="env">
                    Production
                  </label>
                </div>

                <button
                  id="btnConnect"
                  class="btn btn-block btn-success"
                  style="margin-top: 20px;"
                  onclick="connect()"
                >
                  Connect
                </button>
                <button
                  id="btnDisconnect"
                  class="btn btn-block btn-danger d-none"
                  onclick="disconnect()"
                >
                  Disconnect
                </button>

                <div class="text-center mt-3 text-muted">
                  <small
                    >Status:
                    <span id="connectStatus">Not Connected</span></small
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-xs-12">
            <div class="card">
              <div class="card-body">
                <div class="form-group">
                  <label class="telnyx-labels" for="number">Call To:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="number"
                    placeholder="Enter SIP or Number to Dial"
                    onchange="saveInLocalStorage(event)"
                  />
                </div>

                <div class="telnyx-labels">Call Options:</div>
                <div class="form-check">
                  <input
                    type="checkbox"
                    id="audio"
                    value="1"
                    onchange="saveInLocalStorage(event)"
                  />
                  <label class="form-check-label telnyx-labels" for="audio">
                    Include Audio
                  </label>
                </div>
                <div class="form-check">
                  <input
                    type="checkbox"
                    id="video"
                    value="1"
                    onchange="saveInLocalStorage(event)"
                  />
                  <label class="form-check-label telnyx-labels" for="video">
                    Include Video
                  </label>
                </div>
                <div class="col-12 col-md-8 mt-4 mt-md-1">
                  <button
                    id="startCall"
                    class="btn btn-primary px-5 mt-4"
                    onClick="makeCall()"
                    disabled="true"
                  >
                    Call
                  </button>
                  <button
                    id="hangupCall"
                    class="btn btn-danger px-5 mt-4 d-none"
                    onClick="hangup()"
                    disabled="true"
                  >
                    Hang up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="videos_faces" class="row py-3 utils-margin-top-bg">
        <div class="row w-100">
          <div class="col-md-6 col-xs-12">
            <h5>Local Video</h5>
            <video
              id="localVideo"
              autoplay="true"
              playsinline="true"
              class="w-100"
              style="
                background-color: #000;
                border: 1px solid #ccc;
                border-radius: 5px;
                max-height: 300px;
              "
            ></video>
          </div>
          <div class="col-md-6 col-xs-12">
            <h5>Remote Video</h5>
            <video
              id="remoteVideo"
              autoplay="true"
              playsinline="true"
              class="w-100"
              style="
                background-color: #000;
                border: 1px solid #ccc;
                border-radius: 5px;
                max-height: 300px;
              "
            ></video>
          </div>
        </div>
      </div>
    </div>
    <script type="text/javascript">
      var client;
      var currentCall = null;

      var username = localStorage.getItem('telnyx.example.username') || '';
      var password = localStorage.getItem('telnyx.example.password') || '';
      var number = localStorage.getItem('telnyx.example.number') || '';
      var audio = localStorage.getItem('telnyx.example.audio') || '1';
      var video = localStorage.getItem('telnyx.example.video') || '1';

      /**
       * On document ready auto-fill the input values from the localStorage.
       */
      ready(function () {
        document.getElementById('username').value = username;
        document.getElementById('password').value = password;
        document.getElementById('number').value = number;
        document.getElementById('audio').checked = audio === '1';
        document.getElementById('video').checked = video === '1';
        document.getElementById('env').checked = '1';
      });

      function detachListeners(client){
        if(client) {
          client.off('telnyx.error');
          client.off('telnyx.ready');
          client.off('telnyx.notification');
          client.off('telnyx.socket.close');
        }
      }
      /**
       * Connect with TelnyxWebRTC.TelnyxRTC creating a client and attaching all the event handler.
       */
      function connect() {
        const env = document.getElementById('env').checked
          ? 'production'
          : 'development';

        client = new TelnyxWebRTC.TelnyxRTC({
          env: env,
          login: document.getElementById('username').value,
          password: document.getElementById('password').value,
          ringtoneFile: './sounds/incoming_call.mp3',
          // iceServers: [{ urls: ['stun:stun.l.google.com:19302'] }],
          // ringbackFile: './sounds/ringback_tone.mp3',
        });

        client.remoteElement = 'remoteVideo';
        client.localElement = 'localVideo';

        if (document.getElementById('audio').checked) {
          client.enableMicrophone();
        } else {
          client.disableMicrophone();
        }
        if (document.getElementById('video').checked) {
          client.enableWebcam();
        } else {
          client.disableWebcam();
        }

        client.on('telnyx.ready', function () {
          btnConnect.classList.add('d-none');
          btnDisconnect.classList.remove('d-none');
          connectStatus.innerHTML = 'Connected';

          startCall.disabled = false;
        });

        // Update UI on socket close
        client.on('telnyx.socket.close', function () {
          btnConnect.classList.remove('d-none');
          btnDisconnect.classList.add('d-none');
          connectStatus.innerHTML = 'Disconnected';
          client.disconnect();
          detachListeners(client);
        });

        // Handle error...
        client.on('telnyx.error', function (error) {
          console.error('telnyx error:', error);
          alert(error.message)
          btnConnect.classList.remove('d-none');
          btnDisconnect.classList.add('d-none');
          connectStatus.innerHTML = 'Disconnected';
          client.disconnect();
          detachListeners(client);
        });

        client.on('telnyx.notification', handleNotification);

        connectStatus.innerHTML = 'Connecting...';
        client.connect();
      }

      function disconnect() {
        connectStatus.innerHTML = 'Disconnecting...';
        client.disconnect();
      }

      /**
       * Handle notification from the client.
       */
      function handleNotification(notification) {
        switch (notification.type) {
          case 'callUpdate':
            handleCallUpdate(notification.call);
            break;
          case 'userMediaError':
            console.log(
              'Permission denied or invalid audio/video params on `getUserMedia`'
            );
            break;
        }
      }

      /**
       * Update the UI when the call's state change
       */
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
            setTimeout(function () {
              if (confirm('Pick up the call?')) {
                currentCall.answer();
              } else {
                currentCall.hangup();
              }
            }, 1000);
            break;
          case 'active': // Call has become active
            startCall.classList.add('d-none');
            hangupCall.classList.remove('d-none');
            hangupCall.disabled = false;
            break;
          case 'hangup': // Call is over
            startCall.classList.remove('d-none');
            hangupCall.classList.add('d-none');
            hangupCall.disabled = true;
            break;
          case 'destroy': // Call has been destroyed
            currentCall = null;
            break;
        }
      }

      /**
       * Make a new outbound call
       */
      function makeCall() {
        const params = {
          callerName: 'Caller Name',
          callerNumber: 'Caller Number',
          destinationNumber: document.getElementById('number').value, // required!
          audio: document.getElementById('audio').checked,
          video: document.getElementById('video').checked
            ? { aspectRatio: 16 / 9 }
            : false,
        };

        currentCall = client.newCall(params);
      }

      /**
       * Hangup the currentCall if present
       */
      function hangup() {
        if (currentCall) {
          currentCall.hangup();
        }
      }

      function saveInLocalStorage(e) {
        var key = e.target.name || e.target.id;
        localStorage.setItem('telnyx.example.' + key, e.target.value);
      }

      // jQuery document.ready equivalent
      function ready(callback) {
        if (document.readyState != 'loading') {
          callback();
        } else if (document.addEventListener) {
          document.addEventListener('DOMContentLoaded', callback);
        } else {
          document.attachEvent('onreadystatechange', function () {
            if (document.readyState != 'loading') {
              callback();
            }
          });
        }
      }
    </script>
  </body>
</html>