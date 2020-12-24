const express = require("express");
const mongoose = require("mongoose");
const path = require("path")

const PORT = process.env.PORT || 3000;
const db = require("./models");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

//Make sure to add .env file with the key "MONGODB_URI="
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/workout", 
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

//Route to return the excercise.html
app.get("/exercise", (req,res) => {
    res.sendFile(path.join(__dirname, "./public/exercise.html"))
  });
  
  //Route to get all workouts
  app.get("/api/workouts", (req,res) => {
    db.Exercise.find({})
    .then(dbExercise => {
      res.json(dbExercise);
    })
    .catch(err => {
      res.json(err);
    });
  });
  
  //Route for creating a new workout
  app.post("/api/workouts", (req,res) => {
    db.Exercise.create({})
    .then(dbExercise => {
      res.json(dbExercise);
    })
    .catch(err => {
      res.json(err);
    });
  });
  
  //Route for updateing a workout by id
  app.put("/api/workouts/:id", ({ body, params }, res) => {
    db.Exercise.findByIdAndUpdate(params.id, { $push: { exercises: body } },{new:true})
    .then(dbExercise => {
      res.json(dbExercise);
    })
    .catch(err => {
      res.json(err);
    });
  });
  
  //Route for getting the stats of a workout
  app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/stats.html"))
  });
  
  //Route for getting the workouts from a range
  app.get("/api/workouts/range", (req, res) => {
    db.Exercise.find({})
      .then(dbExercise => {
        res.json(dbExercise);
      })
      .catch(err => {
        res.json(err);
      });
  });

  //Main connection
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });