import { Link } from 'react-router-dom';
import cn from 'classnames';
import { useFilters } from '../../context/FiltersContext';
import { Person } from '../../types/Person';

type Props = {
  person?: Person;
  people: Person[];
  name?: string;
};

export const PersonLink: React.FC<Props> = ({ person, people, name }) => {
  const personData = person || people.find(p => p.name === name);
  const { searchParams } = useFilters();

  if (personData) {
    return (
      <Link
        to={{
          pathname: `/people/${personData.slug}`,
          search: searchParams.toString(),
        }}
        className={cn({ 'has-text-danger': personData.sex === 'f' })}
      >
        {personData.name}
      </Link>
    );
  }

  return name;
};
