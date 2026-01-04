import classNames from 'classnames';
import { Person } from '../types';
import PersonLink from './PersonLink';
import { useParams, useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
//

interface Props {
  people: Person[];
}

export const PeopleTable = ({ people = [] }: Props) => {
  const { slug: personSlug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') as keyof Person | null;
  const order = searchParams.get('order') as 'asc' | 'desc' | null;

  const columns: { key: keyof Person; label: string }[] = [
    { key: 'name', label: 'Name' },
    { key: 'sex', label: 'Sex' },
    { key: 'born', label: 'Born' },
    { key: 'died', label: 'Died' },
  ];

  const getSortOder = (key: keyof Person) => {
    if (sort !== key) {
      return { sort: key, order: 'asc' };
    }

    if (order === 'asc') {
      return { sort: key, order: 'desc' };
    }

    if (order === 'desc') {
      return { sort: null, order: null };
    }

    return { sort: key, order: 'asc' };
  };

  return (
    <table className="table is-striped is-hoverable is-narrow is-fullwidth">
      <thead>
        <tr>
          {columns.map(col => (
            <th key={col.key}>
              <span className="is-flex is-flex-wrap-nowrap">
                {col.label}
                <SearchLink params={getSortOder(col.key)}>
                  <span className="icon">
                    <i
                      className={`fas ${
                        sort !== col.key
                          ? 'fa-sort'
                          : order === 'asc'
                            ? 'fa-sort-up'
                            : order === 'desc'
                              ? 'fa-sort-down'
                              : 'fa-sort'
                      }`}
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

      <tbody>
        {people.map((person: Person) => (
          <tr
            key={person.slug}
            className={classNames({
              'has-background-warning': personSlug === person.slug,
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
