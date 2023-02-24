import css from '../ImageGalleryItem/ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  return (
    <div>
      <a className="gallery__item" href={largeImageURL}>
        <img className="image" src={webformatURL} alt={tags} loading="lazy" />
      </a>
    </div>
  );
};
