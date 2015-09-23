/// <reference path="types/knockout.d.ts"/>
/// <reference path="types/underscore.d.ts"/>
/// <reference path="types/jquery.d.ts"/>
/// <reference path="types/rx-lite.d.ts"/>
var flikr;
(function (flikr) {
    flikr.flikrSubject = new Rx.Subject();
    function extractSearchTermFromFlikrLink(link) {
        // eg "http://www.flickr.com/photos/tags/girl/"
        var words = link.split('/');
        var result = words[words.length - 2];
        return result;
    }
    flikr.extractSearchTermFromFlikrLink = extractSearchTermFromFlikrLink;
    function receivedFlikrData(data) {
        var imageUrls = _.map(data.items, function (x) { return x.media.m; });
        var searchTerm = extractSearchTermFromFlikrLink(data.link);
        flikr.flikrSubject.onNext({ title: searchTerm, images: imageUrls });
        //console.log(data);
        //console.log(imageUrls);
    }
    flikr.receivedFlikrData = receivedFlikrData;
    function getFlickerImages(tags) {
        // https://www.flickr.com/services/feeds/docs/photos_public/
        $.ajax({
            url: "http://api.flickr.com/services/feeds/photos_public.gne",
            dataType: "jsonp",
            data: {
                tags: tags,
                tagmode: "any",
                format: "json",
                lang: "en-us",
                jsoncallback: 'flikr.receivedFlikrData' // not really sure how this works... have to give it a function name for jsonp? http://blog.michaelhamrah.com/2010/02/using-flickr-and-jquery-to-learn-jsonp/
            }
        });
    }
    flikr.getFlickerImages = getFlickerImages;
})(flikr || (flikr = {}));
