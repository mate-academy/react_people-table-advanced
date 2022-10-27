import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PeopleItem } from './PeopleItem';
import { SearchLink } from './SearchLink';

interface Props {
  people: Person[];
}

export const PeopleTable: FC<Props> = ({ people }) => {
  const [filteredPeople, setFilteredPeople] = useState<Person[]>(people);
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sort');
  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const order = searchParams.get('order');
  const centuries = searchParams.getAll('centuries');

  useEffect(() => {
    const sortedPeople = people.filter((person) => {
      if (sex) {
        return person.sex === sex;
      }

      return true;
    }).filter(person => {
      if (centuries.length) {
        const personCentury = Math.ceil(person.born / 100);

        return centuries.includes(personCentury.toString());
      }

      return true;
    }).filter((person) => {
      if (query) {
        const personNames = person.name + person.fatherName + person.motherName;

        return personNames.toLowerCase().includes(query.toLowerCase());
      }

      return true;
    }).sort((prev, next) => {
      if (sortBy) {
        const prevVal = prev[sortBy as keyof Person];
        const nextVal = next[sortBy as keyof Person];

        if (typeof prevVal === 'number') {
          return (
            Number(prevVal) - Number(nextVal)
          );
        }

        if (typeof prevVal === 'string') {
          return prevVal.toString().localeCompare(nextVal!.toString());
        }
      }

      return 0;
    });

    if (order) {
      sortedPeople.reverse();
    }

    setFilteredPeople(sortedPeople);
  }, [people, sex, sortBy, query, order, centuries]);

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
              <SearchLink
                params={{
                  sort: !sortBy || !order ? 'name' : null,
                  order: sortBy && !order ? 'desc' : null,
                }}
              >
                <span className="icon">
                  {sortBy !== 'name' && <i className="fas fa-sort" />}
                  {sortBy === 'name'
                    && !order && <i className="fas fa-sort-down" />}
                  {sortBy === 'name'
                    && order && <i className="fas fa-sort-up" />}
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={{
                  sort: !sortBy || !order ? 'sex' : null,
                  order: sortBy && !order ? 'desc' : null,
                }}
              >
                <span className="icon">
                  {sortBy !== 'sex' && <i className="fas fa-sort" />}
                  {sortBy === 'sex'
                    && !order && <i className="fas fa-sort-down" />}
                  {sortBy === 'sex'
                    && order && <i className="fas fa-sort-up" />}
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={{
                  sort: !sortBy || !order ? 'born' : null,
                  order: sortBy && !order ? 'desc' : null,
                }}
              >
                <span className="icon">
                  {sortBy !== 'born' && <i className="fas fa-sort" />}
                  {sortBy === 'born'
                    && !order && <i className="fas fa-sort-down" />}
                  {sortBy === 'born'
                    && order && <i className="fas fa-sort-up" />}
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={{
                  sort: !sortBy || !order ? 'died' : null,
                  order: sortBy && !order ? 'desc' : null,
                }}
              >
                <span className="icon">
                  {sortBy !== 'died' && <i className="fas fa-sort" />}
                  {sortBy === 'died'
                    && !order && <i className="fas fa-sort-down" />}
                  {sortBy === 'died'
                    && order && <i className="fas fa-sort-up" />}
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {filteredPeople?.map((person) => <PeopleItem person={person} />)}
      </tbody>
    </table>
  );
};
