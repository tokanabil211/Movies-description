const apiKey = "api_key=9813ce01a72ca1bd2ae25f091898b1c7";
const url = "https://api.themoviedb.org/3";
const path = "/discover/movie?sort_by=popularity.desc&";
const apiUrl = url + path + apiKey;
const imgUrl = "https://image.tmdb.org/t/p/w500";

const content = document.getElementById("content");

if(location.pathname == './home.html')
{
    getData(apiUrl);
}
else
{
    getDataReview(apiUrl);
}


function getData(url){
fetch(url)
.then((Response) => Response.json())
.then((data)=>{
    console.log(data.results);
    showMovies(data.results);
});
}  
getData(apiUrl); 

////////SHOW MOVIES//////// 

function showMovies(data){
    content.innerHTML = "";
    data.forEach((element) => {
     const{title,poster_path,id,adult,release_date,vote_average} = element;
     console.log("element");  
     const movie = document.createElement('div');
     movie.classList.add('element');
     movie.innerHTML = `
     <a href="./ReviewPage.html?id=${id}">
     <img src="${imgUrl+poster_path}"/>
     <h4>${title}</h4>
     </a>
    
     <p>adult: ${adult}</p>
     <p>release date :${release_date}</p>
     <p> vote average : ${vote_average}</p>

     
     `;

     content.appendChild(movie);
    });

}


///////////REVIEW PAGE/////////

const movieID = location.search.split("=")[1];
const movieReview = document.getElementById("movieReview");

function getDataReview(url){
    fetch(url)
    .then((Response) => Response.json())
    .then((data)=>{
      data.results.forEach((element)=>{
        if (element.id == movieID)
        {
           const {title,poster_path,overview,adult,release_date,vote_average} = element;
           const movie = document.createElement("div");
           movie.classList.add("container");
           movie.innerHTML = `
           <img src="${imgUrl+ poster_path}"/>
           <div>
           <h3>
           ${title}
           </h3>
           <p>Overview: ${overview}</p>
           <p>adult: ${adult}</p>
     <p>release date :${release_date}</p>
     <p> vote average :${vote_average}</p>
    
           </div>
           `;
           movieReview.appendChild(movie); 
        }

      })
    });
    }  
   


