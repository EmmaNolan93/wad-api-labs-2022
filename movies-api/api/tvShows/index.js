import express from 'express';
import { getTvShows } from '../tmdb-api';
import tvShowModel from './tvShowModel';
import uniqid from 'uniqid';
import asyncHandler from 'express-async-handler';
import { genres } from './tvShowData';
import { tvReview } from './tvShowData';
import { tvshowCredits } from './tvShowData';
import { tvRating } from './tvShowData';

const router = express.Router(); 
//gets all tv shows from mongo db
router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    const totalDocumentsPromise = tvShowModel.estimatedDocumentCount(); //Kick off async calls
    const tvShowsPromise = tvShowModel.find().limit(limit).skip((page - 1) * limit);

    const totalDocuments = await totalDocumentsPromise; //wait for the above promises to be fulfilled
    const movies = await tvShowsPromise;

    const returnObject = { page: page, total_pages: Math.ceil(totalDocuments / limit), total_results: totalDocuments, results: movies };//construct return Object and insert into response object

    res.status(200).json(returnObject);
}));
// get all tv show reviews ( I only have a review for one of the tv shows game of thrones)
router.get('/reviews', async (req, res) => {
  res.status(200).json(tvReview);
});
// Get a specific tv show reviews
router.get('/:id/reviews', (req, res) => {
  const id = parseInt(req.params.id);
  const tvreviews = tvReview.find((review) => review.id== id);
  // find reviews in list
  if (tvreviews) {
      res.status(200).json(tvreviews);
  } else {
      res.status(404).json({
          message: 'The resource you requested could not be found.',
          status_code: 404
      });
  }
});

// Get a specific tv show rating
router.get('/:id/rating', (req, res) => {
  const id = parseInt(req.params.id);
  const tvRatings = tvRating.find((rate) => rate.id== id);
  // find reviews in list
  if (tvRatings) {
      res.status(200).json(tvRatings);
  } else {
      res.status(404).json({
          message: 'The resource you requested could not be found.',
          status_code: 404
      });
  }
});

//Post a tv show reviews 
router.post('/:id/reviews', (req, res) => {
  const id = parseInt(req.params.id);
  const tvreviews = tvReview.find((review) => review.id== id);
  if (tvreviews) {
      req.body.created_at = new Date();
      req.body.updated_at = new Date();
      req.body.id = uniqid();
      tvreviews.results.push(req.body); //push the new review onto the list
      res.status(200).json(req.body);
  } else {
      res.status(404).json({
          message: 'The resource you requested could not be found.',
          status_code: 404
      });
  }
});

//Post a tv show rating
router.post('/:id/rating', (req, res) => {
  const id = parseInt(req.params.id);
  const tvRatings = tvRating.find((rate) => rate.id== id);
  if (tvRatings) {
      req.body.id = uniqid();
      tvRatings.results.push(req.body); 
      res.status(200).json(req.body);
  } else {
      res.status(404).json({
          message: 'The resource you requested could not be found.',
          status_code: 404
      });
  }
});

// get tv show  by genere 
router.get('/genre/:name', asyncHandler(async (req, res) => {
  const name = req.params.name;
  const tvshows = genres.genres.find((genre) => genre.name== name);
  const id = parseInt(tvshows.id);
  const movie =  await tvShowModel.findByTvShowGenreDBId(id);
  if (movie) {
      res.status(200).json(movie);
  } else {
      res.status(404).json({
          message: 'The resource you requested could not be found.',
          status_code: 404
      });
  }
}));

// get tv show credits
router.get('/credits/:id', asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const tvshows = tvshowCredits.find((genre) => genre.id== id);
  if (tvshows) {
      res.status(200).json(tvshows);
  } else {
      res.status(404).json({
          message: 'The resource you requested could not be found.',
          status_code: 404
      });
  }
}));

// get tv show  limit 
router.get('/limit/:limit', asyncHandler(async (req, res) => {
  let { page = 1, limit = parseInt(req.params.limit) } = req.query; // destructure page and limit and set default values
  [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

  const totalDocumentsPromise = tvShowModel.estimatedDocumentCount(); //Kick off async calls
  const tvshowPromise = tvShowModel.find().limit(limit);

  const totalDocuments = await totalDocumentsPromise; //wait for the above promises to be fulfilled
  const tvshpw = await tvshowPromise;

  const returnObject = { page: page, total_pages: Math.ceil(totalDocuments / limit), total_results: totalDocuments, results: tvshpw };//construct return Object and insert into response object

  res.status(200).json(returnObject);
}));
// Get a specific tv show form mongo db
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await tvShowModel.findBytvShowById(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
}));

// get tmdb tv shows 
  router.get('/tmdb/tvshows', asyncHandler( async(req, res) => {
    const upcomingMovies = await getTvShows();
    res.status(200).json(upcomingMovies);
  }));
export default router;