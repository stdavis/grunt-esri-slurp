module.exports = function(text) {
    if (text === null || text === '') {
        return;
    }

    if (text.replace) {
        text = text.replace(/dojo\/dijit\/themes/g, 'dijit/themes');
        text = text.replace(/dojo\/dojox\/grid\/resources\/images/g, 'dojox/grid/resources/images');
        text = text.replace(/dojo\/dojo\/resources\/images/g, 'dojo/resources/images');
    }

    var matches = /define\(\"(.*)\".split\("\s"\)([\s\S]*)/m.exec(text);

    if (matches === null || matches.length < 2) {
        return text;
    }

    var requireString = matches[1];

    var requireArgs = requireString.split(' ');

    requireArgs = requireArgs.map(function(arg) {
        return '"' + arg + '"';
    });

    var requires = requireArgs.join(',');

    var unwound = '//>>built\ndefine([' + requires + ']' + matches[2];

    return unwound;
};