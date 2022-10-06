import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getSearchWith } from '../utils/searchHelper';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[],
  selectedSlug: string | undefined,
};

function getCentury(year: number) {
  if (year === 0) {
    return '1';
  }

  return (Math.floor((year - 1) / 100 + 1)).toString();
}

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  const isSelected = (person: Person) => person.slug === selectedSlug;
  const [searchParams] = useSearchParams();
  const [visiblePeople, setVisiblePeople] = useState([...people]);

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const [nameCounter, setNameCounter] = useState(0);
  const [sexCounter, setSexCounter] = useState(0);
  const [bornCounter, setBornCounter] = useState(0);
  const [diedCounter, setDiedCounter] = useState(0);

  useEffect(() => {
    let newPeople = people.filter(person => {
      if (
        person.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
        || person.motherName?.toLocaleLowerCase()
          .includes(query.toLocaleLowerCase())
        || person.fatherName?.toLocaleLowerCase()
          .includes(query.toLocaleLowerCase())
      ) {
        return true;
      }

      return false;
    });

    if (centuries.length > 0) {
      newPeople = [...newPeople].filter(person => {
        if (centuries.includes(getCentury(+person.born))) {
          return true;
        }

        return false;
      });
    }

    if (sex !== '') {
      newPeople = [...newPeople].filter(person => person.sex === sex);
    }

    if (sort) {
      switch (sort) {
        case 'name':
          newPeople = [...newPeople]
            .sort((a, b) => a.name.localeCompare(b.name));
          break;

        case 'sex':
          newPeople = [...newPeople]
            .sort((a, b) => a.sex.localeCompare(b.sex));
          break;

        case 'born':
          newPeople = [...newPeople]
            .sort((a, b) => a.born - b.born);
          break;

        case 'died':
          newPeople = [...newPeople]
            .sort((a, b) => a.died - b.died);
          break;
        default:
          break;
      }
    }

    if (order) {
      newPeople = [...newPeople].reverse();
    }

    setVisiblePeople(newPeople);
  }, [query, centuries]);

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

              <Link
                onClick={() => {
                  setSexCounter(0);
                  setNameCounter(0);
                  setBornCounter(0);
                  setDiedCounter(0);
                  setNameCounter(nameCounter + 1);

                  if (nameCounter === 2) {
                    setNameCounter(0);
                  }
                }}
                to={{
                  search: getSearchWith(searchParams, {
                    sort: nameCounter === 0 || nameCounter === 1
                      ? 'name'
                      : null,
                    order: nameCounter === 1
                      ? 'desc'
                      : null,
                  }),
                }}
              >
                <span className="icon">
                  <i className={classNames(
                    'fas',
                    { 'fa-sort': nameCounter === 0 },
                    { 'fa-sort-up': nameCounter === 1 },
                    { 'fa-sort-down': nameCounter === 2 },
                  )}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link
                onClick={() => {
                  setSexCounter(0);
                  setNameCounter(0);
                  setBornCounter(0);
                  setDiedCounter(0);
                  setSexCounter(sexCounter + 1);

                  if (sexCounter === 2) {
                    setSexCounter(0);
                  }
                }}
                to={{
                  search: getSearchWith(searchParams, {
                    sort: sexCounter === 0 || sexCounter === 1
                      ? 'sex'
                      : null,
                    order: sexCounter === 1
                      ? 'desc'
                      : null,
                  }),
                }}
              >
                <span className="icon">
                  <i className={classNames(
                    'fas',
                    { 'fa-sort': sexCounter === 0 },
                    { 'fa-sort-up': sexCounter === 1 },
                    { 'fa-sort-down': sexCounter === 2 },
                  )}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link
                onClick={() => {
                  setSexCounter(0);
                  setNameCounter(0);
                  setBornCounter(0);
                  setDiedCounter(0);
                  setBornCounter(bornCounter + 1);

                  if (bornCounter === 2) {
                    setBornCounter(0);
                  }
                }}
                to={{
                  search: getSearchWith(searchParams, {
                    sort: bornCounter === 0 || bornCounter === 1
                      ? 'born'
                      : null,
                    order: bornCounter === 1
                      ? 'desc'
                      : null,
                  }),
                }}
              >
                <span className="icon">
                  <i className={classNames(
                    'fas',
                    { 'fa-sort': bornCounter === 0 },
                    { 'fa-sort-up': bornCounter === 1 },
                    { 'fa-sort-down': bornCounter === 2 },
                  )}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link
                onClick={() => {
                  setSexCounter(0);
                  setNameCounter(0);
                  setBornCounter(0);
                  setDiedCounter(0);
                  setDiedCounter(diedCounter + 1);

                  if (diedCounter === 2) {
                    setDiedCounter(0);
                  }
                }}
                to={{
                  search: getSearchWith(searchParams, {
                    sort: diedCounter === 0 || diedCounter === 1
                      ? 'born'
                      : null,
                    order: diedCounter === 1
                      ? 'desc'
                      : null,
                  }),
                }}
              >
                <span className="icon">
                  <i className={classNames(
                    'fas',
                    { 'fa-sort': diedCounter === 0 },
                    { 'fa-sort-up': diedCounter === 1 },
                    { 'fa-sort-down': diedCounter === 2 },
                  )}
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
        {visiblePeople.map(person => (
          <PersonLink
            people={people}
            person={person}
            isSelected={isSelected}
            key={person.slug}
          />
        ))}
      </tbody>
    </table>
  );
};
