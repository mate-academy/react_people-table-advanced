import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  slugSelected?: string;
};

export const PeopleTable: React.FC<Props> = ({ people, slugSelected }) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const sortParams = (param: string) => {
    if (sort !== param) {
      return {
        sort: param,
        order: null,
      };
    }

    if (sort === param && order !== 'desc') {
      return { order: 'desc' };
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
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <SearchLink params={sortParams('name') as SearchParams}>
                <span className="icon">
                  <i className={cn('fas fa-sort', {
                    'fa-sort-up': sort === 'name' && !order,
                    'fa-sort-down': sort === 'name' && order,
                  })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={sortParams('sex') as SearchParams}>
                <span className="icon">
                  <i className={cn('fas fa-sort', {
                    'fa-sort-up': sort === 'sex' && !order,
                    'fa-sort-down': sort === 'sex' && order,
                  })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={sortParams('born') as SearchParams}>
                <span className="icon">
                  <i className={cn('fas fa-sort', {
                    'fa-sort-up': sort === 'born' && !order,
                    'fa-sort-down': sort === 'born' && order,
                  })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={sortParams('died') as SearchParams}>
                <span className="icon">
                  <i className={cn('fas fa-sort', {
                    'fa-sort-up': sort === 'died' && !order,
                    'fa-sort-down': sort === 'died' && order,
                  })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(personList => {
          return (
            <tr
              data-cy="person"
              key={personList.slug}
              className={cn({
                'has-background-warning': personList.slug === slugSelected,
              })}
            >
              <td>
                <PersonLink person={personList} />
              </td>

              <td>{personList.sex}</td>
              <td>{personList.born}</td>
              <td>{personList.died}</td>
              <td>
                {personList.mother
                  ? (<PersonLink person={personList.mother} />)
                  : personList.motherName || '-'}
              </td>
              <td>
                {personList.father
                  ? (<PersonLink person={personList.father} />)
                  : personList.fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
