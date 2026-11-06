# Deploying Safari Sam through GHL (Way 1)

1. Make a new **public** GitHub repo, e.g. `safari-sam-world`. Upload the CONTENTS of `safari-sam-world/`
   (including the hidden `.nojekyll` file and the `shared` folder), so `index.html` is at the top.
2. Repo Settings, Pages, deploy from branch `main`, folder `/ (root)`. Wait a minute for the link:
   `https://<your-name>.github.io/safari-sam-world/`
3. Rebuild the snippets with your real link (from "Safari Sam"):
   `node deploy/make-deploy.mjs https://<your-name>.github.io/safari-sam-world`
   then open `GHL-iframe-snippets.md`.
4. In GHL: Sites, Funnels or Websites, new page, full-width section with no padding,
   add a Custom JS/HTML element, paste one snippet, Publish. One GHL page per option (or just the chooser).
5. Test on a real phone.

After any change to `prototypes/`, re-run the build and upload the folder again (replace the files).
`safari-sam-world/` is generated, so never edit it by hand. The pages carry "noindex" so Google will not list them.
