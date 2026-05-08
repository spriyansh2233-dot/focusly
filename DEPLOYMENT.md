# Deployment Workflow - Focusly

To ensure stability during development, automatic deployments have been disabled. Follow these steps for manual deployments.

## 1. Vercel (Frontend)
- **Disable Auto-deploy**:
  - Go to **Project Settings** > **Git**.
  - Under **Deployment Strategy**, disable "Automatic Deployments" for the `main` branch.
- **Manual Deploy**:
  - Use the Vercel CLI: `vercel --prod`
  - Or go to the Vercel Dashboard > **Deployments** > **Create New Deployment**.

## 2. Render (Backend)
- **Disable Auto-deploy**:
  - Go to your Web Service in Render.
  - Go to **Settings**.
  - Set **Auto Deploy** to **No**.
- **Manual Deploy**:
  - Go to the Render Dashboard.
  - Click **Manual Deploy** > **Deploy latest commit**.

## 3. GitHub Actions (CI/CD)
- The pipeline now uses `workflow_dispatch`.
- **How to trigger**:
  - Go to your GitHub repository.
  - Click the **Actions** tab.
  - Select the **CI/CD Pipeline** workflow on the left.
  - Click **Run workflow** dropdown on the right.
  - Choose the target (all, backend, or frontend) and click **Run workflow**.

---

## Environment Variables Needed
Ensure these are set in your deployment platforms:

| Platform | Variable | Purpose |
| :--- | :--- | :--- |
| Render | `GEMINI_API_KEY` | Real AI Brain for learning paths, quizzes, and flashcards |
| Render | `SPRING_DATASOURCE_URL` | Supabase Connection URL |
| Vercel | `VITE_API_URL` | URL of your deployed Render backend |
