import { FC, memo } from 'react';
import cn from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

interface Props {
  people: Person[];
}

export const PeopleTable: FC<Props> = memo(({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const gender = searchParams.get('sex');
  const query = searchParams.get('query');
  const century = searchParams.getAll('century');

  const filteredPeople = people.filter(person => {
    const genderFilter = gender ? person.sex === gender : true;
    const queryFilter = query
      ? person.name.toLowerCase().includes(query.toLowerCase())
        || person.motherName?.toLowerCase().includes(query.toLowerCase())
        || person.fatherName?.toLowerCase().includes(query.toLowerCase())
      : true;
    const centuryFilter = century.length
      ? century.includes(Math.ceil(person.born / 100).toString())
      : true;

    return genderFilter && queryFilter && centuryFilter;
  });

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
        {filteredPeople.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={cn(
              { 'has-background-warning': person.slug === slug },
            )}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother
                ? <PersonLink person={person.mother} />
                : person.motherName || '-'}
            </td>
            <td>
              {person.father
                ? <PersonLink person={person.father} />
                : person.fatherName || '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});
