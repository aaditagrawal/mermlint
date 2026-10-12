import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
export const corpus = resolve('bench/corpus');
export function generate() {
  rmSync(corpus, { recursive: true, force: true });
  mkdirSync(corpus, { recursive: true });
  const diagrams = [
    i => `flowchart TD\nA${i}[Start] --> B${i}[Done]`,
    i => `sequenceDiagram\nA->>B: Message ${i}`,
    i => `classDiagram\nclass Item${i}\nItem${i} : +String name`,
    i => `stateDiagram-v2\n[*] --> State${i}\nState${i} --> [*]`,
    i => `erDiagram\nUSER${i} ||--o{ ORDER${i} : places`,
    i => `pie title Example ${i}\n"A" : 40\n"B" : 60`,
    i => `gantt\ntitle Example ${i}\ndateFormat YYYY-MM-DD\nsection Work\nTask : 2026-01-01, 2d`,
    i => `journey\ntitle Example ${i}\nsection Work\nTask: 5: User`,
    i => `flowchart TD\nA${i} -->`,
    i => `sequenceDiagram\nA->>B: Message ${i}\ninvalid statement`
  ];
  for (let i=0; i<400; i++) {
    const text = Array.from({length:5}, (_,n) => `\`\`\`mermaid\n${diagrams[(i*5+n)%diagrams.length](i*5+n)}\n\`\`\``).join('\n\n');
    writeFileSync(join(corpus, `note-${String(i).padStart(4,'0')}.md`), `# Note ${i}\n\n${text}\n`);
  }
  for (let i=0; i<600; i++) writeFileSync(join(corpus, `plain-${i}.md`), '# No diagrams\n'.repeat(30));
  writeFileSync(join(corpus, 'single.mmd'), 'flowchart TD\nA --> B\n');
}
if (process.argv[1] === new URL(import.meta.url).pathname) generate();
