import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

type Props = {
  name: string;
};

const SortBtnComponent: React.FC<Props> = ({ name }) => {
  const { searchParams, setSearchParams } = useContext(AppContext);
  const { pathname } = useLocation();
  const [currentTitle, setCurrentTitle] = useState('');

  const hanldeSortPeople = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    const title = name.toLowerCase();

    if (currentTitle !== title) {
      params.delete('order');
    }

    if (params.has('sort', title) && params.has('order')) {
      params.delete('sort');
      params.delete('order');
    } else if (params.has('sort', title) && !params.has('order')) {
      params.set('order', 'desc');
    } else {
      params.set('sort', title);
    }

    setCurrentTitle(title);
    setSearchParams(params);
  };

  return (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {name}
        <Link
          onClick={e => hanldeSortPeople(e)}
          to={{
            pathname,
            search: searchParams.toString(),
          }}
        >
          <span className="icon">
            <i
              className={classNames(
                'fas',
                {
                  'fa-sort': !searchParams
                    .toString()
                    .includes(name.toLowerCase()),
                },
                {
                  'fa-sort-up':
                    searchParams.get('sort') === name.toLowerCase() &&
                    !searchParams.get('order'),
                },
                {
                  'fa-sort-down':
                    searchParams.get('sort') === name.toLowerCase() &&
                    searchParams.get('order'),
                },
              )}
            />
          </span>
        </Link>
      </span>
    </th>
  );
};

export const SortBtn = React.memo(SortBtnComponent);
