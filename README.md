# Movie App

We were approached to make a personal movie database system, in which the user could search for any movie they wanted and receive back a wealth of information on this movie inlcuding rating, plot, actors, director, trailer and box office takings to name just a few. We also wanted a way to mark films as favourites to be watched later.

## Approach

To do this we utilised two free API's, namely TMDB and OMDB. Using fetch calls to these we were able to gather all the data we needed and we set about displaying it on our webpage. On our homepage we would display the 20 top results for the users search (which can be done through text input on a search bar or by the user clicking on predetermined searches on the side button such as 'Top Rated', 'In Theatres' etc).

![Fullsize webpage](./assets/img/joelcronin.github.io_effective-computing-machine_index.html.png)

Event listeners were embedded into all the movie images so that if a user clicked on them then it would take them to a second page, solely dedicated ot that specific movie. This page would then display lots of different information as shown in the pic below:

![Fullsize webpage](./assets/img/morbius%20.png)

Included in this information was a unique rating system whereby we took the average of IMDB, MetaCritic and Rotten Tomatoes and averaged the three out to give an even more accurate rating score to our users. At the bottom the page we also showed 20 films of a similar genre that the user could side-scroll through.

## Local Storage

Our website used local storage in a number of ways to enhance the UX. For example, if they searched for "Batman" and then clicked on one of the batman films but decided they did not want that one, when they press the back button the displayed movies would still be showing those relating to their initial "Batman" search. We also used it to allow users to save movies to their favourite list and whenever they pressed the 'Favourite Movies' button on the sidebar all their favourites would show up.

## Use of moment

We also used momentjs to ensure that the In Theatres and Upcoming sections would always stay up-to-date for our users.

## Link

To view the website yourself please [click here](https://joelcronin.github.io/effective-computing-machine/index.html)

