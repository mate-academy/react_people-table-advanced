import { useParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';
import { Person } from '../types';
import { useSortParams } from '../hook/useSortParams';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const { handleSort, renderSortIcon } = useSortParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th onClick={() => handleSort('name')} className="is-clickable">
            <span className="is-flex is-flex-wrap-nowrap">
              Name{renderSortIcon('name')}
            </span>
          </th>
          <th onClick={() => handleSort('sex')} className="is-clickable">
            <span className="is-flex is-flex-wrap-nowrap">
              Sex{renderSortIcon('sex')}
            </span>
          </th>
          <th onClick={() => handleSort('born')} className="is-clickable">
            <span className="is-flex is-flex-wrap-nowrap">
              Born{renderSortIcon('born')}
            </span>
          </th>
          <th onClick={() => handleSort('died')} className="is-clickable">
            <span className="is-flex is-flex-wrap-nowrap">
              Died{renderSortIcon('died')}
            </span>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map((person: Person) => (
          <tr
            data-cy="person"
            key={person.slug}
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
        ))}
      </tbody>
    </table>
  );
};
