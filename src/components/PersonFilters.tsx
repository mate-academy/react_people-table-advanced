import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import cn from 'classnames';
import { getSearchWith } from '../utils/searchHelper';

type PeopleProps = {
  people: Person[];
};

export const PersonFilter = ({ people }: PeopleProps) => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();

  return (
    <>
      {people.map(person => {
        const isSelected = person.slug === slug;

        return (
          <tr
            key={person.slug}
            data-cy="person"
            className={cn({
              'has-background-warning': isSelected,
            })}
          >
            <td>
              <Link
                to={{
                  pathname: `/people/${person.slug}`,
                  search: getSearchWith(searchParams, {}),
                }}
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
              {person.motherName ? (
                person.mother ? (
                  <Link
                    to={{
                      pathname: `/people/${person.mother.slug}`,
                      search: getSearchWith(searchParams, {}),
                    }}
                    className="has-text-danger"
                  >
                    {person.motherName}
                  </Link>
                ) : (
                  person.motherName
                )
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.fatherName ? (
                person.father ? (
                  <Link
                    to={{
                      pathname: `/people/${person.father.slug}`,
                      search: getSearchWith(searchParams, {}),
                    }}
                  >
                    {person.fatherName}
                  </Link>
                ) : (
                  person.fatherName
                )
              ) : (
                '-'
              )}
            </td>
          </tr>
        );
      })}
    </>
  );
};
