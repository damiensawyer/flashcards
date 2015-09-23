$.get({
    url: "http://api.flickr.com/services/feeds/photos_public.gne",
 
    // The name of the callback parameter, as specified by the YQL service
    //jsonp: "callback",
 
    // Tell jQuery we're expecting JSONP
    dataType: "jsonp",
 
    // Tell YQL what we want and that we want JSON
    data: {
        qtags: "dog",
        tagmode:"any",
        format: "json",
        lang:"en-us",
        jsoncallback:'?'

    }

})
.done(function(x){console.log(x);});