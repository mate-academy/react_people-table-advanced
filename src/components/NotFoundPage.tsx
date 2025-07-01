import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className="has-text-centered">
      <h1 className="title">Page not found</h1>

      <Link to="/" className="button is-link mt-4">
        Go back home
      </Link>
    </div>
  );
};
