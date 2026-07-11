require("dotenv").config();
const express = require("express"); //requiring the express
const app = express(); //This creates an Express application object.
const port = process.env.PORT || 8080;
const cors = require("cors");
const secret_cookie_parser = process.env.SECRET;
const secret_session = process.env.SESSION_SECRET;
const db_url = process.env.MONGODB_URI;

const connectDB = require("./config/db.js");

const Listing = require("./model/listing.js");
const User = require("./model/user.js");
const Review = require("./model/review.js");

const mainRouter = require("./routes/mainRouter.js");

const cookieParser = require("cookie-parser");
const session = require("express-session");
const { MongoStore } = require("connect-mongo");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

connectDB();
/* connectDB(); is basically for establishing connection between mongodb and backend. */

app.set("trust proxy", 1);

app.use(express.json());
/*meaning : If the request body contains JSON data, convert it into a JavaScript object and put it inside req.body, below is the example 
app.post("/random", (req, res) => {
  console.log(req.body);
  res.send("done");
});  if app.use(express.json()); is not written then it will print "undefined" */

app.use(express.urlencoded({ extended: true }));
/* above line is middleware that parses URL-encoded 'form data' from the request body and makes it available in req.body, while also supporting nested objects when extended is set to true.
e.g. 'username=Hitesh&email=hitesh@gmail.com'  converts to
{
  username: 'Hitesh',
  email: 'hitesh@gmail.com'
} 
*/

app.use(
  cors({
    origin: "https://vista-latest-1.onrender.com",
    credentials: true,
  })
);
/*It prevents a website from making requests to a different origin (domain, port, or protocol) unless the server explicitly allows it.*/

app.use(cookieParser(secret_cookie_parser));
/*This middleware is used to parse the cookies*/
/*
app.get("/get-cookies", (req, res) => {
  res.cookie("greet", "namaste" , {signed : true});
  res.send("sent some cookies");
});

app.get("/print-cookies", (req, res) => {
  console.dir(req.signedCookies);
  res.send("printed cookies");
});
*/

const store = MongoStore.create({
  mongoUrl: db_url,
  crypto: {
    secret: secret_session,
  },
  touchAfter: 24 * 3600,
});

store.on("error", (err) => {
  console.log("Error in mongo session store", err);
});

const sessionOptions = {
  store,
  secret: secret_session,
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions)); //this is for establishing a session
app.use(passport.initialize()); //initializes
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); //every request or user is authenticated using local strategy by authenticate function

passport.serializeUser(User.serializeUser()); //saving user related information
passport.deserializeUser(User.deserializeUser()); //deleting user related information

// app.get("/current-user", (req, res) => {
//   console.log(req.user);
//   res.send(req.user);
// });

// app.get("/demouser", async (req, res) => {
//   let demouser = new User({
//     email: "demo1@email.com",
//     username: "demo1",
//   });
//   let registeredUser = await User.register(demouser, "helloworld"); //Convenience method to register a new user instance with a given password. Checks if username is unique.
//   res.send(registeredUser);
// });

// app.get("/test", (req, res) => {
//   console.log(req.session);
//   res.send("test sucessfull");
// });

app.use("/", mainRouter);
/* above are the routing middleware it sends the related requests to the particular routing file. */

//test to fill data
/*
//test route for filling database 
app.get("/listing-data", async (req, res) => {
  const sampleListings = new Listing({
    title: "Luxury Beachfront Villa",
    description:
      "Enjoy breathtaking ocean views from this beautiful beachfront villa. Perfect for families and groups looking for a relaxing getaway.",
    price: 12000,
    location: "Goa",
    country: "India",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
    owner: "684b8f1c1234567890abcdef",
    reviews: [],
  });
  await sampleListings.save();
  console.log("data uploaded");
  res.send("test successful");
});

app.get("/user-data", async (req, res) => {
  const sampleUser = new User({
    username: "rishu",
    email: "rishu@gmail.com",
    password: "chole bhature",
  });
  await sampleUser.save();
  console.log("data uploaded successfully");
  res.send(sampleUser);
});

app.get("/review-data", async (req, res) => {
  const sampleReview = new Review({
    comment: "looks nice ahh...",
    rating: 2,
    author: "rishu",
  });
  await sampleReview.save();
  console.log("data uploaded successfully");
  res.send(sampleReview);
});
*/

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
