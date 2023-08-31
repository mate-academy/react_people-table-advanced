import cn from 'classnames';
import { useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getSearchWith } from '../utils/searchHelper';
import { Personlink } from './PersonLink';

type Props = {
  people: Person[];
};

const sortLinks = ['name', 'sex', 'born', 'died'];

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  function getSearchWithSort(sortType: string) {
    if (!sort || sort !== sortType) {
      return getSearchWith(searchParams, { sort: sortType, order: null });
    }

    if (!order) {
      return getSearchWith(searchParams, { sort: sortType, order: 'desc' });
    }

    return getSearchWith(searchParams, { sort: null, order: null });
  }

  function getPersonByName(name: string) {
    return people.find(person => person.name === name);
  }

  useEffect(() => {
    const selectedPerson = document.querySelector('.has-background-warning');

    if (selectedPerson) {
      selectedPerson.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [slug]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortLinks.map(sortLink => (
            <th key={sortLink}>
              <span className="is-flex is-flex-wrap-nowrap">
                {sortLink.slice(0, 1).toUpperCase() + sortLink.slice(1)}

                <Link
                  to={{ search: getSearchWithSort(sortLink) }}
                >
                  <span className="icon">
                    <i
                      className={cn('fas', {
                        'fa-sort': !sort || sort !== sortLink,
                        'fa-sort-up': sort === sortLink && !order,
                        'fa-sort-down': sort === sortLink && order,
                      })}
                    />
                  </span>
                </Link>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = person.motherName
            ? getPersonByName(person.motherName)
            : undefined;
          const father = person.fatherName
            ? getPersonByName(person.fatherName)
            : undefined;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={cn({
                'has-background-warning': person.slug === slug,
              })}
            >
              <td>
                <Personlink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName ? (
                  <>
                    {mother ? (
                      <Personlink
                        person={mother}
                      />
                    ) : (
                      <>
                        {person.motherName}
                      </>
                    )}
                  </>
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.fatherName ? (
                  <>
                    {father ? (
                      <Personlink
                        person={father}
                      />
                    ) : (
                      <>
                        {person.fatherName}
                      </>
                    )}
                  </>
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
