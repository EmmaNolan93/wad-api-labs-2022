# Assignment 2 - Web API.

Name: [Emma Nolan]

## Features.

[A bullet-point list of the ADDITIONAL features/endpoints you have implemented in the API **THAT WERE NOT IN THE LABS** ]. 

 + Get tv show credits: Get a list of cast & crew of a specific tv show using its ID
 + Get Movie credits: Get a list of cast & crew of a specific movie using its ID
 + Get Movies: Get all movies form TMDB api
 + Gat all movies: from the db
 + Get movies by genre: Get a movies by its genre id 
 + Get people: get all people in the DB
 + Get people detail: Get a speicif person detail by it ID
 + Get people (limit): get a list of people in the db but it is limited by a value
 + get a specific person: Get a specific person (not its detail ) by its ID
 + post a rating of a person: post a rating of a person using their ID. The rating can only be  between 0 and 10
 + get a rating of a person: Get all ratings of a one person based on their ID
 + get people: get people form the tmdb api 
 + get tv shows (Limit): get a number of tv show based on a value
 + get tv show reviews: get all tv shows reviews ( on all tv shows)
 + get a tv show review: Get all the reviews on a specifc tv show using their id
 + get a tv show rating: get a all ratings on a specific tv show using its id 
 + post a tv show rating: post a rating of a tv show based on its id and the rating most be between 0 and 10.
 + post a tv show review: post a tv show review on a specific tv show using its id.
 + get a specific tv show: based on a selected genre using an genre id 
 + get tv show credit: get the cast and crew of a tv show based on its id 
 + get a tv show: get a specific tv show using its id 
 + 

## Installation Requirements


git clone http:\myrepo.git

followed by installation:
npm install --save-dev babel-cli babel-preset-env nodemon eslint babel-eslint
npm install --save dotenv express
mkdir db
mongod -dbpath db
npm install -save mongoose
npm install --save express-session
 npm install --save passport passport-jwt jsonwebtoken bcrypt-nodejs




## API Configuration
env file:

NODE_ENV=development
PORT=8080
HOST=localhost
MONGO_DB=mongodb://localhost:27017/movies_db
SEED_DB=True

bebelrc: file:
{
    "presets": ["env"]
  }

  eslintc.json file:
  {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "semi": 1,
        "no-console": "off"
    }
}

mongose must be installed and a database directory is neeeded
  


## API Design
Give an overview of your web API design, perhaps similar to the following: 

|  |  GET | POST | PUT | DELETE
| -- | -- | -- | -- | -- 
| /api/movies |Gets a list of movies | N/A | N/A |
| /api/movies/{movieid} | Get a Movie | N/A | N/A | N/A
| /api/movies/{movieid}/reviews | Get all reviews for movie | Create a new review for Movie | N/A | N/A  
| /api/movies/genre/:name |Gets a list of movies that has the genre id based on its name (Action/Adventure) | N/A | N/A |
| /api/movies/:id/details |Get movie details | N/A | N/A |
| /api/movies/tmdb/upcoming |Get movies form the tmdb database | N/A | N/A |
| /api/movies/tmdb/:id/credits |Get cast & crew of a movie form the tmdb database | N/A | N/A |
| /api/people/limit/:limit |Gets a number of people based on the limit number entered | N/A | N/A |
| /api/people | Gets a list of people | N/A | N/A | N/A
| /api/people/:id | Get a specific person | Create a new review for Movie | N/A | N/A  
| /api/people/:id/rating |Gets a specifc person ratings | post a rating of a person give that their rating is between 0 and 10 | N/A |
| /api/tvshow |Gets a list of tv shows | N/A | N/A |
| /api/tvshow/{tvshowid} | Get a tv show | N/A | N/A | N/A
| /api/tvshow/{tvshowid}/reviews | Get all reviews for tv show | Create a new review for a tv show | N/A | N/A  
| /api/tv show/genre/:name |Gets a list of tv show that has the genre id based on its name (Action/Adventure) | N/A | N/A |
| /api/tvshows/:id/details |Get a tv show details | N/A | N/A |
| /api/people/:id/credits |Get cast & crew of a tv show | N/A | N/A |
| /api/tvshow/:id/rating |Gets a specifc tv show ratings | post a rating of a person give that their rating is between 0 and 10 | N/A |






## Security and Authentication
This api implements a JWT-based Authentication strategy.This api will create authentication with JSON Web Tokens.A jwt token must be inlcuded with every request. meaning  the api/movies route, will only be available to users with a valid JWT Token.  Routes that re protected are the api/tv shows, api/people and api/movies.

## Integrating with React App
Could not get the proxy route to work  

~~~Javascript
export const getMovies = () => {
  return fetch(
     '/api/movies',{headers: {
       'Authorization': window.localStorage.getItem('token')
    }
  }
  )
    .then(res => res.json())
    .then(json => {return json.results;});
};

~~~
  