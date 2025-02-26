import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useParams, useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

/* eslint-disable jsx-a11y/control-has-associated-label */

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { selectedPerson } = useParams();
  const [searchParams] = useSearchParams();
  const sortableFields = ['name', 'sex', 'born', 'died'];

  const currentSortField = searchParams.get('sort') || '';
  const currentSortOrder = searchParams.get('order') || '';

  const generateSortParams = (fieldName: string) => ({
    sort:
      currentSortField === fieldName && currentSortOrder === 'desc'
        ? null
        : fieldName,
    order:
      currentSortField === fieldName && currentSortOrder !== 'desc'
        ? 'desc'
        : null,
  });

  const getSortIconClass = (fieldName: string) =>
    classNames('fas', {
      'fa-sort': currentSortField !== fieldName,
      'fa-sort-up': currentSortField === fieldName && !currentSortOrder,
      'fa-sort-down':
        currentSortField === fieldName && currentSortOrder === 'desc',
    });

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortableFields.map(fieldName => (
            <th key={fieldName}>
              <span className="is-flex is-flex-wrap-nowrap">
                {fieldName[0].toUpperCase() + fieldName.slice(1)}
                <SearchLink params={generateSortParams(fieldName)}>
                  <span className="icon">
                    <i className={getSortIconClass(fieldName)} />
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
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={classNames({
              'has-background-warning': person.slug === selectedPerson,
            })}
          >
            <td>{<PersonLink person={person} />}</td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother ? (
                <PersonLink person={person.mother} />
              ) : (
                person.motherName
              )}
            </td>
            <td>
              {person.father ? (
                <PersonLink person={person.father} />
              ) : (
                person.fatherName
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
