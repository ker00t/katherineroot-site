Backup of www.katherineroot.com
Downloaded 2026-08-12

This is a full archival snapshot of the live Squarespace site, taken before
moving the katherineroot-site project (the new site) onto this domain.

WHAT'S HERE

pages/
  Raw HTML for all 7 pages on the site (home, about-me, case-studies, the
  3 individual case study pages, and resume). Each file is the exact HTML
  the server returned — full page text/content is preserved here even if
  every other folder disappeared.

assets/images/  (42 files)
  Every real photo/screenshot/graphic referenced across all 7 pages,
  downloaded directly (not just linked) so they don't depend on
  Squarespace's CDN staying up. Filenames are prefixed with the first 8
  characters of their original Squarespace asset ID to avoid collisions
  between images that share a generic name (e.g. "spec.png").

assets/videos/  (9 files, .mp4)
  Every video embedded on the site, downloaded and reassembled into
  playable MP4s. Squarespace serves native video as encrypted HLS
  streams (not simple downloadable files), so these were fetched via
  the manifest, decrypted, and muxed locally — same content, standard
  MP4 container. Filenames are the original Squarespace video ID; see
  video_configs.json for which duration/source maps to which id.

assets/other/
  - KatherineRootResume_2026.pdf — the resume file linked from /resume
  - custom.css, site.css, static.css, site-bundle.js — Squarespace's own
    template styling/scripts for this site. Included for completeness,
    but these only render correctly inside Squarespace's platform — they
    won't produce a working page if opened standalone.

image_urls.txt / video_configs.json
  Reference lists of the original source URLs, in case anything needs
  re-fetching later.

CAVEATS

- The HTML in pages/ links out to Squarespace's CDN for its images/videos/
  styling (absolute https:// URLs), not to the local copies in assets/ —
  so double-clicking one of these HTML files will still pull most of its
  visuals live from Squarespace over the internet, not from this folder,
  for as long as Squarespace keeps serving them. The assets/ folder is
  the actual independent, offline-safe copy of the content itself.
- This captures the 7 pages Squarespace's own sitemap and navigation
  list. If there's a page on the site not linked from anywhere and not
  in the sitemap, it wouldn't have been found this way.
