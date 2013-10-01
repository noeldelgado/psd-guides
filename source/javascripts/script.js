//= require_tree .

(function() {

    var sample = {

        init : function() {
            this.guides;
            this.actionBtn = document.querySelector('.js-activate-lib'),
            this.actionBtn.addEventListener('click', this.activateGuides, false);
        },

        activateGuides : function activateGuides (event) {
            event.preventDefault();

            sample.guides = new PSDGuides({
                show        : true,
                canvasWidth : 500,
                lineColor   : "#0fc",
                xGuides     : [10, 60],
                yGuides     : [37, 70, 25, 55, 30, 835, 135]
            });

            sample.actionBtn.removeEventListener('click', sample.activateGuides, false);
            sample.actionBtn.addEventListener('click', sample.toggleGuides, false);
        },

        toggleGuides : function toggleGuides (event) {
            event.preventDefault();
            sample.guides.toggle();
        }
    };

    sample.init();

})();
