import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true},
  password: {type: String, required: true },
  favourites: [{type: mongoose.Schema.Types.ObjectId,  ref: 'Movies'}]
});

UserSchema.statics.findByUserName = function (username) {
  return this.findOne({ username: username });
};

UserSchema.statics.findByMovieId = function (id) {
  return this.findOne({ _id: id});
};
UserSchema.methods.comparePassword = function (passw, callback) {
  bcrypt.compare(passw, this.password, (err, isMatch) => {
    console.log(this.password);
    console.log(passw);
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};
UserSchema.methods.compareMovies = function (movie, callback) {
  bcrypt.compare(movie, this.favourites, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};
UserSchema.pre('save', function(next) {
  const user = this;
  if (this.isModified('password') || this.isNew) {
      bcrypt.genSalt(10, (err, salt)=> {
          if (err) {
              return next(err);
          }
          bcrypt.hash(user.password, salt, null, (err, hash)=> {
              if (err) {
                  return next(err);
              }
              user.password = hash;
              next();
          });
      });
  } else {
      return next();
  }
});

export default mongoose.model('User', UserSchema);
