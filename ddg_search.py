import urllib.request
import urllib.parse
import re
import json
import time

models = {
  "Kaabo Wolf King GTR": "site:voromotors.com",
  "Dualtron Thunder 3": "site:minimotorsusa.com",
  "NAMI Burn-E 3 Max": "site:fluidfreeride.com",
  "Apollo Phantom V3": "site:apolloscooters.co",
  "VSETT 10+": "site:fluidfreeride.com",
  "Kaabo Mantis King GT": "site:voromotors.com",
  "Mukuta 10+": "site:voromotors.com",
  "Teverun Fighter Supreme": "site:minimotorsusa.com"
}

results = {}

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
}

for model, site in models.items():
    query = urllib.parse.quote(f'"{model}" {site}')
    url = f"https://html.duckduckgo.com/html/?q={query}"
    
    try:
        req = urllib.request.Request(url, headers=headers)
        html = urllib.request.urlopen(req).read().decode('utf-8')
        
        # Look for a shopify CDN link in the snippet text or anywhere
        matches = re.findall(r'(https://[^"\'<>\s]+\.(?:jpg|webp|png))', html)
        for m in matches:
            if 'cdn.shopify.com' in m or 'cdn' in m:
                results[model] = m
                print(f"Found for {model}: {m}")
                break
        
        if model not in results:
            print(f"No CDN link found for {model}")
            
    except Exception as e:
        print(f"Error for {model}: {e}")
        
    time.sleep(2)

with open("ddg_images.json", "w") as f:
    json.dump(results, f, indent=2)

print("Done.")
