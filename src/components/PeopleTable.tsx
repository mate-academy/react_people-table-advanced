import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import { TableHeader } from '../types/TableHeader';
import { SearchLink } from './SearchLink';
import React from 'react';

const tableHeaders = [
  TableHeader.Name,
  TableHeader.Sex,
  TableHeader.Born,
  TableHeader.Died,
  TableHeader.Mother,
  TableHeader.Father,
];

type Props = {
  people: Person[];
  collection: Person[];
  sortBy: TableHeader | string | null;
  isReversed: string | null;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  collection,
  sortBy,
  isReversed,
}) => {
  const { slug } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
        {tableHeaders.map(header => {
            const sortable = header !== TableHeader.Mother
              && header !== TableHeader.Father;

            const firstClick = sortBy !== header;
            const secondClick = sortBy === header && !isReversed;
            const thirdClick = sortBy === header && !!isReversed;
            let sort:string | null = null;
            let order:string | null = null;

            if (firstClick) {
              sort = header.toLowerCase();
              order = null;
            }

            if (secondClick) {
              sort = header.toLowerCase();
              order = 'desc';
            }

            if (thirdClick) {
              sort = null;
              order = null;
            }

            return (
              <th key={header}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {header}

                  {sortable && (
                    <SearchLink
                      params={{ sort, order }}
                    >
                      <span className="icon">
                        <i
                          className={classNames('fas', {
                            'fa-sort': firstClick,
                            'fa-sort-up': secondClick,
                            'fa-sort-down': thirdClick,
                          })}
                        />
                      </span>
                    </SearchLink>
                  )}
                </span>
                </th>
            );
          })}
        </tr>
      </thead>

      <tbody>
      {people.map(person => {
          const {
            name,
            sex,
            born,
            died,
            motherName,
            fatherName,
          } = person;

          const mother = collection.find(parent => parent.name === motherName);
          const father = collection.find(parent => parent.name === fatherName);

          const mum = mother
            ? (
              <PersonLink
                name={motherName}
                sex={mother.sex}
                slug={mother.slug}
              />
            )
            : motherName;

          const dad = father
            ? (
              <PersonLink
                name={fatherName}
                sex={father.sex}
                slug={father.slug}
              />
            )
            : fatherName;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': slug === person.slug,
              })}
            >
              <td>
                <PersonLink
                  name={name}
                  sex={sex}
                  slug={person.slug}
                />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>
                {motherName
                  ? mum
                  : '-'}
              </td>

              <td>
                {fatherName
                  ? dad
                  : '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
