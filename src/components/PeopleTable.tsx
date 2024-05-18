/* eslint-disable @typescript-eslint/indent */
/* eslint-disable prettier/prettier */
enum ClassFor {
  each = 'fa-sort',
  up = 'fa-sort-up',
  down = 'fa-sort-down',
}
import { useContext } from 'react';
import { PeopleContext } from './PeopleProvider.tsx/PeopleProvider';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';

export const PeopleTable = () => {
  const { slug } = useParams();
  const { visiblePeople, sort, order } = useContext(PeopleContext);

  const handleSearch = (it: string): SearchParams => {
    const item = it.toLowerCase();

    switch (true) {
      case sort === item && order !== 'desc':
        return { order: 'desc' };
      case sort === item && order === 'desc':
        return { order: null, sort: null };
      case sort !== item && order === 'desc':
        return { sort: item, order: null };
      default:
        return { sort: item };
    }

    // if (sort === item && order !== 'desc') {
    //   return { order: 'desc' };
    // } else if (sort === item && order === 'desc') {
    //   return { order: null, sort: null };
    // } else if (sort !== item && order === 'desc') {
    //   return { sort: item, order: null };
    // } else {
    //   return { sort: item };
    // }
  };

  const getArrow = (it: string): string => {
    const item = it.toLowerCase();

    if (sort === item && order !== 'desc') {
      return ClassFor.up;
    } else if (sort === item && order === 'desc') {
      return ClassFor.down;
    } else {
      return ClassFor.each;
    }
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'].map(item =>
            item !== 'Mother' && item !== 'Father' ? (
              <th key={item}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {item}
                  <SearchLink
                    params={handleSearch(item)}
                    onClick={() => handleSearch(item)}
                  >
                    <span className="icon">
                      <i className={classNames(`fas ${getArrow(item)}`)} />
                    </span>
                  </SearchLink>
                </span>
              </th>
            ) : (
              <th key={item}>{item}</th>
            ),
          )}
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map(person => (
          <tr
            data-cy="person"
            key={person.name}
            className={classNames({
              'has-background-warning': slug === person.slug,
            })}
          >
            <td>
              <Link
                to={`${person.slug}`}
                className={classNames({
                  'has-text-danger': person.sex === 'f',
                })}
              >
                {person.name}
              </Link>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              <PersonLink person={person.motherName} sex={'f'} />
            </td>
            <td>
              <PersonLink person={person.fatherName} sex={'m'} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
