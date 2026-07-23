const https = require('https');

const candidateUrls = {
  "Kaabo Wolf King GTR": [
    "https://cdn.shopify.com/s/files/1/0020/6077/1395/products/kaabo-wolf-king-gtr-electric-scooter-1.jpg",
    "https://cdn.shopify.com/s/files/1/0020/6077/1395/products/kaabo-wolf-king-gtr-electric-scooter-1_1024x1024.jpg",
    "https://cdn.shopify.com/s/files/1/0020/6077/1395/files/Wolf-King-GTR.png",
    "https://cdn.shopify.com/s/files/1/0020/6077/1395/files/Wolf-King-GTR.jpg",
    "https://fluidfreeride.com/cdn/shop/files/Wolf_King_GTR_Right_Side_View.jpg"
  ],
  "Dualtron Thunder 3": [
    "https://minimotorsusa.com/cdn/shop/files/Dualtron-Thunder-3.jpg",
    "https://cdn.shopify.com/s/files/1/0020/6077/1395/files/Thunder3.png",
    "http://dualtronusa.com/cdn/shop/files/DT-Thunder-3-Image-1_600x.jpg"
  ],
  "NAMI Burn-E 3 Max": [
    "https://cdn.shopify.com/s/files/1/0020/6077/1395/products/nami-burn-e-max-electric-scooter-1.jpg",
    "https://fluidfreeride.com/cdn/shop/files/Nami_Burn_E_3_Max.jpg",
    "https://cdn.shopify.com/s/files/1/0252/6884/6686/products/Nami_Burn_E_2_Max_Side.jpg"
  ],
  "Segway GT3 Pro": [
    "https://segway.imgix.net/catalog/product/cache/d3ec3723470ff918c92e447639eaf984/2/1/21.png",
    "https://segway.imgix.net/catalog/product/cache/d3ec3723470ff918c92e447639eaf984/g/t/gt2_1.png"
  ],
  "Apollo Phantom": [
    "http://apolloscooters.co/cdn/shop/files/A11_Black_springs_update_20250604_2.png",
    "https://cdn.shopify.com/s/files/1/0020/6077/1395/files/Apollo-Phantom.jpg"
  ],
  "INMOTION RS": [
    "https://www.voromotors.com/cdn/shop/files/DSC06157_9cf3fa9c-a264-49fb-ad1e-6334bd3a239c.jpg",
    "https://cdn.shopify.com/s/files/1/0020/6077/1395/files/Inmotion-RS.jpg"
  ],
  "VSETT 10+": [
    "https://cdn.shopify.com/s/files/1/0252/6884/6686/products/VSETT_10_Left_Side.jpg",
    "https://fluidfreeride.com/cdn/shop/files/VSETT_10.jpg",
    "https://cdn.shopify.com/s/files/1/0252/6884/6686/files/VSETT-10.png"
  ],
  "Kaabo Mantis King GT": [
    "https://cdn.shopify.com/s/files/1/0020/6077/1395/products/kaabo-mantis-king-gt-electric-scooter-1.jpg",
    "https://cdn.shopify.com/s/files/1/0020/6077/1395/files/Mantis-King-GT.jpg"
  ],
  "Mukuta 10+": [
    "https://cdn.shopify.com/s/files/1/0020/6077/1395/products/mukuta-10-plus-electric-scooter-1.jpg",
    "https://cdn.shopify.com/s/files/1/0020/6077/1395/files/Mukuta-10.jpg"
  ],
  "Teverun Fighter Supreme": [
    "https://minimotorsusa.com/cdn/shop/files/Teverun-Fighter-Supreme.jpg",
    "https://cdn.shopify.com/s/files/1/0020/6077/1395/files/Teverun-Fighter-Supreme.jpg",
    "https://teverun.com/wp-content/uploads/2023/04/Fighter-Supreme-1.png"
  ]
};

async function checkUrl(url) {
  return new Promise((resolve) => {
    let protocol = url.startsWith('https') ? https : require('http');
    protocol.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      resolve(res.statusCode === 200);
    }).on('error', () => resolve(false));
  });
}

async function run() {
  const finalImages = {};
  for (const [model, urls] of Object.entries(candidateUrls)) {
    let found = false;
    for (const url of urls) {
      const ok = await checkUrl(url);
      if (ok) {
        finalImages[model] = url;
        console.log(`[OK] ${model} -> ${url}`);
        found = true;
        break;
      }
    }
    if (!found) {
      console.log(`[FAIL] No valid URL found for ${model}`);
    }
  }
  require('fs').writeFileSync('working_images.json', JSON.stringify(finalImages, null, 2));
}

run();
