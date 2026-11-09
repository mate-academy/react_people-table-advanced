import classNames from 'classnames';
import { Person } from '../types';
import { PeopleLink } from './PeopleLink';
import { useParams } from 'react-router-dom';
import { SortableColumnHeader } from './SortableColumnHeader';

type Props = {
  people: Person[];
};

export const PeopleTable = ({ people }: Props) => {
  const { slug } = useParams();

  return (
    <div className="box table-container">
      {people.length === 0 ? (
        <p>There are no people matching the current search criteria</p>
      ) : (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>
                <SortableColumnHeader label="Name" sortBy="name" />
              </th>

              <th>
                <SortableColumnHeader label="Sex" sortBy="sex" />
              </th>

              <th>
                <SortableColumnHeader label="Born" sortBy="born" />
              </th>

              <th>
                <SortableColumnHeader label="Died" sortBy="died" />
              </th>

              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {people.map(person => (
              <tr
                key={person.slug}
                data-cy="person"
                className={classNames({
                  'has-background-warning': person.slug === slug,
                })}
              >
                <td>
                  <PeopleLink person={person} />
                </td>

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>

                <>
                  {person.motherName ? (
                    <>
                      {person.mother ? (
                        <td>
                          <PeopleLink person={person.mother} />
                        </td>
                      ) : (
                        <td>{person.motherName}</td>
                      )}
                    </>
                  ) : (
                    <td>-</td>
                  )}
                </>

                <>
                  {person.fatherName ? (
                    <>
                      {person.father ? (
                        <td>
                          <PeopleLink person={person.father} />
                        </td>
                      ) : (
                        <td>{person.fatherName}</td>
                      )}
                    </>
                  ) : (
                    <td>-</td>
                  )}
                </>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
