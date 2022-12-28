import express from 'express';
import { getTvShows } from '../tmdb-api';
import tvShowModel from './tvShowModel';
import asyncHandler from 'express-async-handler';

const router = express.Router(); 
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
// Get movie details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await tvShowModel.findBytvShowById(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
}));
  router.get('/tmdb/tvshows', asyncHandler( async(req, res) => {
    const upcomingMovies = await getTvShows();
    res.status(200).json(upcomingMovies);
  }));
export default router;