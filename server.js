// server.js

const path = require('path');
const Tesseract = require('tesseract.js');
const express = require('express')
const app = express()
const cors = require('cors');
const port =  3000
const bodyParser = require('body-parser')


app.use(express.static('public'))
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/api/scan', function(req, res) {

    var user_id = req.body.id;
    var token = req.body.token;
    var geo = req.body.geo;



    const [,, imagePath] = process.argv;
    const image = path.resolve(__dirname, (imagePath || 'images/images.png'));

    console.log(`Recognizing ${image}`);


    Tesseract.recognize(image, 'eng', { logger: m => console.log(m) })
        .then(({ data: { text } }) => {
            console.log(text);
    });

    res.send(`welcome `);

});

app.listen(port, () => console.log(`OCR app listening on port ${port}!`))




