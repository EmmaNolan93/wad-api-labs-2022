import express from 'express';
import User from './userModel';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
const router = express.Router(); // eslint-disable-line
import movieModel from '../movies/movieModel';
import tvShowModel from '../tvShows/tvShowModel';
import peopleModel from '../People/peopleModel';

// Get all users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

router.post('/',asyncHandler( async (req, res, next) => {
    var val = new RegExp( /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/);
    if (!req.body.username || !req.body.password) {
      res.status(401).json({success: false, msg: 'Please pass username and password.'});
      return next();
    }
    if (req.query.action === 'register') {
        if(val.test(req.body.password)){
      await User.create(req.body);
      res.status(201).json({code: 201, msg: 'Successful created new user.'});
        }
        else {
            res.status(401).json({success: false, msg: "password needs to are at least 5 characters long and contain at least one number and one letter"});
        }
    } else {
      const user = await User.findByUserName(req.body.username);
        if (!user) return res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
        user.comparePassword(req.body.password, (err, isMatch) => {
          if (isMatch && !err) {
            // if user is found and password matches, create a token
            const token = jwt.sign(user.username, process.env.SECRET);
            // return the information including token as JSON
            res.status(200).json({success: true, token: 'BEARER ' + token});
          } else {
            res.status(401).json({success: false,msg: 'Authentication failed. Wrong password.'});
          }
        });
      }
  }));
//Add a favouritetvShow. No Error Handling Yet. Can add duplicates too!
router.post('/:userName/favouritetvshows', asyncHandler(async (req, res) => {
  const newFavourite = req.body.id;
  const id = parseInt(newFavourite);
  const userName = req.params.userName;
  const tvshow = await tvShowModel.findBytvShowById(id);
  if(tvshow){
  const user = await User.findByUserName(userName);
  if(user){
  await user.favouriteTvShow.push(tvshow._id);
  await user.save(); 
  res.status(201).json(user); 
  } else{
    res.status(401).json({success: false, msg: 'Authentication failed. no such user exists.'});
  }
  }else{
    res.status(401).json({success: false, msg: ' No such tv show excists.'});
  }
}));
//Add a favouriteMovies. No Error Handling Yet. Can add duplicates too!
router.post('/:userName/favouritemovies', asyncHandler(async (req, res) => {
  const newFavourite = req.body.id;
  const userName = req.params.userName;
  const movie = await movieModel.findByMovieDBId(newFavourite);
  if(movie){
  const user = await User.findByUserName(userName);
  if(user){
  await user.favouriteMovies.push(movie._id);
  await user.save(); 
  res.status(201).json(user); 
  } else{
    res.status(401).json({success: false, msg: 'Authentication failed. no such user exists.'});
  }
  }else{
    res.status(401).json({success: false, msg: ' No such movie excists.'});
  }
}));
//Add a favouritePeople. No Error Handling Yet. Can add duplicates too!
router.post('/:userName/favouritepeople', asyncHandler(async (req, res) => {
  const newFavourite = req.body.id;
  const id = parseInt(newFavourite);
  const userName = req.params.userName;
  const people = await peopleModel.findByPeopleById(id);
  if(people){
  const user = await User.findByUserName(userName);
  if(user){
  await user.favouritePeople.push(people._id);
  await user.save(); 
  res.status(201).json(user); 
  } else{
    res.status(401).json({success: false, msg: 'Authentication failed. no such user exists.'});
  }
  }else{
    res.status(401).json({success: false, msg: ' No such person excists.'});
  }
}));
router.get('/:userName/favouritemovies', asyncHandler( async (req, res) => {
    const userName = req.params.userName;
    const user = await User.findByUserName(userName).populate('favouriteMovies');
    if(user){
    res.status(200).json(user.favouriteMovies);
    }
    else{
      res.status(401).json({success: false, msg: ' No such users excists.'});
    }
  }));

  router.get('/:userName/favouritepeople', asyncHandler( async (req, res) => {
    const userName = req.params.userName;
    const user = await User.findByUserName(userName).populate('favouritePeople');
    if(user){
    res.status(200).json(user.favouritePeople);
    }
    else{
      res.status(401).json({success: false, msg: ' No such users excists.'});
    }
  }));

  router.get('/:userName/favouritetvshow', asyncHandler( async (req, res) => {
    const userName = req.params.userName;
    const user = await User.findByUserName(userName).populate('favouriteTvShow');
    if(user){
    res.status(200).json(user.favouriteTvShow);
    }else{
    res.status(401).json({success: false, msg: ' No such users excists.'});
    }
  }));

export default router;