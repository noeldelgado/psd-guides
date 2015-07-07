window.onload = function () {
    var guides = require('../');
    var button = document.querySelector('button');

    button.addEventListener('click', function() {
        if (psd.active) {
            return psd.deactivate();
        }

        return psd.activate();
    });

    window.psd = new guides({
        canvasWidth : 1000,
        horizontalGuides : [20],
        verticalGuides : [50, "100 * 2", "250 * 2"],
        zIndex : 0
    });

    psd.addHorizontalGuides(["355 * 2", 250]);
    psd.addVerticalGuides(["50 * 3"]);
    psd.activate();

    console.log('horizontals', psd.getHorizontalGuides());
    console.log('verticals', psd.getVerticalGuides());
};
