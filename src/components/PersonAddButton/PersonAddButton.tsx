import { Link } from 'react-router-dom';

export const PersonAddButton: React.FC = () => {
  return (
    <Link to="/people/new" className="button is-success">ADD PERSON</Link>
  );
};
