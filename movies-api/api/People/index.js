import express from 'express';
import { getPopPerson } from '../tmdb-api';
import peopleModel from './peopleModel';
import asyncHandler from 'express-async-handler';

const router = express.Router(); 
router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
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

  router.get('/tmdb/Person', asyncHandler( async(req, res) => {
    const upcomingMovies = await getPopPerson();
    res.status(200).json(upcomingMovies);
  }));
export default router;