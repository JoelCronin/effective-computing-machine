var secondImage = document.getElementById("second-page-image")
var secondTitle = document.getElementById("second-page-title")
var similarMovie = "/discover/movie?with_genres=18&sort_by=popularity.desc"
const api = "https://api.themoviedb.org/3";
const key = "&api_key=04c35731a5ee918f014970082a0088b1&page=1";
var movieSecondPage = localStorage.getItem("title");
var backButton = document.getElementById("back-button")
var ratingsText = document.getElementById("rating-text");
var ratingsBubble = document.getElementById("locks")
var descript = [];
// var icon = document.getElementByid("mesh fa-solid fa-comment")

var favorateMovie = document.querySelector(".favorateMovie");


function getOMDBData(){
  var movieSecondPage = localStorage.getItem("title");
  var requestUrlImage = "https://www.omdbapi.com/?apikey=84b19fcd&t=" + movieSecondPage

  fetch(requestUrlImage)
    .then(function(responseImage){
        return responseImage.json(); 
    })
    .then(function(data){
      secondTitle.innerText = movieSecondPage;
      document.getElementById("release-date").innerText = data.Year;
      document.getElementById("ratt").innerText = data.Rated;
      document.getElementById("mis").innerText = data.Plot;
      document.getElementById("gene").innerText = data.Genre;
      document.getElementById("lang").innerText = data.Language;
      document.getElementById("count").innerText = data.Country;
      document.getElementById("act").innerText = data.Actors;
      document.getElementById("dir").innerText = data.Director;
      document.getElementById("write").innerText = data.Writer;
      document.getElementById("award").innerText = data.Awards;
      document.getElementById("money").innerText = data.BoxOffice;
      document.getElementById("run").innerText = data.Runtime;
      document.getElementById("type").innerText = data.Type;       
      secondImage.setAttribute("src", data.Poster);
      console.log(data.Poster);
      console.log(data.Metascore)

      if(data.Ratings.length != 3){
        ratingsBubble.style.display = "none"
        console.log("ok")
      } else {
        console.log(data.imdbRating)
      
        let metaValue = data.Ratings[1].Value.substring(0, 2);
        imdbValue = data.imdbRating * 10
        console.log(imdbValue)
        averageValue = parseFloat(imdbValue) + parseFloat(metaValue) + parseFloat(data.Metascore)
        finalAverage = (averageValue / 3)
        console.log(finalAverage)
        ratingsText.innerText = Math.round(finalAverage)
        console.log(averageValue)
        console.log(finalAverage)
    
        if(finalAverage > 80){
          console.log("good")
          ratingsBubble.style.color = "green"
        } else if (finalAverage < 55){
          console.log("poor")
          ratingsBubble.style.color = 'red'
        } else if (finalAverage > 55 && finalAverage < 80){
          console.log("medium")
          ratingsBubble.style.color = "orange"
        } else {
        console.log("average rating not possible")
        ratingsBubble.style.display = "none"
        ratingsText.innerText = ""
        } 
      }
  })
}

function getIMDBData(){
  let chosen_title = localStorage.getItem("title");
  const search_api = `https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=${chosen_title}`;
  const img_path = "https://image.tmdb.org/t/p/w1280";
  fetch(search_api)
    .then((response)=>{return response.json()})
    .then((data) => {
      let results = data.results;
      console.log(results)
      for(let i=0; i < results.length; i++){
        if(chosen_title == results[i].title){
          document.getElementById("blueigdiud").style.backgroundImage = `url("${img_path + results[i].backdrop_path}")`;
          document.getElementById("dis").innerText = results[i].overview;      
        }
      }
    });
}

function toHomepage(event){
  event.preventDefault();
  window.location.href = "../../index.html";
}

function init(){
  getOMDBData();
  getIMDBData();
}

backButton.addEventListener("click", toHomepage);
init();

// faverate movie event listener add favorate movie information to local storage
// favorateMovie.addEventListener("click", function(event){
//   event.preventDefault();
  
//   if(localStorage.getItem("favorateMovesImg") != null){
//     if(!localStorage.getItem("favorateMovesImg").includes(localStorage.getItem("img"))){
//       let resultsImg = JSON.parse(localStorage.getItem("favorateMovesImg"));
//       let resultsTitle = JSON.parse(localStorage.getItem("favorateMovesTitle"));

//       resultsImg.push(localStorage.getItem("img"));
//       resultsTitle.push(localStorage.getItem("title"));
//       localStorage.setItem("favorateMovesImg", JSON.stringify(resultsImg));
//       localStorage.setItem("favorateMovesTitle", JSON.stringify(resultsTitle));
//     }
//   }else{
//     let resultsImg = [];
//     let resultsTitle = [];
//     resultsImg.push(localStorage.getItem("img"));
//     resultsTitle.push(localStorage.getItem("title"));
//     localStorage.setItem("favorateMovesImg", JSON.stringify(resultsImg));
//     localStorage.setItem("favorateMovesTitle", JSON.stringify(resultsTitle));
//   }  
// })






// var secondPageData = JSON.parse(localStorage.getItem("movieObject"))
// var movieGenre = secondPageData.
// function getTMDBData(){
//     var requestUrlImage = api + "/discover/movie?with_genres=" +  + "&sort_by=popularity.desc"


//     fetch(requestUrlImage)
//     .then(function(responseImage){
//        return responseImage.json(); 
//   })
//   .then(function(data){

        

          
      
//   })
// }


// function displaySimilarMovies(){

//     fetch(api + similarMovie + key)
//     .then(response => response.json())
//     .then(data => {
//       let results = data.results;
//       console.log(results)
//     });
//   }

//   displaySimilarMovies();




//   Action & Adventure  10759
// Animation           16
// Comedy              35
// Crime               80
// Documentary         99
// Drama               18
// Family              10751
// Kids                10762
// Mystery             9648
// News                10763
// Reality             10764
// Sci-Fi & Fantasy    10765
// Soap                10766
// Talk                10767
// War & Politics      10768
// Western             37
// Action          28
// Adventure       12
// Animation       16
// Comedy          35
// Crime           80
// Documentary     99
// Drama           18
// Family          10751
// Fantasy         14
// History         36
// Horror          27
// Music           10402
// Mystery         9648
// Romance         10749
// Science Fiction 878
// TV Movie        10770
// Thriller        53
// War             10752
// Western         37


// function loadData (data){
//     console.log(data)
//     var dataObject = JSON.parse(localStorage.getItem("results"))
//     console.log(dataObject);
//     window.location.href = "secondpage.html"
//     console.log(dataObject[0].original_title)
//     console.log(dataObject[0].poster_path)
//     secondImage.src = dataObject[0].poster_path
//     secondTitle.textContent = dataObject[0].original_title
// }

// loadData();

    //   var dataObject = JSON.parse(localStorage.getItem("results"))
    //   console.log(dataObject);
    //   window.location.href = "secondpage.html"
    //   console.log(dataObject[0].original_title)
    //   console.log(dataObject[0].poster_path)



      // secondImage.src = data.Poster