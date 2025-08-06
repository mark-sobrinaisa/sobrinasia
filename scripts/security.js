(function() {
  let hash = window.location.hash;
  if (hash) {
      const targetTab = document.querySelector(hash);
      if (targetTab) {
          targetTab.checked = true;
          //Remove the hash from the URL without reloading the page
          history.replaceState(null, null, window.location.pathname);
      }
  }
})();
