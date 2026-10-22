from pathlib import Path
import re,json
import sys
root=Path(__file__).resolve().parents[1]/'src'
files={p.resolve():p for p in root.rglob('*') if p.is_file() and p.suffix in ['.tsx','.ts','.css','.json','.js'] and '/vendor/' not in str(p)}
graph={};unresolved=[]
for p in files:
 s=p.read_text(); refs=re.findall(r'''(?:from\s*|import\s*\(\s*|import\s*)["']([^"']+)["']''',s);graph[p]=[]
 for x in refs:
  if x.startswith('@/'):q=root/x[2:]
  elif x.startswith('.'):q=p.parent/x
  else:continue
  options=[q,*[Path(str(q)+ext) for ext in ['.ts','.tsx','.css','.json','.js']],q/'index.ts',q/'index.tsx']
  found=next((o.resolve() for o in options if o.exists() and o.is_file()),None)
  if found:graph[p].append(found)
  else:unresolved.append({'file':str(p.relative_to(root)),'import':x})
roots=[p for p in files if '/app/' in str(p) and p.name in ['page.tsx','layout.tsx','route.ts','error.tsx','not-found.tsx','loading.tsx','global-error.tsx']]
seen=set();todo=roots[:]
while todo:
 p=todo.pop()
 if p in seen:continue
 seen.add(p);todo.extend(graph.get(p,[]))
unused=[str(p.relative_to(root)) for p in files if p not in seen and '/app/graveyard/' not in str(p) and p.name!='next-env.d.ts']
build_only=['design-tokens/illustration-palette-assignments.json','design-tokens/illustration-brand.json','lib/deepmerge-compat.ts']
report={'files':len(files),'roots':len(roots),'buildOnly':build_only,'unused':[p for p in unused if p not in build_only],'unresolved':unresolved}
Path(sys.argv[1] if len(sys.argv)>1 else '/private/tmp/kyte-source-audit.json').write_text(json.dumps(report,indent=2));print(json.dumps(report,indent=2))
