 const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=f222ac5c522a412165b0fd5767017b62&page=1';
// const API_URL = 'https://api.themoviedb.org/3/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.&api_key=f222ac5c522a412165b0fd5767017b62&page=1';
const Img_Path = 'https://image.tmdb.org/t/p/w1280';
const Search_API = 'https://api.themoviedb.org/3/search/movie?api_key=f222ac5c522a412165b0fd5767017b62&query=';

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getMovies(API_URL);
async function getMovies(url){
    const res = await fetch(url);
    const data = await res.json();
    showMovies(data.results);
}

function  showMovies(movies){
    main.innerHTML = "";
    movies.forEach((movie)=>{
        const {title, poster_path, vote_average, overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <img src="${Img_Path + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>`
        main.append(movieEl);
    });
}

function getClassByRate(vote){
    if(vote >= 8){
        return 'green'
    }else if(vote >= 5){
        return 'orange'
    }else{
        return 'red'
    }
}

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const searchTerm = search.value;
    if(searchTerm && searchTerm !== ""){
        getMovies(Search_API + searchTerm);
        search.value = "";
    }else{
        window.location.reload();
    }
})

