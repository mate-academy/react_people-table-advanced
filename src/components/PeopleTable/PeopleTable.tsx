import cn from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { FILTER_KEYS, SORT_FILTERS } from '../../constants/constants';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { SearchLink } from '../SearchLink';
import { ErrorMessages } from '../../constants/errors';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get(FILTER_KEYS.SORT);
  const order = searchParams.get(FILTER_KEYS.ORDER);

  const getSortIcon = (filter: string) =>
    cn('fas', {
      'fa-sort': sort !== filter,
      'fa-sort-up': sort === filter && order !== 'desc',
      'fa-sort-down': sort === filter && order === 'desc',
    });

  return (
    <>
      {!!people.length ? (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              {Object.values(SORT_FILTERS).map(filter => (
                <th key={filter}>
                  <span className="is-flex is-flex-wrap-nowrap">
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    <SearchLink
                      params={{
                        [FILTER_KEYS.SORT]:
                          sort === filter && order === 'desc' ? null : filter,
                        [FILTER_KEYS.ORDER]:
                          sort === filter && order !== 'desc' ? 'desc' : null,
                      }}
                    >
                      <span className="icon">
                        <i className={getSortIcon(filter)} />
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
                className={cn({
                  'has-background-warning': slug === person.slug,
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
      ) : (
        <p>{ErrorMessages.NOT_MATCHING}</p>
      )}
    </>
  );
};
