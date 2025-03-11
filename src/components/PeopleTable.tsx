// src/components/PeopleTable.tsx
import { useState } from 'react';
import { Person } from '../types/Person';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');
  const [selectedPersonSlug, setSelectedPersonSlug] = useState<string | null>(
    null,
  );

  const getSortIcon = (field: string) => {
    if (currentSort !== field) {
      return 'fa-sort';
    }

    return currentOrder === 'desc' ? 'fa-sort-down' : 'fa-sort-up';
  };

  const getSortParams = (field: string) => {
    if (currentSort !== field) {
      return { sort: field, order: null };
    }

    if (!currentOrder) {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const navigate = useNavigate();
  const handlePersonSelect = (slug: string) => {
    setSelectedPersonSlug(slug);
    navigate(`/people/${slug}`);
  };

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
              <SearchLink params={getSortParams('name')}>
                <span className="icon">
                  <i className={`fas ${getSortIcon('name')}`} />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSortParams('sex')}>
                <span className="icon">
                  <i className={`fas ${getSortIcon('sex')}`} />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getSortParams('born')}>
                <span className="icon">
                  <i className={`fas ${getSortIcon('born')}`} />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSortParams('died')}>
                <span className="icon">
                  <i className={`fas ${getSortIcon('died')}`} />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={
              selectedPersonSlug === person.slug ? 'has-background-warning' : ''
            }
            onClick={() => handlePersonSelect(person.slug)}
          >
            <td>
              <a
                href={`#/people/${person.slug}`}
                className={
                  person.sex === 'f' ? 'has-text-danger' : 'has-text-info'
                }
                onClick={e => e.preventDefault()} // Prevent navigation for this example
              >
                {person.name}
              </a>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother && person.mother.slug ? (
                <a
                  href={`#/people/${person.mother.slug}`}
                  className="has-text-danger"
                >
                  {person.motherName}
                </a>
              ) : (
                person.motherName || '-'
              )}
            </td>

            <td>
              {person.fatherName && (
                <a href={`#/people/${person.father?.slug || ''}`}>
                  {person.fatherName}
                </a>
              )}
              {!person.fatherName && '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
