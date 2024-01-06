/* eslint-disable jsx-a11y/control-has-associated-label */
import { useSearchParams, useParams } from 'react-router-dom';
import cn from 'classnames';

import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';

type Props = {
  peopleFromServer: Person[],
  setNoResults: (result: boolean) => void,
};

export const PeopleTable: React.FC<Props> = ({ peopleFromServer }) => {
  const [searchParams] = useSearchParams();

  const order = searchParams.get('order');
  const sort = searchParams.get('sort');

  const { slug } = useParams();

  const sortParams = (param: string) => {
    if (sort !== param) {
      return {
        sort: param,
        order: null,
      };
    }

    if (sort === param && order !== 'desc') {
      return {
        order: 'desc',
      };
    }

    return {
      sort: null,
      order: null,
    };
  };

  const getSortIconClasses = (currentParam: string) => (
    cn('fas', {
      'fa-sort': sort !== currentParam,
      'fa-sort-up': sort === currentParam && !order,
      'fa-sort-down': sort === currentParam && order,
    })
  );

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <SearchLink params={sortParams('name') as SearchParams}>
                <span className="icon">
                  <i className={getSortIconClasses('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={sortParams('sex') as SearchParams}>
                <span className="icon">
                  <i className={getSortIconClasses('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={sortParams('born') as SearchParams}>
                <span className="icon">
                  <i className={getSortIconClasses('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={sortParams('died') as SearchParams}>
                <span className="icon">
                  <i className={getSortIconClasses('died')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {peopleFromServer.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={cn({
              'has-background-warning': person.slug === slug,
            })}
          >
            <td>
              <PersonLink currentPerson={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother
                ? (<PersonLink currentPerson={person.mother} />)
                : person.motherName ?? '-'}
            </td>
            <td>
              {person.father
                ? (<PersonLink currentPerson={person.father} />)
                : person.fatherName ?? '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
