/* eslint-disable jsx-a11y/control-has-associated-label */
import { useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { useMemo } from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { FilterParams } from '../types/FilterParams';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const visiblePeople = useMemo(() => {
    let result = [...people];
    const sexSearchValue = searchParams.get(FilterParams.Sex);
    const querySearchValue = searchParams.get(FilterParams.Query);
    const centurySearchValue = searchParams.getAll(FilterParams.Century);

    if (sexSearchValue) {
      result = result.filter(p => p.sex === sexSearchValue);
    }

    if (querySearchValue) {
      result = result.filter(p => {
        return (
          p.name.includes(querySearchValue)
        || p.motherName?.includes(querySearchValue)
        || p.fatherName?.includes(querySearchValue)
        );
      });
    }

    if (centurySearchValue.length) {
      let peopleFromCenturies: Person[] = [];

      centurySearchValue.forEach(century => {
        const peopleFromCurrCentury = [...result].filter(p => (
          Math.ceil(p.born / 100) === +century
        ));

        peopleFromCenturies = [
          ...peopleFromCenturies,
          ...peopleFromCurrCentury,
        ];
      });

      result = peopleFromCenturies;
    }

    return result;
  }, [searchParams, people]);

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
        {
          visiblePeople.map(person => {
            const {
              born,
              died,
              fatherName,
              motherName,
              name,
              sex,
              father,
              mother,
              slug: personSlug,
            } = person;

            return (
              <tr
                data-cy="person"
                className={cn(
                  { 'has-background-warning': slug === personSlug },
                )}
                key={name}
              >
                <td>
                  <PersonLink person={person}>
                    {name}
                  </PersonLink>
                </td>

                <td>{sex}</td>
                <td>{born}</td>
                <td>{died}</td>
                <td>
                  <PersonLink person={mother}>
                    {motherName ?? '-'}
                  </PersonLink>
                </td>
                <td>
                  <PersonLink person={father}>
                    {fatherName ?? '-'}
                  </PersonLink>
                </td>
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
};
