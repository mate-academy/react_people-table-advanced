import classNames from 'classnames';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({
  people,
}) => {
  const [searchParams] = useSearchParams();

  const tableSortingColumns = ['Name', 'Sex', 'Born', 'Died'];
  const selectedSex = searchParams.get('sex');
  const order = searchParams.get('order');

  const [
    selectedPersonSlug,
    setSelectedPersonSlug,
  ] = useState<string | null>(null);

  const handlePersonClick = (slug: string) => {
    setSelectedPersonSlug(slug === selectedPersonSlug ? null : slug);
  };

  const findParentSlug = (name: string) => {
    return people.find(user => user.name === name)?.slug || '';
  };

  const handleLink = (name: string | null) => {
    return (
      (name ? (
        <PersonLink
          person={{
            name,
            slug: findParentSlug(name),
          }}
          people={people}
          onPersonClick={handlePersonClick}
        />
      ) : (
        '-'
      ))
    );
  };

  const handleSortOrder = () => {
    if (order === null) {
      searchParams.set('order', 'asc');
    }

    if (order === 'asc') {
      searchParams.set('order', 'desc');
    }

    if (order === 'desc') {
      searchParams.set('order', 'desc');
      searchParams.delete('order');
    }

    return searchParams.get('order');
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableSortingColumns.map(col => (
            <th
              key={col}
            >
              <span className="is-flex  is-flex-wrap-nowrap">
                {col}
                <SearchLink
                  state={{ order: handleSortOrder() }}
                  params={{
                    sort: col.toLowerCase(),
                    order: handleSortOrder(),
                  }}
                >
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort': order === null,
                        'fa-sort-up': order === 'asc',
                        'fa-sort-down': order === 'desc',
                      })}
                    />
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
        {people
          .filter((person) => !selectedSex || person.sex === selectedSex)
          .map(({
            slug,
            name,
            sex,
            born,
            died,
            motherName,
            fatherName,
          }) => (
            <tr
              key={slug}
              data-cy="person"
              className={
                classNames({
                  'has-background-warning': slug === selectedPersonSlug,
                })
              }
            >
              <td>
                <PersonLink
                  person={{ name, slug }}
                  people={people}
                  onPersonClick={handlePersonClick}
                />
              </td>
              <td>
                {sex}
              </td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {handleLink(motherName)}
              </td>
              <td>
                {handleLink(fatherName)}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
