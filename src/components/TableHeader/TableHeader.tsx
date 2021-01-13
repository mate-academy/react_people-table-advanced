import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './TableHeader.scss';

import {
  THEAD_TITLE, sortingList,
} from '../../api/helper';
import { Person } from '../../api/interface';

type TableHeaderT = {
  people: Person[];
  setPeople: Function;
  isAddingForm: boolean;
};

export const TableHeader: React.FC<TableHeaderT> = ({ people, setPeople, isAddingForm }) => {
  const [sortOrder, setSortOrder] = useState({
    name: 'both',
    sex: 'both',
    born: 'both',
    died: 'both',
  });
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const sortPeopleList = useCallback(() => {
    setPeople(
      sortingList(
        people,
        searchParams.get('sortBy') || '',
        searchParams.get('sortOrder') || '',
      ),
    );
  }, [searchParams, history]);

  useEffect(() => {
    if (searchParams.has('sortBy')) {
      searchParams.set(
        'sortOrder',
        (sortOrder as never)[searchParams.get('sortBy')?.toLowerCase() || ''],
      );
      history.push(`?${searchParams.toString()}`);
      sortPeopleList();
    }
  }, [sortOrder]);

  const handleSortList = (event: React.MouseEvent<HTMLTableRowElement>) => {
    const { textContent } = (event.target as HTMLElement);

    if (textContent !== THEAD_TITLE.father && textContent !== THEAD_TITLE.mother) {
      searchParams.set('sortBy', textContent || '');
      setSortOrder({
        ...sortOrder,
        [`${textContent?.toLowerCase()}`]: (sortOrder as never)[`${textContent?.toLowerCase()}`] === 'desc'
            || (sortOrder as never)[`${textContent?.toLowerCase()}`] === 'both'
          ? 'asc' : 'desc',
      });
    } else {
      searchParams.delete('sortBy');
      searchParams.delete('sortOrder');
    }

    history.push(`?${searchParams.toString()}`);
  };

  return (
    <tr
      onClick={(event) => {
        if (!isAddingForm) {
          handleSortList(event);
        }
      }}
    >
      {Object.values(THEAD_TITLE).map(title => (
        <td
          key={title}
          className={title === searchParams.get('sortBy')
            ? 'selected-title' : ''}
        >
          {title}
          {
            title === searchParams.get('sortBy')
              ? ((title !== THEAD_TITLE.father && title !== THEAD_TITLE.mother)
                  && (
                    <img
                      src={`images/sort_${(sortOrder as never)[title.toLowerCase()]}.png`}
                      alt={`sort_${(sortOrder as never)[title.toLowerCase()]}`}
                    />
                  ))
              : ((title !== THEAD_TITLE.father && title !== THEAD_TITLE.mother)
                && (
                  <img
                    src="images/sort_both.png"
                    alt="sort_both"
                  />
                )
              )
          }
        </td>
      ))}
    </tr>
  );
};
