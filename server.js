const express = require("express");
const {User} = require("./models");
const server = express();
const db = require("./db");
const port = process.env.PORT || 3001;
// const port =  3000;

const bodyParser = require("body-parser");
const routes = require("./routes");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
// const session = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const model = require("./models");
const session = require("cookie-session");
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(morgan("tiny"));
server.use(cookieParser());
server.use(
  session({
    secret: "satindica",
    resave: false,
    saveUninitialized: true,
    cookie: {secure: true, _expires: 60000000000000 },
  })
);
server.use(passport.initialize());
server.use(passport.session());

passport.use(
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },

    function (email, password, done) {
      User.findOne({ where: { email } })
        .then((user) => {
          if (!user) {
            return done(null, false);
          }

          user.setHash(password, user.salt).then((hash) => {
            if (hash !== user.password) {
              return done(null, false);
            }

            return done(null, user);
          });
        })
        .catch(done);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findByPk(id)
    .then((user) => {
      done(null, user);
    })
    .catch(done);
});

server.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err);
});
server.use("/api", routes);

db.sync({ force: false }).then(() => {
  server.listen(port, function () {
    console.log(`Listening on port http://localhost:${port}`);
  });
});
