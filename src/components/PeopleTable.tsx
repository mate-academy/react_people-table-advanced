import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  peoples: Person[];
  onFilter: (persons: Person[]) => void;
};

export const PeopleTable = ({ peoples, onFilter }: Props) => {
  const [serchParams, setSerchParams] = useSearchParams();
  const { peopleSlug } = useParams();
  const [masPeople, setMasPeople] = useState(peoples);
  let currentSort = serchParams.get('sort') as keyof Person | null;
  let currentOrder = serchParams.get('order') as 'desc' | null;

  useEffect(() => {
    setMasPeople(peoples);
  }, [peoples]);
  function findParenth(parenthName: string) {
    const parenth = peoples.find(human => human.name === parenthName);

    if (parenth) {
      return <PersonLink person={parenth} />;
    }

    return parenthName;
  }

  function sortPeople(field: keyof Person | null, order: 'desc' | null) {
    const sorted = [...peoples];

    if (field === null) {
      return setMasPeople([...peoples]);
    }

    sorted.sort((a, b) => {
      const valA = a[field];
      const valB = b[field];

      if (typeof valA === 'string' && typeof valB === 'string') {
        return order !== null
          ? valB.localeCompare(valA)
          : valA.localeCompare(valB);
      }

      if (typeof valA === 'number' && typeof valB === 'number') {
        return order !== null ? valB - valA : valA - valB;
      }

      return 0;
    });

    setMasPeople(sorted);
    onFilter(sorted);
  }

  function hangelSort(sor: string) {
    const params = new URLSearchParams(serchParams);

    if (currentSort === sor && currentOrder === 'desc') {
      params.delete('sort');
      params.delete('order');
    } else if (currentSort === sor) {
      params.set('order', 'desc');
    } else {
      params.set('sort', sor);
      params.delete('order');
    }

    currentSort = params.get('sort') as keyof Person | null;
    currentOrder = params.get('order') as 'desc' | null;
    setSerchParams(params);
    sortPeople(currentSort, currentOrder);

    return;
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <a onClick={() => hangelSort('name')}>
                <span className="icon">
                  <i
                    className={classNames('fas ', {
                      'fa-sort': currentSort !== 'name',
                      'fa-sort-down':
                        currentSort === 'name' && currentOrder === 'desc',
                      'fa-sort-up':
                        currentSort === 'name' && currentOrder !== 'desc',
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a onClick={() => hangelSort('sex')}>
                <span className="icon">
                  <i
                    className={classNames('fas ', {
                      'fa-sort': currentSort !== 'sex',
                      'fa-sort-down':
                        currentSort === 'sex' && currentOrder === 'desc',
                      'fa-sort-up':
                        currentSort === 'sex' && currentOrder !== 'desc',
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a onClick={() => hangelSort('born')}>
                <span className="icon">
                  <i
                    className={classNames('fas ', {
                      'fa-sort': currentSort !== 'born',
                      'fa-sort-down':
                        currentSort === 'born' && currentOrder === 'desc',
                      'fa-sort-up':
                        currentSort === 'born' && currentOrder !== 'desc',
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a onClick={() => hangelSort('died')}>
                <span className="icon">
                  <i
                    className={classNames('fas ', {
                      'fa-sort': currentSort !== 'died',
                      'fa-sort-down':
                        currentSort === 'died' && currentOrder === 'desc',
                      'fa-sort-up':
                        currentSort === 'died' && currentOrder !== 'desc',
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {masPeople.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === peopleSlug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{person.motherName ? findParenth(person.motherName) : '-'}</td>
            <td>{person.fatherName ? findParenth(person.fatherName) : '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
