import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

export const PeopleTable = ({ people, selectedSlug }: Props) => {
  const renderRelative = (name: string | null) => {
    if (!name) {
      return '-';
    }

    const relative = people.find(p => p.name === name);

    return relative ? <PersonLink person={relative} /> : name;
  };

  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const getSortParams = (field: string) => {
    if (sort !== field) {
      return {
        sort: field,
        order: null,
      };
    }

    if (order !== 'desc') {
      return {
        sort: field,
        order: 'desc',
      };
    }

    return {
      sort: null,
      order: null,
    };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <SearchLink params={getSortParams('name')}>Name</SearchLink>
          </th>
          <th>
            <SearchLink params={getSortParams('sex')}>Sex</SearchLink>
          </th>
          <th>
            <SearchLink params={getSortParams('born')}>Born</SearchLink>
          </th>
          <th>
            <SearchLink params={getSortParams('died')}>Died</SearchLink>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={
              person.slug === selectedSlug ? 'has-background-warning' : ''
            }
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{renderRelative(person.motherName)}</td>
            <td>{renderRelative(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
