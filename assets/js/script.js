var OMDBKey = "84b19fcd"
var searchButton = document.getElementById('search-button')
var rating = document.getElementById("rating")
const box = document.getElementById("box")
var currentDate = new Date();
var currentYear = currentDate.getFullYear();



var sidebarBtn = document.querySelectorAll(".sidebarBtn");
var secondImage = parent.document.getElementById("second-page-image")
var secondTitle = parent.document.getElementById("second-page-title")

const api = "https://api.themoviedb.org/3";
const key = "&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const most_popular_query = "/discover/movie?sort_by=popularity.desc"
let lateDate = moment().add(1, "weeks").format("YYYY-MM-DD")
let earlyDate = moment().subtract(4, "weeks").format("YYYY-MM-DD")
const inTheatures_query = "/discover/movie?primary_release_date.gte=" + earlyDate + "&primary_release_date.lte=" + lateDate;
const most_popular_kids_query = "/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc";
const new_movie_query = "/discover/movie?primary_release_year=" + currentYear;
const poster_path = "https://image.tmdb.org/t/p/w1280";
const topRated = "/discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc";

var urlPopular = api + most_popular_query + key;
var urlInTheaters = api + inTheatures_query + key;
var urlKids = api + most_popular_kids_query + key;
var urlNewMovies = api + new_movie_query + key;
var urlTopRated = api + topRated + key; 
var urlLastSearch = "https://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&query=" + localStorage.getItem("movie")


// searchButton.addEventListener('click', function(event){
//     event.preventDefault();
//     var movie = document.querySelector(".input").value
    // getOMDBAPi();
    // console.log(movie)


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
// })

//set searchMovie function to display movies user searches for
searchButton.addEventListener('click', function(event){
    event.preventDefault();
    var movie = document.querySelector(".input").value
    localStorage.setItem("movie", movie)
    displaySearchMovie(movie);
})

function displaySearchMovie(movie) {
    removeElements();
    let url = "https://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&query=" + movie
    display_movies(url);
}

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

function display_movies(url){
  fetch(url)
  .then(response => response.json())
  .then(data => {
    let results = data.results;
    // console.log(data)
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
      if(results[i].poster_path != null){
        img_tag.setAttribute("src", `${poster_path}${results[i].poster_path}`);
      }else{
        img_tag.setAttribute("src", "./assets/img/no-poster-available.jpg");
        img_tag.style.height = "412.5px";
      }
      title_tag.innerText = `${results[i].title}`
      date_tag.innerText = `${results[i].release_date}`

      
      box.appendChild(movie_div);

      localStorage.setItem("results", JSON.stringify(results));
    }
  });
}

function nextPageImage(event){
    event.preventDefault();
    console.log("image working")
    // var title = event.target.id;
    // var img = event.target.src;
    // var titleHistory = JSON.parse(localStorage.getItem("titleHistory")) || [];
    // var imgHistory  = JSON.parse(localStorage.getItem("imgHistory")) || [];
    // titleHistory .push(title);
    // imgHistory.push(img);
    // localStorage.setItem("titleHistory", JSON.stringify("titleHistory"));
    // localStorage.setItem("imgHistory", JSON.stringify("imgHistory"));
    window.location.href = "./assets/pages/secondpage.html";
    localStorage.setItem("title", event.target.id)
    localStorage.setItem("movie", event.target.id)
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
    window.location.href = "./assets/pages/secondpage.html"
    localStorage.setItem("title", event.target.innerHTML)
}

function removeElements(){
  var child = box.lastElementChild;
    while (child) {
      box.removeChild(child);
      child = box.lastElementChild;
  }
}

sidebarBtn.forEach(function(sidebarBtn){
  sidebarBtn.addEventListener("click", function(event){
      event.preventDefault();
      removeElements();
      if (event.target.id === "pop"){
          display_movies(urlPopular);
      } else if (event.target.id === "inTheatures"){
          display_movies(urlInTheaters);
      } else if (event.target.id === "most_popular_kids"){
          display_movies(urlKids);
      } else if (event.target.id === "new_movie"){
          display_movies(urlNewMovies);
      } else if (event.target.id === "history"){
          console.log("history working")
      }else{
          display_movies(urlTopRated);
      }
  })
})

function init(){
  if (localStorage.getItem("movie")== null){
  display_movies(urlPopular);
  } else {
    display_movies(urlLastSearch);
  }
}
 
init();

