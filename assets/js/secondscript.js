var secondImage = document.getElementById("second-page-image")
var secondTitle = document.getElementById("second-page-title")

function loadData (data){
    console.log(data)
    var dataObject = JSON.parse(localStorage.getItem("results"))
    console.log(dataObject);
    window.location.href = "secondpage.html"
    console.log(dataObject[0].original_title)
    console.log(dataObject[0].poster_path)
    secondImage.src = dataObject[0].poster_path
    secondTitle.textContent = dataObject[0].original_title
}

loadData();