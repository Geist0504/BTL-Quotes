/* 
    Main JS file - Displays random quote based on what you click (random game quote, random movie quote..)
*/  

//json api
var api = "https://api.myjson.com/bins/oaorl";
var topicAPI = "http://quotes.rest/qod.json?category="

// Length of fade effect
var fadeDelay = 300;

$(document).ready(function() {    
    // Click functions
    
    // AnimateScroll //
    
    $("#navRandom").click(function() {
        $("#random").animatescroll({padding:45});
    });
    
    $("#navTopic").click(function() {
        $("#topic").animatescroll({padding:45});
    });
    
    
    // Quotes //
    
    //Random quote click function
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

    $(".box").click(function(){
        var topic = this.id;
        topicQuote(topic);
        $('.modal').css('display', 'block');
    });

    $("#myBtn").click(function(){
        $('.modal').css('display', 'block');
    });
    $(".close").click(function(){
        $('.modal').css('display', 'none');
    });
    $("window").click(function(event){
        if (event.target != modal) {
            $('.modal').css('display', 'none');
        }
    });
});

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
        $("#random > .quoteArea > h2").html(randomQuote).fadeIn(fadeDelay);
        $("#random > .quoteArea > h4").html(randomAuthor).fadeIn(fadeDelay);
            
        },
        //In case of error with json api..
        error: function() {
        alert("The JSON file was not found.");
    } 
    })
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

//Call random quote function on page ready
randomQuoteFetch();

//Tweet function
var tweetRandom = function() {
    window.open("https:www.twitter.com/intent/tweet?text=" + randomQuote + "    " + randomAuthor);
}