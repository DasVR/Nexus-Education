# Nexus Scholar (OpenRouter App)

Educational, school-friendly AI assistant with Tutor / Research / Writing modes, Cost Cockpit, and streaming chat.

## Stack

- **Frontend**: React (Vite), Tailwind CSS, Framer Motion → deploy to **GitHub Pages**
- **Backend**: Cloudflare Worker (OpenRouter proxy, KV credits, vision model switch)
- **Auth**: Clerk (optional; Worker verifies JWT)

---

## Deploy to GitHub Pages

The frontend is set up to build and deploy to GitHub Pages via GitHub Actions.

### 1. Enable GitHub Pages

1. Open your repo on GitHub → **Settings** → **Pages**.
2. Under **Build and deployment**:
   - **Source**: select **GitHub Actions** (not “Deploy from a branch”).

### 2. (Optional) Set the Worker URL for production

The app calls your Cloudflare Worker for chat. For the **published** site to work, the build must know the Worker URL:

1. **Settings** → **Secrets and variables** → **Actions**.
2. Click **New repository secret**.
3. Name: `VITE_WORKER_URL`
4. Value: your Worker URL, e.g. `https://nexus-scholar-worker.<your-subdomain>.workers.dev`

If you don’t set this, the deployed app will still build and load, but it will use `http://localhost:8787` as the Worker URL (so chat will only work when you run the worker locally and use the same origin or CORS).

### 3. Deploy

- **Automatic**: Every push to `main` runs the **Deploy to GitHub Pages** workflow and deploys the built frontend.
- **Manual**: **Actions** → **Deploy to GitHub Pages** → **Run workflow**.

After the workflow finishes, the site is available at:

**https://\<your-username\>.github.io/\<repo-name\>/**

Example: `https://myuser.github.io/OpenRouterApp/`

### 4. If your repo name is not `OpenRouterApp`

The app’s base path is set to `/<repo-name>/` so assets load correctly on GitHub Pages. The workflow uses the repo name automatically. If you renamed the repo, no change is needed.

---

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

### Deploy the Worker to Cloudflare

```bash
cd worker
npx wrangler deploy
```

Use the reported Worker URL as `VITE_WORKER_URL` in GitHub Actions (see above) so the GitHub Pages site talks to your deployed Worker.
