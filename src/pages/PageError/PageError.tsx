import './PageError.scss';

export const PageError = () => (
  <div className="error-page">
    <h1 className="title has-text-danger">Page not found</h1>
    <span className="has-text-danger">Error 404</span>
    <span>Please check the url address.</span>
  </div>
);
