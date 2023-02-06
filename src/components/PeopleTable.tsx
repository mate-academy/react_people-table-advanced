import React, { useMemo } from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SortLink } from './SortLink';

type Props = {
  people: Person[],
  selectedPersonSlug: string
};

export const PeopleTable: React.FC<Props> = React.memo(
  ({
    people,
    selectedPersonSlug,
  }) => {
    const [searchParams] = useSearchParams();
    const sortBy = searchParams.get('sort') as keyof Person;
    const isReversed = searchParams.get('order') === 'desc';
    const query = searchParams.get('query') || '';
    const sexFilter = searchParams.get('sex');
    const centuryFilter = searchParams.getAll('centuries');

    const queryRegEx = useMemo(() => new RegExp(query, 'i'), [query]);

    const visiblePeople = [...people].filter(person => {
      const {
        name, motherName, fatherName, sex, born, died,
      } = person;
      const testString = name + (motherName || '') + (fatherName || '');
      const isRightSex = sexFilter ? sexFilter === sex : true;
      const hasDiedInCentury = centuryFilter.length
        ? centuryFilter.includes(Math.ceil(died / 100).toString())
        || centuryFilter.includes(Math.ceil(born / 100).toString())
        : true;

      return queryRegEx.test(testString) && isRightSex && hasDiedInCentury;
    });

    visiblePeople.sort((a, b) => {
      switch (sortBy) {
        case 'name':
        case 'sex':
          return a[sortBy].localeCompare(b[sortBy]);
        case 'born':
        case 'died':
          return a[sortBy] - b[sortBy];
        default:
          return 0;
      }
    });

    if (isReversed) {
      visiblePeople.reverse();
    }

    if (!visiblePeople.length) {
      return <p>There are no people matching the current search criteria</p>;
    }

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
                <SortLink sort="name" />
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Sex
                <SortLink sort="sex" />
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Born
                <SortLink sort="born" />
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Died
                <SortLink sort="died" />
              </span>
            </th>

            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>
        <tbody>
          {visiblePeople.map(person => {
            const {
              slug, sex, motherName, fatherName, born, died,
            } = person;

            const isSelected = slug === selectedPersonSlug;
            const mother = people.find(mom => mom.name === motherName);
            const father = people.find(dad => dad.name === fatherName);
            const formattedMotherName = !motherName ? '-' : motherName;
            const formattedFatherName = !fatherName ? '-' : fatherName;

            return (
              <tr
                key={slug}
                data-cy="person"
                className={classNames({

                  'has-background-warning': isSelected,
                })}
              >
                <td>
                  <PersonLink person={person} />
                </td>

                <td>{sex}</td>
                <td>{born}</td>
                <td>{died}</td>
                <td>
                  {!mother
                    ? formattedMotherName
                    : <PersonLink person={mother} />}
                </td>
                <td>
                  {!father
                    ? formattedFatherName
                    : <PersonLink person={father} />}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  },
);
