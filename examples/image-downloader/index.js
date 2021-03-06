const fs = require('fs');
const Nightmare = require('nightmare');
const download = require('download');

const keyword = process.argv[2] || 'cat';

// Search images from GIPHY
const urls = await Nightmare({ show: true, loadTimeout: 5000, executionTimeout: 5000 })
  .goto('https://giphy.com/')
  .type('#search-box', keyword)
  .click('#search-button')
  .wait('#gif-results')
  .evaluate(() => {
    const images = Array.from(document.querySelectorAll('[data-gif] img'));
    return images.map(i => i.src);
  })
  .end();

// Pick one of the images
const url = urls[Math.floor(Math.random() * urls.length)]

// Convert GIF url
const imageUrl = url.replace(/^.*\/(media\/\w*)\/.*$/, 'https://media.giphy.com/$1/giphy.gif');

// Download image
const image = await download(imageUrl);

// Save image to out.gif
fs.writeFileSync(`out.gif`, image);

console.log('>> DONE!');
