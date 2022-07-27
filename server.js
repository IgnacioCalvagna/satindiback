const express = require("express");
const {User} = require("./models");
const app = express();
const db = require("./db");
const port = process.env.port || 3001;
// const port =  3000;

const bodyParser = require("body-parser");
const routes = require("./routes");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const model = require("./models");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(cookieParser());
app.use(
  session({
    secret: "satindica",
    resave: true,
    saveUninitialized: true,
    cookie: { _expires: 60000000000000 },
  })
);
app.use(passport.initialize());
app.use(passport.session());

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

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err);
});
app.use("/api", routes);

db.sync({ force: false }).then(() => {
  app.listen(port, function () {
    console.log(`Listening on port http://localhost:${port}`);
  });
});
