# Vault Sync Prompt

Sync vault notes into AIworkloads constants for: [topic]

Vault path: ~/Library/Mobile Documents/iCloud~md~obsidian/Documents/PolymathOS/[path]

Steps:
1. Read the current constants file: constants/[topic].ts
2. Read the relevant vault notes (list them)
3. Gap analysis: report what's in the vault but missing or outdated in the constants.
   Do not write any code yet — report first.
4. After gap analysis is approved: update constants/[topic].ts
5. Run: npx tsc --noEmit && npm run lint

Rules:
- Use claim() for all sourced values (verificationStatus per CLAUDE.md rules)
- Do not paraphrase CLI syntax — copy verbatim from vault
- Run validate-claim-sources.mjs and validate-claim-ids.mjs after writing
