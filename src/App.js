import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

const axiosRapidApihQL = axios.create({
  baseURL: 'https://andruxnet-random-famous-quotes.p.rapidapi.com/?count=1&cat=famous',
  headers: { 'X-RapidAPI-Key': `${process.env.REACT_APP_RAPIDAPI_PERSONAL_ACCESS_TOKEN}`,
              'Content-Type': 'application/x-www-form-urlencoded',
  },
});
const twitter = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div id="wrapper">
          <Quate />
        </div>
      </div>
    );
  }
}

export default App;

class Quate extends React.Component {
  state = {
    error: null,
    isLoaded: false,
    title: '',
    content: []    };

  componentDidMount() {
    this.apicallTest();
    } 

  apicall = () => 
    this.apicallTest();
     

    apicallTest = () => {
     axiosRapidApihQL.post()
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            title: result.data[0].author,
            content: result.data[0].quote
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    } 
   
  render() {
    const { error, isLoaded, title, content } = this.state;
    
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div id="quote-box">
          <h1 id="author">{title}</h1>
          <br />
          <div id="text">{content}</div>
          <br />
          <div id="buttons">
            <button id="new-quote" type="button" onClick={this.apicall}>
              <span>Next Quote</span>
            </button>
            <a 
              href={`${twitter}${title}: "${content}"`}
              target="_blank" 
              rel="noopener noreferrer" >
              <button id="tweet-quote" type="button">
                Tweet!
              </button>
            </a>
          </div>
           
          
        </div>
      );
    }
  }
}