const textToSpeech = require('@google-cloud/text-to-speech');
const express = require('express');
const tts_client = new textToSpeech.TextToSpeechClient();


const app = express();
tts_client.initialize();
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));


app.get('/', async (req, res) => {

    let text = req.query.text;
    let lang = req.query.lang;
    let gender = req.query.gender;


    const request = {
        input: { text: text },
        voice: { languageCode: lang, ssmlGender: gender },
        audioConfig: { audioEncoding: 'MP3' },
    };

    try {
        let [response] = await tts_client.synthesizeSpeech(request);
        res.send(response.audioContent).status(200);
    } catch (error) {
        res.send(error);
    }
});


var server = app.listen(5003, () => {
    console.log(`Server is running on port 5003.`);
});

module.exports = server;