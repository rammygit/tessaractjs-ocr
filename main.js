// import {Tesseract} from '/node_modules/tesseract.js/dist/tesseract.min.js';

Tesseract.recognize(
//   'https://tesseract.projectnaptha.com/img/eng_bw.png',
  '/images/images.png',
  'eng',
  { 
      logger: m => console.log(m) 
    }
).then(({ data: { text } }) => {
  console.log(text);
})


