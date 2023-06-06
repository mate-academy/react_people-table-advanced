import { FC } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  peoples: Person[] | null;
};

export const PeopleTable: FC<Props> = ({ peoples }) => {
  const { slug = '' } = useParams();
  const isSelected = (person: Person) => person.slug === slug;

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
