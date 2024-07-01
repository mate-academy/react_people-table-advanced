import classNames from 'classnames';

import { PersonLink } from './PersonLink';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

const sortFields = ['name', 'sex', 'born', 'died'];

function capitalize(word: string) {
  return word[0].toUpperCase() + word.slice(1);
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();
  const [searchParams] = useSearchParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortFields.map(sortField => {
            const sortParam = searchParams.get('sort');
            const orderParam = searchParams.get('order');

            let sort: string | null = sortField;
            let order: string | null = null;

            const isActiveSort = sortParam === sortField;
            const isDescending = orderParam === 'desc';

            if (isActiveSort) {
              if (!isDescending) {
                order = 'desc';
              } else {
                sort = null;
                order = null;
              }
            }

            return (
              <th key={sortField}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {capitalize(sortField)}
                  <SearchLink params={{ sort, order }}>
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': !isActiveSort,
                          'fa-sort-up': isActiveSort && !isDescending,
                          'fa-sort-down': isActiveSort && isDescending,
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
            born,
            died,
            sex,
            slug,
            fatherName,
            father,
            motherName,
            mother,
          } = person;

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({
                'has-background-warning': slug === personSlug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {motherName && mother ? (
                  <PersonLink person={mother} />
                ) : (
                  motherName
                )}
              </td>
              <td>
                {fatherName && father ? (
                  <PersonLink person={father} />
                ) : (
                  fatherName
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
