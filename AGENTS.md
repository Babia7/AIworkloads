# AGENTS.md

## Scope
These instructions apply to the entire repository.

## Working directory
- Front-end app lives in `ai-networking-education-center/`.
- Run Node/Vite commands from that directory.

## Common workflows and commands
```bash
cd ai-networking-education-center
npm install
npm run dev
npm run build
npm run preview
npm run lint
npm run check:claim-sources
npm run check:claim-ids
```

## Deployment workflow (Cloud Run source deploy)
```bash
cd ai-networking-education-center
gcloud run deploy aiworkloads \
  --source . \
  --project=infralens-486218 \
  --region=europe-west1
```

## TODO
- Add any new validated repo workflows here when introduced (prefer exact commands from README/package scripts).
