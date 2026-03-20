import fs from 'node:fs';
import path from 'node:path';

const TARGET_FILES = [
  'content/performance.ts',
  'constants/performance.ts',
  'constants/hpcChecklist.ts',
  'constants/products.ts',
];

const NUMERIC_LITERAL = /"[^"\n]*\d[^"\n]*(?:%|ms|x|Tbps|k)[^"\n]*"|'[^'\n]*\d[^'\n]*(?:%|ms|x|Tbps|k)[^'\n]*'|`[^`\n]*\d[^`\n]*(?:%|ms|x|Tbps|k)[^`\n]*`/g;
const CLAIM_BACKED_HINT =
  /(claimTextById\(|getPerformanceClaim\(|claim\([^\n]*,[^\n]*,[^\n]*['"][a-zA-Z0-9]+['"])/;

const failures = [];

for (const relativeFile of TARGET_FILES) {
  const fullPath = path.join(process.cwd(), relativeFile);
  const content = fs.readFileSync(fullPath, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    if (!NUMERIC_LITERAL.test(line)) {
      NUMERIC_LITERAL.lastIndex = 0;
      return;
    }
    NUMERIC_LITERAL.lastIndex = 0;

    const isClaimBacked = CLAIM_BACKED_HINT.test(line);
    if (!isClaimBacked) {
      const literalMatch = line.match(NUMERIC_LITERAL)?.[0] ?? 'unknown-literal';
      failures.push(`${relativeFile}:${index + 1} -> ${literalMatch}`);
    }
  });
}

if (failures.length > 0) {
  console.error('Numeric claim validation failed. Found non-claim-backed literals:');
  failures.forEach((item) => console.error(` - ${item}`));
  process.exit(1);
}

console.log('Numeric claim validation passed.');
