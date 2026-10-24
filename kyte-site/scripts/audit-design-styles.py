from pathlib import Path
import re,json,collections
root=Path(__file__).resolve().parents[1];src=root/'src'
files=[p for p in src.rglob('*') if p.suffix in ['.css','.tsx','.ts'] and 'graveyard' not in p.parts]
g=(src/'app/globals.css').read_text();palette={x.lower() for x in re.findall(r'#[0-9a-fA-F]{3,8}\b',g)}
def hexnorm(x):
 x=x.lower();return '#'+''.join(c*2 for c in x[1:]) if len(x)==4 else x
palette={hexnorm(x) for x in palette}
allowed={12,14,15,16,18,20,22,24,28,30,32,36,40,48,56,64,72,80,96,104,144,160,240}
items=[];custom=[];imports=collections.Counter()
for p in files:
 s=p.read_text();path=str(p.relative_to(root))
 def add(cat,m,value): items.append(dict(category=cat,path=path,line=s.count('\n',0,m.start())+1,value=value))
 if p.suffix=='.css':
  for m in re.finditer(r'(?<![\w-])font-size\s*:\s*([^;}]+)',s):
   v=m[1].strip()
   if re.fullmatch(r'[\d.]+px',v):add('unregistered_size' if float(v[:-2]) not in allowed else 'literal_size_matches_scale',m,v)
  for m in re.finditer(r'font-weight\s*:\s*(\d+)\s*(?=[;}])',s):
   if int(m[1]) not in [400,425,450]:add('undocumented_weight',m,m[1])
  for m in re.finditer(r'#[0-9a-fA-F]{3,8}\b',s):
   if p.name=='globals.css':continue
   add('literal_palette_color' if hexnorm(m[0]) in palette else 'color_outside_root_palette',m,m[0])
  for m in re.finditer(r'(?:rgba?|hsla?)\([^)]*\)',s):add('literal_function_color',m,m[0])
  for m in re.finditer(r'(?<![\w-])line-height\s*:\s*([^;}]+)',s):
   if m[1].strip() not in ['1.2','1.3','1.4','1.5','1.6','inherit'] and not m[1].strip().startswith('var('):add('off_scale_leading',m,m[1])
 if p.suffix=='.tsx':
  for m in re.finditer(r'<svg\b',s):custom.append(dict(path=path,line=s.count('\n',0,m.start())+1))
  for m in re.finditer(r'from\s+["\']([^"\']+)["\']',s):
   if 'icon' in m[1] or m[1]=='lucide-react':imports[m[1]]+=1
  for m in re.finditer(r'ArrowUpRight|↗',s):add('diagonal_action_arrow',m,m[0])
counts=dict(collections.Counter(x['category'] for x in items))
result=dict(scope='Active src CSS/TS/TSX, excluding graveyard. Source declaration inventory, not a computed-style assertion for every route or state.',files=len(files),css_files=sum(p.suffix=='.css' for p in files),page_modules=sum(p.name=='page.tsx' for p in files),counts=counts,icon_imports=dict(imports),custom_svg=custom,findings=items)
(root/'docs/audits/2026-10-24-style-inventory.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps({k:v for k,v in result.items() if k!='findings'},indent=2))
