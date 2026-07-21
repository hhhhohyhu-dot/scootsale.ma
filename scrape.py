import urllib.request
import re

urls = [
    'https://www.youpi.co.ma/trottinette-electrique-m41.html',
    'https://jouet-maroc.com/produits/tank-m41',
    'https://www.jumia.ma/ar/ecoxtrem-trottinette-electrique-m41-tank-ultimate-2000w-batterie-48v-16ah-55-kmh-67984898.html',
    'https://jouet-maroc.com/produits/m41-tank-double-moteur'
]

for url in urls:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            html = response.read().decode('utf-8')
            print(f'\n--- {url} ---')
            images = re.findall(r'<img[^>]+src=\"([^\"]+)\"[^>]*>', html)
            for img in set(images):
                if 'jpg' in img or 'png' in img or 'jpeg' in img or 'webp' in img:
                    if 'logo' not in img.lower() and 'icon' not in img.lower():
                        print(img)
    except Exception as e:
        print(f'Failed {url}: {e}')
