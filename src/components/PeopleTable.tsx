import { FC } from 'react';
import { Person } from '../types/Person';
import PersonLink from './PersonLink';
import cn from 'classnames';
import { URLSearchParamsInit, useLocation } from 'react-router-dom';
import PeopleTableHeader from './PeopleTableHeader';

type Props = {
  people: Person[];
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParamsInit) => void;
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: FC<Props> = ({
  people,
  searchParams,
  setSearchParams,
}) => {
  const location = useLocation();

  return (
    <>
      <div className="container">
        <div className="block">
          <div className="box table-container">
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  <PeopleTableHeader
                    setSearchParams={setSearchParams}
                    searchParams={searchParams}
                  />
                  <th>Mother</th>
                  <th>Father</th>
                </tr>
              </thead>

              <tbody>
                {people.map(person => (
                  <tr
                    key={person.slug}
                    data-cy="person"
                    className={cn({
                      'has-background-warning':
                        location.pathname === `/people/${person.slug}`,
                    })}
                  >
                    <td>
                      <PersonLink name={person.name} people={people} />
                    </td>
                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      <PersonLink name={person.motherName} people={people} />
                    </td>
                    <td>
                      <PersonLink name={person.fatherName} people={people} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
