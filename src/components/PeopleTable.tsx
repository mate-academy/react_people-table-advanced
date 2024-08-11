import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';
import { FC, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SortLink } from './SortLink';

interface Props {
  slug: string | undefined;
  loading: boolean;
  people: Person[];
}

export const PeopleTable1: FC<Props> = ({ slug, loading, people }) => {
  const [searchParams] = useSearchParams();
  const sortField = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  const sortedPeople = useMemo(() => {
    const sorted = [...people];

    if (sortField) {
      sorted.sort((a, b) => {
        let aValue: string | number = '';
        let bValue: string | number = '';

        switch (sortField) {
          case 'name':
            aValue = a.name;
            bValue = b.name;
            break;
          case 'sex':
            aValue = a.sex;
            bValue = b.sex;
            break;
          case 'born':
            aValue = a.born;
            bValue = b.born;
            break;
          case 'died':
            aValue = a.died;
            bValue = b.died;
            break;
          default:
            return 0;
        }

        if (aValue < bValue) {
          return sortOrder === 'desc' ? 1 : -1;
        }

        if (aValue > bValue) {
          return sortOrder === 'desc' ? -1 : 1;
        }

        return 0;
      });
    }

    return sorted;
  }, [people, sortField, sortOrder]);

  return (
    <>
      {!!people.length && !loading && (
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
            {sortedPeople.map(person => {
              const mother = people.find(per => per.name === person.motherName);
              const father = people.find(per => per.name === person.fatherName);
              const newSearchParams = new URLSearchParams(
                searchParams.toString(),
              );

              newSearchParams.set('person', person.slug);

              return (
                <tr
                  key={person.slug}
                  data-cy="person"
                  className={cn({
                    'has-background-warning': slug === person.slug,
                  })}
                >
                  <td>
                    <Link
                      to={`/people/${person.slug}?${searchParams.toString()}`}
                      className={cn({
                        'has-text-danger': person.sex === 'f',
                      })}
                    >
                      {person.name}
                    </Link>
                  </td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>
                    {mother ? (
                      <Link
                        to={`/people/${mother.slug}?${searchParams.toString()}`}
                        className="has-text-danger"
                      >
                        {person.motherName}
                      </Link>
                    ) : (
                      person.motherName || '-'
                    )}
                  </td>
                  <td>
                    {father ? (
                      <Link
                        to={`/people/${father.slug}?${searchParams.toString()}`}
                      >
                        {person.fatherName}
                      </Link>
                    ) : (
                      person.fatherName || '-'
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
