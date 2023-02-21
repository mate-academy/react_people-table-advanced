import { FC } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  people: Person[];
  selectedPerson: string | undefined;
  sort: string;
  order: string;
  searchParams: URLSearchParams;
};

export const PeopleTable: FC<Props> = ({
  people,
  selectedPerson,
  sort,
  order,
  searchParams,
}) => {
  const getParents = (name: string | null) => {
    return people.find((person) => person.name === name) || null;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['Name', 'Sex', 'Born', 'Died'].map((title) => {
            return (
              <th key={title}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {title}
                  <Link
                    to={{
                      search: getSearchWith(searchParams, {
                        sort:
                          order && sort === title.toLowerCase()
                            ? null
                            : title.toLowerCase(),
                        order:
                          !order && sort === title.toLowerCase()
                            ? 'desc'
                            : null,
                      }),
                    }}
                  >
                    <span className="icon">
                      <i
                        className={classNames(
                          'fas fa-sort',
                          {
                            'fa-sort-up':
                              !order && sort === title.toLowerCase(),
                          },
                          {
                            'fa-sort-down':
                              order && sort === title.toLowerCase(),
                          },
                        )}
                      />
                    </span>
                  </Link>
                </span>
              </th>
            );
          })}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map((person) => {
          // eslint-disable-next-line object-curly-newline
          const { sex, born, died, motherName, fatherName, slug } = person;
          const mom = getParents(motherName);
          const dad = getParents(fatherName);

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({
                'has-background-warning': slug === selectedPerson,
              })}
            >
              <PersonLink person={person} />
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              {mom ? <PersonLink person={mom} /> : <td>{motherName || '-'}</td>}
              {dad ? <PersonLink person={dad} /> : <td>{fatherName || '-'}</td>}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
