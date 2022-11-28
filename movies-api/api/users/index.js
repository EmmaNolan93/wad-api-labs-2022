import express from 'express';
import User from './userModel';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
const router = express.Router(); // eslint-disable-line
import movieModel from '../movies/movieModel';
import e from 'express';

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
//Add a favourite. No Error Handling Yet. Can add duplicates too!
router.post('/:userName/favourites', asyncHandler(async (req, res) => {
    var index = 0;
    const newFavourite = req.body.id;
    const userName = req.params.userName;
    const movie = await movieModel.findByMovieDBId(newFavourite);
    const user = await User.findByUserName(userName);
    var ans = true;
    if(user.favourites.length > 0){
    while(user.favourites.length > index && user.favourites[index]._id  != movie._id ){
        if(user.favourites[index]._id == movie._id ){
            ans = false;
            console.log(ans);
        }
          index++;
    }
    if(ans){
        await user.favourites.push(movie._id);
        await user.save(); 
        res.status(201).json(user);
    } else{
        res.status(401).json({success: false,msg: 'Authentication failed. Wrong password.'});
    }
}else{
    await user.favourites.push(movie._id);
        await user.save(); 
        res.status(201).json(user);
}
  }));

  router.get('/:userName/favourites', asyncHandler( async (req, res) => {
    const userName = req.params.userName;
    const user = await User.findByUserName(userName).populate('favourites');
    res.status(200).json(user.favourites);
    console.log(user.favourites[0]._id);
  }));

export default router;