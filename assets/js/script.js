var OMDBKey = "84b19fcd"
var searchButton = document.getElementById('search-button')
var rating = document.getElementById("rating")
//User Input into search box is used to get weather data from Open Weather when search button is pressed
searchButton.addEventListener('click', function(event){
    event.preventDefault();
    var movie = document.getElementById("search-bar").value
    getOMDBAPi();
    console.log(movie)


    function getOMDBAPi(){
        var requestUrl = "https://www.omdbapi.com/?apikey=84b19fcd&t=" + movie
    
        fetch(requestUrl)
            .then(function(response){
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            console.log(data.Metascore)
            let metaValue = data.Ratings[1].Value.substring(0, 2);
            console.log(metaValue)
            console.log(data.Ratings[1].Value)
            console.log(data.imdbRating)
            imdbValue = data.imdbRating * 10
            console.log(imdbValue)
            averageValue = parseFloat(imdbValue) + parseFloat(metaValue) + parseFloat(data.Metascore)
            finalAverage = (averageValue / 3)
            console.log(averageValue)
            console.log(finalAverage)



            rating.textContent = data.Ratings[0].Value
        }) 
    };
})

// {
//     "Title": "Braveheart",
//     "Year": "1995",
//     "Rated": "R",
//     "Released": "24 May 1995",
//     "Runtime": "178 min",
//     "Genre": "Biography, Drama, History",
//     "Director": "Mel Gibson",
//     "Writer": "Randall Wallace",
//     "Actors": "Mel Gibson, Sophie Marceau, Patrick McGoohan",
//     "Plot": "Scottish warrior William Wallace leads his countrymen in a rebellion to free his homeland from the tyranny of King Edward I of England.",
//     "Language": "English, French, Latin, Gaelic, Italian",
//     "Country": "United States",
//     "Awards": "Won 5 Oscars. 33 wins & 34 nominations total",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BMzkzMmU0YTYtOWM3My00YzBmLWI0YzctOGYyNTkwMWE5MTJkXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
//     "Ratings": [
//         {
//             "Source": "Internet Movie Database",
//             "Value": "8.4/10"
//         },
//         {
//             "Source": "Rotten Tomatoes",
//             "Value": "76%"
//         },
//         {
//             "Source": "Metacritic",
//             "Value": "68/100"
//         }
//     ],
//     "Metascore": "68",
//     "imdbRating": "8.4",
//     "imdbVotes": "1,017,964",
//     "imdbID": "tt0112573",
//     "Type": "movie",
//     "DVD": "19 Sep 2006",
//     "BoxOffice": "$75,609,945",
//     "Production": "N/A",
//     "Website": "N/A",
//     "Response": "True"
// }