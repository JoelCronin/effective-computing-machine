var OMDBKey = "84b19fcd"
var searchButton = document.getElementById('search-button')
var rating = document.getElementById("rating")
const box = document.getElementById("box")
// Used MomentJS to keep 'In Theatres' and "Upcoming" sections time relevant
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

//Event listener for the search button which takes in user input 
searchButton.addEventListener('click', function(event){
    event.preventDefault();
    var movie = document.querySelector(".input").value
    searchDisplay.textContent = "Searching: " + document.querySelector(".input").value
    // Prompts user to enter text if they try to search with nothing in search bar
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

// Takes user input and performs API fetch to TMDB to gather data
function displaySearchMovie(movie) {
  removeElements();
  let url = "https://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&query=" + movie
  display_movies(url);
  localStorage.setItem("historyUrl", JSON.stringify(url));
}

// Allows user to also use enter button to trigger search
input.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("search-button").click();
  }
});

// Uses the API call to display the movies on the homepage with their images and titles.
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

// If API does not have an image with it then uses placeholder instead
      if(results[i].poster_path != null){
        img_tag.setAttribute("src", `${poster_path}${results[i].poster_path}`);
      }else{
        img_tag.setAttribute("src", "./assets/img/no-poster-available.jpg");
        img_tag.style.height = "412.5px";
      }
      title_tag.innerText = `${results[i].title}`
      date_tag.innerText = `${results[i].release_date}`

      localStorage.setItem("results", JSON.stringify(results));
// Adds event listener to all images so opens next page if clicked on
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

// Removes old movies from page to avoid stacking once new search is performed
function removeElements(){
  var child = box.lastElementChild;
    while (child) {
      box.removeChild(child);
      child = box.lastElementChild;
  }
}

//Stops duplicate images from being displayed in searches
function duplicateCheck(resultsImg, event) {
  var check = 0;
  for(let i=0; i < resultsImg.length; i++){
    if(event.target.src == resultsImg[i]){
      check++;
    }
  }
  return check
}

// Adds all information needed for second page to local storage. Then changes page to the secondpage.html
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

// When each sidebar button is clicked on it will perform different API call and then dispaly the relevant movies and update "searching:" text content
sidebarBtn.forEach(function(sidebarBtn){
  sidebarBtn.addEventListener("click", function(event){
      event.preventDefault();
      removeElements();
      if (event.target.id === "pop"){
          display_movies(urlPopular);
          searchDisplay.textContent = "Searching: Popular" 
      } else if (event.target.id === "inTheatures"){
          display_movies(urlInTheaters);
          searchDisplay.textContent = "Searching: In Theatres" 
      } else if (event.target.id === "most_popular_kids"){
          display_movies(urlKids);
          searchDisplay.textContent = "Searching: Kids" 
      } else if (event.target.id === "new_movie"){
          display_movies(urlNewMovies);
          searchDisplay.textContent = "Searching: New Movies" 
      } else if (event.target.id === "history"){
          let historyImg = JSON.parse(localStorage.getItem("historyImg"));
          let historyTitle = JSON.parse(localStorage.getItem("historyTitle"));
          displayStorageMovies(historyImg, historyTitle);
          localStorage.setItem("historyUrl", "history");
          searchDisplay.textContent = "Searching: History" 
      } else if (event.target.id === "upComing"){
          display_movies(urlUpcomimg);
          searchDisplay.textContent = "Searching: Upcoming" 
      } else if (event.target.id === "crack"){
          let favoriteImg = JSON.parse(localStorage.getItem("favoriteMovesImg"));
          let favoriteTitle = JSON.parse(localStorage.getItem("favoriteMovesTitle"));
          displayStorageMovies(favoriteImg, favoriteTitle);
          localStorage.setItem("historyUrl", "favorite");
          searchDisplay.textContent = "Searching: Favorite Movies"           
      } else {
          display_movies(urlTopRated);
          searchDisplay.textContent = "Searching: Top rated" 
      }
  })
})

// Shows load screen for two seconds to allow all images and details to render
function load(){
  window.addEventListener('load', () => {
    setTimeout(()=>{
        document.getElementById("bar").style.display = 'block';
        document.getElementById("top-box").style.display = 'block';
        document.getElementById("load").style.display = 'none';
    }, 2000);
  });
}

// Uses local storage to ensure page shows last search upon loading
function init(){
  load();
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