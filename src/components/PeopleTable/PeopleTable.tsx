import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonNavLink } from '../PersonNavLink';

type Props = {
  people: Person[];
};

export const PeopleTable: FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const currentQuery = searchParams.get('query');
  const currentSex = searchParams.get('sex');
  const currentCenturies = searchParams.getAll('centuries');

  const visiblePeopleName = people.filter(person => {
    if (currentQuery) {
      return person.name.toLowerCase().includes(currentQuery.toLowerCase());
    }

    return true;
  });

  const visiblePeopleSex = visiblePeopleName.filter(person => {
    if (currentSex) {
      return person.sex === currentSex;
    }

    return true;
  });

  const visiblePeopleCenturies = visiblePeopleSex.filter(person => {
    const bornCentury = Math.ceil(person.born / 100);
    const diedCentury = Math.ceil(person.died / 100);

    if (currentCenturies.length) {
      return currentCenturies.includes(bornCentury.toString())
        || currentCenturies.includes(diedCentury.toString());
    }

    return true;
  });

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
              <a href="#/people?sort=name">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a href="#/people?sort=sex">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a href="#/people?sort=born&amp;order=desc">
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a href="#/people?sort=died">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeopleCenturies.map(person => {
          const {
            sex,
            born,
            died,
            motherName,
            fatherName,
          } = person;

          const mother = people
            .find(personItem => personItem.name === person.motherName);
          const father = people
            .find(personItem => personItem.name === person.fatherName);

          const personMotherName = motherName || '-';
          const personFatherName = fatherName || '-';

          return (
            <tr data-cy="person">
              <td>
                <PersonNavLink person={person} />
              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother
                  ? (
                    <PersonNavLink person={mother} />
                  ) : (
                    personMotherName
                  )}
              </td>
              <td>
                {father
                  ? (
                    <PersonNavLink person={father} />
                  ) : (
                    personFatherName
                  )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
