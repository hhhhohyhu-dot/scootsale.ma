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
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for model in models:
    query = urllib.parse.quote(f"{model} filetype:jpg")
    url = f"https://html.duckduckgo.com/html/?q={query}"
    
    try:
        req = urllib.request.Request(url, headers=headers)
        html = urllib.request.urlopen(req).read().decode('utf-8')
        
        # DDG HTML often has links in href
        matches = re.findall(r'href="([^"]+\.jpg)"', html)
        if not matches:
            # try finding in src
            matches = re.findall(r'src="([^"]+\.jpg)"', html)
            
        for m in matches:
            if 'http' in m:
                results[model] = m
                print(f"FOUND: {model} -> {m}")
                break
    except Exception as e:
        print(f"ERROR: {model} -> {e}")

with open('scooter_images.json', 'w') as f:
    json.dump(results, f, indent=2)
