import urllib.request
import re

urls = [
    "https://fluidfreeride.com/sitemap_products_1.xml",
    "https://www.voromotors.com/sitemap_products_1.xml",
    "https://minimotorsusa.com/sitemap_products_1.xml",
    "https://kaabousa.com/sitemap_products_1.xml"
]

keywords = {
    "wolf-king-gtr": "Kaabo Wolf King GTR",
    "nami-burn-e": "NAMI Burn-E 3 Max",
    "vsett-10": "VSETT 10+",
    "mukuta-10": "Mukuta 10+",
    "teverun-fighter-supreme": "Teverun Fighter Supreme"
}

headers = {'User-Agent': 'Mozilla/5.0'}

results = {}

for url in urls:
    print(f"Fetching {url}...")
    try:
        req = urllib.request.Request(url, headers=headers)
        html = urllib.request.urlopen(req).read().decode('utf-8')
        
        # Shopify XML has <image:loc>https://cdn.shopify.com/...</image:loc>
        # inside <url> tags which have <loc>
        urls_blocks = html.split('<url>')
        for block in urls_blocks:
            for kw, model in keywords.items():
                if kw in block.lower():
                    match = re.search(r'<image:loc>([^<]+)</image:loc>', block)
                    if match and model not in results:
                        results[model] = match.group(1).replace('&amp;', '&').split('?')[0]
                        print(f"FOUND: {model} -> {results[model]}")
    except Exception as e:
        print(f"Error {url}: {e}")

print(results)
