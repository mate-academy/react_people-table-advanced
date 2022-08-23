import { Link } from 'react-router-dom';
import ScrollIntoView from 'react-scroll-into-view';
import { Person } from '../../types';

type Props = {
  person: Person;
};

export const PersonName: React.FC<Props> = ({ person }) => {
  return (
    <ScrollIntoView selector={`#${person.slug}`}>
      <Link
        to={`/people/${person.slug}`}
        className={person.sex === 'f'
          ? 'has-text-danger'
          : 'has-text-link'}
      >
        {person.name}
      </Link>
    </ScrollIntoView>
  );
};
