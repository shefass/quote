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
  { bg: "#6893e9", txt: "#33518b" },
  { bg: "#48597a", txt: "black" },
  { bg: "#008000", txt: "#400080" },
  { bg: "#400040", txt: "#ff8000" },
  { bg: "#c0c0c0", txt: "#408080" },
  { bg: "#0080ff", txt: "#ff80c0" }
];

export { axiosRapidApihQL, twitter, colors };
