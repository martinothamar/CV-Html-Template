require('../styles/loader.scss');
require('../styles/main.scss');

window.onload = function() {
    var loader = document.getElementById('loader-container');
    loader.className += ' hide';
}