var OMDBKey = "84b19fcd"
var searchButton = document.getElementById('search-button')
var rating = document.getElementById("rating")
const box = document.getElementById("box")
var secondImage = parent.document.getElementById("second-page-image")
var secondTitle = parent.document.getElementById("second-page-title")

const api = "https://api.themoviedb.org/3";
const key = "&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const most_popular_query = "/discover/movie?sort_by=popularity.desc"
const inTheatures_query = "/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22";
const most_popular_kids_query = "/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc";

const poster_path = "https://image.tmdb.org/t/p/w1280";

searchButton.addEventListener('click', function(event){
    event.preventDefault();
    var movie = document.getElementById("search-bar").value
    getOMDBAPi();
    console.log(movie)


    // function getOMDBAPi(){
    //     var requestUrl = "https://www.omdbapi.com/?apikey=84b19fcd&t=" + movie
    
    //     fetch(requestUrl)
    //         .then(function(response){
    //         return response.json();
    //     })
    //     .then(function (data) {
    //         console.log(data);
    //         console.log(data.Metascore)
    //         let metaValue = data.Ratings[1].Value.substring(0, 2);
    //         console.log(metaValue)
    //         console.log(data.Ratings[1].Value)
    //         console.log(data.imdbRating)
    //         imdbValue = data.imdbRating * 10
    //         console.log(imdbValue)
    //         averageValue = parseFloat(imdbValue) + parseFloat(metaValue) + parseFloat(data.Metascore)
    //         finalAverage = (averageValue / 3)
    //         console.log(averageValue)
    //         console.log(finalAverage)
    //     }) 
    // };
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

// function display_rating(){

//     fetch(api + most_popular_query + key)
//     .then(response => response.json())
//     .then(data => {
//       let results = data.results;
  
//       for(let i=0; i < results.length; i++){
//         rating_tag.innerText = results[i].vote_average;
//       }
//     });
//   }

function display_movies(){

    fetch(api + most_popular_query + key)
    .then(response => response.json())
    .then(data => {
      let results = data.results;
  
      for(let i=0; i < results.length; i++){
        let movie_div = document.createElement("div");
        let container_div = document.createElement("div");
        let box_1_div = document.createElement("div");
        // let rating_tag = document.createElement("p");
        let img_tag = document.createElement("img");
        let title_tag = document.createElement("h3");
        let date_tag = document.createElement("p");
      
        movie_div.setAttribute("class", "movie");
        container_div.setAttribute("class", "container");
        box_1_div.setAttribute("class", "box-1");
        // rating_tag.setAttribute("class", "rating");
        img_tag.setAttribute("id", results[i].title );
        img_tag.setAttribute("class", "poster");
        title_tag.setAttribute("class", "title");
        date_tag.setAttribute("class", "date");
      
        movie_div.appendChild(container_div);
        container_div.appendChild(box_1_div);
        // box_1_div.appendChild(rating_tag);
        container_div.appendChild(img_tag);
        container_div.appendChild(title_tag);
        container_div.appendChild(date_tag);

        title_tag.addEventListener("click", nextPageTitle)
        img_tag.addEventListener("click", nextPageImage)
  
        // rating_tag.innerText = results[i].vote_average;
        img_tag.setAttribute("src", `${poster_path}${results[i].poster_path}`);
        title_tag.innerText = `${results[i].title}`
        date_tag.innerText = `${results[i].release_date}`

        console.log(`${poster_path}${results[i].poster_path}`)
        
        box.appendChild(movie_div);

        localStorage.setItem("results", JSON.stringify(results));
      }
    });
  }

  function nextPageImage(event){
      event.preventDefault();
      console.log("image working")
      window.location.href = "secondpage.html"
      localStorage.setItem("title", event.target.id)
      
    //   loadNextPage();

    //   function loadNextPage(){
    //       var requestUrlImage = "https://www.omdbapi.com/?apikey=84b19fcd&t=" + imageQuery


    //       fetch(requestUrlImage)
    //       .then(function(responseImage){
    //          return responseImage.json(); 
    //     })
    //     .then(function(data){
    //         console.log(data)
    //         var dataObject = JSON.parse(localStorage.getItem("results"))
    //         console.log(dataObject);
    //         window.location.href = "secondpage.html"
    //         console.log(dataObject[0].original_title)
    //         console.log(dataObject[0].poster_path)
    //         secondImage.src = dataObject[0].poster_path
    //         secondTitle.textContent = dataObject[0].original_title
    //     })
    //   }

  }





function nextPageTitle(event){
  event.preventDefault();
  console.log("title working")
  window.location.href = "secondpage.html"
  localStorage.setItem("title", event.target.innerHTML)
}

function init(){
  display_movies();
}


init();
