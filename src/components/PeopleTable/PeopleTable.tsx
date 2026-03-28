import { PersonLink } from '../PersonLink/PersonLink';
import { Person } from '../../types';
import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from '../SearchLink/SearchLink';

type Props = {
  people: Person[];
};

export const PeopleTable = ({ people }: Props) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') as string | null;

  const getSortParams = (field: string) => {
    const normalizedField = field.toLowerCase();

    if (sort !== normalizedField) {
      return { sort: normalizedField, order: null };
    }

    if (order !== 'desc') {
      return { sort: normalizedField, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  return (
    <>
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            {['Name', 'Sex', 'Born', 'Died'].map(header => (
              <th key={header}>
                <SearchLink params={getSortParams(header)}>
                  <span className="is-flex is-flex-wrap-nowrap">
                    {header}
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': sort !== header.toLowerCase(),
                          'fa-sort-up':
                            sort === header.toLowerCase() && order !== 'desc',
                          'fa-sort-down':
                            sort === header.toLowerCase() && order === 'desc',
                        })}
                      />
                    </span>
                  </span>
                </SearchLink>
              </th>
            ))}
            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>

        <tbody>
          {people.map(person => {
            const isMotherPresent = !!person.mother;
            const isFatherPresent = !!person.father;

            return (
              <tr
                data-cy="person"
                key={person.slug}
                className={classNames({
                  'has-background-warning': slug === person.slug,
                })}
              >
                <td>
                  <PersonLink person={person} />
                </td>

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>
                  {isMotherPresent ? (
                    <PersonLink person={person.mother!} />
                  ) : (
                    <>{person.motherName || '-'}</>
                  )}
                </td>
                <td>
                  {isFatherPresent ? (
                    <PersonLink person={person.father!} />
                  ) : (
                    <>{person.fatherName || '-'}</>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
