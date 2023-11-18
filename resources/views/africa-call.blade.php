<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WebRTC Voice Call</title>
  <script src="https://cdn.rawgit.com/webrtc/adapter/gh-pages/adapter-latest.js"></script>
</head>
<body>
  <button id="startCall">Start Voice Call</button>

  <script>
    document.getElementById('startCall').addEventListener('click', startVoiceCall);

    async function startVoiceCall() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioContext = new AudioContext();
        const audioSource = audioContext.createMediaStreamSource(stream);
        const audioDestination = audioContext.createMediaStreamDestination();
        audioSource.connect(audioDestination);

        const audioStream = audioDestination.stream;

        // Now you have an audio stream that can be used with Africa's Talking Voice API
        // You would typically send this stream to the server, which then initiates the call using the Africa's Talking API.

        // Example using Africa's Talking API (replace with your actual credentials)
        const apiKey = 'ATSPc65fbf297159cf8';
        const username = 'sandbox';
        const phoneNumber = '+test_KE.jimmy.@sandbox.sip.africastalking.com'; // Replace with the recipient's phone number

        const apiUrl = 'https://api.africastalking.com/restless/send';

        const headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
          'apiKey': apiKey,
        };

        const data = `username=${username}&to=${phoneNumber}&message=This is a test voice call.&enqueue=true`;

        // Make a POST request to initiate the voice call
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: headers,
          body: data
        });

        const responseData = await response.json();
        console.log('Voice call initiated successfully:', responseData);
      } catch (error) {
        console.error('Error starting voice call:', error);
      }
    }
  </script>
</body>
</html>
