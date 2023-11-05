import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { Person } from '../../types';
import '../../App.scss';
import { PersonLink } from '../PersonLink';
import { SearchLink } from '../SearchLink';
import { Filter } from '../../types/Filter';

const SORT_TITLES: Filter[] = (
  [Filter.Name, Filter.Sex, Filter.Born, Filter.Died]
);

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const { slug } = useParams();
  const [visiblePeople, setVisiblePeople] = useState(people);

  const selectedPerson = slug;

  const query = searchParams.get('query')?.toLowerCase();
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  useEffect(() => {
    let filteredPeople = sex
      ? people.filter(person => person.sex === sex)
      : [...people];

    if (query) {
      filteredPeople = filteredPeople.filter((obj) => {
        const queryLow = query.toLowerCase();

        return (
          (obj.name && obj.name.toLowerCase().includes(queryLow))
          || (obj.motherName && obj.motherName.toLowerCase().includes(queryLow))
          || (obj.fatherName && obj.fatherName.toLowerCase().includes(queryLow))
        );
      });
    }

    if (centuries.length > 0) {
      filteredPeople = filteredPeople.filter((person) => {
        const personCentury = Math.ceil(person.born / 100);

        if (centuries.includes(personCentury.toString())) {
          return person;
        }

        return null;
      });
    }

    switch (sort) {
      case Filter.Born:
      case Filter.Died:
        filteredPeople = filteredPeople.sort((a, b) => a[sort] - b[sort]);
        break;

      case Filter.Name:
      case Filter.Sex:
        filteredPeople = (
          filteredPeople.sort((a, b) => a[sort].localeCompare(b[sort]))
        );
        break;

      default:
        break;
    }

    if (order) {
      filteredPeople.reverse();
    }

    setVisiblePeople(filteredPeople);
  }, [searchParams]);

  const setSortOrder = (sortTitle: string) => {
    if (sort !== sortTitle) {
      return { sort: sortTitle, order: null };
    }

    if (!order) {
      return { sort, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const peopleWithParents = visiblePeople.map(person => {
    if (person.motherName && person.fatherName) {
      const mother = (
        visiblePeople.find(woman => woman.name === person.motherName)
      );
      const father = visiblePeople.find(man => man.name === person.fatherName);

      return {
        ...person,
        mother,
        father,
      };
    }

    if (person.motherName) {
      const mother = (
        visiblePeople.find(woman => woman.name === person.motherName)
      );

      return {
        ...person,
        mother,
      };
    }

    if (person.fatherName) {
      const father = visiblePeople.find(man => man.name === person.fatherName);

      return {
        ...person,
        father,
      };
    }

    return person;
  });

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {SORT_TITLES.map(title => (
            <th key={title}>
              <span className="is-flex is-flex-wrap-nowrap">
                {title[0].toUpperCase() + title.slice(1)}
                <SearchLink
                  params={setSortOrder(title)}
                >
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort': sort !== title,
                        'fa-sort-up': sort === title && !order,
                        'fa-sort-down': sort === title && order,
                      })}
                    />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {peopleWithParents.map((person: Person) => (
          <tr
            data-cy="person"
            key={person.name}
            className={classNames({
              'has-background-warning': selectedPerson === person.slug,
            })}
          >
            <td>
              <PersonLink
                person={person}
              />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {!person.motherName && '-'}
              {person.motherName
                && (
                  person.mother
                    ? (
                      <PersonLink
                        person={person.mother}
                      />
                    )
                    : person.motherName
                )}
            </td>
            <td>
              {!person.fatherName && '-'}
              {person.fatherName
                && (
                  person.father
                    ? (
                      <PersonLink
                        person={person.father}
                      />
                    )
                    : person.fatherName
                )}
            </td>
          </tr>
        ))}
      </tbody>

    </table>

  );
};
