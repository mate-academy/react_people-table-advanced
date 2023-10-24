import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SortLink } from './SortLink';

type Props = {
  people: Person[];
};

export const PeopleTable: FC<Props> = ({ people }) => {
  const [sortedPeople, setSortedPeople] = useState<Person[]>([]);
  const { slug = '' } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const isSelected = (person: Person) => person.slug === slug;

  const checkParentName = (parentName: string | null) => {
    if (!parentName) {
      return '-';
    }

    const parent = people.find(person => person.name === parentName);

    return parent ? <PersonLink person={parent} /> : parentName;
  };

  const sortPeople = (peopleToSort: Person[]) => {
    const sortedListOfPeople = [...peopleToSort].sort((person1, person2) => {
      switch (sort) {
        case 'name':
        case 'sex':
          return person1[sort].localeCompare(person2[sort]);
        case 'born':
        case 'died':
          return person1[sort] - person2[sort];
        default:
          return 0;
      }
    });

    return order === 'desc' ? sortedListOfPeople.reverse() : sortedListOfPeople;
  };

  useEffect(() => {
    setSortedPeople(sortPeople(people));
  }, [people, searchParams]);

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
              <SortLink title="name" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SortLink title="sex" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SortLink title="born" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SortLink title="died" />
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': isSelected(person),
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {checkParentName(person.motherName)}
            </td>
            <td>
              {checkParentName(person.fatherName)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
