import React, { Component } from "react";

import { axiosRapidApihQL, twitter, colors } from "./defaults";

class Quate extends Component {
  state = {
    error: null,
    isLoaded: false,
    title: "",
    colors: 0,
    hasCaptureQuote: false,
    hasCaptureTweet: false,
    content: []
  };

  componentDidMount() {
    this.apicallTest();
  }

  apicallTest = () => {
    axiosRapidApihQL.post().then(
      result => {
        this.setState({
          isLoaded: true,
          title: result.data[0].author,
          content: result.data[0].quote
        });
      },
      error => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    );
  };

  changeColors = () => {
    if (this.state.colors > 4) {
      this.setState({
        colors: 0
      });
    } else {
      this.setState({
        colors: this.state.colors + 1
      });
    }

    setTimeout(
      () =>
        document.documentElement.style.setProperty(
          "--main-bg-color",
          colors[this.state.colors].bg
        ),
      200
    );

    setTimeout(
      () =>
        document.documentElement.style.setProperty(
          "--main-txt-color",
          colors[this.state.colors].txt
        ),
      200
    );
  };

  doTwoActions = () => {
    this.apicallTest();
    this.changeColors();
  };

  onEnterQuote = () => {
    this.setState({ hasCaptureQuote: true });
  };
  onLeaveQuote = () => {
    this.setState({ hasCaptureQuote: false });
  };
  onEnterTweet = () => {
    this.setState({ hasCaptureTweet: true });
  };
  onLeaveTweet = () => {
    this.setState({ hasCaptureTweet: false });
  };

  render() {
    const {
      error,
      isLoaded,
      title,
      content,
      hasCaptureTweet,
      hasCaptureQuote
    } = this.state;
    const buttonHoverQuote = {
      backgroundColor: hasCaptureQuote && "white",
      color: hasCaptureQuote && "black"
    };
    const spanStyle = {
      padding: hasCaptureQuote && "10px",
      transition: "0.5s"
    };
    const buttonHoverTweet = {
      backgroundColor: hasCaptureTweet && "white",
      color: hasCaptureTweet && "black"
    };

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
              onPointerEnter={this.onEnterQuote}
              onPointerLeave={this.onLeaveQuote}
              style={buttonHoverQuote}
              onClick={this.doTwoActions}
            >
              <span style={spanStyle}>Next Quote</span>
            </button>
            <a
              href={`${twitter}${title}: "${content}"`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                id="tweet-quote"
                type="button"
                onPointerEnter={this.onEnterTweet}
                onPointerLeave={this.onLeaveTweet}
                style={buttonHoverTweet}
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

export default Quate;
