# Sravan Kumar — Azure Data Engineer Portfolio

A responsive React + Vite portfolio with a dark navy/azure visual system, responsive navigation, skills, project case-study modals, experience, credentials, education, achievements, and contact links.

## Important: personalize before publishing

This starter uses known profile context where available and placeholders where details were not verified. Do not publish placeholders or draft claims as facts.

Edit `src/data.js`:
- Replace `YOUR_EMAIL@example.com`, LinkedIn, and GitHub placeholders.
- Add your resume as `public/resume.pdf`, or change `profile.resume`.
- Confirm employment dates and replace the experience bullets with real responsibilities.
- Confirm certification status, dates, and official credential URLs.
- Verify education dates/grades before showing them.
- Rewrite project descriptions and implementation notes to match what you actually built.
- Add only measured metrics. Do not claim 200 GB migration or performance improvements unless you can substantiate them.
- Label planned/demo projects as such; do not imply that a design template is production experience.

## Run locally

Prerequisite: Node.js 20+ recommended.

```bash
npm install
npm run dev
```

Vite prints a local URL, usually `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

The generated site is in `dist/`.

## Deploy to Azure Static Web Apps

1. Create a GitHub repository and push this project.
2. In the Azure portal, create **Static Web App**.
3. Choose your subscription, resource group, name, and **Free** plan if suitable.
4. Select GitHub, authorize Azure, and choose this repository and branch.
5. Configure the build:
   - Build preset: **Vite** if offered, otherwise **Custom**
   - App location: `/`
   - API location: leave empty
   - Output location: `dist`
6. Create the Static Web App. Azure sets up a GitHub Actions workflow.
7. Wait for the workflow to finish, then open the generated site URL.
8. Push future changes to the connected branch; the workflow will rebuild and deploy automatically.

Microsoft's current deployment walkthrough: https://learn.microsoft.com/en-us/azure/static-web-apps/deploy-react

## Azure build settings

For Vite, use output folder `dist` (not `build`). `public/staticwebapp.config.json` is copied into the build output by Vite.

If the portal-generated workflow uses an incorrect output path, edit its `app_location` / `output_location` values so the app builds from the repository root and publishes `dist`.

## Optional: deploy with Azure Static Web Apps CLI

```bash
npm install
npm run build
npx @azure/static-web-apps-cli deploy ./dist --env production
```

The CLI may ask you to log in or provide a deployment token. Never commit deployment tokens into Git.

## Project structure

```text
src/
  App.jsx       Main UI and interactive project case-study modal
  data.js       Profile content and editable portfolio data
  main.jsx      React entry point
  styles.css    Responsive theme and layout
public/
  staticwebapp.config.json
  resume.pdf    Add your PDF resume here (not included)
```

## Notes

- Contact links use placeholders until you update `src/data.js`.
- The contact section opens the visitor's email app using `mailto:`; it does not submit to a server.
- No database or backend is needed for this static portfolio.
- The skill-bar lengths are visual styling only; they are not proficiency scores.
