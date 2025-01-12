import { useContext } from 'react';
import { PeopleContext } from '../context/PeopleContext';
import { PersonLink } from './PersonLink';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable = () => {
  const { people } = useContext(PeopleContext);
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || null;
  const query = searchParams.get('query') || null;
  const centuries = searchParams.getAll('centuries') as string[];
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const filterPeople = () => {
    let newPeople = [...people];

    if (sex) {
      newPeople = newPeople.filter(person => person.sex === sex);
    }

    if (query) {
      newPeople = newPeople.filter(person =>
        person.name.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (centuries.length > 0) {
      newPeople = newPeople.filter(person =>
        centuries.some(
          century =>
            parseInt((+person.born / 100).toString()) === Number(century) - 1,
        ),
      );
    }

    return newPeople;
  };

  const filteredPeople = filterPeople();

  const sortPeople = () => {
    return [...filteredPeople].sort((a, b) => {
      if (sort === 'name') {
        return order === 'desc'
          ? b.name.localeCompare(a.name)
          : a.name.localeCompare(b.name);
      }

      if (sort === 'sex') {
        return order === 'desc'
          ? b.sex.localeCompare(a.sex)
          : a.sex.localeCompare(b.sex);
      }

      if (sort === 'born') {
        return order === 'desc' ? b.born - a.born : a.born - b.born;
      }

      if (sort === 'died') {
        return order === 'desc' ? b.died - a.died : a.died - b.died;
      }

      return 0;
    });
  };

  const sorteredPeople = sortPeople();

  const sortHelper = (helpBy: string) => {
    if (sort === helpBy && !order) {
      return helpBy;
    }

    if (sort !== helpBy && order) {
      return helpBy;
    }

    return null;
  };

  if (sorteredPeople.length === 0) {
    return <p>There are no people matching the current search criteria</p>;
  } else {
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
                    sort:
                      sort !== 'name' && !order ? 'name' : sortHelper('name'),
                    order: sort === 'name' && !order ? 'desc' : null,
                  }}
                >
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort': sort !== 'name',
                        'fas fa-sort-up': sort === 'name' && !order,
                        'fas fa-sort-down': sort === 'name' && order,
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
                  params={{
                    sort: sort !== 'sex' && !order ? 'sex' : sortHelper('sex'),
                    order: sort === 'sex' && !order ? 'desc' : null,
                  }}
                >
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort': sort !== 'sex',
                        'fas fa-sort-up': sort === 'sex' && !order,
                        'fas fa-sort-down': sort === 'sex' && order,
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
                    sort:
                      sort !== 'born' && !order ? 'born' : sortHelper('born'),
                    order: sort === 'born' && !order ? 'desc' : null,
                  }}
                >
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort': sort !== 'born',
                        'fas fa-sort-up': sort === 'born' && !order,
                        'fas fa-sort-down': sort === 'born' && order,
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
                    sort:
                      sort !== 'died' && !order ? 'died' : sortHelper('died'),
                    order: sort === 'died' && !order ? 'desc' : null,
                  }}
                >
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort': sort !== 'died',
                        'fas fa-sort-up': sort === 'died' && !order,
                        'fas fa-sort-down': sort === 'died' && order,
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
          {sorteredPeople.map(person => (
            <PersonLink person={person} key={person.slug} />
          ))}
        </tbody>
      </table>
    );
  }
};
