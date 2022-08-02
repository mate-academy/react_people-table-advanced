import React, {
  ChangeEvent, FC, useEffect, useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { People } from '../../types/People';
import { getPeople } from '../../api/people';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<People[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const history = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    async function retrievePeople() {
      const result = await getPeople();

      setLoading(false);
      setPeople(result);
    }

    retrievePeople();
  }, []);

  const query = searchParams.get('query') || '';

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      searchParams.set('query', event.target.value);
    } else {
      searchParams.delete('query');
    }

    history(`?${searchParams.toString()}`);
  };

  const userSort = searchParams.get('sortBy') || '';
  const sortOrder = searchParams.get('sortOrder') || '';

  const setSortBy = (event : React.MouseEvent<HTMLTableHeaderCellElement>,
    count: number) => {
    if (event.currentTarget.textContent === null) {
      searchParams.delete('sortBy');
    } else {
      searchParams.set('sortBy', event.currentTarget.textContent);
      if (count % 2 === 0) {
        searchParams.set('sortOrder', 'asc');
      } else {
        searchParams.set('sortOrder', 'desc');
      }
    }

    history(`?${searchParams.toString()}`);
  };

  const visiblePerson = people.filter(person => {
    const lowerQuery = query.toLowerCase();

    if (typeof person.motherName === 'string'
      && typeof person.fatherName === 'string') {
      return person.name.toLowerCase().includes(lowerQuery)
        || person.motherName.toLowerCase().includes(lowerQuery)
        || person.fatherName.toLowerCase().includes(lowerQuery);
    }

    return true;
  });

  visiblePerson.sort((a, b) => {
    switch (userSort) {
      case 'Name': {
        searchParams.set('sortBy', userSort);
        searchParams.set('sortOrder', sortOrder);

        if (sortOrder === 'asc') {
          return a.name.localeCompare(b.name);
        }

        return b.name.localeCompare(a.name);
      }

      case 'Sex': {
        searchParams.set('sortBy', userSort);
        searchParams.set('sortOrder', sortOrder);

        if (sortOrder === 'asc') {
          return a.sex.localeCompare(b.sex);
        }

        return b.sex.localeCompare(a.sex);
      }

      case 'Born': {
        searchParams.set('sortBy', userSort);
        searchParams.set('sortOrder', sortOrder);
        if (sortOrder === 'asc') {
          return a.born - b.born;
        }

        return b.born - a.born;
      }

      case 'Died': {
        searchParams.set('sortBy', userSort);
        searchParams.set('sortOrder', sortOrder);
        if (sortOrder === 'asc') {
          return a.died - b.died;
        }

        return b.died - a.died;
      }

      default: {
        searchParams.delete('sortBy');
        searchParams.delete('sortOrder');

        return 0;
      }
    }
  });

  return (
    <section>
      <h2 className="title">People page</h2>
      <div>
        <label htmlFor="filterInput">Filter</label>
        <input
          type="text"
          name="filterInput"
          value={query}
          onChange={handleQueryChange}
        />
      </div>
      {!loading && (
        <PeopleTable
          people={visiblePerson}
          onClickHandler={setSortBy}
          userSort={userSort}
        />
      )}
    </section>
  );
};
