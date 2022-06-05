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

      if(data.Ratings.length != 3){
        ratingsBubble.style.display = "none"

      } else {
        let metaValue = data.Ratings[1].Value.substring(0, 2);
        imdbValue = data.imdbRating * 10
        averageValue = parseFloat(imdbValue) + parseFloat(metaValue) + parseFloat(data.Metascore)
        finalAverage = (averageValue / 3)
        ratingsText.innerText = Math.round(finalAverage)
    
        if(finalAverage > 80){
          ratingsBubble.style.color = "green"
          document.getElementById("second-page-image").setAttribute("class", "movie-selected-poster good");


        } else if (finalAverage < 55){
          ratingsBubble.style.color = 'red'
          document.getElementById("second-page-image").setAttribute("class", "movie-selected-poster poor");

        } else if (finalAverage > 55 && finalAverage < 80){
          ratingsBubble.style.color = "orange"
          document.getElementById("second-page-image").setAttribute("class", "movie-selected-poster medium");


        } else {
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
    });
}

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
      
      document.getElementById("scroll-1").setAttribute("src", img_path + results[0].poster_path);
      document.getElementById("scroll-2").setAttribute("src", img_path + results[1].poster_path);
      document.getElementById("scroll-3").setAttribute("src", img_path + results[2].poster_path);
      document.getElementById("scroll-4").setAttribute("src", img_path + results[3].poster_path);
      document.getElementById("scroll-5").setAttribute("src", img_path + results[4].poster_path);
      document.getElementById("scroll-6").setAttribute("src", img_path + results[5].poster_path);
      document.getElementById("scroll-7").setAttribute("src", img_path + results[6].poster_path);
      document.getElementById("scroll-8").setAttribute("src", img_path + results[7].poster_path);
      document.getElementById("scroll-9").setAttribute("src", img_path + results[8].poster_path);
      document.getElementById("scroll-10").setAttribute("src", img_path + results[9].poster_path);
      document.getElementById("scroll-11").setAttribute("src", img_path + results[10].poster_path);
      document.getElementById("scroll-12").setAttribute("src", img_path + results[11].poster_path);
      document.getElementById("scroll-13").setAttribute("src", img_path + results[12].poster_path);
      document.getElementById("scroll-14").setAttribute("src", img_path + results[13].poster_path);
      document.getElementById("scroll-15").setAttribute("src", img_path + results[14].poster_path);
  })
} 

function getTrailer(id){
  const video_api = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=04c35731a5ee918f014970082a0088b1`;
  const video_path = "https://www.youtube.com/embed/";
  const auto_play = "?autoplay=1";
  // const auto_play = "";
  const mute = "&mute=1"

  fetch(video_api)
    .then((response)=>{return response.json()})
    .then((data)=>{
      
      if(data.results == []){
        document.getElementById("video").style.display = "none";
      } else {
        let video = video_path + data.results[0].key + auto_play + mute + "&loop=1" + "&modestbranding=1&autohide=1&showinfo=0&controls=0";
        document.getElementById("video").setAttribute("src", video);
        document.getElementById("video").style.display = "block";
      }
    })
}

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

    if(results[3]){
      document.getElementById("username-4").innerText = results[3].author_details.username;
      document.getElementById("comment-content-4").innerHTML = results[3].content;
    } 
  })
}

function toHomepage(event){
  event.preventDefault();
  window.location.href = "../../index.html";
}

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
    console.log(walk);
  });
  

}

function load(){
  window.addEventListener('load', () => {
    setTimeout(()=>{
        console.log("display elements")
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
}

init();

// favorite movie event listener add favorite movie information to local storage
favoriteMovie.addEventListener("click", function(event){
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
})