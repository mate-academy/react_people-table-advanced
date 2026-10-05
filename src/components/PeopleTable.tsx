import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types/Person';
import { SearchParams } from '../utils/searchHelper';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

const columns = [
  { field: 'name', title: 'Name' },
  { field: 'sex', title: 'Sex' },
  { field: 'born', title: 'Born' },
  { field: 'died', title: 'Died' },
];

export const PeopleTable = ({ people }: Props) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const isDescending = searchParams.get('order') === 'desc';

  const getSortParams = (field: string): SearchParams => {
    if (sort !== field) {
      return {
        sort: field,
        order: null,
      };
    }

    if (!isDescending) {
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
          {columns.map(({ field, title }) => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {title}

                <SearchLink
                  params={getSortParams(field)}
                  aria-label={`Sort by ${title}`}
                >
                  <span className="icon">
                    <i
                      aria-hidden="true"
                      className={classNames('fas', {
                        'fa-sort': sort !== field,
                        'fa-sort-up': sort === field && !isDescending,
                        'fa-sort-down': sort === field && isDescending,
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
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <td>
              {person.mother ? (
                <PersonLink person={person.mother} />
              ) : (
                person.motherName || '-'
              )}
            </td>

            <td>
              {person.father ? (
                <PersonLink person={person.father} />
              ) : (
                person.fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
