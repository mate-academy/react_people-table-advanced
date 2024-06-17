/* eslint-disable @typescript-eslint/indent */
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import { useSearchParams } from 'react-router-dom';

type Props = {
  people: Person[];
};

enum Sort {
  Name = 'name',
  Sex = 'sex',
  Born = 'born',
  Died = 'died',
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const filterSex = searchParams.get('sex');
  const filterName = searchParams.get('query');
  const filterCenturies = searchParams.getAll('centuries');

  const setSearch = (sortMethod: Sort) => {
    if (!sort || sort !== sortMethod) {
      searchParams.set('sort', sortMethod);

      if (order) {
        searchParams.delete('order');
      }
    } else if (sort === sortMethod && !order) {
      searchParams.set('order', 'desc');
    } else {
      searchParams.delete('sort');
      searchParams.delete('order');
    }

    setSearchParams(searchParams.toString());
  };

  const getIconClass = (sortMethod: Sort) => {
    return classNames('fas', {
      'fa-sort': sort !== sortMethod,
      'fa-sort-up': sort === sortMethod && !order,
      'fa-sort-down': sort === sortMethod && order,
    });
  };

  const sortPeople = (arr: Person[]) => {
    switch (sort) {
      case Sort.Name:
        return [...arr].sort((a, b) => a.name.localeCompare(b.name));

      case Sort.Sex:
        return [...arr].sort((a, b) => a.sex.localeCompare(b.sex));

      case Sort.Born:
        return [...arr].sort((a, b) => a.born - b.born);

      case Sort.Died:
        return [...arr].sort((a, b) => a.died - b.died);

      default:
        return [...arr];
    }
  };

  const setOrder = (arr: Person[]) => {
    if (order) {
      return [...arr].reverse();
    }

    return arr;
  };

  const filterPeople = (arr: Person[]) => {
    const filteredBySex = filterSex
      ? arr.filter(person => person.sex === filterSex)
      : [...arr];

    const filteredByName = filterName
      ? filteredBySex.filter(
          person =>
            person.name.toLowerCase().includes(filterName.toLowerCase()) ||
            (person.fatherName &&
              person.fatherName
                .toLowerCase()
                .includes(filterName.toLowerCase())) ||
            (person.motherName &&
              person.motherName
                .toLowerCase()
                .includes(filterName.toLowerCase())),
        )
      : filteredBySex;

    const filteredByCenturies = !!filterCenturies.length
      ? filteredByName.filter(
          person =>
            filterCenturies.includes(
              Math.ceil(+person.born / 100).toString(),
            ) ||
            filterCenturies.includes(Math.ceil(+person.died / 100).toString()),
        )
      : filteredByName;

    return filteredByCenturies;
  };

  const getPeopleToRender = (peopleArray: Person[]) => {
    return setOrder(sortPeople(filterPeople(peopleArray)));
  };

  const peopleToRender = getPeopleToRender(people);

  return (
    <>
      {!!peopleToRender.length ? (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Name
                  <span className="icon">
                    <i
                      className={getIconClass(Sort.Name)}
                      onClick={() => setSearch(Sort.Name)}
                    />
                  </span>
                </span>
              </th>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  <span className="icon">
                    <i
                      className={getIconClass(Sort.Sex)}
                      onClick={() => setSearch(Sort.Sex)}
                    />
                  </span>
                </span>
              </th>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  <span className="icon">
                    <i
                      className={getIconClass(Sort.Born)}
                      onClick={() => setSearch(Sort.Born)}
                    />
                  </span>
                </span>
              </th>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  <span className="icon">
                    <i
                      className={getIconClass(Sort.Died)}
                      onClick={() => setSearch(Sort.Died)}
                    />
                  </span>
                </span>
              </th>
              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {peopleToRender.map(person => (
              <PersonLink
                person={person}
                key={person.name}
                mother={people.find(
                  mother => mother.name === person.motherName,
                )}
                father={people.find(
                  father => father.name === person.fatherName,
                )}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p>There are no people matching the current search criteria</p>
      )}
    </>
  );
};
