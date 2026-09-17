document.addEventListener('DOMContentLoaded', function () {
  var grid = document.getElementById('agrid');
  var emptyMsg = document.getElementById('empty-msg');
  var filterBtns = document.querySelectorAll('#filters .filter-btn');
  var artworks = [];

  function mailtoFor(title) {
    return 'mailto:choudhuryprasenjit81@gmail.com?subject=' + encodeURIComponent('Enquiry: ' + title);
  }

  function render(medium) {
    grid.innerHTML = '';
    var items = medium === 'all' ? artworks : artworks.filter(function (a) { return a.medium === medium; });
    emptyMsg.hidden = items.length > 0;
    items.forEach(function (a, i) {
      var card = document.createElement('article');
      card.className = 'acard entering';
      card.style.animationDelay = (i * 0.05) + 's';
      card.innerHTML =
        '<div class="acard-img" style="background-image:url(\'' + a.image + '\')"></div>' +
        '<div class="acard-body">' +
          '<span class="medium-tag">' + a.mediumLabel + '</span>' +
          '<h3>' + a.title + '</h3>' +
          '<p class="muted">' + a.description + '</p>' +
          '<a class="enquire" href="' + mailtoFor(a.title) + '">Ask about this piece</a>' +
        '</div>';
      grid.appendChild(card);
    });
  }

  function setActive(medium) {
    filterBtns.forEach(function (b) {
      b.classList.toggle('active', b.dataset.filter === medium);
    });
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var medium = btn.dataset.filter;
      setActive(medium);
      render(medium);
      var url = new URL(window.location);
      if (medium === 'all') { url.searchParams.delete('medium'); }
      else { url.searchParams.set('medium', medium); }
      history.replaceState(null, '', url);
    });
  });

  fetch('data/artworks.json')
    .then(function (res) { return res.json(); })
    .then(function (data) {
      artworks = data;
      var requested = new URLSearchParams(window.location.search).get('medium');
      var initial = requested && artworks.some(function (a) { return a.medium === requested; }) ? requested : 'all';
      setActive(initial);
      render(initial);
    })
    .catch(function () {
      emptyMsg.textContent = "Couldn't load the gallery — try refreshing the page.";
      emptyMsg.hidden = false;
    });
});
