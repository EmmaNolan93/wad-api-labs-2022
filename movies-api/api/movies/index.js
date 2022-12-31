import express from 'express';
import {getUpcomingMovies} from '../tmdb-api';
import uniqid from 'uniqid';
import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import { movieReviews} from './moviesData';
import { getMovieReviews } from '../tmdb-api';
import { movieDetails } from './moviesData';
import { genres } from './moviesData';

const router = express.Router(); 

// get all movies
router.get('/', async (req, res) => {
    const movies = await movieModel.find();
    res.status(200).json(movies);
});
// get Movie limit 
router.get('/limit/:limit', asyncHandler(async (req, res) => {
    let { page = 1, limit = parseInt(req.params.limit) } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    const totalDocumentsPromise = movieModel.estimatedDocumentCount(); //Kick off async calls
    const moviesPromise = movieModel.find().limit(limit);

    const totalDocuments = await totalDocumentsPromise; //wait for the above promises to be fulfilled
    const movies = await moviesPromise;

    const returnObject = { page: page, total_pages: Math.ceil(totalDocuments / limit), total_results: totalDocuments, results: movies };//construct return Object and insert into response object

    res.status(200).json(returnObject);
}));
// Get movie 
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
}));
// Get movie reviews
router.get('/:id/reviews', (req, res) => {
    const id = parseInt(req.params.id);
    // find reviews in list
    if (movieReviews.id == id) {
        res.status(200).json(movieReviews);
    } else {
        res.status(404).json({
            message: 'The resource you requested could not be found.',
            status_code: 404
        });
    }
});
// get movies by genere 
router.get('/genre/:name', asyncHandler(async (req, res) => {
    const name = req.params.name;
    const movies = genres.genres.find((genre) => genre.name== name);
    const id = parseInt(movies.id);
    const movie =  await movieModel.findByMovieGenreDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({
            message: 'The resource you requested could not be found.',
            status_code: 404
        });
    }
}));
// get movie details
router.get('/:id/details', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    // find details in list 
    if (movieDetails.id == id) {
        res.status(200).json(movieDetails);
    } else {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
}));
//Post a movie review
router.post('/:id/reviews', (req, res) => {
    const id = parseInt(req.params.id);
    if (movieReviews.id == id) {
        req.body.created_at = new Date();
        req.body.updated_at = new Date();
        req.body.id = uniqid();
        movieReviews.results.push(req.body); //push the new review onto the list
        res.status(201).json(req.body);
    } else {
        res.status(404).json({
            message: 'The resource you requested could not be found.',
            status_code: 404
        });
    }
});
router.get('/tmdb/upcoming', asyncHandler( async(req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
  }));
  router.get('/tmdb/:id/credits', asyncHandler( async(req, res) => {
    const id = parseInt(req.params.id);
    console.log(id);
    const upcomingMovies = await getMovieReviews(id);
    if(upcomingMovies){
    res.status(200).json(upcomingMovies);
    }
    else {
        res.status(404).json({
            message: 'The resource you requested could not be found.',
            status_code: 404
        });
    }
  }));
export default router;