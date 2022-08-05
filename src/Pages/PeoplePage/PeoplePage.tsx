import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchFunction } from '../../api/fetchFunction';
import { People } from '../../types/People';
import { TableContent } from '../TableContent/TableContent';
import './PeoplePage.scss';

export const PeoplePage: React.FC = () => {
  const [searcParams, setSearchParams] = useSearchParams();
  const { slug } = useParams();
  const [serverResponse, setServerResponse] = useState<People[]>([]);
  const [people, setPeople] = useState<People[]>([]);

  const filter = (data: People[], query: string): People[] => {
    return data
      .filter(el => {
        const queryLC = query.toLowerCase();

        let check = false;

        if (el.name.toLowerCase().includes(queryLC)) {
          check = true;
        }

        if (el.fatherName) {
          if (el.fatherName.toLowerCase().includes(queryLC)) {
            check = true;
          }
        }

        if (el.motherName) {
          if (el.motherName.toLowerCase().includes(queryLC)) {
            check = true;
          }
        }

        return check;
      });
  };

  useEffect(() => {
    fetchFunction()
      .then(res => {
        if (res.data) {
          setServerResponse(res.data);

          const searchFilter = searcParams.get('query');

          if (searchFilter) {
            setPeople(filter(res.data, searchFilter));
          } else {
            setPeople(res.data);
          }
        }
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.warn(`${err.message}`);
      });
  }, []);

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setSearchParams({ });
      setPeople(serverResponse);
    } else {
      setSearchParams({ query: e.target.value.toLowerCase() });
      setPeople(filter(serverResponse, e.target.value));
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
          searchHandler(e);
        }}
        value={`${searcParams.get('query') || ''}`}
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
