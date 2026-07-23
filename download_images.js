const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const models = [
  "Kaabo Wolf King GTR",
  "Dualtron Thunder 3",
  "NAMI Burn-E 3 Max",
  "Segway GT3 Pro",
  "Apollo Phantom V3",
  "INMOTION RS",
  "VSETT 10+ electric scooter",
  "Kaabo Mantis King GT",
  "Mukuta 10+ electric scooter",
  "Teverun Fighter Supreme"
];

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
           .on('error', reject)
           .once('close', () => resolve(filepath));
      } else {
        res.resume();
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
      }
    }).on('error', reject);
  });
};

async function run() {
  const dir = path.join(__dirname, 'public', 'images', 'scooters');
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
  }

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  const results = {};
  
  for (const model of models) {
    console.log(`Searching for ${model}...`);
    try {
      // Use Bing images, it's easier to scrape than Google
      await page.goto(`https://www.bing.com/images/search?q=${encodeURIComponent(model + ' electric scooter')}&qft=+filterui:aspect-square`, { waitUntil: 'networkidle2' });
      
      const imageUrl = await page.evaluate(() => {
        // Find the first large image link in Bing
        const imgs = Array.from(document.querySelectorAll('img.mimg'));
        for (let img of imgs) {
            let src = img.getAttribute('src') || img.getAttribute('data-src');
            if (src && src.startsWith('http')) {
                return src;
            }
        }
        return null;
      });

      if (imageUrl) {
        const ext = 'jpg';
        const filename = `${model.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.${ext}`;
        const filepath = path.join(dir, filename);
        
        console.log(`Downloading ${imageUrl} to ${filename}`);
        await downloadImage(imageUrl, filepath);
        
        results[model] = `/images/scooters/${filename}`;
        console.log(`[OK] Saved ${model}`);
      } else {
        console.log(`[FAIL] No image found for ${model}`);
      }
    } catch (err) {
      console.log(`[ERROR] ${model}: ${err.message}`);
    }
  }
  
  await browser.close();
  
  fs.writeFileSync('downloaded_images.json', JSON.stringify(results, null, 2));
  console.log("Done");
}

run();
