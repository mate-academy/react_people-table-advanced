import React, { useEffect, useState } from 'react';
import { Person } from '../types';
import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  allPeople: Person[];
};

enum Sort {
  name = 'name',
  sex = 'sex',
  born = 'born',
  died = 'died',
}

type TableHeaders = {
  text: string;
  value: Sort;
  id: number;
};

const tableHeaders: TableHeaders[] = [
  {
    text: 'Name',
    value: Sort.name,
    id: 1,
  },
  {
    text: 'Sex',
    value: Sort.sex,
    id: 2,
  },
  {
    text: 'Born',
    value: Sort.born,
    id: 3,
  },
  {
    text: 'Died',
    value: Sort.died,
    id: 4,
  },
];

export const PeopleTable: React.FC<Props> = ({ allPeople }) => {
  const { slug } = useParams();
  const [serchParams] = useSearchParams();
  const [filterPeople, setFilterPeople] = useState<Person[]>(allPeople);

  useEffect(() => {
    if (allPeople) {
      const sex = serchParams.get('sex');
      const centuries = serchParams.getAll('centuries');
      const query = serchParams.get('query');
      const sort = serchParams.get('sort');
      const order = serchParams.get('order');
      let newPeople = [...allPeople];

      if (sex) {
        newPeople = newPeople.filter(person => person.sex === sex);
      }

      if (centuries.length > 0) {
        newPeople = newPeople.filter(person =>
          centuries.includes(String(Math.ceil(person.born / 100))),
        );
      }

      if (query) {
        newPeople = newPeople.filter(person => {
          return (
            person.name.toLowerCase().includes(query.toLowerCase()) ||
            person.fatherName?.toLowerCase().includes(query.toLowerCase()) ||
            person.motherName?.toLowerCase().includes(query.toLowerCase())
          );
        });
      }

      if (sort) {
        newPeople = newPeople.sort((first, second) => {
          if (!order) {
            switch (sort) {
              case Sort.name:
                return first.name.localeCompare(second.name);
              case Sort.sex:
                return first.sex.localeCompare(second.sex);
              case Sort.born:
                return first.born - second.born;
              case Sort.died:
                return first.died - second.died;

              default:
                return 0;
            }
          } else {
            switch (sort) {
              case Sort.name:
                return second.name.localeCompare(first.name);
              case Sort.sex:
                return second.sex.localeCompare(first.sex);
              case Sort.born:
                return second.born - first.born;
              case Sort.died:
                return second.died - first.died;

              default:
                return 0;
            }
          }
        });
      }

      setFilterPeople(newPeople);
    }
  }, [serchParams, allPeople]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableHeaders.map(th => {
            const sort = serchParams.get('sort');
            const order = serchParams.get('order');

            return (
              <th key={th.id}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {th.text}
                  {th.value !== sort && (
                    <SearchLink
                      params={{
                        sort: th.value,
                        order: null,
                      }}
                    >
                      <span className="icon">
                        <i className="fas fa-sort" />
                      </span>
                    </SearchLink>
                  )}
                  {!order && th.value === sort && (
                    <SearchLink params={{ order: 'desc' }}>
                      <span className="icon">
                        <i className="fas fa-sort-up" />
                      </span>
                    </SearchLink>
                  )}
                  {order && th.value === sort && (
                    <SearchLink
                      params={{
                        order: null,
                        sort: null,
                      }}
                    >
                      <span className="icon">
                        <i className="fas fa-sort-down" />
                      </span>
                    </SearchLink>
                  )}
                </span>
              </th>
            );
          })}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filterPeople.map(personOld => {
          const mother = allPeople.find(
            onePerson => onePerson.name === personOld.motherName,
          );
          const father = allPeople.find(
            onePerson => onePerson.name === personOld.fatherName,
          );

          const person = {
            ...personOld,
            mother: mother,
            father: father,
          };

          return (
            <tr
              data-cy="person"
              className={classNames({
                'has-background-warning': slug === person.slug,
              })}
              key={person.slug}
            >
              <PersonLink person={person} />

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              {person.motherName ? (
                person.mother ? (
                  <PersonLink person={person.mother} />
                ) : (
                  <td>{person.motherName}</td>
                )
              ) : (
                <td>{`-`}</td>
              )}
              {person.fatherName ? (
                person.father ? (
                  <PersonLink person={person.father} />
                ) : (
                  <td>{person.fatherName}</td>
                )
              ) : (
                <td>{`-`}</td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
