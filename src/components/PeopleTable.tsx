import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person as PersonType } from '../types';
import { Person } from './Person';
import { SearchLink } from './SearchLink';

type Props = {
  people: PersonType[];
};

export const PeopleTable: React.FC<Props> = ({
  people,
}) => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query')?.trim().toLowerCase() || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const preparePeople = () => {
    let peopleNew = [...people];

    if (query) {
      peopleNew = peopleNew.filter(person => {
        return person.name.toLowerCase().includes(query)
          || (person.motherName || '').toLowerCase().includes(query)
          || (person.fatherName || '').toLowerCase().includes(query);
      });
    }

    if (sex) {
      peopleNew = peopleNew.filter(person => person.sex === sex);
    }

    if (centuries.length) {
      peopleNew = peopleNew.filter(person => {
        return centuries.includes(Math.ceil(person.born / 100).toString());
      });
    }

    if (sort) {
      peopleNew = peopleNew.sort((a, b) => {
        switch (sort) {
          case 'Name':
            return a.name.localeCompare(b.name);
          case 'Sex':
            return a.sex.localeCompare(b.sex);
          case 'Born':
            return a.born - b.born;
          case 'Died':
            return a.died - b.died;
          default:
            return 0;
        }
      });
    }

    if (order === 'desc') {
      peopleNew = peopleNew.reverse();
    }

    return peopleNew;
  };

  const preparedPeople = preparePeople();

  const calculateOrder = (column: string) => {
    if (sort === column) {
      return order ? '' : 'desc';
    }

    return '';
  };

  const calculateColumn = (column: string) => {
    if (sort === column && order === 'desc') {
      return '';
    }

    return column;
  };

  const calculateIcon = (column: string) => {
    if (sort === column) {
      return order === 'desc' ? 'fas fa-sort-down' : 'fas fa-sort-up';
    }

    return 'fas fa-sort';
  };

  return (
    <>
      {preparedPeople.length === 0 ? (
        <p>
          There are no people matching the current search criteria
        </p>
      ) : (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              {['Name', 'Sex', 'Born', 'Died'].map((column) => (
                <th key={column}>
                  <span className="is-flex is-flex-wrap-nowrap">
                    {column}
                    <SearchLink
                      params={{
                        sort: calculateColumn(column) || null,
                        order: calculateOrder(column) || null,
                      }}
                    >
                      <span className="icon">
                        <i className={calculateIcon(column)} />
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
            {preparedPeople.map((person) => (
              <Person key={person.slug} person={person} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
