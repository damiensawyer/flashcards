/// <reference path="types/knockout.d.ts"/>
/// <reference path="types/underscore.d.ts"/>

class FlashCardPageViewModel
{
	sourceText = ko.observable<string>('yes');
	wordList = ko.computed<string>(() => {
		var s = this.sourceText();
		var fullList = s.replace(/\./g, '')
		.replace(/\,/g, '')
		.replace(/\s+/g,' ')
		.split(' ');

		var distinctList = _.sortBy(_.uniq(fullList))
		.join(' ');


		return distinctList;

		});
}


