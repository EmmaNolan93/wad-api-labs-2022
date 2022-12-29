import mongoose from 'mongoose';


const Schema = mongoose.Schema;


const tvShowSchema = new Schema({
    created_by: [
      {
        id:{ type: Number, required: true, unique: true },
        credit_id:  { type: String, required: true, unique: true },
        name:  { type: String},
        gender: {type: String},
      }
    ],
    episode_run_time: [
        {type: Number}
    ],
    first_air_date: {type: String},
    genres: [
      {
        ids: { type: Number },
        name: {type: String},
      }
    ],
    homepage: {type: String},
    id: { type: Number, required: true, unique: true },
    in_production: {type: Boolean},
    languages: [
        {type: String}
    ],
    last_air_date: {Type: String},
    last_episode_to_air: {
      air_date: {type: String},
      episode_number: {type: Number},
      id: { type: Number},
      name: {type: String},
      overview: {type: String},
      production_code: {type: String},
      season_number: {type: Number},
      vote_average: {type: Number},
      vote_count: {type: Number},
    },
    name: {type: String},
    networks: [
      {
        name: {type: String},
        id: { type: Number, required: true, unique: true },
        origin_country: { type: String}
      }
    ],
    number_of_episodes: {type: Number},
    number_of_seasons: {type: Number},
    origin_country: [
        {type: String},
    ],
    original_language: {type: String},
    original_name: {type: String},
    overview: {type: String},
    popularity: {type: Number},
    poster_path: {type: String},
    production_companies: [
      {
         id: { type: Number, required: true, unique: true },
        name: {type: String},
        origin_country: {type: String},
      },
    ],
    production_countries: [
      {
        iso_3166_1: {type: String},
        name: {type: String},
      },
    ],
    seasons: [
      {
        air_date: {type: String},
        episode_count: {type: Number},
        id: { type: Number, required: true, unique: true },
        name: {type: String},
        overview: {type: String},
        season_number: {type: Number},
      },
    ],
    spoken_languages: [
      {
        english_name: {type: String},
        iso_639_1: {type: String},
        name: {type: String},
      }
    ],
    status: {type: String},
    tagline: {type: String},
    type: {type: String},
    vote_average: {type: Number},
    vote_count: {type: Number,
    }
});


tvShowSchema.statics.findBytvShowById = function (id) {
  return this.findOne({ id: id });
};

export default mongoose.model('Tv Show', tvShowSchema);