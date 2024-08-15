import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SortLink } from './SortLink';
import { useParams } from 'react-router-dom';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[] | undefined;
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  if (people?.length === 0) {
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
              <SortLink field="name" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SortLink field="sex" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SortLink field="born" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SortLink field="died" />
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people?.map(person => (
          <>
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': person.slug === slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.mother ? (
                  <PersonLink person={person.mother} />
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {person.father ? (
                  <PersonLink person={person.father} />
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          </>
        ))}
      </tbody>
    </table>
  );
};
