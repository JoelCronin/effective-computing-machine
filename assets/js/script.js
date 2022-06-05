var OMDBKey = "84b19fcd"
var searchButton = document.getElementById('search-button')
var rating = document.getElementById("rating")
const box = document.getElementById("box")
var currentYear = moment().format("YYYY")
var currentDate = moment().format("YYYY-MM-DD");
var futureDate = moment().add(6, 'month').format("YYYY-MM-DD");
let lateDate = moment().add(1, "weeks").format("YYYY-MM-DD")
let earlyDate = moment().subtract(4, "weeks").format("YYYY-MM-DD")
var sidebarBtn = document.querySelectorAll(".sidebarBtn");
var secondImage = parent.document.getElementById("second-page-image")
var secondTitle = parent.document.getElementById("second-page-title")
var input = document.querySelector(".input");
var box2 = document.querySelector(".box-2");
var searchDisplay = document.getElementById("current-search")

const api = "https://api.themoviedb.org/3";
const key = "&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const most_popular_query = "/discover/movie?sort_by=popularity.desc"
const inTheatures_query = "/discover/movie?primary_release_date.gte=" + earlyDate + "&primary_release_date.lte=" + lateDate;
const most_popular_kids_query = "/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc";
const new_movie_query = "/discover/movie?primary_release_year=" + currentYear;
const poster_path = "https://image.tmdb.org/t/p/w1280";
const topRated = "/discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc";
const up_coming_query = "/discover/movie?primary_release_date.gte=" + currentDate + "&primary_release_date.lte=" + futureDate;

var urlPopular = api + most_popular_query + key;
var urlInTheaters = api + inTheatures_query + key;
var urlKids = api + most_popular_kids_query + key;
var urlNewMovies = api + new_movie_query + key;
var urlTopRated = api + topRated + key; 
var urlUpcomimg = api + up_coming_query + key;
var urlLastSearch = "https://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&query=" + localStorage.getItem("movie")

//set searchMovie function to display movies user searches for
searchButton.addEventListener('click', function(event){
    event.preventDefault();
    var movie = document.querySelector(".input").value
    searchDisplay.textContent = "Searching: " + document.querySelector(".input").value
    if(movie == ""){      
      input.style.border = "1px solid red";
      input.style.boxShadow = "0 0 5px red";
      input.style.outline = "0 0 5px red";
      input.setAttribute("placeholder", "Please enter a movie title");
    } else {
      input.style.border = "";
      input.style.boxShadow = "";
      input.style.outline = "";
      input.setAttribute("placeholder", "The Batman...");
    localStorage.setItem("movie", movie)
    displaySearchMovie(movie);
    }
})

function displaySearchMovie(movie) {
  removeElements();
  let url = "https://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&query=" + movie
  display_movies(url);
  localStorage.setItem("historyUrl", JSON.stringify(url));
}

input.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("search-button").click();
  }
});

function display_movies(url){
  fetch(url)
  .then(response => response.json())
  .then(data => {    
    let results = data.results;

    for(let i=0; i < results.length; i++){
      let movie_div = document.createElement("div");
      let container_div = document.createElement("div");
      let box_1_div = document.createElement("div");
      let img_tag = document.createElement("img");
      let title_tag = document.createElement("h3");
      let date_tag = document.createElement("p");
    
      movie_div.setAttribute("class", "movie");
      container_div.setAttribute("class", "container");
      box_1_div.setAttribute("class", "box-1");
      img_tag.setAttribute("id", results[i].title );
      img_tag.setAttribute("class", "poster");
      title_tag.setAttribute("class", "title");
      date_tag.setAttribute("class", "date");
      
      box.appendChild(movie_div);
      movie_div.appendChild(container_div);
      container_div.appendChild(box_1_div);
      container_div.appendChild(img_tag);
      container_div.appendChild(title_tag);
      container_div.appendChild(date_tag);

      if(results[i].poster_path != null){
        img_tag.setAttribute("src", `${poster_path}${results[i].poster_path}`);
      }else{
        img_tag.setAttribute("src", "./assets/img/no-poster-available.jpg");
        img_tag.style.height = "412.5px";
      }
      title_tag.innerText = `${results[i].title}`
      date_tag.innerText = `${results[i].release_date}`

      localStorage.setItem("results", JSON.stringify(results));

      img_tag.addEventListener("click", nextPageImage)
    }
    localStorage.setItem("historyUrl", JSON.stringify(url));
  });
}

function displayStorageMovies(img, title) {
  removeElements();

  if(img != null){    
    for(let i=0; i < img.length; i++){
      let movie_div = document.createElement("div");
      let container_div = document.createElement("div");
      let box_1_div = document.createElement("div");
      let img_tag = document.createElement("img");
      let title_tag = document.createElement("h3");
      let date_tag = document.createElement("p");
    
      movie_div.setAttribute("class", "movie");
      container_div.setAttribute("class", "container");
      box_1_div.setAttribute("class", "box-1");
      img_tag.setAttribute("id", title[i]);
      img_tag.setAttribute("class", "poster");
      title_tag.setAttribute("class", "title");
      date_tag.setAttribute("class", "date");

      box.appendChild(movie_div);
      movie_div.appendChild(container_div);
      container_div.appendChild(box_1_div);
      container_div.appendChild(img_tag);
      container_div.appendChild(title_tag);
      container_div.appendChild(date_tag);

      if(img[i].includes("/assets/img/no-poster-available.jpg")){
        img_tag.setAttribute("src", "./assets/img/no-poster-available.jpg");
        img_tag.style.height = "412.5px";
      }else{                
        img_tag.setAttribute("src", `${img[i]}`);
      }
      title_tag.innerText = `${title[i]}`

      img_tag.addEventListener("click", nextPageImage)
    }
    
    if(img.length <= 5){
      box2.style.gap = "80px";
    }else{
      box2.style.gap = "0px";
    }
  }
}

function removeElements(){
  var child = box.lastElementChild;
    while (child) {
      box.removeChild(child);
      child = box.lastElementChild;
  }
}

function duplicateCheck(resultsImg, event) {
  var check = 0;
  for(let i=0; i < resultsImg.length; i++){
    if(event.target.src == resultsImg[i]){
      check++;
    }
  }
  return check
}

function nextPageImage(event){
    event.preventDefault();
    if(localStorage.getItem("historyImg") != null){
      let resultsImg = JSON.parse(localStorage.getItem("historyImg"));
      let resultsTitle = JSON.parse(localStorage.getItem("historyTitle"));
      if(duplicateCheck(resultsImg, event) == 0){
        resultsImg.push(event.target.src);
        resultsTitle.push(event.target.id);
        localStorage.setItem("historyImg", JSON.stringify(resultsImg));
        localStorage.setItem("historyTitle", JSON.stringify(resultsTitle));
      }
    }else{
      let resultsImg = [];
      let resultsTitle = [];
      resultsImg.push(event.target.src);
      resultsTitle.push(event.target.id);
      localStorage.setItem("historyImg", JSON.stringify(resultsImg));
      localStorage.setItem("historyTitle", JSON.stringify(resultsTitle));
    }

    window.location.href = "./assets/pages/secondpage.html";
    localStorage.setItem("title", event.target.id)
    localStorage.setItem("img", event.target.src)
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
          let historyImg = JSON.parse(localStorage.getItem("historyImg"));
          let historyTitle = JSON.parse(localStorage.getItem("historyTitle"));
          displayStorageMovies(historyImg, historyTitle);
          localStorage.setItem("historyUrl", "history");
      } else if (event.target.id === "upComing"){
          display_movies(urlUpcomimg);
      } else if (event.target.id === "crack"){
          let historyImg = JSON.parse(localStorage.getItem("favoriteMovesImg"));
          let historyTitle = JSON.parse(localStorage.getItem("favoriteMovesTitle"));
          displayStorageMovies(historyImg, historyTitle);
          localStorage.setItem("historyUrl", "favorite");          
      } else {
          display_movies(urlTopRated);
      }
  })
})

function init(){
  if (localStorage.getItem("historyUrl")== null){
  display_movies(urlPopular);
  } else if(localStorage.getItem("historyUrl").includes("https:")){
  display_movies(JSON.parse(localStorage.getItem("historyUrl")));
  } else if (localStorage.getItem("historyUrl") == "history"){
  displayStorageMovies(JSON.parse(localStorage.getItem("historyImg")), JSON.parse(localStorage.getItem("historyTitle")));
  } else {
  displayStorageMovies(JSON.parse(localStorage.getItem("favoriteMovesImg")), JSON.parse(localStorage.getItem("favoriteMovesTitle")));
  }
  searchDisplay.textContent = "" 
}
 
init();




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

  // function nextPageTitle(event){
//     event.preventDefault();
//     console.log("title working")
//     window.location.href = "./assets/pages/secondpage.html"
//     localStorage.setItem("title", event.target.innerHTML)
// }

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
