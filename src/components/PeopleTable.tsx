import { useContext } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import cn from 'classnames';
import { PeopleContext } from '../store/PeopleContext';
import { PersonCard } from './Person';
import { Person } from '../types';

function getSortedList(
  people: Person[],
  alphabet: string | null,
  desc: string | null,
) {
  const newPeople = [...people];

  if (alphabet) {
    const compareFunction = (pers1: Person, pers2: Person) => {
      if (alphabet === 'name' || alphabet === 'sex') {
        return pers1[alphabet].localeCompare(pers2[alphabet]);
      }

      if (alphabet === 'born' || alphabet === 'died') {
        return pers1[alphabet] - pers2[alphabet];
      }

      return 0;
    };

    newPeople.sort(compareFunction);
  }

  if (desc) {
    newPeople.reverse();
  }

  return newPeople;
}

export const PeopleTable = () => {
  const { filteredPeople } = useContext(PeopleContext);
  const [searchParams] = useSearchParams();
  const sortAlphabet = searchParams.get('sort');
  const sortDesc = searchParams.get('order');

  const arr = getSortedList(filteredPeople, sortAlphabet, sortDesc);

  const getSortedPeople = (sort: string) => {
    const params = new URLSearchParams(searchParams);

    if (sortAlphabet && sortAlphabet !== sort) {
      params.delete('sort');
      params.delete('order');
    } else if (sortAlphabet === sort && sortDesc) {
      params.delete('sort');
      params.delete('order');
    } else {
      params.set('sort', sort);
      if (sortAlphabet === sort && !sortDesc) {
        params.set('order', 'desc');
      }
    }

    return params.toString();
  };

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
              <Link to={{ search: getSortedPeople('name') }}>
                <span className="icon">
                  <i className={cn('fas fa-sort', {
                    'fa-sort-up': sortAlphabet === 'name' && !sortDesc,
                    'fa-sort-down': sortAlphabet === 'name' && sortDesc,
                  })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={{ search: getSortedPeople('sex') }}>
                <span className="icon">
                  <i className={cn('fas fa-sort', {
                    'fa-sort-up': sortAlphabet === 'sex' && !sortDesc,
                    'fa-sort-down': sortAlphabet === 'sex' && sortDesc,
                  })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={{ search: getSortedPeople('born') }}>
                <span className="icon">
                  <i className={cn('fas fa-sort', {
                    'fa-sort-up': sortAlphabet === 'born' && !sortDesc,
                    'fa-sort-down': sortAlphabet === 'born' && sortDesc,
                  })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={{ search: getSortedPeople('died') }}>
                <span className="icon">
                  <i className={cn('fas fa-sort', {
                    'fa-sort-up': sortAlphabet === 'died' && !sortDesc,
                    'fa-sort-down': sortAlphabet === 'died' && sortDesc,
                  })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {arr.map(person => (
          <PersonCard person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
