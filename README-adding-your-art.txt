Already done
-------------
- Logo: images/logo.jpeg (header + footer)
- Photo: images/profile.jpeg (hero + About section)
- Homepage shows one flagship piece per medium (6 total, in index.html)
- gallery.html shows EVERY piece, filterable by medium, reading from
  data/artworks.json
- Each flagship card on the homepage links to "View all <medium>" ->
  gallery.html?medium=<oil|acrylic|watercolor|pencil|pen|wall>
- Contact email: choudhuryprasenjit81@gmail.com
- WhatsApp: +91 69099 89343

Adding a new piece to the full gallery (gallery.html)
--------------------------------------------------------
1. Drop the photo into the matching folder, e.g. images/oil/2.jpg
2. Add one entry to data/artworks.json:

   {
     "id": "unique-id-no-spaces",
     "title": "Piece Title",
     "medium": "oil",
     "mediumLabel": "Oil painting",
     "image": "images/oil/2.jpg",
     "description": "One line about the piece."
   }

   Valid "medium" values: oil, acrylic, watercolor, pencil, pen, wall
   (must match the filter buttons in gallery.html exactly).

That's it - no HTML or CSS changes needed. It shows up on gallery.html
automatically, filterable and with its title. (Note: artworks.json is
loaded with fetch(), so it only works when served over http(s) - e.g.
`python3 -m http.server` locally, or the live GitHub Pages site. It
will NOT load if you just double-click index.html to open it as a
file:// URL.)

Changing a homepage flagship piece
-------------------------------------
Edit the matching <article class="feature reveal"> block in the
Gallery section of index.html (title, description, feature-img path,
mailto subject). This is separate from artworks.json by design - the
homepage is a curated highlight, not the full list.

Swapping in a different image for an existing piece
--------------------------------------------------------
Replace the image file at its existing path (same filename) and it
updates automatically everywhere it's used - no code changes needed.

"From the studio this week" - temporary Instagram-style updates
--------------------------------------------------------------------
A strip on the homepage (below the hero) for quick posts/stories that
auto-disappear after 5 days - no manual cleanup needed. It reads from
data/updates.json, which starts empty ([]) and stays empty (the whole
section hides itself) until you add something.

To post an update:
1. Save the photo somewhere in images/ (e.g. images/updates/1.jpg -
   you'll need to create that folder)
2. Add one entry to data/updates.json:

   {
     "id": "unique-id-no-spaces",
     "image": "images/updates/1.jpg",
     "caption": "One line about what you're working on.",
     "postedAt": "2026-09-17"
   }

   "postedAt" must be today's date in YYYY-MM-DD format. The card
   disappears automatically 5 days after that date - just leave the
   old entry in the file, it won't show up again on its own.

To change how many days a post stays up: open updates.js and change
EXPIRY_DAYS near the top (currently 5).

Same fetch() rule as artworks.json - this only works when served over
http(s), not by double-clicking index.html directly.
