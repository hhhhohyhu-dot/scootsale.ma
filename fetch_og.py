import urllib.request
import re
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

urls = {
  "Kaabo Wolf King GTR": "https://kaabousa.com/products/kaabo-king-gtr-max",
  "NAMI Burn-E 3 Max": "https://fluidfreeride.com/products/nami-burn-e-3-max",
  "VSETT 10+": "https://fluidfreeride.com/products/vsett-10-plus",
  "Kaabo Mantis King GT": "https://kaabousa.com/products/mantis-king-gt",
  "Mukuta 10+": "https://www.voromotors.com/products/mukuta-10-plus",
  "Teverun Fighter Supreme": "https://minimotorsusa.com/products/teverun-fighter-supreme"
}

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for name, url in urls.items():
    try:
        req = urllib.request.Request(url, headers=headers)
        html = urllib.request.urlopen(req, context=ctx).read().decode('utf-8')
        match = re.search(r'<meta property="og:image" content="([^"]+)"', html)
        if match:
            img = match.group(1).split('?')[0]
            if img.startswith('//'): img = 'https:' + img
            print(f"FOUND|{name}|{img}")
        else:
            print(f"NO_IMAGE|{name}|{url}")
    except Exception as e:
        print(f"ERROR|{name}|{e}")
