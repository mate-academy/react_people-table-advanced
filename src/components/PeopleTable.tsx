/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { SearchLink } from './SearchLink';

export type SortField = 'name' | 'sex' | 'born' | 'died';

type Props = {
  people: Person[];
  allPeople: Person[];
  selectedSlug?: string;
};

const fields: { key: SortField; label: string }[] = [
  { key: 'name', label: 'Name' },
  { key: 'sex', label: 'Sex' },
  { key: 'born', label: 'Born' },
  { key: 'died', label: 'Died' },
];

export const PeopleTable: React.FC<Props> = ({
  people,
  allPeople,
  selectedSlug,
}) => {
  const [searchParams] = useSearchParams();
  const search = searchParams.toString();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const personLink = (person: Person) => (
    <Link
      to={{ pathname: `/people/${person.slug}`, search }}
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );

  const relative = (name: string | null) => {
    const person = allPeople.find(item => item.name === name);

    return person ? personLink(person) : name || '-';
  };

  const sortParams = (field: SortField) => {
    if (sort !== field) {
      return { sort: field, order: null };
    }

    if (order !== 'desc') {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {fields.map(field => (
            <th key={field.key}>
              <span className="is-flex is-flex-wrap-nowrap">
                {field.label}
                <SearchLink params={sortParams(field.key)}>
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort': sort !== field.key,
                        'fa-sort-up': sort === field.key && order !== 'desc',
                        'fa-sort-down': sort === field.key && order === 'desc',
                      })}
                    />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={classNames({
              'has-background-warning': person.slug === selectedSlug,
            })}
          >
            <td>{personLink(person)}</td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{relative(person.motherName)}</td>
            <td>{relative(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
