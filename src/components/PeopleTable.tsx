import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  people: Person[];
  selectedSlug?: string;
  peopleByName: Map<string, Person>;
};

type SortField = 'name' | 'sex' | 'born' | 'died';

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedSlug,
  peopleByName,
}) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const getSortLink = (field: SortField) => {
    if (sort !== field) {
      return getSearchWith(searchParams, { sort: field, order: null });
    }

    if (order !== 'desc') {
      return getSearchWith(searchParams, { sort: field, order: 'desc' });
    }

    return getSearchWith(searchParams, { sort: null, order: null });
  };

  const getArrowClass = (field: SortField) => {
    if (sort !== field) {
      return 'fas fa-sort';
    }

    return order === 'desc' ? 'fas fa-sort-down' : 'fas fa-sort-up';
  };

  const renderRelativeCell = (relativeName?: string | null) => {
    if (!relativeName) {
      return '-';
    }

    const relatedPerson = peopleByName.get(relativeName);

    if (!relatedPerson) {
      return relativeName;
    }

    return <PersonLink person={relatedPerson} />;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {(['name', 'sex', 'born', 'died'] as SortField[]).map(field => (
            <th key={field}>
              <Link
                to={{ search: getSortLink(field) }}
                className="has-text-dark"
              >
                {field[0].toUpperCase() + field.slice(1)}
                <span className="icon">
                  <i className={getArrowClass(field)} />
                </span>
              </Link>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === selectedSlug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died || '-'}</td>
            <td>{renderRelativeCell(person.motherName)}</td>
            <td>{renderRelativeCell(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
