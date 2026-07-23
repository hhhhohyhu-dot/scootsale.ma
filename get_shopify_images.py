import urllib.request
import json
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

handles = {
    "Kaabo Wolf King GTR": "https://www.voromotors.com/products/kaabo-wolf-king-gtr.js",
    "NAMI Burn-E 3 Max": "https://fluidfreeride.com/products/nami-burn-e-3-max.js",
    "VSETT 10+": "https://fluidfreeride.com/products/vsett-10.js",
    "Kaabo Mantis King GT": "https://www.voromotors.com/products/kaabo-mantis-king-gt.js",
    "Mukuta 10+": "https://www.voromotors.com/products/mukuta-10-plus-electric-scooter.js",
    "Apollo Phantom V3": "https://apolloscooters.co/products/apollo-phantom.js"
}

results = {}

for name, url in handles.items():
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        res = urllib.request.urlopen(req, context=ctx).read()
        data = json.loads(res.decode('utf-8'))
        img = data.get('featured_image') or data.get('images', [])[0]
        if img:
            if img.startswith('//'):
                img = 'https:' + img
            results[name] = img
            print(f"[OK] {name} -> {img}")
    except Exception as e:
        print(f"[ERROR] {name}: {e}")

with open('shopify_images.json', 'w') as f:
    json.dump(results, f, indent=2)
