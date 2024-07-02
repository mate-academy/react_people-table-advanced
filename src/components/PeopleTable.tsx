/* eslint-disable jsx-a11y/control-has-associated-label */
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slugId } = useParams();
  const selectedPerson = people.find(person => person.slug === slugId);
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || '';
  const sortOrder = searchParams.get('order') || '';

  const handleSort = (selectedSort: string) => {
    if (selectedSort !== sortBy) {
      return {
        sort: selectedSort,
        order: null,
      };
    }

    if (selectedSort === sortBy && !sortOrder) {
      return {
        sort: selectedSort,
        order: 'desc',
      };
    }

    return {
      sort: null,
      order: null,
    };
  };

  const sortFields = ['Name', 'Sex', 'Born', 'Died'];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortFields.map(sortField => {
            const sortFieldLow = sortField.toLowerCase();

            return (
              <th key={sortField}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {sortField}
                  <SearchLink params={handleSort(sortFieldLow)}>
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': sortBy !== sortFieldLow,
                          'fa-sort-up': sortBy === sortFieldLow && !sortOrder,
                          'fa-sort-down': sortBy === sortFieldLow && sortOrder,
                        })}
                      />
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
        {people.map(person => {
          const {
            sex,
            born,
            died,
            fatherName,
            motherName,
            slug,
            father,
            mother,
          } = person;

          return (
            <tr
              data-cy="person"
              className={classNames({
                'has-background-warning': selectedPerson === person,
              })}
              key={slug}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {(mother ? <PersonLink person={mother} /> : motherName) ?? '-'}
              </td>
              <td>
                {(father ? <PersonLink person={father} /> : fatherName) ?? '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
