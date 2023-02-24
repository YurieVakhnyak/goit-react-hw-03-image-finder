import ErrorImage from './error-cat.jpg';

export const ImagesErrorView = ({ message }) => {
  return (
    <div role="alert">
      <img src={ErrorImage} alt="sadcat" />
      <p>{message}</p>
    </div>
  );
};
