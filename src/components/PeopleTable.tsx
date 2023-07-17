import { FC } from 'react';
import { useMatch, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';

type Props = {
  people: Person[],
};

export const PeopleTable:FC<Props> = ({
  people,
}) => {
  const match = useMatch('/people/:slug');
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  // const [visiblePeople, setVisiblePeople] = useState([...people]);
  // let visiblePeople = [...people];

  // const sortByParam = (param: string) => {
  //   if (param === 'name') {
  //     return [...people].sort((a, b) => a.name.localeCompare(b.name));
  //   }

  //   if (param === 'sex') {
  //     return [...people].sort((a, b) => a.sex.localeCompare(b.sex));
  //   }

  //   if (param === 'born') {
  //     return [...people].sort((a, b) => a.born - b.born);
  //   }

  //   if (param === 'died') {
  //     return [...people].sort((a, b) => a.died - b.died);
  //   }

  //   return [...people];
  // };

  const sortPeople = (sortParam: string): SearchParams => {
    if (sort !== sortParam) {
      // setVisiblePeople(sortByParam(sortParam));
      // visiblePeople = sortByParam(sortParam);

      return { sort: sortParam, order: null };
    }

    if (sort === sortParam && !order) {
      // setVisiblePeople(sortByParam(sortParam).reverse());
      // visiblePeople = sortByParam(sortParam).reverse();

      return { order: 'desc' };
    }

    // setVisiblePeople([...people]);
    // visiblePeople = [...people];

    return { order: null, sort: null };
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
                params={sortPeople('name')}
              >
                <span className="icon">
                  <i className={classNames(
                    'fas',
                    { 'fa-sort': sort !== 'name' },
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
                params={sortPeople('sex')}
              >
                <span className="icon">
                  <i className={classNames(
                    'fas',
                    { 'fa-sort': sort !== 'sex' },
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
                params={sortPeople('born')}
              >
                <span className="icon">
                  <i className={classNames(
                    'fas',
                    { 'fa-sort': sort !== 'born' },
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
                params={sortPeople('died')}
              >
                <span className="icon">
                  <i className={classNames(
                    'fas',
                    { 'fa-sort': sort !== 'died' },
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
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={classNames({
              'has-background-warning': (
                match?.params.slug === person.slug
              ),
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother
                ? <PersonLink person={person.mother} />
                : `${person.motherName}`}
            </td>
            <td>
              {person.father
                ? <PersonLink person={person.father} />
                : `${person.fatherName}`}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
