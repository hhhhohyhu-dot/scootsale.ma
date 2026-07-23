import urllib.request
import urllib.parse
import re
import json

models = [
    "Kaabo Wolf King GTR scooter",
    "Dualtron Thunder 3 scooter",
    "NAMI Burn-E 3 Max scooter",
    "Segway GT3 Pro scooter",
    "Apollo Phantom V3 scooter",
    "INMOTION RS electric scooter",
    "VSETT 10+ scooter",
    "Kaabo Mantis King GT scooter",
    "Mukuta 10+ scooter",
    "Teverun Fighter Supreme scooter"
]

results = {}

# Old user agent forces Google to serve simple HTML with direct image tags
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1'
}

for model in models:
    query = urllib.parse.quote(model)
    url = f"https://www.google.com/search?q={query}&tbm=isch"
    print(f"Searching for {model}...")
    
    try:
        req = urllib.request.Request(url, headers=headers)
        html = urllib.request.urlopen(req).read().decode('utf-8')
        
        # Find the first image link that looks like a gstatic image
        # In old Google Images HTML, images are inside <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:..." />
        match = re.search(r'<img[^>]+src="(https://encrypted-tbn0\.gstatic\.com/images\?q=tbn:[^"]+)"', html)
        if match:
            img_url = match.group(1)
            # Unescape HTML entities if any
            img_url = img_url.replace("&amp;", "&")
            key = model.replace(" scooter", "").replace(" electric", "")
            results[key] = img_url
            print(f"Found for {key}: {img_url}")
        else:
            print(f"No image found for {model}")
            
    except Exception as e:
        print(f"Error for {model}: {e}")

with open("google_images.json", "w") as f:
    json.dump(results, f, indent=2)

print("Done.")
