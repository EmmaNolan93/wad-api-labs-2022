import mongoose from 'mongoose';


const Schema = mongoose.Schema;


const PeopleSchema = new Schema({
    birthday: { type: String },
    id: { type: Number, required: true, unique: true },
    poster_path: { type: String },
    known_for_department: { type: String },
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


