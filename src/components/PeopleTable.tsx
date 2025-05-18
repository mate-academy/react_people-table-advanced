import { useEffect, useState } from 'react';
import { Person } from '../types';
import { Link, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';

/* eslint-disable jsx-a11y/control-has-associated-label */

type Props = {
  setLoading: (value: boolean) => void;
  setError: (value: number) => void;
};

export const PeopleTable = ({ setLoading, setError }: Props) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [searchParams] = useSearchParams();
  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order') || 'asc';

  const sortedPeople = () => {
    const sexFilter = searchParams.get('sex');
    const centuriesFilter = searchParams.getAll('centuries');
    const queryFilter = searchParams.get('query')?.toLowerCase() || '';

    let filtered = [...people];

    if (sexFilter) {
      filtered = filtered.filter(person => person.sex === sexFilter);
    }

    if (centuriesFilter.length > 0) {
      filtered = filtered.filter(person => {
        const bornCentury = Math.ceil(person.born / 100).toString();

        return centuriesFilter.includes(bornCentury);
      });
    }

    if (queryFilter) {
      filtered = filtered.filter(
        person =>
          person.name.toLowerCase().includes(queryFilter) ||
          person.fatherName?.toLowerCase().includes(queryFilter) ||
          person.motherName?.toLowerCase().includes(queryFilter),
      );
    }

    if (!currentSort) {
      return filtered;
    }

    const sorted = [...filtered];

    sorted.sort((a, b) => {
      const aValue = a[currentSort as keyof Person];
      const bValue = b[currentSort as keyof Person];

      if (aValue == null) {
        return 1;
      }

      if (bValue == null) {
        return -1;
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return currentOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return currentOrder === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return currentOrder === 'asc'
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });

    return sorted;
  };

  const getNextOrder = (field: string) => {
    if (currentSort !== field) {
      return 'asc';
    }

    if (currentOrder === 'asc') {
      return 'desc';
    }

    return null;
  };

  const getSortLink = (field: string) => {
    const newParams = new URLSearchParams(searchParams);
    const nextOrder = getNextOrder(field);

    if (!nextOrder) {
      newParams.delete('sort');
      newParams.delete('order');
    } else {
      newParams.set('sort', field);
      newParams.set('order', nextOrder);
    }

    return `?${newParams.toString()}`;
  };

  useEffect(() => {
    const loadPeople = async () => {
      setLoading(true);
      setError(0);
      try {
        const data = await getPeople();

        if (data.length === 0) {
          setError(2);
        } else {
          setPeople(data);
        }
      } catch (error) {
        setError(1);
      } finally {
        setLoading(false);
        setIsLoaded(true);
      }
    };

    loadPeople();
  }, [setLoading, setError]);

  useEffect(() => {
    if (isLoaded && people.length > 0) {
      const filtered = sortedPeople();

      if (filtered.length === 0) {
        setError(3); // Nenhum resultado após aplicar os filtros
      } else {
        setError(0); // Há resultados, tudo certo
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [people, searchParams, isLoaded]);

  const columns = [
    { label: 'Name', field: 'name' },
    { label: 'Sex', field: 'sex' },
    { label: 'Born', field: 'born' },
    { label: 'Died', field: 'died' },
  ];

  const findParentSlug = (parentName: string) => {
    return people.find(p => p.name === parentName)?.slug;
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {columns.map(({ label, field }) => (
            <th key={field}>
              <span className="is-flex is-align-items-center">
                {label}
                <Link to={getSortLink(field)} className="ml-2">
                  {currentSort === field && currentOrder === 'asc' && (
                    <i className="fas fa-sort-up" />
                  )}
                  {currentSort === field && currentOrder === 'desc' && (
                    <i className="fas fa-sort-down" />
                  )}
                  {currentSort !== field && <i className="fas fa-sort" />}
                </Link>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople().map(person => {
          const motherSlug = person.motherName
            ? findParentSlug(person.motherName)
            : null;
          const fatherSlug = person.fatherName
            ? findParentSlug(person.fatherName)
            : null;

          return (
            <tr data-cy="person" key={person.name}>
              <td>
                {person.sex === 'f' ? (
                  <a
                    className="has-text-danger"
                    href={`#/people/${person.slug}`}
                  >
                    {person.name}
                  </a>
                ) : (
                  <a href={`#/people/${person.slug}`}>{person.name}</a>
                )}
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName ? (
                  motherSlug ? (
                    <a
                      className="has-text-danger"
                      href={`#/people/${motherSlug}`}
                    >
                      {person.motherName}
                    </a>
                  ) : (
                    person.motherName
                  )
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.fatherName ? (
                  fatherSlug ? (
                    <a href={`#/people/${fatherSlug}`}>{person.fatherName}</a>
                  ) : (
                    person.fatherName
                  )
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
