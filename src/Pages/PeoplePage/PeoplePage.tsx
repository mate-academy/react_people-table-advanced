import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchFunction } from '../../api/fetchFunction';
import { People } from '../../types/People';
import { TableContent } from '../TableContent/TableContent';
import { TableHead } from '../TableHead/TableHead';
import { filter } from '../utils/utils';
import sortFoo from '../../utils/utils';
import './PeoplePage.scss';

export const PeoplePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { slug } = useParams();
  const [serverResponse, setServerResponse] = useState<People[]>([]);
  const [people, setPeople] = useState<People[]>([]);

  // eslint-disable-next-line max-len
  const updateHandler = (array: People[], inputQuery: string | undefined = undefined) => {
    let searchFilter = null;
    let sortOrder = searchParams.get('sortOrder');

    if (sortOrder === null) {
      sortOrder = 'asc';
    }

    if (inputQuery) {
      searchFilter = inputQuery;
    } else {
      searchFilter = searchParams.get('query');
    }

    const searchSortBy = searchParams.get('sortBy');

    if (searchFilter) {
      setPeople(sortFoo(filter(array, searchFilter), searchSortBy, sortOrder));
    } else {
      setPeople(sortFoo(array, searchSortBy, sortOrder));
    }
  };

  useEffect(() => {
    fetchFunction()
      .then(res => {
        if (res.length > 0) {
          setServerResponse(res);
          updateHandler(res);
        }
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.warn(`${err.message}`);
      });
  }, [searchParams]);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchParams.set('query', e.target.value.toLowerCase());
    setSearchParams(searchParams);

    updateHandler(serverResponse, e.target.value);
  };

  const reverseAscendingOrder = () => {
    const sortOrder = searchParams.get('sortOrder');

    if (sortOrder === null || sortOrder === 'asc') {
      searchParams.set('sortOrder', 'desc');
      setSearchParams(searchParams);
    } else {
      searchParams.set('sortOrder', 'asc');
      setSearchParams(searchParams);
    }
  };

  return (
    <>
      <h1 className="title">People Page</h1>
      <input
        className="input input-field"
        data-cy="filterInput"
        placeholder="Search..."
        onChange={(e) => {
          inputHandler(e);
        }}
        value={`${searchParams.get('query') || ''}`}
      />
      <button
        type="button"
        className="button button-position"
        onClick={() => {
          reverseAscendingOrder();
        }}
      >
        Descending Order
      </button>
      <table className="table is-hoverable table-position">
        <thead>
          <TableHead />
        </thead>
        <tbody>
          {
            people.length > 0 && (
              people
                .map(el => (
                  <TableContent person={el} key={el.name} slug={slug} />
                )))
          }
        </tbody>
        <tfoot>
          <TableHead />
        </tfoot>
      </table>
    </>
  );
};
