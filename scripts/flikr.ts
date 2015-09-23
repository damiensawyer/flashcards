/// <reference path="types/knockout.d.ts"/>
/// <reference path="types/underscore.d.ts"/>
/// <reference path="types/jquery.d.ts"/>
/// <reference path="types/rx-lite.d.ts"/>

module flikr{

	export interface IflikResultFromServer
	{
		title:string;
		link:string;
		items:{
			media:{
				m:string;
			};
			}[];
		}
		
		export interface IflikResult
	{
		title:string;
		images: string[];
	}
		export var flikrResultsDictionary: { [key: string ]: string[]};

		export var flikrSubject:Rx.Subject<IflikResult> = new Rx.Subject<IflikResult>();

		export function extractSearchTermFromFlikrLink(link:string)
		{
			// eg "http://www.flickr.com/photos/tags/girl/"
			var words = link.split('/');
			var result = words[words.length -2];
			return result;
		}

		export function receivedFlikrData(data:IflikResultFromServer)
		{
			var imageUrls = _.map(data.items, x => x.media.m);
			var searchTerm	= extractSearchTermFromFlikrLink(data.link);

			flikr.flikrSubject.onNext({title:searchTerm,images:imageUrls});

			//console.log(data);
			//console.log(imageUrls);
		}

		export function getFlickerImages(tags:string)
		{
		// https://www.flickr.com/services/feeds/docs/photos_public/
		$.ajax({
			url: "http://api.flickr.com/services/feeds/photos_public.gne",
			dataType: "jsonp",
			data: {
				tags: tags,
				tagmode:"any",
				format: "json",
				lang:"en-us",
        		jsoncallback:'flikr.receivedFlikrData' // not really sure how this works... have to give it a function name for jsonp? http://blog.michaelhamrah.com/2010/02/using-flickr-and-jquery-to-learn-jsonp/
        	}
        	});
	}
}