import React, { Component } from "react";
import {
  Segment,
  Header,
  Container,
  Grid,
  Button,
  Icon,
  Responsive
} from "semantic-ui-react";

import { axiosRapidApihQL, twitter, colors } from "./defaults";

class Quate extends Component {
  state = {
    error: null,
    isLoaded: false,
    title: "",
    colors: 0,
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
  };

  doTwoActions = () => {
    this.apicallTest();
    this.changeColors();
  };

  render() {
    const { error, isLoaded, title, content } = this.state;

    const style = {
      container: {
        backgroundColor: colors[this.state.colors].txt,
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1em"
      },
      color: {
        color: colors[this.state.colors].txt
      },
      textcolor: {
        fontSize: "2em",
        marginBottom: "1em",
        lineHeight: "1em",
        color: colors[this.state.colors].txt
      },
      background: {
        backgroundColor: colors[this.state.colors].bg,
        borderRadius: "20px"
      }
    };

    if (error) {
      return <Segment>Error: {error.message}</Segment>;
    } else if (!isLoaded) {
      return (
        <Responsive style={style.container}>
          <Segment size="massive" style={{ color: "teal" }}>
            Loading...
          </Segment>
        </Responsive>
      );
    } else {
      return (
        <Responsive style={style.container}>
          <Segment textAlign="center" style={style.background}>
            <Header
              as="h1"
              color={style.color.color}
              style={{ fontSize: "3em" }}
            >
              {title}
            </Header>
            <Container text style={style.textcolor}>
              {content}
            </Container>
            <Grid>
              <Grid.Row>
                <Grid.Column width={8}>
                  <Button
                    content="Next Quote"
                    size="medium"
                    onClick={this.doTwoActions}
                    color={style.color.color}
                    icon="right arrow"
                    labelPosition="right"
                  />
                </Grid.Column>
                <Grid.Column width={8}>
                  <Button
                    as="a"
                    size="medium"
                    href={`${twitter}${title}: "${content}"`}
                    target="_blank"
                    rel="noopener noreferrer"
                    color={style.color.color}
                  >
                    <Icon name="twitter" /> Tweet!
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Responsive>
      );
    }
  }
}

export default Quate;
