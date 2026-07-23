import urllib.request
import re
import json
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
}

sources = {
    "kaabo-wolf-king-gtr": "https://www.voromotors.com/products/kaabo-wolf-king-gtr",
    "dualtron-thunder-3": "https://minimotorsusa.com/products/dualtron-thunder-3-electric-scooter",
    "nami-burn-e-3-max": "https://fluidfreeride.com/products/nami-burn-e-3-max",
    "segway-gt3-pro": "https://store.segway.com/segway-superscooter-gt2", # GT3 might not exist, but let's grab GT2
    "apollo-phantom-v3": "https://apolloscooters.co/products/apollo-phantom",
    "inmotion-rs": "https://www.voromotors.com/products/inmotion-rs-electric-scooter",
    "teverun-fighter-supreme": "https://minimotorsusa.com/products/teverun-fighter-supreme-electric-scooter",
    "vsett-10-plus": "https://fluidfreeride.com/products/vsett-10-electric-scooter",
    "kaabo-mantis-king-gt": "https://www.voromotors.com/products/kaabo-mantis-king-gt",
    "mukuta-10-plus": "https://www.voromotors.com/products/mukuta-10-plus-electric-scooter"
}

results = {}

for key, url in sources.items():
    print(f"Scraping {url}...")
    try:
        req = urllib.request.Request(url, headers=headers)
        html = urllib.request.urlopen(req, context=ctx).read().decode('utf-8')
        
        # Look for og:image
        match = re.search(r'<meta property="og:image" content="([^"]+)"', html)
        if match:
            img_url = match.group(1)
            # Fix if it starts with //
            if img_url.startswith('//'):
                img_url = 'https:' + img_url
            # Clean up URL parameters if needed, but usually shopify CDNs are fine
            img_url = img_url.split('?')[0] # remove query params for clean image
            results[key] = img_url
            print(f"Found: {img_url}")
        else:
            print(f"Could not find og:image for {key}")
            
    except Exception as e:
        print(f"Error for {key}: {e}")

with open("scooter_images.json", "w") as f:
    json.dump(results, f, indent=2)

print("Done.")
