// Direct package imports from npm
const express = require('express');
const session = require('express-session');

// Imports from elsewhere in this directory
const sequelize = require('./config/connection');
const login = require("./routes/loginroutes");
const topic = require("./routes/topicRoutes");
const comment = require("./routes/commentRoutes");

// SESSION SETUP
    // This sets Sequelize up to have sessions
const SequelizeStore = require('connect-session-sequelize')(session.Store);
    // This configures a session for a user
const sess = {
    // This may need to change as it has caused me issues before...
    // I'm unsure how to properly set the environment variable for this
    secret: process.env.SESSION_SECRET,
        // !!** This times the user out after 10 minutes...feel free to comment it out if necessary
    cookie: {
        maxAge: 600000
    },
    rolling: true,
        // !!**
    // Prevents the session from being updated unless changes were made to it
    resave: false,
    // Prevents sessions being created unless there is a change to it
    saveUninitialized: false,
    // Tells the session to store its data in our db
    store: new SequelizeStore({
        db: sequelize
    })
};

// Setup the express server
const app = express();
const PORT = process.env.PORT || 3001;

// Templating engine setup...to be decided by front end, i.e. ...
// Handlebars or no

// MIDDLEWARE
    // Our server will structure data as JSON
app.use(express.json());
    // Our server will have urlencoded data
app.use(express.urlencoded({ extended: true }));
    // Our server's session will use the settings defined in `sess`
app.use(session(sess));

// Turn on access to routes...when they are available
const routes = require('./controllers');
app.use(routes);

// Force Sequelize to drop the models if true 
sequelize.sync({ force: false })
    // Turn on the server
    .then( () => {
        app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}`));
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  
  app.get("/", (req, res) => {
    res.json({ status: "hello" });
  });
  app.post("/register", login.register);
  app.post("/login", login.login);
  app.post("/reset", login.reset);
  
  app.post("/createtopic", verifyToken, topic.createTopic);
  app.put("/modifytopic", verifyToken, topic.modifyTopic);
  app.get("/findtopic", verifyToken, topic.getTopic);
  app.delete("/deletetopic", verifyToken, topic.deleteTopic);
  app.get("/getall", verifyToken, topic.getAll);
  
  app.post("/createcomment", verifyToken, comment.createComment);
  app.put("/modifycomment", verifyToken, comment.modifyComment);
  app.get("/findcomment", verifyToken, comment.getComment);
  app.delete("/deletecomment", verifyToken, comment.deleteComment);
  app.get("/search-comments", verifyToken, comment.searchText);
  
  function verifyToken(req, res, next) {
    const Header = req.headers["authorization"];
    if (typeof Header !== "undefined") {
      req.token = Header;
      jwt.verify(req.token, "secretkey", (err, authData) => {
        if (err) {
          console.log(err);
          res.sendStatus(403);
        } else {
          req.email = authData.users.email;
          next();
  
          // res.json({
          //   message: 'Post created...',
          //   authData
  
          // });
        }
      });
    } else {
      res.sendStatus(403);
    }
  }
  
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });