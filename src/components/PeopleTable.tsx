import { useEffect, useState } from 'react';
import cn from 'classnames';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const setOrder = sort && !order ? 'desc' : null;

  useEffect(() => {
    const currentPersonSlugSliceStartIndex = location.pathname.lastIndexOf('/')
    + 1;
    const currentPersonSlug = location.pathname.slice(
      currentPersonSlugSliceStartIndex,
    );

    setSelectedPerson((prevState) => {
      const newPerson = people.find(({ slug }) => slug === currentPersonSlug);

      if (!newPerson) {
        return prevState;
      }

      return newPerson;
    });
  }, [location, people]);

  return (
    <>
      {!!people.length && (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Name
                  <SearchLink
                    params={{
                      sort: sort === 'name' && order ? null : 'name',
                      order: setOrder,
                    }}
                  >
                    <span className="icon">
                      <i
                        className={cn('fas', {
                          'fa-sort': sort !== 'name',
                          'fa-sort-up': sort === 'name' && !order,
                          'fa-sort-down': sort === 'name' && order,
                        })}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  <SearchLink
                    params={{
                      sort: sort === 'sex' && order ? null : 'sex',
                      order: setOrder,
                    }}
                  >
                    <span className="icon">
                      <i
                        className={cn('fas', {
                          'fa-sort': sort !== 'sex',
                          'fa-sort-up': sort === 'sex' && !order,
                          'fa-sort-down': sort === 'sex' && order,
                        })}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  <SearchLink
                    params={{
                      sort: sort === 'born' && order ? null : 'born',
                      order: setOrder,
                    }}
                  >
                    <span className="icon">
                      <i
                        className={cn('fas', {
                          'fa-sort': sort !== 'born',
                          'fa-sort-up': sort === 'born' && !order,
                          'fa-sort-down': sort === 'born' && order,
                        })}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  <SearchLink
                    params={{
                      sort: sort === 'died' && order ? null : 'died',
                      order: setOrder,
                    }}
                  >
                    <span className="icon">
                      <i
                        className={cn('fas', {
                          'fa-sort': sort !== 'died',
                          'fa-sort-up': sort === 'died' && !order,
                          'fa-sort-down': sort === 'died' && order,
                        })}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {people.map((person) => {
              const father = people.find(
                (per) => person.fatherName === per.name,
              );
              const mother = people.find(
                (per) => person.motherName === per.name,
              );

              const peopleNameLink = (
                per: Person | undefined,
                text?: string,
              ) => {
                return per ? <PersonLink person={per} /> : <span>{text}</span>;
              };

              return (
                <tr
                  data-cy="person"
                  key={person.slug}
                  className={cn({
                    'has-background-warning':
                      selectedPerson?.slug === person.slug,
                  })}
                >
                  <td>{peopleNameLink(person, person.name)}</td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>
                    {person.motherName
                      ? peopleNameLink(mother, person.motherName)
                      : '-'}
                  </td>
                  <td>
                    {person.fatherName
                      ? peopleNameLink(father, person.fatherName)
                      : '-'}
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
