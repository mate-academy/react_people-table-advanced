import classNames from 'classnames';
import React from 'react';
import {
  Link, useLocation, useParams, useSearchParams,
} from 'react-router-dom';
import { Person } from '../types/Person';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

export const PeopleTable:React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const isSelected = (peop: Person) => peop.slug === slug;
  const location = useLocation();

  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || null;
  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const centuries = searchParams.getAll('centuries');

  let newPeople = [...people];

  const filtersOnSex = () => {
    if (sex) {
      newPeople = newPeople.filter(a => a.sex === sex);
    }
  };

  const filterOnQuery = () => {
    newPeople = newPeople.filter(
      a => a.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
        || a.motherName?.toLocaleLowerCase().includes(
          query.toLocaleLowerCase(),
        )
        || a.fatherName?.toLocaleLowerCase().includes(
          query.toLocaleLowerCase(),
        ),
    );
  };

  const filterOnCentury = () => {
    if (centuries.length > 0) {
      newPeople = newPeople.filter(person => centuries.includes(
        Math.ceil(person.born / 100).toString(),
      ));
    }
  };

  const sortByParams = () => {
    switch (sort) {
      case 'name':
        newPeople = newPeople.sort((a, b) => a.name.localeCompare(b.name));

        return;

      case 'sex':
        newPeople = newPeople.sort((a, b) => a.sex.localeCompare(b.sex));

        return;

      case 'born':
        newPeople = newPeople.sort((a, b) => +a.born - +b.born);

        return;

      case 'died':
        newPeople = newPeople.sort((a, b) => +a.died - +b.died);

        break;
      default:
    }
  };

  const sortPeople = () => {
    if (sort && order === null) {
      sortByParams();
    }

    if (sort && order === 'desc') {
      sortByParams();
      newPeople = newPeople.reverse();
    }
  };

  sortPeople();

  filterOnCentury();
  filtersOnSex();
  filterOnQuery();

  if (newPeople.length === 0) {
    return <p>There are no people matching the current search criteria</p>;
  }

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
                  sort: sort === 'name' && order === 'desc' ? null : 'name',
                  order: sort === 'name' && !order ? 'desc' : null,
                }}
              >
                <span className="icon">
                  <i
                    className={classNames(
                      'fa fa-sort',
                      { 'fa-sort-up': sort === 'name' && !order },
                      { 'fa-sort-down': sort === 'name' && order === 'desc' },
                    )}
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
                  sort: sort === 'sex' && order === 'desc' ? null : 'sex',
                  order: sort === 'sex' && !order ? 'desc' : null,
                }}
              >
                <span className="icon">
                  <i
                    className={classNames(
                      'fa fa-sort',
                      { 'fa-sort-up': sort === 'sex' && !order },
                      { 'fa-sort-down': sort === 'sex' && order === 'desc' },
                    )}
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
                  sort: sort === 'born' && order === 'desc' ? null : 'born',
                  order: sort === 'born' && !order ? 'desc' : null,
                }}
              >
                <span className="icon">
                  <i
                    className={classNames(
                      'fa fa-sort',
                      { 'fa-sort-up': sort === 'born' && !order },
                      { 'fa-sort-down': sort === 'born' && order === 'desc' },
                    )}
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
                  sort: sort === 'died' && order === 'desc' ? null : 'died',
                  order: sort === 'died' && !order ? 'desc' : null,
                }}
              >
                <span className="icon">
                  <i
                    className={classNames(
                      'fa fa-sort',
                      { 'fa-sort-up': sort === 'died' && !order },
                      { 'fa-sort-down': sort === 'died' && order === 'desc' },
                    )}
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
        {newPeople.map(a => (
          <tr
            data-cy="person"
            key={a.slug}
            className={classNames(
              { 'has-background-warning': isSelected(a) },
            )}
          >
            <td>
              <Link
                className={classNames({ 'has-text-danger': a.sex === 'f' })}
                to={{
                  pathname: `/people/${a.slug}`,
                  search: location.search,
                }}
              >
                {a.name}
              </Link>
            </td>
            <td>{a.sex}</td>
            <td>{a.born}</td>
            <td>{a.died}</td>
            <td>{a.mother ? <Link className="has-text-danger" to={`/people/${a.mother.slug}`}>{a.motherName}</Link> : a.motherName || '-'}</td>
            <td>{a.father ? <Link to={`/people/${a.father.slug}`}>{a.fatherName}</Link> : a.fatherName || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
