import express from 'express';
import { getPopPerson } from '../tmdb-api';
import peopleModel from './peopleModel';
import asyncHandler from 'express-async-handler';
import { peopleRating } from './peopleData';
import uniqid from 'uniqid';

const router = express.Router(); 
// Get all  Pop Poeple
router.get('/', async (req, res) => {
  const genres = await peopleModel.find();
  res.status(200).json(genres);
});
// Set a limit to the amount of Data returned 
router.get('/limit/:limit', asyncHandler(async (req, res) => {
    let { page = 1, limit = req.params.limit} = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    const totalDocumentsPromise = peopleModel.estimatedDocumentCount(); //Kick off async calls
    const peoplePromise = peopleModel.find().limit(limit).skip((page - 1) * limit);

    const totalDocuments = await totalDocumentsPromise; //wait for the above promises to be fulfilled
    const movies = await peoplePromise;

    const returnObject = { page: page, total_pages: Math.ceil(totalDocuments / limit), total_results: totalDocuments, results: movies };//construct return Object and insert into response object

    res.status(200).json(returnObject);
}));
// Get a specific person 
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const people = await peopleModel.findByPeopleById(id);
    if (people) {
        res.status(200).json(people);
    } else {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
}));

//Post a people  rating
router.post('/:id/rating', (req, res) => {
  const id = parseInt(req.params.id);
  const peopleRatings = peopleRating.find((rate) => rate.id== id);
  if (peopleRatings) {
      req.body.id = uniqid();
      peopleRatings.results.push(req.body); 
      res.status(200).json(req.body);
  } else {
      res.status(404).json({
          message: 'The resource you requested could not be found.',
          status_code: 404
      });
  }
});

// Get a specific people rating
router.get('/:id/rating', (req, res) => {
  const id = parseInt(req.params.id);
  const peopleRatings = peopleRating.find((rate) => rate.id== id);
  // find reviews in list
  if (peopleRatings) {
      res.status(200).json(peopleRatings);
  } else {
      res.status(404).json({
          message: 'The resource you requested could not be found.',
          status_code: 404
      });
  }
});

// get pop people form the tmdb api
  router.get('/tmdb/Person', asyncHandler( async(req, res) => {
    const upcomingMovies = await getPopPerson();
    res.status(200).json(upcomingMovies);
  }));
export default router;