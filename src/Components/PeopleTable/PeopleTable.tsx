import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Human } from '../../Types/Human';
import './PeopleTable.scss';
import { TableRows } from '../TableRows/TableRows';
import { TableHead } from '../TableHead/TableHead';

export type Props = {
  people: Human[];
};

type Query = {
  query?: string,
  sortBy?: string,
  sortMethod?: string,
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const postQuery = searchParams.get('query') || '';
  const sortQuery = searchParams.get('sortBy') || '';
  const methodQuery = searchParams.get('sortMethod') || '';
  const sortedPeople = people;
  let apiQuery = {} as Query;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (value) {
      apiQuery = {
        query: value,
      };
    }

    if (value && methodQuery) {
      apiQuery = {
        query: value,
        sortBy: sortQuery,
        sortMethod: methodQuery,
      };
    }

    setSearchParams(apiQuery);
  };

  return (
    <div className="page-wrap">
      <input
        className="input"
        value={postQuery}
        type="search"
        onChange={(e) => handleInputChange(e)}
      />
      <div className="container">
        <table className="table">
          <TableHead
            setSearchParams={setSearchParams}
            postQuery={postQuery}
            sortQuery={sortQuery}
          />
          <tbody>
            <TableRows
              sortedPeople={sortedPeople}
              postQuery={postQuery}
              sortQuery={sortQuery}
              methodQuery={methodQuery}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};
