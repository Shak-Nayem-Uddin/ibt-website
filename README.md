# Imam Bukhari Trust Website (ইমাম বুখারী ট্রাস্ট)

Trilingual (বাংলা · English · العربية) institutional website for Imam Bukhari Trust, Dhaka.
Light & dark "glass" themes, a 3D gallery of the masjid & academic campus renders, a 3D construction tracker,
documentary-style Story Mode, registrations (Google Forms), donation channels and a full admin panel (CMS).

## Structure
| Path | What |
|---|---|
| `index.html` | App shell |
| `assets/app.js` · `app.css` | Public site (router, i18n, themes, pages, Story Mode, 3D gallery) |
| `assets/admin.js` | Admin panel (schema-driven CMS: drafts → preview → publish, uploads, inbox, audit log) |
| `assets/scene3d.js` | Three.js construction tracker |
| `assets/gas.js` · `assets/config.js` | Apps Script backend adapter. Put the web-app URL in `config.js` |
| `data/content.json` | Default (bundled) content. Published edits from the admin override it |
| `apps-script/Code.gs` | Backend: content in Drive, uploads in Drive, form submissions in a Google Sheet |
| `img/`, `fonts/` | IBT photos & architectural renders, self-hosted Noto Sans Bengali (OFL) |

## Hosting
GitHub Pages (Settings → Pages → Deploy from branch → `main` / root). No build step.

## Admin
Open `#admin`, log in with the password set in Apps Script (`setPassword`). Every publish is recorded in the audit log.
