import { FC } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { SearchLink } from '../SearchLink';

type Props = {
  people: Person[],
  searchParams: URLSearchParams,
};

const columns = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

export const PeopleTable: FC<Props> = ({
  people,
  searchParams,
}) => {
  const { slug } = useParams();
  // const slug = searchParams.get('slug');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const getPersonByName = (name: string): Person | undefined => {
    return people.find(person => person.name === name);
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      {!people.length
        ? <p>There are no people matching the current search criteria</p>
        : (
          <>
            <thead>
              <tr>
                {columns.map(column => {
                  const lCaseColumn = column.toLowerCase();

                  const newSort = sort === lCaseColumn
                    && order === 'desc' ? null : lCaseColumn;

                  let newOrder = null;

                  if (sort === lCaseColumn) {
                    if (order === 'desc') {
                      newOrder = null;
                    } else {
                      newOrder = 'desc';
                    }
                  }

                  if (column === 'Father' || column === 'Mother') {
                    return <th key={column}>{column}</th>;
                  }

                  return (
                    <th key={column}>
                      <span className="is-flex is-flex-wrap-nowrap">
                        {column}
                        <SearchLink params={{
                          sort: newSort,
                          order: newOrder,
                        }}
                        >
                          <span className="icon">
                            <i
                              className={cn('fas', {
                                'fa-sort': sort !== lCaseColumn,
                                'fa-sort-up': sort === lCaseColumn
                                  && order !== 'desc',
                                'fa-sort-down': sort === lCaseColumn
                                  && order === 'desc',
                              })}
                            />
                          </span>
                        </SearchLink>
                      </span>
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody>
              {people.map(person => {
                const mother = getPersonByName(person.motherName || '-');
                const father = getPersonByName(person.fatherName || '-');

                return (
                  <tr
                    data-cy="person"
                    key={person.slug}
                    className={cn({
                      'has-background-warning': slug === person.slug,
                    })}
                  >
                    <td>
                      <PersonLink
                        person={person}
                      />
                    </td>

                    <td>{person.sex}</td>

                    <td>{person.born}</td>

                    <td>{person.died}</td>

                    <td>
                      {mother ? (
                        <PersonLink
                          person={mother}
                        />
                      ) : (
                        person.motherName || '-'
                      )}
                    </td>

                    <td>
                      {father ? (
                        <PersonLink
                          person={father}
                        />
                      ) : (
                        person.fatherName || '-'
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </>
        )}
    </table>
  );
};
