import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

const users = [];
const tweets = [];

app.post("/sign-up", (req, res) => {
  const user = req.body;
  users.push(user);
  res.send("OK");
});

app.post("/tweets", (req, res) => {
  const tweet = req.body;
  tweets.push(tweet);
  res.send("OK");
});

app.get("/tweets", (req, res) => {
  const lastTweets = [];
  const newTweets = tweets;
  newTweets.forEach((tweet) => {
    const image = users.find(() => tweet.username);
    tweet.avatar = image.avatar;
  });
  if (newTweets.length > 10) {
    for (let i = newTweets.length - 1; i > newTweets.length - 11; i--) {
      lastTweets.push(newTweets[i]);
    }
    res.send(lastTweets);
  } else {
    for (let i = 0; i < newTweets.length; i++) {
      lastTweets.unshift(newTweets[i]);
    }
    res.send(lastTweets);
  }
});

app.listen(5000);
