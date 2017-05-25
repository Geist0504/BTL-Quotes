/* 
    Main JS file - Displays random quote based on what you click (random game quote, random movie quote..)
*/  

//json api
var api = "https://api.myjson.com/bins/oaorl";
var topicAPI = "http://quotes.rest/qod.json?category="

// Length of fade effect
var fadeDelay = 300;

$(document).ready(function() {    
    //Wow.js activation //
    
    new WOW().init();
    
    // ANIMATESCROLL //
    
    $("#navRandom").click(function() {
        $("#random").animatescroll({padding:45});
    });
    
    $("#navTopic").click(function() {
        $("#topic").animatescroll({padding:45});
    });
    
    // ON CLICK //
    
    $("#random .tweet").click(function() {
        tweetRandom();
    });
    
    $(".randomQuote").click(function() {

        // Fadeout on click
        $(".randomQuoteArea > h4").fadeOut(fadeDelay);
        $(".randomQuoteArea > h2").fadeOut(fadeDelay);
        // Set timeout for function to run
        setTimeout(function() {
            //randomQuoteFetch();
        }, fadeDelay);
        
        $("#topicQuote > .modal-content > p, #topicQuote > .modal-content > .author").fadeOut(fadeDelay);
        setTimeout(function() {
            randomQuoteFetch();
        }, fadeDelay);
    });

  $(".box").click(function(){
        var topic = this.id;
        topicQuote(topic);
        $('.modal').fadeIn(1500);
    });

    $(".close").click(function(){
        $('.modal').fadeOut(1000);
    });
    
    $("window").click(function(event){
        if (event.target != modal) {
            $('.modal').css('display', 'none');
        }
    });

    

});


// FUNCTIONS //

var randomQuoteFetch = function() {
    
    var randomQuote = "";
    var randomAuthor = "";
    var randomQuotes = [];
    
    // Fetch json
    $.ajax({
        type: 'GET',
        url: api,
        dataType: 'json',
        success: function(data) {
            
            //for each quote item in json..
            $(data.quotes).each(function(index, value) {
            //push item into array
            randomQuotes.push(value);
                
        });
        
            
        //Get random number from quotes.length
        var ran = Math.floor(Math.random()*randomQuotes.length);
        
        //Replace HTML with random quote + author
        randomQuote = '"' + randomQuotes[ran].quote + '"';
        randomAuthor = '- ' + randomQuotes[ran].author;
        
        //Change HTML with fade effect
        $(".randomQuoteArea > h2").html(randomQuote).fadeIn(fadeDelay);
        $(".randomQuoteArea > h4").html(randomAuthor).fadeIn(fadeDelay);

        $(".modal-content > p").html(randomQuote).fadeIn(fadeDelay);
        $(".modal-content > .author").html(randomAuthor).fadeIn(fadeDelay);
        $(".modal-content > h3").text('Random').fadeIn(fadeDelay);
            
        },
        //In case of error with json api..
        error: function() {
        alert("The JSON file was not found.");
    } 
    });
}

//Call random quote function on page ready
randomQuoteFetch();

//Tweet function
var tweetRandom = function() {
    window.open("https:www.twitter.com/intent/tweet?text=" + randomQuote + "    " + randomAuthor);
}

//Function takes sting of topic from button identifier, 
//gets a quote from API and passes quote message into modal body
function topicQuote(topic){

    var topic = topic;
    //Create Promise
    var promise = promiseTest(topic);

    promise.done(function(obj){
        var quote = obj.contents['quotes'][0]['quote'];
        var author = obj.contents['quotes'][0]['author'];
        $('.modal-content p').text(quote);
        $('.modal-content h3').text(toTitleCase(topic));
        $('.modal-content .author').text('-'+author);
    });

}
//fucntion gets JSON from quote API
function promiseTest(topic){
    return $.ajax({
        url: 'http://quotes.rest/qod.json?category=' + topic,
        dataType: 'json',
        type: 'GET'
    });
}

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}