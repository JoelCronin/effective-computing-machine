var secondImage = document.getElementById("second-page-image")
var secondTitle = document.getElementById("second-page-title")

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

function getOMDBData(){
    var movieSecondPage = localStorage.getItem("title");
    var requestUrlImage = "https://www.omdbapi.com/?apikey=84b19fcd&t=" + movieSecondPage


    fetch(requestUrlImage)
    .then(function(responseImage){
       return responseImage.json(); 
  })
  .then(function(data){
    //   console.log(data)
    //   var dataObject = JSON.parse(localStorage.getItem("results"))
    //   console.log(dataObject);
    //   window.location.href = "secondpage.html"
    //   console.log(dataObject[0].original_title)
    //   console.log(dataObject[0].poster_path)
      secondImage.src = data.Poster
      secondTitle.textContent = data.Title
      console.log(data);
      console.log(data.Metascore)
      let metaValue = data.Ratings[1].Value.substring(0, 2);
      console.log(metaValue)
    //   console.log(data.Ratings[1].Value)
    //   console.log(data.imdbRating)
      imdbValue = data.imdbRating * 10
      console.log(imdbValue)
      averageValue = parseFloat(imdbValue) + parseFloat(metaValue) + parseFloat(data.Metascore)
      finalAverage = (averageValue / 3)
      console.log(averageValue)
      console.log(finalAverage)

      if(finalAverage > 80){
          console.log("good")
      } else if (finalAverage < 55){
          console.log("poor")
      } else if (isNaN(finalAverage)){
          console.log("average rating not possible")
      } else {
        console.log("average")
    }
        

          
      
  })
}

getOMDBData();