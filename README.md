# 🔐 CyberDadIT — Hugo Portfolio

Your cybersecurity portfolio rebuilt with [Hugo](https://gohugo.io/), a fast static site generator. Same beautiful design, but now with markdown-powered content management.

## Why Hugo?

- **Write in Markdown** — no more editing raw HTML to add blog posts or projects
- **Automatic builds** — push to GitHub, site deploys automatically via GitHub Actions
- **Blazing fast** — Hugo generates your entire site in milliseconds
- **Screenshots in posts** — just drop images in a folder and reference them in markdown
- **All security fixes included** — CSP headers, noopener, honeypot, input limits

---

## 📁 Project Structure

```
cyberdadit/
├── .github/workflows/hugo.yml   ← Auto-deploy on push
├── assets/
│   ├── css/styles.css            ← Your theme styles
│   └── js/script.js              ← Animations & interactions
├── content/
│   ├── blog/                     ← Blog posts (Markdown)
│   │   ├── _index.md
│   │   ├── getting-started-tryhackme.md
│   │   ├── hackthebox-basic-pentesting.md
│   │   └── essential-linux-commands.md
│   └── projects/                 ← Project cards (Markdown)
│       ├── network-scanner.md
│       ├── password-checker.md
│       └── vulnerable-webapp.md
├── layouts/
│   ├── _default/baseof.html      ← Base HTML template
│   ├── index.html                ← Homepage with all sections
│   ├── blog/
│   │   ├── list.html             ← Blog listing page
│   │   └── single.html           ← Individual blog post
│   └── partials/
│       ├── nav.html              ← Navigation bar
│       └── footer.html           ← Footer
├── static/
│   ├── CNAME                     ← Custom domain config
│   └── images/
│       ├── projects/             ← Project/lab screenshots
│       └── blog/                 ← Blog post images
└── hugo.toml                     ← Site configuration
```

---

## 🚀 Quick Start

### Prerequisites

Install Hugo: https://gohugo.io/installation/

### Run Locally

```bash
cd cyberdadit
hugo server -D
```

Visit `http://localhost:1313` to see your site.

### Build for Production

```bash
hugo --minify
```

Output goes to the `public/` folder.

---

## ✏️ How to Add Content

### Add a New Blog Post

Create a new file in `content/blog/`:

```bash
hugo new blog/my-new-post.md
```

Or manually create a file like `content/blog/my-writeup.md`:

```markdown
---
title: "My Nmap Lab Writeup"
date: 2026-02-20
category: "Writeup"
excerpt: "A detailed walkthrough of my Nmap network scanning lab."
---

## Objective

In this lab I performed network reconnaissance using Nmap...

## Scan Results

![Nmap scan output](/images/blog/nmap-results.png)

The scan revealed several open ports...

## Lessons Learned

- Always start with a broad scan before going deep
- Service version detection helps identify vulnerabilities
```

That's it — Hugo automatically picks it up and adds it to your blog section.

### Add a New Project

Create a file in `content/projects/`:

```markdown
---
title: "My New Tool"
description: "Short description shown on the project card."
tags: ["Python", "Security", "Automation"]
github: "https://github.com/yourusername/my-tool"
demo: "https://demo-link.com"
weight: 4
screenshot: "/images/projects/my-tool-screenshot.png"
---

Detailed writeup content goes here (shown on the project's own page).
```

### Add Lab Screenshots

1. Save your screenshot (PNG or JPG)
2. Drop it into `static/images/projects/` or `static/images/blog/`
3. Reference it in your markdown:

```markdown
![Description of screenshot](/images/projects/my-screenshot.png)
```

Or for projects, set `screenshot` in the front matter to show it on the card.

---

## ⚙️ Configuration

Edit `hugo.toml` to change:

- **Your name & title** — `params.author`, `params.description`
- **Social links** — `params.social.github`, etc.
- **Skills** — `params.technicalSkills` and `params.tools` arrays
- **Timeline** — `params.timeline` entries
- **Formspree** — `params.formspreeID` (replace YOUR_FORM_ID)

---

## 🌐 Deploy to cyberdadit.com

### Step 1: Create GitHub Repo

Create a new repo (e.g., `cyberdadit`) on GitHub.

### Step 2: Push Your Code

```bash
cd cyberdadit
git init
git add .
git commit -m "Initial Hugo portfolio"
git branch -M main
git remote add origin https://github.com/yourusername/cyberdadit.git
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to repo **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. The workflow file (`.github/workflows/hugo.yml`) handles the rest

### Step 4: Configure Namecheap DNS

In Namecheap → Advanced DNS for `cyberdadit.com`:

| Type | Host | Value |
|------|------|-------|
| A Record | @ | 185.199.108.153 |
| A Record | @ | 185.199.109.153 |
| A Record | @ | 185.199.110.153 |
| A Record | @ | 185.199.111.153 |
| CNAME | www | yourusername.github.io. |

### Step 5: Set Custom Domain in GitHub

Settings → Pages → Custom domain → type `cyberdadit.com` → Save → Enable HTTPS.

### Step 6: Done!

Every `git push` now automatically rebuilds and deploys your site.

---

## 🔄 Update Workflow

```bash
# 1. Make changes (edit markdown, add images, etc.)
# 2. Test locally
hugo server -D

# 3. Push to deploy
git add .
git commit -m "Added new lab writeup"
git push
```

Site updates live in ~2 minutes.

---

## 🔒 Security Features Included

- Content Security Policy (CSP) meta tag
- `rel="noopener noreferrer"` on all external links
- Formspree integration with honeypot spam protection
- Input length limits on contact form
- `<noscript>` fallback for JS-disabled browsers
- Cursor trail DOM flood protection
- Safe lab-only IPs in hero section
- Referrer policy header
