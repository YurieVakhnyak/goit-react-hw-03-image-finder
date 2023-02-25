import React, { Component } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  static defaultProps = {
    initialImages: [
      {
        image:
          'https://unitedwayirc.org/wp-content/uploads/2020/11/Product-Images_Grapefruit-scaled-300x300.jpg',
      },
    ],
  };
  state = {
    images: this.props.initialImages,
    searchValue: '',
  };

  submitSearchValue = data => {
    const { searchValue } = data;

    this.setState({ searchValue });
  };

  render() {
    return (
      <div>
        <Searchbar submitSearchValue={this.submitSearchValue} />

        <ImageGallery searchValue={this.state.searchValue} />
      </div>
    );
  }
}
