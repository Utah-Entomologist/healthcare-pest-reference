# Deployment Guide for Healthcare Pest Reference

This guide takes you from "I have a folder of files" to "the site is live at
healthcarepestreference.org" in roughly 30-60 minutes. Written in plain
language. No web development experience required.

The plan: you will install one piece of software, register your domain at a
registrar that supports automated deployment, push the code to a free Git
hosting service, and connect everything together. After this initial setup,
adding new pages takes minutes — you edit one file, save, and the site updates
itself.

---

## Step 1 — Install Node.js (5 minutes)

Node.js is what builds the site from the source files. You need it installed
on your computer.

1. Go to https://nodejs.org/
2. Download the version labeled "LTS" (Long-Term Support) for your operating
   system (macOS or Windows)
3. Run the installer with default settings
4. After installation, open Terminal (Mac) or Command Prompt (Windows) and
   type: `node --version`
5. If you see something like `v20.x.x` you're done with this step

---

## Step 2 — Test the Site on Your Computer (10 minutes)

Before deploying, verify everything works locally.

1. Save the project folder you received somewhere you'll remember — for
   example, `Documents/healthcare-pest-reference`
2. Open Terminal (Mac) or Command Prompt (Windows)
3. Navigate to the folder. On Mac: `cd ~/Documents/healthcare-pest-reference`
   On Windows: `cd C:\Users\YourName\Documents\healthcare-pest-reference`
4. Install the dependencies: type `npm install` and press Enter. This takes
   1-3 minutes and downloads a lot of files into a `node_modules` folder.
5. Once finished, type `npm run dev` and press Enter
6. You'll see a message like "Local: http://localhost:4321/"
7. Open that address in your web browser. You should see the Healthcare Pest
   Reference website running on your computer.

Click around. Test the homepage, the authorities index, the about page, the
methodology page, and the three authority pages. Verify it all looks right.

When you're done, return to Terminal and press Ctrl+C to stop the local server.

---

## Step 3 — Register the Domain (10 minutes)

Register healthcarepestreference.org. Cloudflare Registrar is recommended
because it sells domains at cost, includes free privacy protection, and
integrates directly with Cloudflare Pages for hosting.

1. Create a Cloudflare account at https://dash.cloudflare.com/sign-up if you
   don't have one
2. From your Cloudflare dashboard, look for "Domain Registration" in the
   left sidebar
3. Search for `healthcarepestreference.org` and complete the purchase
   (approximately $11-13/year for a .org domain)
4. The domain will be added to your Cloudflare account automatically

If Cloudflare Registrar is unavailable or you prefer another registrar
(Namecheap, Porkbun, etc.), register the domain there but you will need to
change the nameservers to Cloudflare's nameservers later. This adds a step
but doesn't change the deployment plan.

---

## Step 4 — Create a GitHub Repository (10 minutes)

GitHub stores your code and triggers automatic deployment when you make
changes. The free tier is sufficient.

1. Create a GitHub account at https://github.com/signup if you don't have one
2. Once signed in, click the "+" in the top right corner, then "New
   repository"
3. Repository name: `healthcare-pest-reference`
4. Set it to "Public" (this is fine because all content is intended to be
   public)
5. Do NOT initialize with a README, .gitignore, or license — the project
   folder already has these
6. Click "Create repository"
7. On the next page, you'll see a section titled "...or push an existing
   repository from the command line". Keep this page open — you'll use the
   commands shortly.

Now from Terminal, in your project folder, run these commands one at a time
(replace `YourUsername` with your actual GitHub username):

```
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YourUsername/healthcare-pest-reference.git
git push -u origin main
```

You may be prompted to authenticate to GitHub. Follow the prompts. After
the final command finishes, refresh the GitHub page in your browser. You
should see all your project files there.

---

## Step 5 — Connect Cloudflare Pages (10 minutes)

Cloudflare Pages will build the site from your GitHub repository and serve
it on the internet for free.

1. From your Cloudflare dashboard, click "Workers & Pages" in the left
   sidebar
2. Click "Create application"
3. Select the "Pages" tab, then "Connect to Git"
4. Authorize Cloudflare to access your GitHub account
5. Select the `healthcare-pest-reference` repository
6. On the build configuration page:
   - **Project name:** `healthcare-pest-reference`
   - **Production branch:** `main`
   - **Framework preset:** Astro (select from dropdown)
   - **Build command:** `npm run build` (should be auto-filled)
   - **Build output directory:** `dist` (should be auto-filled)
7. Click "Save and Deploy"

Cloudflare will build the site (2-5 minutes for the first build). When it
finishes, you'll see a temporary URL like
`healthcare-pest-reference.pages.dev`. Click it to verify the site works.

---

## Step 6 — Connect the Custom Domain (5 minutes)

Now point healthcarepestreference.org at the Pages deployment.

1. From the Pages project page (in Cloudflare), click "Custom domains"
2. Click "Set up a custom domain"
3. Enter `healthcarepestreference.org` and click "Continue"
4. Cloudflare will automatically configure DNS records if the domain is on
   their nameservers. Click "Activate domain".
5. Also add `www.healthcarepestreference.org` as a custom domain so visitors
   typing "www." also reach the site

Within 5-15 minutes, https://healthcarepestreference.org will be live.

Visit the site to confirm. The first time you visit, the certificate
provisioning may take a few minutes — if you see a security warning, wait
10 minutes and reload.

---

## Step 7 — Submit to Google Search Console (5 minutes)

Google needs to know your site exists so it can index it.

1. Go to https://search.google.com/search-console
2. Click "Add property"
3. Select "URL prefix" and enter `https://healthcarepestreference.org`
4. Verify ownership. The easiest method via Cloudflare is the "HTML tag"
   method or DNS TXT record method. Follow Google's instructions.
5. Once verified, submit your sitemap. The sitemap URL is
   `https://healthcarepestreference.org/sitemap.xml`
6. Google will begin crawling and indexing within 24-72 hours

Repeat this process at https://www.bing.com/webmasters for Bing indexing.

---

## You Are Done With Initial Deployment

The site is live. Google is crawling it. Adding new authority pages from
here forward is a simple workflow:

1. Open the project folder on your computer
2. In `src/content/authorities/`, create a new Markdown file with the
   correct frontmatter and body
3. From Terminal in the project folder: `git add . && git commit -m
   "Add new authority page" && git push`
4. Cloudflare Pages will automatically rebuild and deploy within 1-2
   minutes

That's it. No re-deployment ritual. Just edit, commit, push.

---

## When You Need Help

If you get stuck on any step, the most common issues are:

- **`git push` asks for password and rejects it:** GitHub no longer accepts
  passwords for git operations. You need a Personal Access Token. GitHub
  has instructions at
  https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens
- **`npm install` fails:** Make sure Node.js was installed correctly.
  `node --version` should return a version number.
- **Cloudflare Pages build fails:** Click on the failed build to see the
  error log. Most build failures are syntax errors in Markdown frontmatter
  (a missing quote, a wrong date format, an invalid value in an enum field).
- **The custom domain doesn't load:** Wait 15-30 minutes for DNS
  propagation. If still not loading, verify the DNS records in Cloudflare's
  dashboard match what Pages expects.

Once the site is live, the operator who built this project can be asked to
review your setup and confirm everything is working correctly.
