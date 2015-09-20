/// <reference path="types/knockout.d.ts"/>
/// <reference path="types/underscore.d.ts"/>
var FlashCardPageViewModel = (function () {
    function FlashCardPageViewModel() {
        var _this = this;
        this.sourceText = ko.observable('yes');
        this.wordList = ko.computed(function () {
            var s = _this.sourceText();
            var fullList = s.replace(/\./g, '')
                .replace(/\,/g, '')
                .replace(/\s+/g, ' ')
                .split(' ');
            var distinctList = _.sortBy(_.uniq(fullList))
                .join(' ');
            return distinctList;
        });
    }
    return FlashCardPageViewModel;
})();
