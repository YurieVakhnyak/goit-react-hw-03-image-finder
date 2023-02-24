import React, { Component } from 'react';
// import { Notify } from 'notiflix';
// import axios from 'axios';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from '../ImageGallery/ImageGallery.module.css';

const API_KEY = '33411326-e3b74484d09501fb125cb8795';
let pageNumber = 1;
let perPage = 12;

export class ImageGallery extends Component {
  state = {
    images: null,
    isLoading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchValue !== this.props.searchValue) {
      console.log('Vot eto daaaa!!!');
      console.log(`prevProps: ${prevProps.searchValue}`);
      console.log(`this.props.sV: ${this.props.searchValue}`);
      let inputQuery = this.props.searchValue.trim();
      console.log(inputQuery);
      const searchParams = new URLSearchParams({
        key: API_KEY,
        q: inputQuery,
        per_page: perPage,
        page: pageNumber,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      });

      this.setState({ isLoading: true, images: null });
      fetch(`https://pixabay.com/api/?${searchParams}`)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(new Error('Щось не так...'));
        })
        .then(images => this.setState({ images }))
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ isLoading: false }));
    }
  }

  render() {
    const { isLoading, images, error } = this.state;
    return (
      <ul className={css.ImageGallery}>
        {error && <div>{error.message}</div>}
        {isLoading && <div className="">Завантаження триває...</div>}
        {!images && <div>Тут будуть картинки, якщо ти введеш запит...</div>}
        {images && <div>{images.totalHits}</div>}
        <ImageGalleryItem />
      </ul>
    );
  }
}
