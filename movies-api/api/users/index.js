import express from 'express';
import User from './userModel';
import asyncHandler from 'express-async-handler';
const router = express.Router(); // eslint-disable-line

// Get all users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

// register(Create)/Authenticate User
router.post('/', asyncHandler(async (req, res) => {
    await User(req.body).save();
    res.status(201).json({
        code: 201,
        msg: 'Successful created new user.',
    });
}));
router.post('/:id/favourites', async (req, res) => {
    const newFavourite = req.body;
    if (newFavourite && newFavourite.id) {
        const user = await User.findById(req.params.id);
        if (user) {
            user.favourites.push(newFavourite);
            user.save();
            res.status(201).json({ code: 201, msg: "Added Favourite" });
        } else {
            res.status(404).json({ code: 404, msg: 'Unable to add favourites' });
        }
    }
});

router.get('/:id/favourites', async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.status(200).json(user.favourites);
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to find favourites' });
    }
});

export default router;