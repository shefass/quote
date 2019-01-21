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
    colors: 0,
    hasCaptureQuote: false,
    hasCaptureTweet: false,
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
    onEnterQuote = (e) => {
      this.setState({hasCaptureQuote: true})
    }
    onLeaveQuote = (e) => {
      this.setState({hasCaptureQuote: false})
    }
    onEnterTweet = (e) => {
      this.setState({hasCaptureTweet: true})
    }
    onLeaveTweet = (e) => {
      this.setState({hasCaptureTweet: false})
    }
   
  render() {
    const { error, isLoaded, title, content, hasCaptureTweet, hasCaptureQuote } = this.state;
    const buttonHoverQuote = {
      backgroundColor: hasCaptureQuote && 'white',
      color: hasCaptureQuote && 'black',
    }
    const spanStyle = {
      padding: hasCaptureQuote && '10px',
      transition: '0.5s'
    }
    const buttonHoverTweet = {
      backgroundColor: hasCaptureTweet && 'white',
      color: hasCaptureTweet && 'black'
    }
    
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div id="loading">Loading...</div>;
    } else {
      return (
        <div id="quote-box">
          <h1 id="author">{title}</h1>
          <div id="text">{content}</div>
          <div id="buttons">
            <button 
            id="new-quote" 
            type="button"
            onPointerEnter = {this.onEnterQuote}
            onPointerLeave = {this.onLeaveQuote} 
            style = {buttonHoverQuote}
            onClick={this.apicall}>
              <span style={spanStyle}>Next Quote</span>
            </button>
            <a 
              href={`${twitter}${title}: "${content}"`}
              target="_blank" 
              rel="noopener noreferrer" >
              <button 
              id="tweet-quote" 
              type="button"
              onPointerEnter = {this.onEnterTweet}
              onPointerLeave = {this.onLeaveTweet}
              style = {buttonHoverTweet}
              >
                Tweet!
              </button>
            </a>
          </div>
           
          
        </div>
      );
    }
  }
}