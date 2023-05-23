import React, { Component } from 'react';

import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';

class App extends Component {
  state = {
    formQuery: '',
  };

  onFormSubmit = ({ formQuery }) => {
    this.setState({
      formQuery,
    })
  }
  
    render() {
      const { formQuery } = this.state
       return (
        <>
        <Searchbar
        onSubmit={this.onFormSubmit}
        />
        <ImageGallery
        query={formQuery}
        />
        </>
       )
    }
  };

  export default App;