import urllib.request,urllib.parse,concurrent.futures,json,re,time,sys
from html.parser import HTMLParser
BASE=(sys.argv[1] if len(sys.argv)>1 else 'http://127.0.0.1:3002').rstrip('/')
class Page(HTMLParser):
 def __init__(self):super().__init__();self.links=set();self.assets=set();self.h1=0
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='h1':self.h1+=1
  if tag=='a' and a.get('href','').startswith('/') and not a['href'].startswith('//'):self.links.add(a['href'].split('#')[0].split('?')[0])
  if tag in ['img','video','source','script','link','iframe']:
   url=a.get('src') if tag!='link' else a.get('href')
   if url and url.startswith('/') and not url.startswith('//'):self.assets.add(url)
def fetch(path):
 try:
  with urllib.request.urlopen(BASE+urllib.parse.quote(path,safe='/%?=&()'),timeout=40) as r:return path,r.status,r.read().decode('utf-8','ignore'),None
 except Exception as e:return path,0,'',str(e)
queue={'/','/branding-marketing','/ui-ux-design-development','/work','/about','/careers','/industries','/insights','/contact','/privacy-policy','/terms','/design-system'};seen=set();assets=set();results=[]
while queue and len(seen)<150:
 batch=queue-seen;queue=set()
 with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:
  for path,status,html,error in pool.map(fetch,batch):
   seen.add(path);p=Page();p.feed(html);assets|=p.assets;queue|={l for l in p.links if l and not re.search(r'\.(pdf|png|svg|webp|mp4)$',l)};results.append({'path':path,'status':status,'h1':p.h1,'error':error})
 failures=[]
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
 for path,status,_,error in pool.map(fetch,assets):
  if status!=200:failures.append({'path':path,'status':status,'error':error})
report={'pages':len(results),'assets':len(assets),'pageFailures':[r for r in results if r['status']!=200],'headingFailures':[r for r in results if r['h1']!=1 and r['path']!='/design-system'],'assetFailures':failures,'routes':sorted(results,key=lambda x:x['path'])}
open(sys.argv[2] if len(sys.argv)>2 else '/private/tmp/kyte-http-report.json','w').write(json.dumps(report,indent=2));print(json.dumps({k:v for k,v in report.items() if k!='routes'},indent=2))
