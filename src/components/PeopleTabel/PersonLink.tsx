import classNames from 'classnames';
import { Link } from 'react-router-dom';
type Props = {
  name: string;
  sex: string;
  slug: string;
};

export const PersonLink: React.FC<Props> = ({ name, sex, slug }) => (
  <Link
    to={`/people/${slug}`}
    className={classNames({ 'has-text-danger': sex === 'f' })}
  >
    {name}
  </Link>
);
