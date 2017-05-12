/* 
    
    Main JS file - Displays random quote based on what you click (random game quote, random movie quote..)
    The program currently only displays to console for debugging purposes

*/  


$(document).ready(function() {
    $(".randomQuote").click(function() {
        randomQuote();
    });
});

var randomQuote = function() {
    var randomQuotes = [];
    
    $.getJSON("js/quotes.json", function(data) {
        //Push every quote in array
        $(data.quotes).each(function(index, value) {
            randomQuotes.push(value);
        });
        
        //Get random quote
        var ran = Math.floor(Math.random()*randomQuotes.length);
        
        //Replace HTML with quotes
        $("#random > .quoteArea > h2").html('"' + randomQuotes[ran].quote + '"');
        $("#random > .quoteArea > h4").html('- ' + randomQuotes[ran].author);
        
    });
}

randomQuote();