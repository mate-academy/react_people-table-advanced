import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink';
import { Sort } from '../../types/Sort';
import { getSearchWith } from '../../utils/searchHelper';
import cn from 'classnames';

type Props = {
  people: Person[];
};

const NO_PARENT_PLACEHOLDER = '-';

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const { slug } = useParams();
  const selectedSlug = slug;

  const sortField = searchParams.get('sort');
  const ordered = searchParams.has('order');

  function handleSortField(value: string): string {
    if (sortField === value && !ordered) {
      return getSearchWith(searchParams, { order: 'desc' });
    }

    if (sortField === value && ordered) {
      searchParams.delete('sort');
      searchParams.delete('order');

      return searchParams.toString();
    }

    return getSearchWith(searchParams, { sort: value });
  }

  const getParent = (parentName: string | undefined) => {
    if (!parentName) {
      return NO_PARENT_PLACEHOLDER;
    }

    const parent = people.find(person => person.name === parentName);

    return parent ? <PersonLink person={parent} /> : parentName;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(Sort).map(([key, value]) => (
            <th key={key}>
              <span className="is-flex is-flex-wrap-nowrap">
                {key}
                <Link
                  to={{
                    pathname: '/people',
                    search: handleSortField(value),
                  }}
                >
                  <span className="icon">
                    <i
                      className={cn('fas', {
                        'fa-sort': sortField !== value,
                        'fa-sort-up': sortField === value && !ordered,
                        'fa-sort-down': sortField === value && ordered,
                      })}
                    />
                  </span>
                </Link>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people.map(person => {
          const { sex, born, died, fatherName, motherName } = person;

          return (
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
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>{getParent(motherName)}</td>
              <td>{getParent(fatherName)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
