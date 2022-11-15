import classNames from 'classnames';
import { FC } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SortLink } from './SortLink';

interface Props {
  people: Person[];
}
export const PeopleTable: FC<Props> = ({ people }) => {
  const { slug = '' } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const findParent = (parentName: string | null) => {
    const parent = people.find((person) => person.name === parentName);

    if (parent) {
      return <PersonLink person={parent} />;
    }

    return parentName || '-';
  };

  const sortPeople = (filteredPeople: Person[]) => {
    const sortList = [...filteredPeople].sort((person1, person2) => {
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

    return order === 'desc' ? sortList.reverse() : sortList;
  };

  const sortedPeople = sortPeople(people);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              <SortLink title="Name" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              <SortLink title="Sex" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              <SortLink title="Born" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              <SortLink title="Died" />
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map((person) => (
          <tr
            key={person.slug}
            className={classNames({
              'has-background-warning': slug === person.slug,
            })}
            data-cy="person"
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{findParent(person.motherName)}</td>
            <td>{findParent(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
