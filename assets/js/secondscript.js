const secondImage = document.getElementById("second-page-image")
const secondTitle = document.getElementById("second-page-title")
const similarMovie = "/discover/movie?with_genres=18&sort_by=popularity.desc"
const api = "https://api.themoviedb.org/3";
const key = "&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const movieSecondPage = localStorage.getItem("title");
const backButton = document.getElementById("back-button")
const ratingsText = document.getElementById("rating-text");
const ratingsBubble = document.getElementById("locks");
const favoriteMovie = document.getElementById("plus-button");
const scroll = document.querySelectorAll(".scroll");

// Gets data from OMDB and then renders it to the page
function getOMDBData(){
    var movieSecondPage = localStorage.getItem("title");
    var requestUrlImage = "https://www.omdbapi.com/?apikey=84b19fcd&t=" + movieSecondPage

  fetch(requestUrlImage)
    .then((responseImage)=>{return responseImage.json()})
    .then((data)=>{

      secondTitle.innerText = movieSecondPage;
      document.getElementById("release-date").innerText = data.Year.slice(0, 4);;
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
      
      if(data.Poster){
        secondImage.setAttribute("src", data.Poster);
      } else {
        console.log('no poster');
      }

      // Check to see if API call has three ratings. If it doesnt then doesnt show rating
      if(data.Ratings.length != 3){
        ratingsBubble.style.display = "none"
      // If it does have 3 ratings then converts them all to out of 100 and then averages them to get new rating
      } else {
        let metaValue = data.Ratings[1].Value.substring(0, 2);
        imdbValue = data.imdbRating * 10
        averageValue = parseFloat(imdbValue) + parseFloat(metaValue) + parseFloat(data.Metascore)
        finalAverage = (averageValue / 3)
      // Changes colour of ratings bubble to relfect it being good, bad or average
        if(finalAverage > 80){
          ratingsBubble.style.color = "green"
          document.getElementById("second-page-image").setAttribute("class", "movie-selected-poster good");
          ratingsText.innerText = Math.round(finalAverage) + "👍"

        } else if (finalAverage < 55){
          ratingsBubble.style.color = 'red'
          document.getElementById("second-page-image").setAttribute("class", "movie-selected-poster poor");
          ratingsText.innerText = Math.round(finalAverage) + "👎"

        } else if (finalAverage > 55 && finalAverage < 80){
          ratingsBubble.style.color = "yellow"
          document.getElementById("second-page-image").setAttribute("class", "movie-selected-poster medium");
          ratingsText.innerText = Math.round(finalAverage) + "🤔"
          ratingsText.style.color = "black"

        } else {
        ratingsBubble.style.display = "none"
        ratingsText.innerText = ""
        } 
      }
    })
}

// Performs second API call to get trailer and comments from TMDB
function getIMDBData(){
  let chosen_title = localStorage.getItem("title");
  const search_api = `https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=${chosen_title}`;
  const img_path = "https://image.tmdb.org/t/p/w1280";
  fetch(search_api)
    .then((response)=>{return response.json()})
    .then((data) => {
      let results = data.results;
      let data_id;
      
      for(let i=0; i < results.length; i++){
        if(chosen_title == results[i].title){
          if(results[i].backdrop_path){
            document.getElementById("blueigdiud").style.backgroundImage = `url("${img_path + results[i].backdrop_path}")`;
            document.getElementById("load").style.backgroundImage = `url("${img_path + results[i].backdrop_path}")`;
          }
          document.getElementById("dis").innerText = results[i].overview;
          data_id = results[i].id;
        }
      }
      getTrailer(data_id);
      getComments(data_id);
      getProvider(data_id);
    });
}

// Shows random films from same genre at bottom of the page to explore
function byGenre(){
  const pages = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  const page = pages[Math.floor(Math.random() * pages.length)];
  const img_path = "https://image.tmdb.org/t/p/w1280";
  const api = "https://api.themoviedb.org/3";
  const key = `&api_key=04c35731a5ee918f014970082a0088b1&page=${page}`;
  const most_popular_query = "/discover/movie?sort_by=popularity.desc";

  fetch(api + most_popular_query + key)
    .then((response)=>{return response.json()})
    .then((data)=>{
      let results = data.results;
      for(let i = 1; i < pages.length; i++){
      document.getElementById("scroll-" + i).setAttribute("src", img_path + results[i].poster_path);
      document.getElementById("scroll-" + i).setAttribute("data-title", results[i].title);
      }
    })
} 
// Renders trailer to screen
function getTrailer(id){
  const video_api = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=04c35731a5ee918f014970082a0088b1`;
  const video_path = "https://www.youtube.com/embed/";
  const auto_play = "?autoplay=1";
  // const auto_play = "";
  const mute = "&mute=1"

  fetch(video_api)
    .then((response)=>{return response.json()})
    .then((data)=>{
      
      if(data.results == 0){
        document.getElementById("video").style.display = "none";
      } else {
        let video = video_path + data.results[0].key + auto_play + mute + "&loop=1" + "&modestbranding=1&autohide=1&showinfo=0&controls=1";
        document.getElementById("video").setAttribute("src", video);
        document.getElementById("video").style.display = "block";
      }
    })
}

// Renders comments to screen
function getComments(id){
  const api = `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=04c35731a5ee918f014970082a0088b1&page=1`;

  fetch(api)
  .then((response)=>{return response.json()})
  .then((data)=>{
    let results = data.results;

    if(results[0]){
      document.getElementById("first-username").innerText = results[0].author_details.username;
      document.getElementById("comment-content-1").innerHTML = results[0].content;
    }

    if(results[1]){
      document.getElementById("username-2").innerText = results[1].author_details.username;
      document.getElementById("comment-content-2").innerHTML = results[1].content;
    } 

    if(results[2]){
      document.getElementById("username-3").innerText = results[2].author_details.username;
      document.getElementById("comment-content-3").innerHTML = results[2].content;
    } 
  })
}

// Take suser back to homepage
function toHomepage(event){
  event.preventDefault();
  window.location.href = "../../index.html";
}

// Allows user to scroll sideways through similar films
function sideDrag(e){
  const slider = document.getElementById("items");
  let isDown = false;
  let startX;
  let scrollLeft;
  
  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
  });
  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
  });
  
  slider.addEventListener('mousemove', (e) => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 3; //scroll-fast
    slider.scrollLeft = scrollLeft - walk;
  });
  

}

// favorite movie event listener add favorite movie information to local storage
function favorite(event){
  event.preventDefault();
  
  if(localStorage.getItem("favoriteMovesImg") != null){
    if(!localStorage.getItem("favoriteMovesImg").includes(localStorage.getItem("img"))){
      let resultsImg = JSON.parse(localStorage.getItem("favoriteMovesImg"));
      let resultsTitle = JSON.parse(localStorage.getItem("favoriteMovesTitle"));

      resultsImg.push(localStorage.getItem("img"));
      resultsTitle.push(localStorage.getItem("title"));
      localStorage.setItem("favoriteMovesImg", JSON.stringify(resultsImg));
      localStorage.setItem("favoriteMovesTitle", JSON.stringify(resultsTitle));
    }
  }else{
    let resultsImg = [];
    let resultsTitle = [];
    resultsImg.push(localStorage.getItem("img"));
    resultsTitle.push(localStorage.getItem("title"));
    localStorage.setItem("favoriteMovesImg", JSON.stringify(resultsImg));
    localStorage.setItem("favoriteMovesTitle", JSON.stringify(resultsTitle));
  }  
}

function getProvider(id){

  const api = `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=04c35731a5ee918f014970082a0088b1`;

  // fetch(api)
  //   .then((response)=>{return response.json()})
  //   .then((data)=>{
  //     document.getElementById("netflix").setAttribute("href", data.results.AE.link);
  //     document.getElementById("disney").setAttribute("href", data.results.AE.link);
  //     document.getElementById("amazon").setAttribute("href", data.results.AE.link);
  //     document.getElementById("apple").setAttribute("href", data.results.AE.link);
  //     document.getElementById("crave").setAttribute("href", data.results.AE.link);
  //     document.getElementById("cineplex").setAttribute("href", data.results.AE.link);
  //   });
  
}

function load(){
  window.addEventListener('load', () => {
    setTimeout(()=>{
        document.getElementById("blueigdiud").style.display = 'block';
        document.getElementById("content").style.display = 'block';
        document.getElementById("load").style.display = 'none';
    }, 2000)
  });
}


function init(){
  load();
  getOMDBData();
  getIMDBData();
  byGenre();
  sideDrag();
  backButton.addEventListener("click", toHomepage);
  favoriteMovie.addEventListener("click", favorite);
}

init();

//function to check if user clicked on the same movie again
function duplicateCheck(resultsImg, event) {
  var check = 0;
  for(let i=0; i < resultsImg.length; i++){
    if(event.target.src == resultsImg[i]){
      check++;
    }
  }
  return check
}

// bottom scroll event listener, when user click picture, it will go to next movie page
// and get the next movie information, store it in local storage
scroll.forEach(function(element){
  element.addEventListener("click", function(event){
    event.preventDefault();
    
    //get data-title from element
    let title = $(this).attr("data-title"); 
    localStorage.setItem("title", title)
    localStorage.setItem("img", event.target.src) 

    if(localStorage.getItem("historyImg") != null){
      let resultsImg = JSON.parse(localStorage.getItem("historyImg"));
      let resultsTitle = JSON.parse(localStorage.getItem("historyTitle"));
      if(duplicateCheck(resultsImg, event) == 0){
        resultsImg.push(event.target.src);
        resultsTitle.push(title);
        localStorage.setItem("historyImg", JSON.stringify(resultsImg));
        localStorage.setItem("historyTitle", JSON.stringify(resultsTitle));
      }
    }else{
      let resultsImg = [];
      let resultsTitle = [];
      resultsImg.push(event.target.src);
      resultsTitle.push(title);
      localStorage.setItem("historyImg", JSON.stringify(resultsImg));
      localStorage.setItem("historyTitle", JSON.stringify(resultsTitle));
    }

    window.location.reload();    
  });
})


