# Nexus Scholar (OpenRouter App)

Educational, school-friendly AI assistant with Tutor / Research / Writing modes, Cost Cockpit, and streaming chat.

## Stack

- **Frontend**: React (Vite), Tailwind CSS, Framer Motion → deploy to GitHub Pages
- **Backend**: Cloudflare Worker (OpenRouter proxy, KV credits, vision model switch)
- **Auth**: Clerk (optional; Worker verifies JWT)

## Development

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Create `frontend/.env` with:

```
VITE_WORKER_URL=http://localhost:8787
```

### Worker

```bash
cd worker
npm install
```

Create a KV namespace and set its id in `worker/wrangler.toml`:

```bash
npx wrangler kv namespace create CREDITS
# Put the returned id in wrangler.toml under [[kv_namespaces]].id
```

Set secrets (or use `.dev.vars` for local):

```bash
npx wrangler secret put OPENROUTER_API_KEY
```

Run the worker:

```bash
npm run dev
```

Then open the frontend (e.g. http://localhost:5173) and use the chat. The Cost Cockpit shows token estimate and wallet; the Worker streams responses from OpenRouter and enforces the monthly credit cap (402 when over limit).
