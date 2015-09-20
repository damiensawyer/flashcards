/// <reference path="types/knockout.d.ts"/>
/// <reference path="types/underscore.d.ts"/>

class FlashCardPageViewModel
{
	sourceText = ko.observable<string>('yes');
	wordList = ko.computed<string>(() => this.sourceText());
}


