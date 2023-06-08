import { FC } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  peoples: Person[] | null;
  sort: string | null;
  order: boolean | null;
};

export const PeopleTable: FC<Props> = ({ peoples, sort, order }) => {
  const { slug = '' } = useParams();
  const isSelected = (person: Person) => person.slug === slug;
  const namingList = ['Name', 'Sex', 'Born', 'Died'];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {namingList.map(name => {
            const lowerName = name.toLowerCase();

            const params = {
              sort: (sort === lowerName && order) ? null : lowerName,
              order: (sort === lowerName && !order) ? 'desc' : null,
            };

            const styled = {
              'fa-sort-up': sort === lowerName && !order,
              'fa-sort-down': sort === lowerName && order,
            };

            return (
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  {name}
                  <SearchLink params={params}>
                    <span className="icon">
                      <i className={classNames('fas fa-sort', styled)} />
                    </span>
                  </SearchLink>
                </span>
              </th>
            );
          })}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {peoples?.map(people => (
          <tr
            data-cy="person"
            key={people.slug}
            className={classNames({
              'has-background-warning': isSelected(people),
            })}
          >
            <td><PersonLink people={people} isSelected={isSelected} /></td>
            <td>{people.sex}</td>
            <td>{people.born}</td>
            <td>{people.died}</td>
            <td>
              {people.mother
                ? <PersonLink people={people.mother} isSelected={isSelected} />
                : people.motherName}
            </td>
            <td>
              {people.father
                ? <PersonLink people={people.father} isSelected={isSelected} />
                : people.fatherName}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
