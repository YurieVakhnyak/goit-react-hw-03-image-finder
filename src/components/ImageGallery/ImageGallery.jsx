import React, { Component } from 'react';
// import { Notify } from 'notiflix';
// import axios from 'axios';
import { ImSpinner9 } from 'react-icons/im';
import { BallTriangle } from 'react-loader-spinner';
import { ImagesErrorView } from '../ImagesErrorView/ImagesErrorView';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from '../ImageGallery/ImageGallery.module.css';
import { FaTasks } from 'react-icons/fa';

const API_KEY = '33411326-e3b74484d09501fb125cb8795';
let pageNumber = 1;
let perPage = 12;

export class ImageGallery extends Component {
  state = {
    images: null,
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchValue !== this.props.searchValue) {
      this.setState({ status: 'pending' });
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
      setTimeout(() => {
        fetch(`https://pixabay.com/api/?${searchParams}`)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            return Promise.reject(new Error('Щось не так...'));
          })
          .then(images => {
            return this.setState({ images, status: 'resolved' });
          })
          .catch(error => this.setState({ error, status: 'rejected' }));
      }, 2000);
    }
  }

  render() {
    const { images, error, status } = this.state;
    if (status === 'idle') {
      return <div>Тут будуть картинки, якщо ти введеш запит...</div>;
    }
    if (status === 'pending') {
      return (
        <div>
          <ImSpinner9 size="40" className={css.iconSpin} color="blue" />
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperClass={{}}
            wrapperStyle=""
            visible={true}
          />
          Завантаження триває...
        </div>
      );
    }

    if (status === 'rejected') {
      return <ImagesErrorView message={error.message} />;
    }
    if (status === 'resolved') {
      return (
        <ul className={css.ImageGallery}>
          {images.hits.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              tags={tags}
            />
          ))}
        </ul>
      );
    }
  }
}
