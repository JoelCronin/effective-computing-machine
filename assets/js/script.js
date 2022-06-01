const box = document.getElementById("box")

const api = "https://api.themoviedb.org/3";
const key = "&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const most_popular_query = "/discover/movie?sort_by=popularity.desc"
const inTheatures_query = "/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22";
const most_popular_kids_query = "/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc";

const poster_path = "https://image.tmdb.org/t/p/w1280";

function display_movies(){

  fetch(api + most_popular_query + key)
  .then(response => response.json())
  .then(data => {
    let results = data.results;

    for(let i=0; i < results.length; i++){
      let movie_div = document.createElement("div");
      let container_div = document.createElement("div");
      let box_1_div = document.createElement("div");
      let rating_tag = document.createElement("p");
      let img_tag = document.createElement("img");
      let title_tag = document.createElement("h3");
      let date_tag = document.createElement("p");
    
      movie_div.setAttribute("class", "movie");
      container_div.setAttribute("class", "container");
      box_1_div.setAttribute("class", "box-1");
      rating_tag.setAttribute("class", "rating");
      img_tag.setAttribute("class", "poster");
      title_tag.setAttribute("class", "title");
      date_tag.setAttribute("class", "date");
    
      movie_div.appendChild(container_div);
      container_div.appendChild(box_1_div);
      box_1_div.appendChild(rating_tag);
      container_div.appendChild(img_tag);
      container_div.appendChild(title_tag);
      container_div.appendChild(date_tag);

      rating_tag.innerText = results[i].vote_average;
      img_tag.setAttribute("src", `${poster_path}${results[i].poster_path}`);
      title_tag.innerText = `${results[i].title}`
      date_tag.innerText = `${results[i].release_date}`
      
      box.appendChild(movie_div);
    }
  });
}


function init(){
  display_movies();
}

init();
