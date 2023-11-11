<!DOCTYPE html>
<html>
  <head>
    <title>Twilio Voice JavaScript SDK Quickstart</title>
    <link rel="stylesheet" href="{{url('')}}/assets/app2.css" />
    <!-- Stylesheets for -->>
    <link href="https://fonts.googleapis.com/css?family=Exo" rel="stylesheet">
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet">
  </head>
  <body>
    <header>
     <img src="https://i.postimg.cc/6q4CbZpR/index.png"> <!-- Powered by Twilio logo -->
      <h1>Twilio Voice, JavaScript SDK Quickstart</h1>
      <button id="startup-button">Start up the Device</button>
    </header>
    <main id="controls">
      <section class="left-column" id="info">
        <h2>Your Device Info</h2>
        <div id="client-name"></div>
        <div id="output-selection" class="hide">
          <label>Ringtone Devices</label>
          <select id="ringtone-devices" multiple></select>
          <label>Speaker Devices</label>
          <select id="speaker-devices" multiple></select
          ><br />
          <button id="get-devices">Seeing "Unknown" devices?</button>
        </div>
      </section>
      <section class="center-column">
        <h2 class="instructions">Make a Call</h2>
        <div id="call-controls" class="hide">
            <div class="container">
              <form name="input">
              <input id="phone-number" type="text" />
              <div class="row">
                <div class="digit" id="one">1</div>
                <div class="digit" id="two">2
                  <div class="sub">ABC</div>
                </div>
                <div class="digit" id="three">3
                  <div class="sub">DEF</div>
                </div>
              </div>
              <div class="row">
                <div class="digit" id="four">4
                  <div class="sub">GHI</div>
                </div>
                <div class="digit" id="five">5
                  <div class="sub">JKL</div>
                </div>
                <div class="digit">6
                  <div class="sub">MNO</div>
                </div>
              </div>
              <div class="row">
                <div class="digit">7
                  <div class="sub">PQRS</div>
                </div>
                <div class="digit">8
                  <div class="sub">TUV</div>
                </div>
                <div class="digit">9
                  <div class="sub">WXYZ</div>
                </div>
              </div>
              <div class="row">
                <div class="digit">*
                </div>
                <div class="digit">0
                </div>
                <div class="digit">#
                </div>
              </div>
              <div class="botrow">
                <div class="digit">+
                </div>
               <div id="button-call" type=submit>
                      <i class="fa fa-phone"></i>
               </div>
              <div class="hide" id="hangup" type=submit>
                      <i id="hangup-icon" class="fa fa-phone"></i>
                </div>
                <div class="hide" id="button-hangup-incoming" type=submit>
                      <i id="hangup-icon" class="fa fa-phone"></i>
                </div>
                <i class="fa fa-long-arrow-left dig" id="backspace" type=submit></i>
              </div>
              </form>
            <div class="row">
                  <input class="setting hide" type="button" value="Add Participant" id="add-participant">
              </div>
              <div class="row">
                  <input class="setting hide" type="button" value="Start Stream" id="button-stream-start">
                  <input class="setting hide" type="button" value="Stop Stream" id="button-stream-stop">
              </div>
              <div id="incoming-call" class="hide">
                <br>
                <h2>Incoming Call Controls</h2>
                <p class="instructions">
                  Incoming Call from <span id="incoming-number"></span>
                </p>
                <div class="row">
                  <input class="setting" type="button" value="Answer" id="button-accept-incoming">
                  <input class="setting" type="button" value="Reject" id="button-reject-incoming">
                </div>
              </div>
              <div id="volume-indicators" class="hide">
                <label>Mic Volume</label>
                <div id="input-volume"></div>
                <br /><br />
                <label>Speaker Volume</label>
                <div id="output-volume"></div>
              </div>

            </div>

      </div>
      </section>
      <section class="right-column">
        <h2>Event Log</h2>
        <div class="hide" id="log"></div>
      </section>
    </main>

    <script src="//ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script type="text/javascript" src="{{url('')}}/assets/twillo.min.js"></script>
    <script src="{{url('')}}/assets/app.js"></script>
  </body>
</html>
