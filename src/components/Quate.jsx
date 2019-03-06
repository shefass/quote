import React, { Component } from "react";
import { Segment, Header, Container, Grid, Button, Icon } from "semantic-ui-react";

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
    const {
      error,
      isLoaded,
      title,
      content
      
     } = this.state;
    

    if (error) {
      return <Segment>Error: {error.message}</Segment>;
    } else if (!isLoaded) {
      return <Segment size='massive'>Loading...</Segment>;
    } else {
      return (
        <Segment textAlign='center' style={{borderRadius: '20px'}} >
          <Header as="h1" color={colors[this.state.colors].txt} style={{fontSize: '3em'}}>
            {title}
          </Header>
          <Container style={{fontSize: '2em', marginBottom: '1em', lineHeight: '1em'}}>
            {content}
          </Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={8}>
                <Button content="Next Quote" 
                onClick={this.doTwoActions}
                color={colors[this.state.colors].txt}
                icon='right arrow'
                labelPosition='right'
                />
              </Grid.Column>
              <Grid.Column width={8}>
                <Button
                  as="a"
                  href={`${twitter}${title}: "${content}"`}
                  target="_blank"
                  rel="noopener noreferrer"
                  color={colors[this.state.colors].txt}
                >
                  <Icon name='twitter' /> Tweet!
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      );
    }
  }
}

export default Quate;
