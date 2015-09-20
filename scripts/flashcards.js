/// <reference path="types/knockout.d.ts"/>
/// <reference path="types/underscore.d.ts"/>
var FlashCardPageViewModel = (function () {
    function FlashCardPageViewModel() {
        var _this = this;
        this.sourceText = ko.observable('yes');
        this.wordList = ko.computed(function () { return _this.sourceText(); });
    }
    return FlashCardPageViewModel;
})();
