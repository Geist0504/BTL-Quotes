/* 
    
    Main JS file - Displays random quote based on what you click (random game quote, random movie quote..)
    The program currently only displays to console for debugging purposes

*/  

// Length of fade effect
var fadeDelay = 400;

var randomQuote = "";
var randomAuthor = "";


$(document).ready(function() {
    
    $(".randomQuote").click(function() {
        //Fadeout on click
        $("#random > .quoteArea > h2, #random > .quoteArea > h4").fadeOut(fadeDelay);
        setTimeout(function() {
            randomQuoteFetch();
        }, fadeDelay);
        
        
    });
    
    $("#random .tweet").click(function() {
        tweetRandom();
    });
});

var randomQuoteFetch = function() {
    var randomQuotes = [];
    
    $.getJSON("js/quotes.json", function(data) {
        //Push every quote in array
        $(data.quotes).each(function(index, value) {
            randomQuotes.push(value);
        });
        
        //Get random quote
        var ran = Math.floor(Math.random()*randomQuotes.length);
        
        //Replace HTML with quotes
        randomQuote = '"' + randomQuotes[ran].quote + '"';
        randomAuthor = '- ' + randomQuotes[ran].author;
        
        //Change HTML with fade effect
        $("#random > .quoteArea > h2").html(randomQuote).fadeIn(fadeDelay);
        $("#random > .quoteArea > h4").html(randomAuthor).fadeIn(fadeDelay);
        
    });
}

//Call random quote function on page ready
randomQuoteFetch();

//Tweet function
var tweetRandom = function() {
    window.open("https:www.twitter.com/intent/tweet?text=" + randomQuote + "    " + randomAuthor);
}