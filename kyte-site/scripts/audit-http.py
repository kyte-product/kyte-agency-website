import urllib.request,urllib.parse,concurrent.futures,json,re,sys
from html.parser import HTMLParser
BASE=(sys.argv[1] if len(sys.argv)>1 else 'http://127.0.0.1:3002').rstrip('/')
MEDIA=re.compile(r'\.(pdf|txt|png|svg|webp|mp4|json)$')
class Page(HTMLParser):
 def __init__(self):super().__init__();self.links=set();self.assets=set();self.h1=0;self.title='';self.in_title=False;self.description=''
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='h1':self.h1+=1
  if tag=='title':self.in_title=True
  if tag=='meta' and a.get('name')=='description':self.description=a.get('content','')
  if tag=='a' and a.get('href','').startswith('/') and not a['href'].startswith('//'):
   link=a['href'].split('#')[0].split('?')[0]
   if MEDIA.search(link):self.assets.add(link)
   else:self.links.add(link)
  if tag in ['img','video','source','script','link','iframe']:
   url=a.get('src') if tag!='link' else a.get('href')
   if url and url.startswith('/') and not url.startswith('//'):self.assets.add(url)
 def handle_endtag(self,tag):
  if tag=='title':self.in_title=False
 def handle_data(self,data):
  if self.in_title:self.title+=data

def fetch(path,head=False):
 try:
  req=urllib.request.Request(BASE+urllib.parse.quote(path,safe='/%?=&()'),method='HEAD' if head else 'GET')
  with urllib.request.urlopen(req,timeout=40) as r:return path,r.status,'' if head else r.read().decode('utf-8','ignore'),None
 except Exception as e:return path,0,'',str(e)
queue={'/','/branding-marketing','/ui-ux-design-development','/work','/about','/careers','/industries','/insights','/contact','/privacy-policy','/terms','/design-system','/design-system/branding','/design-system/product'};seen=set();assets=set();results=[]
while queue and len(seen)<150:
 batch=queue-seen;queue=set()
 with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:
  for path,status,html,error in pool.map(fetch,batch):
   seen.add(path);p=Page();p.feed(html);assets|=p.assets;queue|={l for l in p.links if l and not MEDIA.search(l)};results.append({'path':path,'status':status,'h1':p.h1,'title':p.title,'description':p.description,'error':error})
try:
 manifest=json.loads(fetch('/hairline/variant-manifest.json')[2]);assets|={item[mode] for item in manifest['files'] for mode in ['original','brand']}
except (ValueError,KeyError):pass
failures=[]
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
 for path,status,_,error in pool.map(lambda path:fetch(path,True),assets):
  if status!=200:failures.append({'path':path,'status':status,'error':error})
report={'pages':len(results),'assets':len(assets),'pageFailures':[r for r in results if r['status']!=200],'headingFailures':[r for r in results if r['h1']!=1],'contentFailures':[r for r in results if not r['title'] or not r['description']],'assetFailures':failures,'routes':sorted(results,key=lambda x:x['path'])}
open(sys.argv[2] if len(sys.argv)>2 else '/private/tmp/kyte-http-report.json','w').write(json.dumps(report,indent=2));print(json.dumps({k:v for k,v in report.items() if k!='routes'},indent=2))
