import axios from "axios";

const axiosRapidApihQL = axios.create({
  baseURL:
    "https://andruxnet-random-famous-quotes.p.rapidapi.com/?count=1&cat=famous",
  headers: {
    "X-RapidAPI-Key": `${process.env.REACT_APP_RAPIDAPI_PERSONAL_ACCESS_TOKEN}`,
    "Content-Type": "application/x-www-form-urlencoded"
  }
});
const twitter =
  "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=";
const colors = [
  { bg: "violet", txt: "teal" },
  { bg: "orange", txt: "black" },
  { bg: "yellow", txt: "blue" },
  { bg: "purple", txt: "grey" },
  { bg: "olive", txt: "brown" },
  { bg: "grey", txt: "pink" }
];

export { axiosRapidApihQL, twitter, colors };
