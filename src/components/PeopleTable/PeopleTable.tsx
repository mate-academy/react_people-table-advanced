import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';
import { handleInformation } from '../../services/handleInformation';
import { PersonLink } from '../PersonLink';
import { peopleFilter } from '../../services/peopleFilter';
import { SearchParams } from '../../types/SearchParams';
import { SearchLink } from '../SearchLink';
import { SortType } from '../../types/sortType';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const query = searchParams.get(SearchParams.QUERY) || '';
  const sort = searchParams.get(SearchParams.SORT) as SortType | null;
  const order = searchParams.get(SearchParams.ORDER) || null;

  const peopleWithParents = handleInformation(people);
  const preparedPeople = peopleFilter(peopleWithParents, searchParams);

  if (!preparedPeople.length && !!query) {
    return <p>There are no people matching the current search criteria</p>;
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(SortType).map(([key, value]) => (
            <th key={value}>
              <span className="is-flex is-flex-wrap-nowrap">
                {key}
                <SearchLink
                  params={{
                    sort: sort === value && order ? null : value,
                    order: sort === value && !order ? SearchParams.DESC : null,
                  }}
                >
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort': sort !== value,
                        'fa-sort-up': !order && sort === value,
                        'fa-sort-down': order && sort === value,
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
        {preparedPeople.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
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
