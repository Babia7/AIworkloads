import fs from 'node:fs';
import path from 'node:path';

const checks = [
  { file: 'constants/products.ts', pattern: /\bdesc:\s*claim\(/g, minimum: 5, label: 'product descriptions' },
  { file: 'constants/products.ts', pattern: /\bspecs:\s*\[(?:.|\n)*?claim\(/g, minimum: 5, label: 'product specs arrays' },
  { file: 'constants/performance.ts', pattern: /\bname:\s*claim\(/g, minimum: 4, label: 'performance/failover labels' },
  { file: 'constants/concepts.ts', pattern: /\bdescription:\s*claim\(/g, minimum: 3, label: 'core concept descriptions' },
  { file: 'constants/concepts.ts', pattern: /\bfeatures:\s*\[(?:.|\n)*?claim\(/g, minimum: 3, label: 'core concept feature arrays' },
  { file: 'constants/concepts.ts', pattern: /\bdesc:\s*claim\(/g, minimum: 3, label: 'scaling desc claims' },
  { file: 'constants/concepts.ts', pattern: /\bdetails:\s*claim\(/g, minimum: 3, label: 'scaling details claims' },
  { file: 'constants/hpcChecklist.ts', pattern: /\bpoints:\s*\[(?:.|\n)*?claim\(/g, minimum: 5, label: 'HPC point arrays' },
  { file: 'content/concepts.ts', pattern: /\bsubtitle:\s*claim\(/g, minimum: 1, label: 'concept subtitle claim' },
  { file: 'content/concepts.ts', pattern: /\bbypassCaption:\s*claim\(/g, minimum: 1, label: 'RDMA bypass claim' },
  { file: 'content/concepts.ts', pattern: /\bgoalBody:\s*claim\(/g, minimum: 1, label: 'NVMe goal claim' },
  { file: 'content/concepts.ts', pattern: /\babstractionNote:\s*claim\(/g, minimum: 1, label: 'abstraction claim' },
  { file: 'content/concepts.ts', pattern: /\bconnectionRequestBody:\s*claim\(/g, minimum: 1, label: 'request body claim' },
  { file: 'content/concepts.ts', pattern: /\bconnectionResponseBody:\s*claim\(/g, minimum: 1, label: 'response body claim' },
  { file: 'content/concepts.ts', pattern: /\binitConfirmBody:\s*claim\(/g, minimum: 1, label: 'init body claim' },
  { file: 'content/concepts.ts', pattern: /\btransparencySuffix:\s*claim\(/g, minimum: 1, label: 'transparency claim' },
  { file: 'content/performance.ts', pattern: /\bsubtitle:\s*claim\(/g, minimum: 1, label: 'performance subtitle claim' },
  { file: 'content/performance.ts', pattern: /\btrend:\s*(?:claim\(|getPerformanceClaim\()/g, minimum: 4, label: 'performance trend claims' },
];

const base = process.cwd();
const failures = [];

for (const check of checks) {
  const fullPath = path.join(base, check.file);
  const content = fs.readFileSync(fullPath, 'utf8');
  const matches = content.match(check.pattern) ?? [];
  if (matches.length < check.minimum) {
    failures.push(
      `${check.file}: expected at least ${check.minimum} ${check.label}, found ${matches.length}`
    );
  }
}

if (failures.length > 0) {
  console.error('Claim source validation failed:\n' + failures.map((item) => ` - ${item}`).join('\n'));
  process.exit(1);
}

console.log('Claim source validation passed.');
