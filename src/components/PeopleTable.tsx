/* eslint-disable jsx-a11y/control-has-associated-label */
// #region imports
import cn from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getPeopleSorted, SortParams } from '../utils/getPeopleSorted';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
// #endregion

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  // #region params
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') as SortParams | null;
  const order = searchParams.get('order');
  // #endregion

  // #region sort handle
  const sortParams = ['name', 'sex', 'born', 'died'];

  const getSortedSearch = (sortParam: string) => {
    if (sort === sortParam) {
      return order === 'desc'
        ? { sort: null, order: null }
        : { sort, order: 'desc' };
    }

    return { sort: sortParam, order: null };
  };

  const sortedPeople = getPeopleSorted(people, sort, order);
  // #endregion

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortParams.map(param => (
            <th key={param}>
              <span className="is-flex is-flex-wrap-nowrap">
                {param[0].toUpperCase() + param.slice(1)}

                <SearchLink params={getSortedSearch(param)}>
                  <span className="icon">
                    <i
                      className={cn('fas', {
                        'fa-sort': sort !== param,
                        'fa-sort-up': sort === param && !order,
                        'fa-sort-down': sort === param && order === 'desc',
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
        {sortedPeople.map(person => {
          const { sex, born, died, motherName, fatherName } = person;

          const getParent = (parentName: string | null) => {
            if (!parentName) {
              return '-';
            }

            const parent = people.find(({ name }) => name === parentName);

            return parent ? (
              <PersonLink person={parent} search={searchParams.toString()} />
            ) : (
              parentName
            );
          };

          return (
            <tr
              data-cy="person"
              className={cn({
                'has-background-warning': person.slug === slug,
              })}
              key={person.slug}
            >
              <td>
                <PersonLink person={person} search={searchParams.toString()} />
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
