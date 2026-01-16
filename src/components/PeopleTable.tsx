import React from 'react';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  people: Person[];
  allPeople: Person[];
  selectedSlug?: string;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  allPeople,
  selectedSlug,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') as keyof Person | null;
  const order = searchParams.get('order');

  function handleSort(field: keyof Person) {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    if (currentSort !== field) {
      setSearchParams(prev =>
        getSearchWith(prev, { sort: field, order: null }),
      );
    } else if (currentOrder !== 'desc') {
      setSearchParams(prev =>
        getSearchWith(prev, { sort: field, order: 'desc' }),
      );
    } else {
      setSearchParams(prev => getSearchWith(prev, { sort: null, order: null }));
    }
  }

  const sortedPeople = [...people].sort((a, b) => {
    if (!sort) {
      return 0;
    }

    const multiplier = order === 'desc' ? -1 : 1;

    switch (sort) {
      case 'name':
        return a.name.localeCompare(b.name) * multiplier;
      case 'sex':
        return a.sex.localeCompare(b.sex) * multiplier;
      case 'born':
        return (a.born - b.born) * multiplier;
      case 'died':
        return (a.died - b.died) * multiplier;
      default:
        return 0;
    }
  });

  return (
    <div className="block">
      <div className="box table-container">
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              {['Name', 'Sex', 'Born', 'Died'].map(header => (
                <th
                  key={header}
                  onClick={() =>
                    handleSort(header.toLowerCase() as keyof Person)
                  }
                  className="is-clickable"
                >
                  <span className="is-flex is-flex-wrap-nowrap">
                    {header}

                    <span className="icon ml-1">
                      {sort === header.toLowerCase() ? (
                        order === 'desc' ? (
                          <i className="fas fa-sort-down" />
                        ) : (
                          <i className="fas fa-sort-up" />
                        )
                      ) : (
                        <i className="fas fa-sort" />
                      )}
                    </span>
                  </span>
                </th>
              ))}
              {['Mother', 'Father'].map(header => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {sortedPeople.map(person => (
              <tr
                key={person.slug}
                data-cy="person"
                className={classNames({
                  'has-background-warning': person.slug === selectedSlug,
                })}
              >
                <td>
                  <PersonLink person={person} people={allPeople} />
                </td>
                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>
                  {person.motherName ? (
                    <PersonLink
                      personName={person.motherName}
                      people={allPeople}
                    />
                  ) : (
                    '-'
                  )}
                </td>
                <td>
                  {person.fatherName ? (
                    <PersonLink
                      personName={person.fatherName}
                      people={allPeople}
                    />
                  ) : (
                    '-'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
