import { Link } from 'react-router-dom';

export const ClearFilterLink:React.FC = () => {
  return (
    <Link
      className="button is-link is-outlined is-fullwidth"
      to={{ search: '' }}
    >
      Reset all filters
    </Link>
  );
};
