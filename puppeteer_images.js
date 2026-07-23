const puppeteer = require('puppeteer');
const fs = require('fs');

const models = [
  "Kaabo Wolf King GTR",
  "Dualtron Thunder 3",
  "NAMI Burn-E 3 Max",
  "Segway GT3 Pro",
  "Apollo Phantom V3",
  "INMOTION RS",
  "VSETT 10+",
  "Kaabo Mantis King GT",
  "Mukuta 10+",
  "Teverun Fighter Supreme"
];

async function run() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  const results = {};
  
  for (const model of models) {
    console.log(`Searching for ${model}...`);
    try {
      await page.goto(`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(model + ' electric scooter')}`);
      
      // Wait for images to load
      await page.waitForSelector('img');
      
      // Extract the first few image URLs
      const images = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        return imgs.map(img => img.src).filter(src => src && src.startsWith('http') && !src.includes('googlelogo'));
      });
      
      if (images.length > 0) {
        results[model] = images[0];
        console.log(`[OK] Found for ${model}`);
      } else {
        console.log(`[FAIL] No image for ${model}`);
      }
    } catch (err) {
      console.log(`[ERROR] ${model}: ${err.message}`);
    }
    
    // sleep
    await new Promise(r => setTimeout(r, 2000));
  }
  
  await browser.close();
  
  fs.writeFileSync('puppeteer_images.json', JSON.stringify(results, null, 2));
  console.log("Done");
}

run();
