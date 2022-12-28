import userModel from '../users/userModel';
import genresModel from '../genres/genresModel';
import peopleModel from '../People/peopleModel';
import users from './users';
import dotenv from 'dotenv';
import genres from "./genres";
import movieModel from '../movies/movieModel';
import movies from './movies.js';
import people from './poeple';


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
// deletes all user documents in collection and inserts test data
async function loadPeople() {
  console.log('load people Data');
  try {
    await peopleModel.deleteMany();
    await people.forEach(user => peopleModel.create(user));
    console.info(`${people.length} People were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load People Data: ${err}`);
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
}
