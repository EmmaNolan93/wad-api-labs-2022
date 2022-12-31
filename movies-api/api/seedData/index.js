import userModel from '../users/userModel';
import genresModel from '../genres/genresModel';
import peopleModel from '../People/peopleModel';
import tvShowModel from '../tvShows/tvShowModel';
import users from './users';
import dotenv from 'dotenv';
import genres from "./genres";
import movieModel from '../movies/movieModel';
import movies from './movies.js';
import people from './poeple';
import tvShow from './tvShows';


dotenv.config();

// deletes all user documents in collection and inserts test data
async function loadUsers() {
  console.log('load user Data');
  try {
    await userModel.deleteMany();
    await users.forEach(user => userModel.create(user));
    console.info(`${users.length} users were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load user Data: ${err}`);
  }
}
// deletes all People documents in collection and inserts test data
async function loadPeople() {
  console.log('load people Data');
  try {
    await peopleModel.deleteMany();
    await people.forEach(people => peopleModel.create(people));
    console.info(`${people.length} People were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load People Data: ${err}`);
  }
}
// deletes all Tv Shows documents in collection and inserts test data
async function loadTvShow() {
  console.log('load Tv Shows Data');
  try {
    await tvShowModel.deleteMany();
    await tvShow.forEach(user => tvShowModel.create(user));
    console.info(`${tvShow.length} Tv Shows were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load tv Show Data: ${err}`);
  }
}
async function loadGenres() {
  console.log('load genre Data');
  try {
    await genresModel.deleteMany();
    await genresModel.collection.insertMany(genres);
    console.info(`${genres.length} genres were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load genres Data: ${err}`);
  }
}
// deletes all movies documents in collection and inserts test data
export async function loadMovies() {
  console.log('load seed data');
  console.log(movies.length);
  try {
    await movieModel.deleteMany();
    await movieModel.collection.insertMany(movies);
    console.info(`${movies.length} Movies were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load movie Data: ${err}`);
  }
}
if (process.env.SEED_DB) {
  loadUsers();
  loadGenres();
  loadMovies();//ADD THIS LINE
  loadPeople();
  loadTvShow();
}
