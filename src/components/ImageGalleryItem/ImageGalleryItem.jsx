import React, { Component } from 'react';
import css from '../ImageGalleryItem/ImageGalleryItem.module.css';
import { Modal } from '../Modal/Modal';
import { ImSpinner9 } from 'react-icons/im';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
    loading: true,
  };

  handleImageLoad = () => {
    this.setState({ loading: false });
  };

  toggleModal = evt => {
    evt.preventDefault();
    console.log(evt.target);
    console.log(evt.target.src);

    this.setState(({ showModal }) => ({
      showModal: !showModal,
      target: evt.target,
    }));
  };

  render() {
    const { showModal, loading } = this.state;
    const { webformatURL, largeImageURL, tags } = this.props;
    console.log(showModal);
    if (showModal) {
      return (
        <Modal className={css.ImageGalleryItem} onClick={this.toggleModal}>
          {loading && (
            <ImSpinner9 size="100" className={css.iconSpin} color="blue" />
          )}
          <img
            onClick={this.toggleModal}
            onLoad={this.handleImageLoad}
            src={largeImageURL}
            alt={tags}
            loading="lazy"
          />
        </Modal>
      );
    }

    return (
      <div className={css.ImageGalleryItem} onClick={this.toggleModal}>
        <img
          className={css.ImageGalleryItemImage}
          src={webformatURL}
          alt={tags}
          loading="lazy"
        />
      </div>
    );
  }
}
