import mongoose from 'mongoose';


const Schema = mongoose.Schema;


const PeopleSchema = new Schema({
    birthday: { type: String },
    id: { type: Number, required: true, unique: true },
    profile_path: { type: String },
    known_for: [
      {
        poster_path: {type: String},
        adult: {type: Boolean},
        overview: {type: String},
        release_date: {type: String},
        original_title: {type: String},
        genre_ids: [{type: Number}],
        id: { type: Number, required: true, unique: true },
        media_type: {type: String},
        original_language: {type: String},
        title: {type: String},
        backdrop_path: {type: String},
        popularity: {type: Number},
        vote_count: {type: Number},
        video: {type: Boolean},
        vote_average: {type: Number},
      },
    ],
    namee: { type: String },
    also_known_as: [{ type: String }],
    gender: { type: Number },
    biography: { type: String },
    popularity: { type: Number },
    adult: { type: Boolean },
    imdb_id: { type: String},
});

PeopleSchema.statics.findByPeopleById = function (id) {
  return this.findOne({ id: id });
};





export default mongoose.model('People', PeopleSchema);


