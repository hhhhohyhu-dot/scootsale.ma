import urllib.request
import re

urls = [
    "https://www.voromotors.com/collections/electric-scooters",
    "https://fluidfreeride.com/collections/electric-scooters",
    "https://minimotorsusa.com/collections/electric-scooters"
]

headers = {
    'User-Agent': 'Mozilla/5.0'
}

all_imgs = set()

for url in urls:
    try:
        req = urllib.request.Request(url, headers=headers)
        html = urllib.request.urlopen(req).read().decode('utf-8')
        # Find Shopify CDN links
        matches = re.findall(r'https://cdn\.shopify\.com/[^"\']+\.(?:jpg|webp|png)', html)
        for m in matches:
            # clean url
            m = m.split('?')[0]
            # only grab product-like images (contains scooter names)
            m_lower = m.lower()
            if any(x in m_lower for x in ['wolf', 'kaabo', 'burn', 'nami', 'dualtron', 'thunder', 'vsett', 'mantis', 'mukuta', 'teverun', 'inmotion', 'apollo', 'phantom', 'segway', 'gt']):
                all_imgs.add(m)
    except Exception as e:
        print(e)

for img in list(all_imgs)[:50]:
    print(img)
