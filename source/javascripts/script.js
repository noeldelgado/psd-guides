(function() {
  var PSDGuides = require('psd-guides')
    , uiControl = [].slice.call(document.querySelectorAll('.psdguides-ctrl'), 0)
    , fixedControl = document.querySelector('.psdguides-ctrl--fixed')
    , guides = new PSDGuides({
      canvasWidth: 500,
      lineColor: "#0fc",
      horizontalGuides: ['(10, 60) * 7'],
      verticalGuides: [37, 70, 25, 55, 20, 50, 35, 3, 40, 15, 30, 50, 55, 130, 90, 110, '(55, 110) * 2', 35, 3, 155]
    });

  uiControl.forEach(function(ctrl) {
    ctrl.addEventListener('click', toggle, false);
  });

  function toggle(ev) {
    ev.preventDefault();

    if (guides.active) {
      fixedControl.textContent = 'Show PSDGuides.js';
      return guides.deactivate();
    }

    fixedControl.textContent = 'Hide PSDGuides.js';
    return guides.activate();
  }
})();
