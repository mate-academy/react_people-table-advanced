import { PersonLink } from './PersonLink';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { Person } from '../../types';
import { PeopleTableHeader } from './PeopleTableHeader';

type Props = {
  sortedPeople: Person[];
  handleSelectSort: (field: string) => void;
  currentOrder: string;
  currentSort: string;
};

export const PeopleTable: React.FC<Props> = ({
  sortedPeople,
  handleSelectSort,
  currentOrder,
  currentSort,
}) => {
  const location = useLocation();
  const people = sortedPeople;

  return (
    <>
      <div className="container">
        <div className="block">
          <div className="box table-container">
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              <PeopleTableHeader
                handleSelectSort={handleSelectSort}
                currentOrder={currentOrder}
                currentSort={currentSort}
              />

              <tbody>
                {people.map(person => {
                  const mother =
                    people.find(p => p.name === person.motherName) || null;
                  const father =
                    people.find(p => p.name === person.fatherName) || null;

                  return (
                    <tr
                      key={person.slug}
                      data-cy="person"
                      className={classNames({
                        'has-background-warning':
                          location.pathname === `/people/${person.slug}`,
                      })}
                    >
                      <td>
                        <PersonLink person={person} />
                      </td>
                      <td>{person.sex}</td>
                      <td>{person.born}</td>
                      <td>{person.died}</td>
                      <td>
                        {person.motherName ? (
                          mother ? (
                            <PersonLink person={mother} />
                          ) : (
                            <span>{person.motherName}</span>
                          )
                        ) : (
                          <span>-</span>
                        )}
                      </td>
                      <td>
                        {person.fatherName ? (
                          father ? (
                            <PersonLink person={father} />
                          ) : (
                            <span>{person.fatherName}</span>
                          )
                        ) : (
                          <span>-</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
