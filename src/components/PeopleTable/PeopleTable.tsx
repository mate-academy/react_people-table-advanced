import React, { useEffect, useMemo } from 'react';
import { Person } from '../../types';
import { useSelectedPerson } from '../../context/SelectedPersonProvider';
import { useParams, useSearchParams } from 'react-router-dom';
import { PersonLink } from '../PersonLink';
import classNames from 'classnames';
import { SearchLink } from '../SearchLink';

interface Props {
  people: Person[];
}

type SortField = 'name' | 'sex' | 'born' | 'died';
const sortFieldsList: SortField[] = ['name', 'sex', 'born', 'died'];

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { selectedSlug, setSelectedSlug } = useSelectedPerson();
  const { slug } = useParams();

  const [searchParams] = useSearchParams();

  const sortFieldRaw = searchParams.get('sort');
  const order = searchParams.get('order');

  const sortField: SortField | null =
    sortFieldRaw && sortFieldsList.includes(sortFieldRaw as SortField)
      ? (sortFieldRaw as SortField)
      : null;

  useEffect(() => {
    setSelectedSlug(slug ?? null);
  }, [slug, setSelectedSlug]);

  const sortedPeople = useMemo(() => {
    if (!sortField) {
      return people;
    }

    const sorted = [...people].sort((a, b) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let aValue: any = (a as any)[sortField];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let bValue: any = (b as any)[sortField];

      if (sortField === 'born' || sortField === 'died') {
        aValue = Number(aValue);
        bValue = Number(bValue);
      }

      if (aValue < bValue) {
        return -1;
      }

      if (aValue > bValue) {
        return 1;
      }

      return 0;
    });

    if (order === 'desc') {
      sorted.reverse();
    }

    return sorted;
  }, [people, sortField, order]);

  const getNextSortParams = (field: string) => {
    if (sortField !== field) {
      return { sort: field, order: null };
    }

    if (!order) {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const renderSortIcon = (field: string) => {
    if (sortField !== field) {
      return <i className="fas fa-sort" />;
    }

    if (order === 'desc') {
      return <i className="fas fa-sort-down" />;
    }

    return <i className="fas fa-sort-up" />;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortFieldsList.map(field => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {field.charAt(0).toUpperCase() + field.slice(1)}
                <SearchLink params={getNextSortParams(field)} className="ml-1">
                  <span className="icon">{renderSortIcon(field)}</span>
                </SearchLink>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': selectedSlug === person.slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName ? (
                <PersonLink
                  person={
                    people.find(p => p.name === person.motherName) || null
                  }
                  name={person.motherName}
                />
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.fatherName ? (
                <PersonLink
                  person={
                    people.find(p => p.name === person.fatherName) || null
                  }
                  name={person.fatherName}
                />
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
