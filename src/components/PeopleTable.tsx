/* eslint-disable jsx-a11y/control-has-associated-label */

import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import classNames from 'classnames';
import { useEffect, useReducer } from 'react';
import { getSearchWith } from '../utils/searchHelper';
import { useGetNextSortParams } from '../utils/sortFunction';

type Props = {
  peoplesList: Person[];
  initialList: Person[];
  setPeoplesList: (p: Person[] | null) => void;
};

type State = Person[];

type Action =
  | { type: 'defult'; payload: Person[] }
  | { type: 'name-asc'; payload: Person[] }
  | { type: 'name-desc'; payload: Person[] }
  | { type: 'sex-desc'; payload: Person[] }
  | { type: 'sex'; payload: Person[] }
  | { type: 'born'; payload: Person[] }
  | { type: 'born-desc'; payload: Person[] }
  | { type: 'died'; payload: Person[] }
  | { type: 'died-desc'; payload: Person[] };

function reduce(_state: State, action: Action): State {
  switch (action.type) {
    case 'defult':
      return action.payload;
    case 'name-asc':
      return [...action.payload].sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return [...action.payload].sort((a, b) => b.name.localeCompare(a.name));
    case 'born':
      return [...action.payload].sort((a, b) => a.born - b.born);
    case 'born-desc':
      return [...action.payload].sort((a, b) => b.born - a.born);
    case 'died':
      return [...action.payload].sort((a, b) => a.died - b.died);
    case 'died-desc':
      return [...action.payload].sort((a, b) => b.died - a.died);

    case 'sex':
      return [
        ...[...action.payload].filter(person => person.sex === 'f'),
        ...[...action.payload].filter(person => person.sex === 'm'),
      ];
    case 'sex-desc':
      return [
        ...[...action.payload].filter(person => person.sex === 'm'),
        ...[...action.payload].filter(person => person.sex === 'f'),
      ];
  }
}

export const PeopleTable: React.FC<Props> = ({ initialList, peoplesList }) => {
  const [stateList, dispatch] = useReducer(reduce, initialList);
  const [params] = useSearchParams();
  const { slug } = useParams();

  if (!initialList) return null;

  useEffect(() => {
    const sort = params.get('sort');
    const order = params.get('order');

    if (sort === 'name' && !order) {
      dispatch({ type: 'name-asc', payload: peoplesList });
    } else if (sort === 'name' && order === 'desc') {
      dispatch({ type: 'name-desc', payload: peoplesList });
    } else if (sort === 'sex' && !order) {
      dispatch({ type: 'sex', payload: peoplesList });
    } else if (sort === 'sex' && order === 'desc') {
      dispatch({ type: 'sex-desc', payload: peoplesList });
    } else if (sort === 'born' && !order) {
      dispatch({ type: 'born', payload: peoplesList });
    } else if (sort === 'born' && order) {
      dispatch({ type: 'born-desc', payload: peoplesList });
    } else if (sort === 'died' && !order) {
      dispatch({ type: 'died', payload: peoplesList });
    } else if (sort === 'died' && order) {
      dispatch({ type: 'died-desc', payload: peoplesList });
    } else {
      dispatch({ type: 'defult', payload: peoplesList });
    }
  }, [params, peoplesList]);

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
