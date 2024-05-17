import { Link } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

type Props = { person: Person };
export default function NotFoundPage({ person: { slug, name, sex } }: Props) {
  return (
    <Link
      to={'/people/' + slug}
      className={classNames({ 'has-text-danger': sex === 'f' })}
    >
      {name}
    </Link>
  );
}
