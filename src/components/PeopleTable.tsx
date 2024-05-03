import React, { useMemo } from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';
import { Orders, SortKeys } from '../types/sortTypes';
import { useSearchParams } from 'react-router-dom';
import { ParentItem } from './ParentItem';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
  peopleFromServer: Person[];
  selectedSlug: string | undefined;
};

const TABLE_HEADERS = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];
const TABLE_HEADERS_WITH_SORT = ['Name', 'Sex', 'Born', 'Died'];

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedSlug,
  peopleFromServer,
}) => {
  const [searchParams] = useSearchParams();

  const currentOrder = searchParams.get('order') || Orders.Ascending;
  const currentSort = searchParams.get('sort') || SortKeys.None;

  const preparedPeople = useMemo(() => {
    return people.map(person => {
      const getParent = (parentName: string | null) => {
        return peopleFromServer.find(per => per.name === parentName);
      };

      return {
        ...person,
        mother: getParent(person.motherName),
        father: getParent(person.fatherName),
      };
    });
  }, [people, peopleFromServer]);

  const handleSortClick = (sortType: string) => {
    if (currentSort !== sortType.toLowerCase()) {
      return { sort: sortType.toLowerCase(), order: Orders.Ascending };
    }

    if (currentOrder === Orders.Descending) {
      return { sort: null, order: null };
    }

    return {
      sort: sortType.toLowerCase(),
      order: Orders.Descending,
    };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {TABLE_HEADERS.map(tableHeader =>
            TABLE_HEADERS_WITH_SORT.includes(tableHeader) ? (
              <th key={tableHeader}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {tableHeader}
                  <SearchLink params={handleSortClick(tableHeader)}>
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': currentSort !== tableHeader.toLowerCase(),
                          'fa-sort-up':
                            currentSort === tableHeader.toLowerCase() &&
                            currentOrder === Orders.Ascending,
                          'fa-sort-down':
                            currentSort === tableHeader.toLowerCase() &&
                            currentOrder === Orders.Descending,
                        })}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
            ) : (
              <th key={tableHeader}>{tableHeader}</th>
            ),
          )}
        </tr>
      </thead>

      <tbody>
        {preparedPeople.map(person => {
          const {
            sex,
            born,
            died,
            mother,
            motherName,
            father,
            fatherName,
            slug,
          } = person;
          const isSelected = slug === selectedSlug;

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({
                'has-background-warning': isSelected,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                <ParentItem parent={mother} name={motherName} />
              </td>
              <td>
                <ParentItem parent={father} name={fatherName} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
