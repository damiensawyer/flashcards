/// <reference path="types/knockout.d.ts"/>
/// <reference path="types/underscore.d.ts"/>
/// <reference path="types/underscore.string.d.ts"/>
/// <reference path="types/jquery.d.ts"/>

module flikr{

	interface IflikResult
	{
		items:{
			media:{
				m:string;
			};
			}[];
		}

		export function receivedFlikrData(data:IflikResult)
		{
			var imageUrls = _.map(data.items, x => x.media.m);
			console.log(imageUrls);
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