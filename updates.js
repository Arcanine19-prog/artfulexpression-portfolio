document.addEventListener('DOMContentLoaded', function () {
  var EXPIRY_DAYS = 5;
  var section = document.getElementById('latest');
  var strip = document.getElementById('updates-strip');
  if (!section || !strip) return;

  function daysAgo(dateStr) {
    var posted = new Date(dateStr + 'T00:00:00');
    var diffMs = Date.now() - posted.getTime();
    return Math.floor(diffMs / (1000 * 60 * 60 * 24));
  }

  fetch('data/updates.json')
    .then(function (res) { return res.json(); })
    .then(function (updates) {
      var active = updates
        .filter(function (u) { return daysAgo(u.postedAt) < EXPIRY_DAYS; })
        .sort(function (a, b) { return new Date(b.postedAt) - new Date(a.postedAt); });

      if (active.length === 0) return;

      active.forEach(function (u, i) {
        var age = daysAgo(u.postedAt);
        var ageLabel = age <= 0 ? 'Today' : age === 1 ? '1 day ago' : age + ' days ago';
        var card = document.createElement('div');
        card.className = 'update-card entering';
        card.style.animationDelay = (i * 0.06) + 's';
        card.innerHTML =
          '<div class="update-img" style="background-image:url(\'' + u.image + '\')"></div>' +
          '<p class="update-caption">' + u.caption + '</p>' +
          '<span class="update-age">' + ageLabel + '</span>';
        strip.appendChild(card);
      });

      section.hidden = false;
    })
    .catch(function () {
      /* No updates file yet, or it failed to load — leave the section hidden. */
    });
});
