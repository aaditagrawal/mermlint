import { cpSync, existsSync, mkdirSync, realpathSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
export function installSkill(args) {
  let destination; let force = false;
  for (let i=0;i<args.length;i++) {
    const arg=args[i];
    if (arg==='--force') { force=true; continue; }
    let next;
    if (arg==='--claude') next=join(homedir(), '.claude', 'skills');
    else if (arg==='--codex') next=join(homedir(), '.codex', 'skills');
    else if (arg==='--project') next=resolve('.claude/skills');
    else if (arg==='--dir' && args[i+1] && !args[i+1].startsWith('--')) next=resolve(args[++i]);
    else throw new Error(`Unknown or incomplete install-skill option: ${arg}`);
    if (destination) throw new Error('Choose one of --claude, --codex, --project, or --dir PATH.');
    destination=next;
  }
  destination ||= resolve('.claude/skills');
  // Locate the package from either src/ or bundled dist/chunks/.
  let root=dirname(fileURLToPath(import.meta.url));
  while (!existsSync(join(root,'agent-skills/mermaid-linter/SKILL.md'))) {
    const parent=dirname(root);
    if(parent===root) throw new Error('Bundled mermaid-linter skill is missing.');
    root=parent;
  }
  const source=join(root,'agent-skills/mermaid-linter');
  const target=join(destination,'mermaid-linter');
  mkdirSync(destination,{recursive:true});
  if (resolve(realpathSync(destination),'mermaid-linter')===resolve(realpathSync(source))) throw new Error('Cannot install the skill over its own source.');
  if (existsSync(target) && !force) throw new Error(`Skill already exists: ${target}. Use --force to overwrite it.`);
  cpSync(source,target,{recursive:true,force, errorOnExist: !force, dereference:false});
  return target;
}
