---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: ["_layouts/article.html","_includes/header.html","_includes/footer.html"]
---

# Surface brief: Yarukinai.fm site refresh

Mode: Read (episode index, episode pages, show notes). Build path: code-led.

## Scope
Whole site: header, episode list, episode page, pagination, footer. Kept as is: header photo, episode page order (player -> description -> hosts -> topics), logo, link navy #1c3c7c, gray/white base. Mobile first.

## Direction contract

THESIS: The site is a hand-annotated zine of weekly episodes: marker numerals, highlighter underlines and slightly tilted panels frame the content, while the show notes stay a calm, readable column. It refuses the category default of a cover-art feed with rounded soft-shadow cards and a giant play button.

OWN-WORLD: White ground and the existing gray page, ink rgba(0,0,0,.87), link navy #1c3c7c. Highlighter yellow #ffe14d and pink #ff8fb1 appear only as small marks (title underline, number badge, current page). Marker face Yusei Magic for episode numerals and titles only (the site name keeps its original white system-sans look with a soft shadow); body stays the system sans at 17px/1.7. Panels have a 2px ink outline, 6px radius, no shadow, tilted at most 0.6deg; straight on hover and focus. Show-notes column has no tilt, no marker face, no decoration.

STORY: A returning listener sees the newest episode first, understands its length and who is on it from one panel, and reaches the player in one tap. On an episode page they hit play, then read the topics and links without friction. The show feels casual, never sloppy.

FIRST VIEWPORT: 390px wide. Header photo band 40px padding with the site name in its original white type over the photo. Below: episode panels, each with a pink round number badge at the left, a marker-face title, date and duration, host avatars; the whole panel is one tap target. The newest episode panel is larger. Pagination is outlined squares with the current page highlighter yellow.

FORM: Hand-drawn technical zine (catalog hand-drawn-zine-explainer, challenger chosen by the user, competitive verdict); user chose it over the assigned liner-notes and the model pick. Seed key a098792e. Palette conflict resolved by the user: keep the current gray/white/navy base and add highlighter colors.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
