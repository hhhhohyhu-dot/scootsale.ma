import urllib.request
import urllib.parse
import re
import os
import json

models = [
    "Kaabo Wolf King GTR electric scooter",
    "Dualtron Thunder 3 electric scooter",
    "NAMI Burn-E 3 Max electric scooter",
    "Segway GT3 Pro electric scooter",
    "Apollo Phantom V3 electric scooter",
    "INMOTION RS electric scooter",
    "VSETT 10+ electric scooter",
    "Kaabo Mantis King GT electric scooter",
    "Mukuta 10+ electric scooter",
    "Teverun Fighter Supreme electric scooter"
]

os.makedirs("public/scooters", exist_ok=True)
results = {}

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

for i, model in enumerate(models):
    print(f"Searching for {model}...")
    query = urllib.parse.quote(model)
    url = f"https://html.duckduckgo.com/html/?q={query}"
    
    try:
        req = urllib.request.Request(url, headers=headers)
        html = urllib.request.urlopen(req).read().decode('utf-8')
        
        # In duckduckgo html, we look for image links or external links that might contain images.
        # But image search is better. Let's try to query Yahoo Image Search or Bing.
        url = f"https://images.search.yahoo.com/search/images?p={query}"
        req = urllib.request.Request(url, headers=headers)
        html = urllib.request.urlopen(req).read().decode('utf-8')
        
        # Yahoo images have src='https://tse...
        # or data-src='https://tse...
        match = re.search(r"src='(https://tse[^']+)'", html)
        if match:
            img_url = match.group(1)
            # Download the image
            filename = f"public/scooters/scooter_{i}.jpg"
            urllib.request.urlretrieve(img_url, filename)
            results[model.replace(" electric scooter", "")] = f"/scooters/scooter_{i}.jpg"
            print(f"Downloaded {img_url} to {filename}")
        else:
            print(f"Could not find image for {model}")
            
    except Exception as e:
        print(f"Error for {model}: {e}")

with open("scooter_images.json", "w") as f:
    json.dump(results, f, indent=2)

print("Done.")
