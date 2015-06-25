###Here's a simple guide on how to create a Node.js app hosted in Azure that will handle your Amazon Echo's API calls.

<a href="http://amzn.to/1Lo5eho">
    <p align="center">
      <img src="amazon_echo-300x300.jpg">
      <br/>
      You will want to buy an Amazon Echo if you haven't already.
    </p>
</a>

[Here's a quick example video of what I did in the OpenSmartHub](https://www.youtube.com/watch?v=y7k8XVTqgDU)

0. You will want to download and install Node.js if you haven't already.
0. Create an Azure account if you haven't already and create a new web app.
0. Using FTP, Git, or whichever method you would like, get the code into the location for your new azure web app.
0. Join the Amazon Developer program for the Echo and create a new Echo app. (Note: In order to use this while in development on your Echo, the account needs to be the same one that the Echo is linked to)
0. In your App information tab:
    0. Fill out your "App Name". This will act as your official app name.
    0. Fill out your "Spoken Name". You will want this to be short and simple to say in order to give it the easiest time to recognize.
    0. Give your "App Version" which will need to match the info you hand back through the API.
    0. Give your "App Endpoint" which will be your Azure webapp's URL + the api endpoint. (Example: "https://echotest.azurewebsites.net/api/echo")
0. In your Interaction Model:
    0. Fill out your "Intent Schema". The intent is the name of the function, slots are parameters, and the type when "literal" will give you back the speech-to-text recognized word. More info on this here.

        ```
        {
            "intents": [
                {
                    "intent": "TurnOn",
                    "slots": [
                        {
                            "name": "Device",
                            "type": "LITERAL"
                        }
                    ]
                },
                {
                    "intent": "TurnOff",
                    "slots": [
                        {
                            "name": "Device",
                            "type": "LITERAL"
                        }
                    ]
                }
            ]
        }
        ```

    0. Fill out your "Spoken Utterances". They should be tab separated between the intent and the sample phrases. Something interesting to note is that they suggest that you provide a sample for every number of literal device phrases from min to max. (In my case from 1-3 words, thus the repetitions.) It also does not like it when you have multiple of the same literals anywhere in the file.. More info on this here.

        ```
        TurnOn    turn on {living room switch|Device}
        TurnOn    turn on {spark one|Device}
        TurnOn    turn on {example|Device}
        TurnOff    turn off {living room two|Device}
        TurnOff    turn off {spark two|Device}
        TurnOff    turn off {coffee|Device}
        ```

    0. After this, set your app to be ready for testing and you are on your way!
0. Call Alexa with your Spoken Name by saying "Alexa, open {YourSpokenAppNameHere}"
0. Now you can say the commands that you've designated in both your Nodejs web app and your Amazon app declarations for your response!

If you want to make it your own, you will need to modify the Node.js back-end to respond according to the requests that you allow while also altering your intent schema and spoken utterances.

