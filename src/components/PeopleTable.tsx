import { useSearchParams } from 'react-router-dom';
import type { Person } from '../types/Person';
import { getSearchWith } from '../utils/searchHelper';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  allPeople: Person[];
  selectedSlug?: string;
};

type SortField = 'name' | 'sex' | 'born' | 'died';

export const PeopleTable = ({ people, allPeople, selectedSlug }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const handleSort = (field: SortField) => {
    let search = '';

    if (sort !== field) {
      search = getSearchWith(searchParams, {
        sort: field,
        order: null,
      });
    } else if (order !== 'desc') {
      search = getSearchWith(searchParams, {
        sort: field,
        order: 'desc',
      });
    } else {
      search = getSearchWith(searchParams, {
        sort: null,
        order: null,
      });
    }

    setSearchParams(search);
  };

  const getSortIcon = (field: SortField) => {
    if (sort !== field) {
      return 'fa-sort';
    }

    return order === 'desc' ? 'fa-sort-down' : 'fa-sort-up';
  };

  const renderSortHeader = (field: SortField, title: string) => (
    <th>
      <span className="is-flex is-align-items-center">
        {title}

        <button
          type="button"
          className="button is-white is-small ml-1"
          aria-label={`Sort by ${title}`}
          onClick={() => handleSort(field)}
        >
          <span className="icon">
            <i className={`fas ${getSortIcon(field)}`} aria-hidden="true" />
          </span>
        </button>
      </span>
    </th>
  );

  const findParent = (name: string | null) => {
    return allPeople.find(person => person.name === name);
  };

  const renderParent = (name: string | null) => {
    if (!name) {
      return '-';
    }

    const parent = findParent(name);

    return parent ? <PersonLink person={parent} /> : name;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable
        is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {renderSortHeader('name', 'Name')}
          {renderSortHeader('sex', 'Sex')}
          {renderSortHeader('born', 'Born')}
          {renderSortHeader('died', 'Died')}
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
              selectedSlug === person.slug ? 'has-background-warning' : ''
            }
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <td>{renderParent(person.motherName)}</td>

            <td>{renderParent(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
