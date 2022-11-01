import classNames from 'classnames';
import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SortLink } from './SortLink';

type Props = {
  people: Person[];
  selectedSlug: string;
};

export const PeopleTable: FC<Props> = ({ people, selectedSlug }) => {
  const [searchParams] = useSearchParams();
  const peopleWithParents: Person[] = people.map(person => ({
    ...person,
    mother: people.find(mother => mother.name === person.motherName),
    father: people.find(father => father.name === person.fatherName),
  }));

  const sortPeople = (peopleArray: Person[]) => {
    const sortBy = searchParams.get('sort') || '';
    const order = searchParams.get('order') || '';

    const sortedArray = [...peopleArray].sort((person1, person2) => {
      switch (sortBy) {
        case 'name':
        case 'sex':
          return person1[sortBy].localeCompare(person2[sortBy]);

        case 'born':
        case 'died':
          return +person1[sortBy] - +person2[sortBy];

        default:
          return 0;
      }
    });

    if (order === 'desc') {
      return sortedArray.reverse();
    }

    return sortedArray;
  };

  const filterPeople = (peopleArray: Person[]) => {
    const sex = searchParams.get('sex');
    const query = searchParams.get('query')?.toLowerCase();
    const centuries = searchParams.getAll('centuries');
    let filteredPeople = peopleArray;

    if (sex) {
      filteredPeople = filteredPeople.filter(person => person.sex === sex);
    }

    if (query) {
      filteredPeople = filteredPeople.filter(person => (
        person.name.toLowerCase().includes(query)
          || person.mother?.name.toLowerCase().includes(query)
          || person.father?.name.toLowerCase().includes(query)
      ));
    }

    if (centuries.length) {
      filteredPeople = filteredPeople.filter(person => {
        const bornCentury = Math.ceil(person.born / 100).toString();

        return centuries.includes(bornCentury);
      });
    }

    return filteredPeople;
  };

  const filteredPeople = filterPeople(peopleWithParents);
  const visiblePeople = sortPeople(filteredPeople);

  if (!visiblePeople.length) {
    return (
      <p>There are no people matching the current search criteria</p>
    );
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <SortLink text="Name" />
          </th>

          <th>
            <SortLink text="Sex" />
          </th>

          <th>
            <SortLink text="Born" />
          </th>

          <th>
            <SortLink text="Died" />
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map(person => {
          const {
            sex, slug, born, died, mother, father, motherName, fatherName,
          } = person;

          return (
            <tr
              key={slug}
              data-cy="person"
              className={classNames(
                { 'has-background-warning': slug === selectedSlug },
              )}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother ? <PersonLink person={mother} /> : motherName || '-'}
              </td>
              <td>
                {father ? <PersonLink person={father} /> : fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
