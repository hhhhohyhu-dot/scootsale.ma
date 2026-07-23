import urllib.request
import re
import json
import time

models = [
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
]

results = {}

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
}

for model in models:
    query = model.replace(' ', '+')
    url = f"https://www.bing.com/images/search?q={query}+electric+scooter"
    print(f"Searching {model} on Bing...")
    try:
        req = urllib.request.Request(url, headers=headers)
        html = urllib.request.urlopen(req).read().decode('utf-8')
        # Bing images have murl:"https://..."
        match = re.search(r'murl&quot;:&quot;(http[^&]+(?:jpg|png|webp))', html)
        if match:
            results[model] = match.group(1)
            print(f"[OK] {model} -> {results[model]}")
        else:
            print(f"[FAIL] {model}")
    except Exception as e:
        print(f"[ERROR] {model} : {e}")
    time.sleep(1)

with open('bing_images.json', 'w') as f:
    json.dump(results, f, indent=2)

print("Done.")
