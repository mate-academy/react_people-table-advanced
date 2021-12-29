import React, { useState } from 'react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import './TableHead.scss';

type Query = {
  query?: string,
  sortBy?: string,
  sortMethod?: string,
};

type Props = {
  setSearchParams: (obj: Query) => any,
  postQuery: string,
  sortQuery: string,
};

export const TableHead: React.FC<Props> = ({ setSearchParams, postQuery, sortQuery }) => {
  const [method, setMethod] = useState('asc');

  const hundleButtonChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setSearchParams({
      sortBy: e.currentTarget.id,
      sortMethod: method,
    });

    if (method && postQuery) {
      setSearchParams({
        query: postQuery,
        sortBy: e.currentTarget.id,
        sortMethod: method,
      });
    }

    if (sortQuery !== e.currentTarget.id || method === 'desc') {
      setMethod('asc');
    } else {
      setMethod('desc');
    }
  };

  return (
    <thead className="header">
      <tr className="header__wrap">
        <th className="header__data">
          <button
            type="button"
            className="header__button"
            id="name"
            onClick={(e) => hundleButtonChange(e)}
          >
            Name
            {(method === 'asc' && sortQuery === 'name') ? <AiFillCaretDown />
              : <AiFillCaretUp />}
          </button>
        </th>
        <th className="header__data">
          <button
            type="button"
            className="header__button"
            id="sex"
            onClick={(e) => hundleButtonChange(e)}
          >
            Sex
            {(method === 'asc' && sortQuery === 'sex') ? <AiFillCaretDown />
              : <AiFillCaretUp />}
          </button>
        </th>
        <th className="header__data">
          <button
            type="button"
            className="header__button"
            id="born"
            onClick={(e) => hundleButtonChange(e)}
          >
            Born
            {(method === 'asc' && sortQuery === 'born') ? <AiFillCaretDown />
              : <AiFillCaretUp />}
          </button>
        </th>
        <th className="header__data">
          <button
            type="button"
            className="header__button"
            id="died"
            onClick={(e) => hundleButtonChange(e)}
          >
            Died
            {(method === 'asc' && sortQuery === 'died') ? <AiFillCaretDown />
              : <AiFillCaretUp />}
          </button>
        </th>
        <th className="header__data">Father name</th>
        <th className="header__data">Mother name</th>
      </tr>
    </thead>
  );
};
