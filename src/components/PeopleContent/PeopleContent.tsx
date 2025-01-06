import React from 'react';
import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import PersonItem from '../PersonItem/PersonItem';
import { useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

type Props = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

const PeopleContent: React.FC<Props> = ({ loading, setLoading }) => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');
  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const { slug } = useParams();

  const setSort = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (sort === value && order) {
      params.delete('order');
    } else if (sort === value) {
      params.set('order', 'desc');
    } else {
      params.delete('order');
      params.set('sort', value);
    }

    setSearchParams(params);
  };

  useEffect(() => {
    const fetchPeople = async () => {
      setLoading(true);

      try {
        const data: Person[] = await getPeople();

        const dataWithParents: Person[] = data.map(person => {
          const mother = data.find(p => p.name === person.motherName);
          const father = data.find(p => p.name === person.fatherName);

          return {
            ...person,
            mother,
            father,
          };
        });

        setPeopleList(dataWithParents);
        setLoading(false);
      } catch (err) {
        setError('Something went wrong');
        setLoading(false);
      }
    };

    fetchPeople();
  }, [setLoading]);

  useEffect(() => {
    const filtered = peopleList.filter(person => {
      const isValid =
        (!sex || person.sex === sex) &&
        (!centuries.length ||
          centuries.includes(Math.floor(person.born / 100).toString())) &&
        (!query || person.name.toLowerCase().includes(query.toLowerCase()));

      if (isValid) {
        return true;
      }

      return false;
    });

    const sorted = filtered.sort((a, b) => {
      switch (sort) {
        case 'name':
          return b.name.localeCompare(a.name);
        case 'sex':
          return a.sex === 'f' ? 1 : -1;
        case 'born':
          return b.born - a.born;
        case 'died':
          return b.died - a.died;
        default:
          return 0;
      }
    });

    setFilteredPeople(order === 'desc' ? sorted : sorted.reverse());
  }, [sex, centuries, query, sort, order, peopleList]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        {error}
      </p>
    );
  }

  if (peopleList.length === 0) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  if (filteredPeople.length === 0) {
    return <p>There are no people matching the current search criteria</p>;
  }

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
              <a onClick={() => setSort('name')}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': !sort || sort !== 'name',
                      'fa-sort-down': sort === 'name' && order === 'desc',
                      'fa-sort-up': sort === 'name' && !order,
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a onClick={() => setSort('sex')}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': !sort || sort !== 'sex',
                      'fa-sort-down': sort === 'sex' && order === 'desc',
                      'fa-sort-up': sort === 'sex' && !order,
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a onClick={() => setSort('born')}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': !sort || sort !== 'born',
                      'fa-sort-down': sort === 'born' && order === 'desc',
                      'fa-sort-up': sort === 'born' && !order,
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a onClick={() => setSort('died')}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': !sort || sort !== 'died',
                      'fa-sort-down': sort === 'died' && order === 'desc',
                      'fa-sort-up': sort === 'died' && !order,
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredPeople.map(person => {
          let personMatch = false;

          if (slug && person.slug === slug) {
            personMatch = true;
          }

          return (
            <PersonItem
              key={person.slug}
              person={person}
              personMatch={personMatch}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default PeopleContent;
