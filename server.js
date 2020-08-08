// server.js

const path = require('path');
const Tesseract = require('tesseract.js');
const express = require('express')
const app = express()
const cors = require('cors');
const port =  3000
const bodyParser = require('body-parser')
const fs = require('fs')
const request = require('request')


app.use(express.static('public'))
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', (req, res) => res.send('Hello World!'))

const download = (url, path, callback) => {
    request.head(url, (err, res, body) => {
      request(url)
        .pipe(fs.createWriteStream(path))
        .on('close', callback)
    })
  }

//   image URL 
const image_url = 'https://ibb.co/QKPDmzh'

const image_path = './images/image_scan.png'

const post_download_callback = () => {
        console.log('Image download complete!')
        console.log('Recognizing Downloaded Image ....');

        Tesseract.recognize('https://ibb.co/QKPDmzh', 'eng', { logger: m => console.log(m) })
        .then(({ data: { text } }) => {
            console.log(text);
            res.send(`Scanned Text = ${text}`);
        });
}

app.post('/api/scan', function(req, res) {

    var myimage = req.body.imagepath;
    var token = req.body.token;
    var geo = req.body.geo;

    const { createWorker } = require('tesseract.js')

const worker = createWorker({
  logger: m => console.log(m)
});

(async () => {
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  const { data: { text } } = await worker.recognize('./images/images.png');
  console.log(text);
  await worker.terminate();
})();

});

app.listen(port, () => console.log(`OCR app listening on port ${port}!`))


 



