/* eslint-disable jsx-a11y/control-has-associated-label */

import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';
import { useEffect, useReducer } from 'react';
import { getSearchWith } from '../utils/searchHelper';
import { useGetNextSortParams } from '../utils/sortFunction';

type Props = {
  peoplesList: Person[];
};

type State = Person[];

type Action =
  | { type: 'defult'; payload: Person[] }
  | { type: 'name-asc' }
  | { type: 'name-desc' }
  | { type: 'sex-desc' }
  | { type: 'sex' }
  | { type: 'born' }
  | { type: 'born-desc' }
  | { type: 'died' }
  | { type: 'died-desc' };

function reduce(state: State, action: Action): State {
  switch (action.type) {
    case 'defult':
      return action.payload;
    case 'name-asc':
      return [...state].sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return [...state].sort((a, b) => b.name.localeCompare(a.name));
    case 'born':
      return [...state].sort((a, b) => a.born - b.born);
    case 'born-desc':
      return [...state].sort((a, b) => b.born - a.born);
    case 'died':
      return [...state].sort((a, b) => a.died - b.died);
    case 'died-desc':
      return [...state].sort((a, b) => b.died - a.died);

    case 'sex':
      return [
        ...[...state].filter(person => person.sex === 'f'),
        ...[...state].filter(person => person.sex === 'm'),
      ];
    case 'sex-desc':
      return [
        ...[...state].filter(person => person.sex === 'm'),
        ...[...state].filter(person => person.sex === 'f'),
      ];
  }
}

export const PeopleTable: React.FC<Props> = ({ peoplesList }) => {
  const [stateList, dispatch] = useReducer(reduce, peoplesList);
  const [params] = useSearchParams();
  const { slug } = useParams();

  useEffect(() => {
    const sort = params.get('sort');
    const order = params.get('order');

    if (sort === 'name' && !order) {
      dispatch({ type: 'name-asc' });
    } else if (sort === 'name' && order === 'desc') {
      dispatch({ type: 'name-desc' });
    } else if (sort === 'sex' && !order) {
      dispatch({ type: 'sex' });
    } else if (sort === 'sex' && order === 'desc') {
      dispatch({ type: 'sex-desc' });
    } else if (sort === 'born' && !order) {
      dispatch({ type: 'born' });
    } else if (sort === 'born' && order) {
      dispatch({ type: 'born-desc' });
    } else if (sort === 'died' && !order) {
      dispatch({ type: 'died' });
    } else if (sort === 'died' && order) {
      dispatch({ type: 'died-desc' });
    } else {
      dispatch({ type: 'defult', payload: peoplesList });
    }
  }, [params]);

  const seartchFather = (fatherName: string | null) => {
    return peoplesList.find(p => p.name === fatherName) || null;
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
              {' '}
              Name
              <Link
                to={{
                  search: getSearchWith(params, useGetNextSortParams('name')),
                }}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link
                to={{
                  search: getSearchWith(params, useGetNextSortParams('sex')),
                }}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link
                to={{
                  search: getSearchWith(params, useGetNextSortParams('born')),
                }}
              >
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link
                to={{
                  search: getSearchWith(params, useGetNextSortParams('died')),
                }}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {stateList.map(person => {
          const father = seartchFather(person.fatherName);

          return (
            <tr
              key={person.name}
              data-cy="person"
              className={classNames({
                'has-background-warning': slug === person.slug,
              })}
            >
              <td>
                <Link
                  to={`/people/${person.slug}`}
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
              <td
                className={classNames({
                  'has-text-danger': person.sex === 'f',
                })}
              >
                {person.motherName || '-'}
              </td>
              <td>
                {father ? (
                  <Link to={`/people/${father.slug}`}>
                    {person.fatherName || '-'}
                  </Link>
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
