/// <reference path="types/knockout.d.ts"/>
/// <reference path="types/underscore.d.ts"/>
/// <reference path="types/underscore.string.d.ts"/>


// DON'T FORGET TO COMPILE THE TYPESCRIPT. There is no grunt / gulp watcher
class FlashCardPageViewModel
{
	sourceText = ko.observable<string>('hello this is a test of using superfulously long words');

	distinctList = ko.computed<string[]>(() => {
		var s = this.sourceText();
		var fullList = s.replace(/\./g, '')
		.replace(/\,/g, '')
		.replace(/\s+/g,' ')
		.split(' ');

		var distinctList = _.sortBy(_.uniq(fullList))
		
		return distinctList;

		});

	wordList = ko.computed<string>(() => {
		return this.distinctList()
		.join(' ');

		});

	outputLabel = ko.computed(()=>"Here are the list of " + this.wordList().split(' ').length + " unique words.");
}


