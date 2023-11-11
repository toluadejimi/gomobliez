<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Twilio Dial Pad</title>
    <script src="https://media.twiliocdn.com/sdk/js/client/v1.14/twilio.js"></script>

    <style>
        /* styles.css */

        body {
            font-family: Arial, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
        }

        #dial-pad {
            text-align: center;
        }

        #display {
            font-size: 1.5em;
            margin-bottom: 10px;
            padding: 5px;
        }

        #buttons button {
            width: 50px;
            height: 50px;
            font-size: 1.2em;
            margin: 5px;
            cursor: pointer;
        }

        #buttons button:hover {
            background-color: #ddd;
        }
    </style>

</head>


<body>

    <div id="dial-pad">
        <input type="text" id="display" readonly>
        <div id="buttons">
            <button onclick="appendDigit('1')">1</button>
            <button onclick="appendDigit('2')">2</button>
            <button onclick="appendDigit('3')">3</button>
            <button onclick="appendDigit('4')">4</button>
            <button onclick="appendDigit('5')">5</button>
            <button onclick="appendDigit('6')">6</button>
            <button onclick="appendDigit('7')">7</button>
            <button onclick="appendDigit('8')">8</button>
            <button onclick="appendDigit('9')">9</button>
            <button onclick="appendDigit('0')">0</button>
            <button onclick="clearDisplay()">C</button>
            <button onclick="makeCall()">Call</button>
        </div>
    </div>

    <script>
        let display = document.getElementById('display');
    let phoneNumber = '';

    function chk_grant(){
        const AccessToken = require('twilio').jwt.AccessToken;
        const VoiceGrant = AccessToken.VoiceGrant;

        // Your Twilio Account SID, Auth Token, and Twilio App SID
        const accountSid = 'ACa93d49c9df5c079a3198a9a70335ef89';
        const authToken = 'your_a21110c089c38da2ec221556cad30aa66uth_token';
        const appSid = 'your_twilio_app_sid';


        const identity = 'user_identity';  // The identity of the user/client

        // Create an Access Token
        const accessToken = new AccessToken(accountSid, appSid, authToken);

        // Set the identity of the user/client
        accessToken.identity = identity;

        // Grant access to Twilio Voice
        const grant = new VoiceGrant({
            outgoingApplicationSid: 'your_twilio_outgoing_app_sid',
            incomingAllow: true,
        });

        accessToken.addGrant(grant);

        // Generate the token and print it
        console.log(accessToken.toJwt());
    }




    function appendDigit(digit) {
        phoneNumber += digit;
        updateDisplay();
    }

    function clearDisplay() {
        phoneNumber = '';
        updateDisplay();
    }

    function updateDisplay() {
        display.value = '+15304262488';
    }

    function makeCall() {

        // Your Twilio Account SID, Auth Token, and Twilio Phone Number
        var accountSid = 'ACa93d49c9df5c079a3198a9a70335ef89';
        var authToken = '21110c089c38da2ec221556cad30aa66';
        var twilioPhoneNumber = '+17622275783';


        // Create a Twilio Device
        const device = new Twilio.Device();


        console.log(authToken);


        // Configure the Twilio Device
        device.setup(accountSid, authToken);

        // Make an outgoing call
        const params = {
            To: phoneNumber,
            From: twilioPhoneNumber,
            url: 'https://demo.twilio.com/welcome/voice/' // Replace with your server's webhook endpoint
        };

        const outgoingConnection = device.connect(params);

        // Event listener for when the outgoing connection is established
        outgoingConnection.accept(() => {
            console.log('Outgoing connection established');
            console.log(authToken);
        });

        // Event listener for when the outgoing connection is closed
        outgoingConnection.disconnect(() => {
            console.log(authToken);
            console.log('Outgoing connection closed');

        });
    }
    </script>

</body>

</html>