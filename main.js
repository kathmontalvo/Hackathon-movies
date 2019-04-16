let infoMovies;

const getJson = (datajson) => {
  fetch(datajson)
    .then((res) => res.json())
    .then(data => {
      return infoMovies = data;
    })
};

const searchMovie = document.getElementById('search-movie');
const moviesCards = document.getElementById('movies-cards')
const carouselImgs = document.getElementById('carousel-imgs')
const mainPage = document.getElementById('main-page')
const navBar = document.getElementById('nav-bar')
const btnSearchBar = document.getElementById('btn-search-bar')

let i = 1
const movieKeyword = document.getElementById('keyword-value');

const searchKeyword = (e) => {
  e.preventDefault();
  getJson(`https://www.omdbapi.com/?s=${encodeURI(movieKeyword.value)}&page=${i}&apikey=c99c4c69`);
  setTimeout(printCards, 500);
  moviesCards.classList.remove('hide')
  carouselImgs.classList.remove('hide')
  infoGeneral.classList.add('hide')
  mainPage.classList.add('hide')
  navBar.classList.remove('hide')
}

const getSearchValue = (e) => {
  e.preventDefault();
  const movieValue = document.getElementById('movie-name').value;
  getJson(`https://www.omdbapi.com/?s=${encodeURI(movieValue)}&page=${i + 1}&apikey=c99c4c69`);
  setTimeout(printCards, 500);
  moviesCards.classList.remove('hide')
  carouselImgs.classList.add('hide')
  infoGeneral.classList.add('hide')
  mainPage.classList.add('hide')
}

const printCards = () => {
  arrData = Object.entries(infoMovies);
  arrMovies = arrData[0][1];

  document.getElementById('output').innerHTML = '';
  arrMovies.forEach((movie) => {
    let string =
      `<div name="movies" id=${movie.imdbID}>
      <img class="card-img-top" src=${movie.Poster} alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${movie.Title}</h5>
        </div>
        <div class="card-footer align-text-bottom">
          <small class="text-muted">Year: ${movie.Year}</small>
        </div>
      </div>`
    const div = document.createElement('div');
    div.innerHTML = string;
    div.className = 'card my-2 col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3';
    document.getElementById('output').appendChild(div);
    printMainInfo(div);
  })
}

const infoGeneral = document.getElementById('info-general')
const printMainInfo = (element) => {
  arrData = Object.entries(infoMovies);
  arrMovies = arrData[0][1];
  const printName = element.querySelector('[name=\'movies\']');
  printName.addEventListener('click', () => {
    moviesCards.classList.add('hide');
    carouselImgs.classList.add('hide');
    infoGeneral.classList.remove('hide');
    infoGeneral.innerHTML = '';
    const atribId = printName.getAttribute('id');
    getJson('https://www.omdbapi.com/?i=' + encodeURI(atribId) + '&apikey=c99c4c69')
    setTimeout(() => {
      console.log(infoMovies)
      let dataPerMovie = `
        <div class="row">
          <div class="col">
            <img src=${infoMovies.Poster} alt = "" >
          </div >
          <div class="col">
            <h2>${infoMovies.Title}</h2>
            <p>${infoMovies.Year}</p>
            <p>Genre: ${infoMovies.Genre}</p>
            <p>Actors: ${infoMovies.Actors}</p>
            <p>${infoMovies.Plot}</p>
            <p>Rating: ${infoMovies.imdbRating}</p>
          </div>
        </div >`
      infoGeneral.innerHTML = dataPerMovie;
    }, 500)
  })
}

btnSearchBar.addEventListener('click', searchKeyword)
searchMovie.addEventListener('click', getSearchValue)

const next = document.getElementById('next')
next.addEventListener('click', (e) => {
  e.preventDefault()
  getJson(`https://www.omdbapi.com/?s=${encodeURI(movieKeyword.value)}&page=${i++}&apikey=c99c4c69`);
  setTimeout(printCards, 400);
})