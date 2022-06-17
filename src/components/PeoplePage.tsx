import './PeoplePage.scss';
import { useContext, useEffect, useState } from 'react';
import {
  NavLink,
  Outlet,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import PeopleTable from './PeopleTable';
import { DataContext } from '../context/DataProvider';

const PeoplePage = () => {
  const [saveSearch, setSaveSearch] = useState('');
  const [search, setSearch] = useSearchParams();
  const { peopleList } = useContext(DataContext);
  const location = useLocation();
  const queryName = search.get('query') || '';
  const querySort = search.get('sortBy') || '';
  const querySortOrder = search.get('sortOrder') || 'asc';

  useEffect(() => {
    if (location.search) {
      setSaveSearch(location.search);
    }
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    search.set('query', e.target.value);
    setSearch(search);
    if (e.target.value === '') {
      search.delete('query');
      setSearch(search);
    }
  }

  function filterList() {
    const searchParams = queryName.toLocaleLowerCase();
    const sortParams = querySort;

    const filterPople = peopleList?.filter(person => person.name
      .toLowerCase().includes(searchParams));

    if (!sortParams) {
      return filterPople;
    }

    if (sortParams === 'name' || sortParams === 'sex') {
      filterPople?.sort((a, b) => (
        querySortOrder === 'asc'
          ? a[sortParams].localeCompare(b[sortParams])
          : b[sortParams].localeCompare(a[sortParams])
      ));
    }

    if (sortParams === 'born' || sortParams === 'died') {
      filterPople?.sort((a, b) => (
        querySortOrder === 'asc'
          ? a[sortParams] - b[sortParams]
          : b[sortParams] - a[sortParams]
      ));
    }

    return filterPople;
  }

  const filtredList = filterList();

  function setSortParam(value: string) {
    search.set('sortBy', value);
    setSearch(search);
    if (value === '') {
      search.delete('sortBy');
      setSearch(search);
    }
  }

  function setSortOrder(value: string) {
    search.set('sortOrder', value);
    setSearch(search);
  }

  return (
    <div>
      <label htmlFor="query">
        Search
      </label>
      <input
        value={queryName}
        onChange={handleChange}
        type="text"
        name="query"
        id="query"
        data-cy="filterInput"
      />
      <NavLink
        to="/peoplePage/new"
      >
        <button type="button">Add person</button>
      </NavLink>
      {filtredList
      && (
        <PeopleTable
          people={filtredList}
          // eslint-disable-next-line
          setSortParam={setSortParam}
          // eslint-disable-next-line
          setSortOrder={setSortOrder}
        />
      )}
      <Outlet context={saveSearch} />
    </div>
  );
};

export default PeoplePage;
