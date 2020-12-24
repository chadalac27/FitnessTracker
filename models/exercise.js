const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const opts = { toJSON: { virtuals: true } };

const exerciseSchema = new Schema({
  day: {
    type: Date,
    default: () => new Date()
  },

  exercises: [
    {
      type: {type: String, trim: true,},
      name: {type: String, trim: true,},
      duration: {type: Number},
      weight: {type: Number},
      reps: {type: Number},
      sets: {type: Number},
      distance: {type: Number},
  }],

}, opts); 

exerciseSchema.virtual("totalDuration").get(function () {
  // "reduce" array of exercises down to just the sum of their durations
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration;
  }, 0);
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;