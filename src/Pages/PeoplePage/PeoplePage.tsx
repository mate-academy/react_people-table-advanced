import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchFunction } from '../../api/fetchFunction';
import { People } from '../../types/People';
import { TableContent } from '../TableContent/TableContent';
import './PeoplePage.scss';

export const PeoplePage: React.FC = () => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [serverResponse, setServerResponse] = useState<People[]>([]);
  const [query, setQuery] = useState('');
  const [people, setPeople] = useState<People[]>([]);

  useEffect(() => {
    fetchFunction()
      .then(res => {
        if (res.data !== null) {
          setServerResponse([...res.data]);

          // dublicate

          const search = searchParams.get('query');

          if (search) {
            setPeople(
              // eslint-disable-next-line max-len
              [...res.data].filter(el => el.name.toLowerCase().includes(search)),
            );
          } else {
            setPeople([...res.data]);
          }
        } else {
          // eslint-disable-next-line no-console
          console.warn(res.responseError.message);
        }
      });
  }, []);

  useEffect(() => {
    const search = searchParams.get('query');

    if (search) {
      setQuery(search.toLowerCase());
    } else {
      setQuery('');
    }
  }, [searchParams]);

  useEffect(() => {
    if (query !== '') {
      setPeople(
        [...serverResponse].filter(el => el.name.toLowerCase().includes(query)),
      );
    }
  }, [query]);

  return (
    <>
      <h1 className="title">People Page</h1>
      <input
        className="input input-field"
        data-cy="filterInput"
        placeholder="Search..."
        onChange={(e) => {
          setSearchParams({ query: e.target.value });
        }}
        value={query}
      />
      <table className="table  is-hoverable table-position">
        <thead>
          <tr className="person">
            <th>Name</th>
            <th>Sex</th>
            <th>Born</th>
            <th>Died</th>
            <th>Father</th>
            <th>Mother</th>
            <th>Slug</th>
          </tr>
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
          <tr className="person">
            <th>Name</th>
            <th>Sex</th>
            <th>Born</th>
            <th>Died</th>
            <th>Father</th>
            <th>Mother</th>
            <th>Slug</th>
          </tr>
        </tfoot>
      </table>
    </>
  );
};
