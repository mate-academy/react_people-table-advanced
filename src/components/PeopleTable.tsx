import classNames from 'classnames';
import { FC } from 'react';
import { NavLink, useLocation, useResolvedPath } from 'react-router-dom';
import { Person } from '../types';
import { Loader } from './Loader';

type Prop = {
  people: Person[] | undefined;
  selectedName: string;
  query: string;
};

export const PeopleTable: FC<Prop> = ({ people, selectedName = '', query }) => {
  const isSelected = (person: Person) => person.slug === selectedName;

  const location = useLocation();
  const parentPath = useResolvedPath('../').pathname;
  const toLowerCase = query.toLowerCase();

  const getSearchParams
    = people?.filter(person => person.name.toLowerCase().includes(toLowerCase)
  || person.motherName?.toLowerCase().includes(toLowerCase)
  || person.fatherName?.toLowerCase().includes(toLowerCase));

  return (
    <Loader /> && (
      <div className="block">
        <div className="box table-container">
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Sex</th>
                <th>Born</th>
                <th>Died</th>
                <th>Mother</th>
                <th>Father</th>
              </tr>
            </thead>
            <tbody>
              {getSearchParams?.map((person) => (
                <tr
                  key={person.name}
                  data-cy="person"
                  className={classNames({
                    'has-background-warning': isSelected(person),
                  })}
                >
                  <td>
                    <NavLink
                      to={{
                        pathname: parentPath + person.slug,
                        search: location.search,
                      }}
                      className={classNames({
                        'has-text-danger': person.sex === 'f',
                      })}
                    >
                      {person.name}
                    </NavLink>
                  </td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>{person.fatherName ? person.fatherName : '-'}</td>
                  <td>{person.motherName ? person.motherName : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  );
};
