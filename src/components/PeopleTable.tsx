import { useContext } from 'react';
import { PeopleContext } from '../store/PeopleContent';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

export const PeopleTable: React.FC = () => {
  const { peopleToShow } = useContext(PeopleContext);
  const [searchParams] = useSearchParams();

  const sortParam = searchParams?.get('sort');
  const orderParam = searchParams?.get('order');

  const sortOption = (sortOptionParam: string) => {
    if (!sortParam || (sortParam && !orderParam)) {
      return sortOptionParam;
    } else if (sortParam && orderParam && sortParam !== sortOptionParam) {
      return sortOptionParam;
    }

    return null;
  };

  const orderOption = (sortOptionParam: string) => {
    if (sortParam && !orderParam && sortOptionParam === sortParam) {
      return 'desc';
    }

    return null;
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
              <SearchLink
                params={{
                  sort: sortOption('name'),
                  order: orderOption('name'),
                }}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sortParam !== 'name',
                      'fa-sort-up': sortParam === 'name' && !orderParam,
                      'fa-sort-down':
                        sortParam === 'name' && orderParam === 'desc',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={{ sort: sortOption('sex'), order: orderOption('sex') }}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sortParam !== 'sex',
                      'fa-sort-up': sortParam === 'sex' && !orderParam,
                      'fa-sort-down':
                        sortParam === 'sex' && orderParam === 'desc',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={{
                  sort: sortOption('born'),
                  order: orderOption('born'),
                }}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sortParam !== 'born',
                      'fa-sort-up': sortParam === 'born' && !orderParam,
                      'fa-sort-down':
                        sortParam === 'born' && orderParam === 'desc',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={{
                  sort: sortOption('died'),
                  order: orderOption('died'),
                }}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sortParam !== 'died',
                      'fa-sort-up': sortParam === 'died' && !orderParam,
                      'fa-sort-down':
                        sortParam === 'died' && orderParam === 'desc',
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
        {peopleToShow.map(personItem => {
          return <PersonLink key={personItem.slug} person={personItem} />;
        })}
      </tbody>
    </table>
  );
};
