# Karma Tejasvi Khel Vikas Sangathan Website

A static, bilingual Hindi–English website for Karma Tejasvi Khel Vikas Sangathan.

## Preview locally
1. Extract the project ZIP.
2. Open `index.html` in a modern browser. The site works without a backend.
3. Hindi is selected by default for first-time visitors. Use the language button in the header to switch to English or Hindi.

For the most consistent local preview, you may also serve the folder with any static web server (for example, `python -m http.server 8000`) and open `http://localhost:8000`.

## Language behaviour
- Shared language manager: `assets/language.js`
- Hindi is the first-visit default.
- The selected language is saved in browser `localStorage` and is retained while navigating between pages on the same site.
- Each translated text unit uses `data-hi` and `data-en` attributes.
- The manager updates the document language, page title, description, accessible image labels and dynamically inserted translated components.
- No backend or translation API is required.

## Pages
- `index.html` — Home
- `about.html` — About the organisation
- `training.html` — Training and activities
- `events.html` — Events and news
- `gallery.html` — Photo gallery
- `contact.html` — Contact
- `404.html` — Not found page

## Deployment with GitHub Pages
The existing `.github/workflows/` deployment workflows are retained. Push the extracted project contents to the repository's configured branch and keep the existing GitHub Pages workflow settings. No build step is required; this is a static HTML/CSS/JavaScript website.

## Project assets
All original photographs, the logo and existing asset paths are retained. Do not move files out of `assets/` unless you also update their references.

## Notes
- Contact details and organisation information are retained from the supplied source website.
- The language preference is stored per browser and domain. A locally saved preference does not automatically transfer to a different browser or device.
