# Nexus Scholar (OpenRouter App)

Educational, school-friendly AI assistant with Tutor / Research / Writing modes, Cost Cockpit, and streaming chat.

## Stack

- **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Clerk → deploy to **GitHub Pages**
- **Backend**: Cloudflare Worker (OpenRouter proxy, KV credits, vision model switch)
- **Auth**: **Clerk** – frontend signs in; Worker verifies JWT via JWKS

---

## Setting up Clerk (Frontend + Worker)

The app uses [Clerk](https://clerk.com) for sign-in. The frontend shows Clerk’s Sign In UI when not authenticated; the Worker verifies the session JWT and uses the user id for credits.

### 1. Create a Clerk application

1. Go to [dashboard.clerk.com](https://dashboard.clerk.com) and sign in or create an account.
2. Create a new application (or use an existing one).
3. In **Configure** → **Domains**, add:
   - `http://localhost:5173` for local dev
   - Your GitHub Pages URL, e.g. `https://<username>.github.io/<repo-name>`

### 2. Frontend (env + build)

1. In the Clerk Dashboard, open **API Keys** and copy the **Publishable key** (starts with `pk_test_` or `pk_live_`).
2. In the repo, create or edit **`frontend/.env`**:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
   VITE_WORKER_URL=http://localhost:8787
   ```
3. For **production** (GitHub Actions), add a repository secret:
   - **Settings** → **Secrets and variables** → **Actions** → **New repository secret**
   - Name: `VITE_CLERK_PUBLISHABLE_KEY`
   - Value: your Clerk publishable key (same as above, or use `pk_live_` for production)

The frontend will then show Clerk’s sign-in when the user is not signed in, and send the session JWT in the `Authorization: Bearer <token>` header to the Worker.

### 3. Worker (verify JWT)

The Worker verifies the Clerk JWT using JWKS and uses the token’s `sub` claim as the user id for credits.

1. In the Clerk Dashboard, open **API Keys** and note your **Frontend API** URL (e.g. `https://xxx.clerk.accounts.dev`). This is your Clerk “issuer” URL.
2. Set one of these on the Worker (secrets or vars):

   **Option A – Issuer URL (recommended)**  
   Set the Frontend API URL; the Worker will fetch keys from `/.well-known/jwks.json`:
   ```bash
   cd worker
   npx wrangler secret put CLERK_ISSUER_URL
   # When prompted, paste: https://<your-frontend-api>.clerk.accounts.dev
   ```

   **Option B – Full JWKS URL**  
   If you prefer to set the JWKS URL directly:
   ```bash
   npx wrangler secret put CLERK_JWKS_URL
   # When prompted, paste: https://<your-frontend-api>.clerk.accounts.dev/.well-known/jwks.json
   ```

3. Redeploy the Worker after setting the secret:
   ```bash
   npx wrangler deploy
   ```

If neither `CLERK_ISSUER_URL` nor `CLERK_JWKS_URL` is set, the Worker still runs but treats the Bearer token as an opaque string and derives a fallback user id (suitable only for local/dev). For production, set one of them so credits are per Clerk user.

### 4. Optional: restrict to school domains

To allow only certain email domains (e.g. `@school.edu`), you can:

- Use Clerk’s **Allowlist** in **Configure** → **Email, phone, username** (restrict sign-up to specific domains), or
- In the Worker, after verifying the JWT, decode the payload and check the `email` claim (or call Clerk’s API) and return 403 if the domain is not allowed.

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
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx   # from Clerk Dashboard → API Keys
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
npx wrangler secret put CLERK_ISSUER_URL    # e.g. https://xxx.clerk.accounts.dev (from Clerk Dashboard)
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
