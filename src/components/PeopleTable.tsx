import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import { Person } from '../types/Person';
import { SearchParamsContext } from './SearchParamsContext';
import { PersonLink } from './PersonLink';
import { SortTypeLink } from './SortTypeLink';

const sortTypes = ['Name', 'Sex', 'Born', 'Died'];

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({
  people,
}) => {
  let visiblePeople = [...people];

  const { slug: selectedPersonSlug } = useParams();

  const { searchParams } = useContext(SearchParamsContext);

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const currentSexFilter = searchParams.get('sex');
  const currentQueryFilter = searchParams.get('query');
  const currentCenturiesFilter = searchParams.getAll('centuries');

  if (currentSexFilter) {
    visiblePeople = visiblePeople.filter(({ sex }) => sex === currentSexFilter);
  }

  if (currentQueryFilter) {
    visiblePeople = visiblePeople.filter(({ name }) => {
      const nameLowercased = name.toLowerCase();
      const currentQueryFilterLowercased = currentQueryFilter.toLowerCase();

      return nameLowercased.includes(currentQueryFilterLowercased);
    });
  }

  if (currentCenturiesFilter.length) {
    visiblePeople = visiblePeople.filter(({ born, died }) => {
      const bornCentury = Math.ceil(born / 1000);
      const diedCentury = Math.ceil(died / 100);
      const personLifeCenturies = [bornCentury, diedCentury];

      return personLifeCenturies.some(century => (
        currentCenturiesFilter.includes(String(century))
      ));
    });
  }

  if (sort) {
    visiblePeople.sort((personA, personB) => {
      switch (sort) {
        case 'name':
        case 'sex':
          return personA[sort].localeCompare(personB[sort]);

        case 'born':
        case 'died':
          return personA[sort] - personB[sort];

        default:
          return 0;
      }
    });

    if (order) {
      visiblePeople.reverse();
    }
  }

  return (
    visiblePeople.length
      ? (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              {sortTypes.map(name => (
                <th key={name}>
                  <SortTypeLink name={name} />
                </th>
              ))}

              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {visiblePeople.map(person => {
              const {
                sex,
                born,
                died,
                fatherName,
                motherName,
                slug,
              } = person;

              const isSelected = slug === selectedPersonSlug;

              let father: Person | undefined;
              let mother: Person | undefined;

              if (fatherName) {
                father = people.find(({ name: personName }) => (
                  personName === fatherName
                ));
              }

              if (motherName) {
                mother = people.find(({ name: personName }) => (
                  personName === motherName
                ));
              }

              return (
                <tr
                  key={slug}
                  data-cy="person"
                  className={classNames(
                    { 'has-background-warning': isSelected },
                  )}
                >
                  <td>
                    <PersonLink person={person} />
                  </td>

                  <td>
                    {sex}
                  </td>

                  <td>
                    {born}
                  </td>

                  <td>
                    {died}
                  </td>

                  <td>
                    {mother
                      ? (
                        <PersonLink person={mother} />
                      )
                      : (
                        motherName || '-'
                      )}
                  </td>

                  <td>
                    {father
                      ? (
                        <PersonLink person={father} />
                      )
                      : (
                        fatherName || '-'
                      )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )
      : (
        <p>
          There are no people matching the current search criteria
        </p>
      )
  );
};
