/* 
    
    Main JS file - Displays random quote based on what you click (random game quote, random movie quote..)
    The program currently only displays to console for debugging purposes

*/  

//On document.ready ..
$(document).ready(function() {

//Listen for click on boxes (genre)
$(".box").click(function() {
    //Get ID (genre) of the box)
    var callID = this.id;
    var quotes = [];
    
    // Get json data
    $.getJSON("js/quotes.json", function(data) {
        //For each quote..
        $(data.quotes).each(function(index, value) {
            // If genres match...
            if (callID == value.genre) {
                // Push quote into array
                quotes.push(value);
            } 
        }); // FOREACH END
        // Randomize the array
        var ran = Math.floor(Math.random()*quotes.length);
        // Display quote if exist
        if(quotes.length > 0) {
            // console.clear is not needed, but makes debugging easier
            console.clear();
            console.log("Quote: " + quotes[ran].quote);
            console.log("Author: " + quotes[ran].author);
        // Or give error message for missing quotes (callID = genre)
        } else {
            console.log("No quotes matching this genre: " + callID);
        }
    }); // End of json
    
}); // end of .box click

}); // End of document.ready