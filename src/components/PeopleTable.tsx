import {
  Link,
  NavLink,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Person } from '../types';

type Props = {
  peoples: Person[],
};

function getParent(name: string | null, arr: Person[]) {
  return arr.find(person => person.name === name);
}

export const PeopleTable: React.FC<Props> = ({ peoples }) => {
  const { personSlug } = useParams();
  const selectedPersonSlug = personSlug;
  const [params] = useSearchParams();
  const [filteredPeoples, setFilteredPeoples] = useState<Person[]>(peoples);

  const handleFilterChange = () => {
    let newPeoples = [...peoples];
    const query = params.get('query');
    const centuries = params.getAll('centuries');
    const sex = params.get('sex');

    if (query) {
      newPeoples = newPeoples.filter((i) => {
        const lowerQuery = query.toLowerCase();
        const lowerName = i.name.toLowerCase();
        const lowerFatherName = i.fatherName?.toLowerCase();
        const lowerMotherName = i.motherName?.toLowerCase();

        return (
          lowerName.includes(lowerQuery)
          || lowerFatherName?.includes(lowerQuery)
          || lowerMotherName?.includes(lowerQuery)
        );
      });
    }

    if (centuries.length) {
      newPeoples = newPeoples.filter((person) => {
        const bornCentury = Math.ceil(person.born / 100);

        return centuries.includes(bornCentury.toString());
      });
    }

    if (sex) {
      newPeoples = newPeoples.filter(person => person.sex === sex);
    }

    setFilteredPeoples(newPeoples);
  };

  useEffect(() => {
    handleFilterChange();
  }, [params]);

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
              <Link to="#/people?sort=name">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to="#/people?sort=sex">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to="#/people?sort=born&amp;order=desc">
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to="#/people?sort=died">
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
        {filteredPeoples.map((person) => {
          const {
            name,
            slug,
            sex,
            born,
            died,
            motherName,
            fatherName,
          } = person;
          const mother = getParent(motherName, peoples);
          const father = getParent(fatherName, peoples);

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({
                'has-background-warning': selectedPersonSlug === slug,
              })}
            >
              <td>
                <NavLink
                  to={slug}
                  className={classNames({
                    'has-text-danger': sex === 'f',
                  })}
                >
                  {name}
                </NavLink>
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              {motherName ? (
                <td>
                  {mother ? (
                    <NavLink
                      className="has-text-danger"
                      to={`${mother.slug}`}
                    >
                      {motherName}
                    </NavLink>
                  ) : motherName}
                </td>
              ) : (
                <td>-</td>
              )}

              {fatherName ? (
                <td>
                  {father ? (
                    <NavLink to={`${father.slug}`}>
                      {fatherName}
                    </NavLink>
                  ) : fatherName}
                </td>
              ) : (
                <td>-</td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
