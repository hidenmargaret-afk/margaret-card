# How to Deploy Margaret's AI Business Card

This is a step-by-step guide written for someone who has never deployed a website before. You'll need about 30 minutes and a computer with internet access.

---

## What You'll Be Setting Up

Your interactive AI business card will live at a URL like `margaret-card.vercel.app`. You'll print a QR code linking to that URL on a physical card. When someone scans it, they'll land on your AI-powered card and can chat with your digital twin.

**What you'll need:**
- A GitHub account (free) — this is where your project files live
- A Vercel account (free) — this is what turns your files into a live website
- An Anthropic API key (pay-as-you-go) — this powers the AI responses

---

## Step 1: Create a GitHub Account

If you already have one, skip this.

1. Go to **github.com** and click **Sign Up**
2. Follow the prompts to create your account
3. Verify your email address

---

## Step 2: Upload This Project to GitHub

1. Log in to GitHub
2. Click the **+** button in the top-right corner → **New repository**
3. Name it `margaret-card`
4. Make sure **Public** is selected
5. Click **Create repository**
6. On the next page, you'll see an option that says **"uploading an existing file"** — click that link
7. Drag and drop ALL the files and folders from this project into the upload area:
   - `app/` (folder — contains `layout.js`, `page.js`, `globals.css`, and the `api/` subfolder)
   - `public/` (folder — empty, but needed)
   - `package.json`
   - `next.config.js`
   - `.gitignore`
   - `.env.example`
8. Click **Commit changes**

**Important:** Make sure the folder structure is preserved. The `app` folder should contain `layout.js`, `page.js`, `globals.css`, and an `api` folder. Inside `api` there should be a `chat` folder with `route.js`.

---

## Step 3: Get Your Anthropic API Key

1. Go to **console.anthropic.com**
2. Create an account or log in
3. Go to **Settings** → **API Keys**
4. Click **Create Key**
5. Copy the key — it starts with `sk-ant-...`
6. Add some credits to your account (Settings → Billing). Start with $5 — this will last a very long time for casual conference use. Each conversation costs fractions of a penny.

**Keep this key secret.** Don't share it or post it anywhere public.

---

## Step 4: Deploy on Vercel

1. Go to **vercel.com** and click **Sign Up**
2. Choose **Continue with GitHub** and authorize Vercel to access your GitHub
3. Once logged in, click **Add New...** → **Project**
4. You'll see your `margaret-card` repository listed — click **Import**
5. Before clicking Deploy, expand **Environment Variables**
6. Add your API key:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** paste your API key (the `sk-ant-...` one)
   - Click **Add**
7. Click **Deploy**

Vercel will build your project (takes about 1-2 minutes). When it's done, you'll see a success screen with a URL like `margaret-card.vercel.app`. **That's your live card!**

---

## Step 5: Create Your QR Code

1. Go to **qr.io** or **qrcode-monkey.com** (both free)
2. Paste your Vercel URL
3. Customize the QR code style if you want (colors, rounded dots, etc.)
4. Download the QR code image as a high-resolution PNG

---

## Step 6: Design Your Physical Card

Print a minimal business card with:
- Your name: **Margaret Hiden**
- Your title: **UX Research & Strategy**
- The QR code
- A line like: *"Scan to meet my AI twin"* or *"Ask my AI anything"*

Services like **Moo.com**, **Vistaprint**, or **Canva Print** let you design and order cards easily.

---

## Cost Expectations

- **GitHub:** Free
- **Vercel:** Free (hobby tier is plenty for this)
- **Anthropic API:** Pay-as-you-go. Each conversation costs roughly $0.01–0.03. A full day at a conference with 50 people chatting would cost about $1–2.
- **Rate limiting is built in:** The app limits each visitor to 30 messages per hour so no one can run up your bill.

---

## If Something Goes Wrong

- **"API key not configured" error:** Go to your Vercel dashboard → your project → Settings → Environment Variables. Make sure `ANTHROPIC_API_KEY` is there and spelled exactly right.
- **Build fails on Vercel:** Check that your folder structure matches what's described in Step 2. The most common issue is files being in the wrong folder.
- **AI gives weird answers:** The personality and knowledge are defined in `app/api/chat/route.js`. You can edit this file on GitHub to update your background info anytime — Vercel will automatically redeploy.

---

## Updating Your Card Later

Whenever you want to change something (new project to add, tweak the design, update your bio), just edit the files on GitHub. Vercel automatically rebuilds and redeploys every time you save changes. No extra steps needed.
