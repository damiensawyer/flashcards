/// <reference path="types/knockout.d.ts"/>
/// <reference path="types/underscore.d.ts"/>
/// <reference path="types/underscore.string.d.ts"/>
// DON'T FORGET TO COMPILE THE TYPESCRIPT. There is no grunt / gulp watcher
var FlashCardPageViewModel = (function () {
    function FlashCardPageViewModel() {
        var _this = this;
        this.sourceText = ko.observable('hello this is a test of using superfulously long words');
        this.distinctList = ko.computed(function () {
            var s = _this.sourceText();
            var fullList = s.replace(/\./g, '')
                .replace(/\,/g, '')
                .replace(/\s+/g, ' ')
                .split(' ');
            var distinctList = _.sortBy(_.uniq(fullList));
            return distinctList;
        });
        this.wordList = ko.computed(function () {
            return _this.distinctList()
                .join(' ');
        });
        this.outputLabel = ko.computed(function () { return "Here are the list of " + _this.wordList().split(' ').length + " unique words."; });
    }
    return FlashCardPageViewModel;
})();
