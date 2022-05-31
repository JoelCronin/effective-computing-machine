console.log("hello world")

const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";


fetch(FEATURED_API)
  .then(response => response.json())
  .then(data => console.log(data));
