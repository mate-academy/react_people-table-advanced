import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[]
};

const sortType = ['name', 'sex', 'born', 'died'];

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug: selected } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  function handleSort(type: string) {
    switch (true) {
      case sort === type && order === 'desc':
        return { sort: null, order: null };
      case sort === type && order === null:
        return { sort: type, order: 'desc' };
      default:
      case sort !== type:
        return { sort: type, order: null };
    }
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      {!people.length
        ? <p>There are no people matching the current search criteria</p>
        : (
          <>
            <thead>
              <tr>
                {sortType.map(type => (
                  <th key={type}>
                    <span className="is-flex is-flex-wrap-nowrap">
                      {type.charAt(0).toUpperCase() + type.slice(1)}

                      <SearchLink
                        params={handleSort(type)}
                      >
                        <span className="icon">
                          <i className={classNames(
                            'fas',
                            { 'fa-sort': sort !== type },
                            {
                              'fa-sort-up': sort === type
                                && order === null,
                            },
                            {
                              'fa-sort-down': sort === type
                                && order === 'desc',
                            },
                          )}
                          />
                        </span>
                      </SearchLink>
                    </span>
                  </th>
                ))}
                <th>Mother</th>
                <th>Father</th>
              </tr>
            </thead>
          </>
        )}

      <tbody>
        {people.map(person => {
          const {
            sex,
            born,
            died,
            motherName,
            fatherName,
            slug,
          } = person;

          const mother: Person | undefined = people
            .find(prsn => prsn.name === motherName);
          const father: Person | undefined = people
            .find(prsn => prsn.name === fatherName);

          return (
            <tr
              key={slug}
              data-cy="person"
              className={classNames(
                { 'has-background-warning': slug === selected },
              )}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother
                  ? <PersonLink person={mother} />
                  : motherName || '-'}
              </td>
              <td>
                {father
                  ? <PersonLink person={father} />
                  : fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
