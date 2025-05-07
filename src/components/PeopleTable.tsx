import { useState } from 'react';
import { Person } from '../types';
import { Link } from 'react-router-dom';
import { getSlug } from '../api';

type Props = {
  peopleResults: Person[];
};

export const PeopleTable = ({ peopleResults }: Props) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [sexOrder, setSexOrder] = useState<'asc' | 'desc' | null>(null);
  const [bornOrder, setBornOrder] = useState<'asc' | 'desc' | null>(null);
  const [diedOrder, setDiedOrder] = useState<'asc' | 'desc' | null>(null);

  const toggleSortOrder = () => {
    setSortOrder(prev =>
      prev === null ? 'asc' : prev === 'asc' ? 'desc' : null,
    );
  };

  const toggleSexOrder = () => {
    setSexOrder(prev =>
      prev === null ? 'asc' : prev === 'asc' ? 'desc' : null,
    );
  };

  const toggleBornOrder = () => {
    setBornOrder(prev =>
      prev === null ? 'asc' : prev === 'asc' ? 'desc' : null,
    );
  };

  const toggleDiedOrder = () => {
    setDiedOrder(prev =>
      prev === null ? 'asc' : prev === 'asc' ? 'desc' : null,
    );
  };


  const finalSortedPeople = [...peopleResults]
    .sort((a, b) => {
      if (bornOrder) {
        return bornOrder === 'asc' ? a.born - b.born : b.born - a.born;
      }

      return 0;
    })
    .sort((a, b) => {
      if (diedOrder) {
        return diedOrder === 'asc' ? a.died - b.died : b.died - a.died;
      }

      return 0;
    })
    .sort((a, b) => {
      if (sexOrder) {
        if (sexOrder === 'asc') {
          if (a.sex === 'f' && b.sex !== 'f') {
            return -1;
          }

          if (a.sex === 'm' && b.sex !== 'm') {
            return 1;
          }
        } else {
          if (a.sex === 'm' && b.sex !== 'm') {
            return -1;
          }

          if (a.sex === 'f' && b.sex !== 'f') {
            return 1;
          }
        }
      }

      return 0;
    })
    .sort((a, b) => {
      if (sortOrder) {
        return sortOrder === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }

      return 0;
    });

  return (
    <>
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Name
                <span onClick={toggleSortOrder} className="icon">
                  <i className="fas fa-sort" />
                </span>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Sex
                <span onClick={toggleSexOrder} className="icon">
                  <i className="fas fa-sort" />
                </span>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Born
                <span onClick={toggleBornOrder} className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Died
                <span onClick={toggleDiedOrder} className="icon">
                  <i className="fas fa-sort" />
                </span>
              </span>
            </th>

            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>

        <tbody>
          {finalSortedPeople.map(person => {
            const mother = peopleResults.find(
              p => p.name === person.motherName,
            );

            const father = peopleResults.find(
              p => p.name === person.fatherName,
            );

            return (
              <tr data-cy="person" key={person.name}>
                <td>
                  <Link to={`/people/${getSlug(person.name, person.born)}`}>
                    {person.name}
                  </Link>
                </td>
                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>
                  {person.motherName ? (
                    mother ? (
                      <Link
                        className="has-text-danger"
                        to={`/people/${getSlug(mother.name, mother.born)}`}
                      >
                        {person.motherName}
                      </Link>
                    ) : (
                      person.motherName
                    )
                  ) : (
                    '-'
                  )}
                </td>
                <td>
                  {person.fatherName ? (
                    father ? (
                      <Link
                        className="has-text-danger"
                        to={`/people/${getSlug(father.name, father.born)}`}
                      >
                        {person.fatherName}
                      </Link>
                    ) : (
                      person.fatherName
                    )
                  ) : (
                    '-'
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
