/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import './TableHeader.scss';

import {
  THEAD_TITLE, sortingList,
} from '../../api/helper';
import { ServerIPerson, SortOrderI } from '../../api/interface';

type TableHeaderT = {
  people: ServerIPerson[];
  setPeople: Function;
};

export const TableHeader: React.FC<TableHeaderT> = ({ people, setPeople }) => {
  const [sortOrder, setSortOrder] = useState<SortOrderI>({
    Name: 'both',
    Sex: 'both',
    Born: 'both',
    Died: 'both',
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
  }, [people, searchParams, setPeople]);

  useEffect(() => {
    if (searchParams.has('sortBy')) {
      searchParams.set(
        'sortOrder',
        sortOrder[searchParams.get('sortBy') || ''],
      );
      if (history.location.search !== `?${searchParams.toString()}`) {
        history.push(`?${searchParams.toString()}`);
        sortPeopleList();
      }
    }
  }, [sortOrder, searchParams, history, sortPeopleList]);

  const handleSortList = useCallback((value: string) => {
    if (THEAD_TITLE[value].isSortable) {
      searchParams.set('sortBy', value);
      setSortOrder({
        ...sortOrder,
        [value]: sortOrder[value] === 'desc'
            || sortOrder[value] === 'both'
          ? 'asc' : 'desc',
      });
    } else {
      searchParams.delete('sortBy');
      searchParams.delete('sortOrder');
    }

    if (history.location.search !== `?${searchParams.toString()}`) {
      history.push(`?${searchParams.toString()}`);
    }
  }, [history, searchParams, sortOrder]);

  return (
    <tr>
      {Object.values(THEAD_TITLE).map(title => (
        <td
          key={title.name}
          onClick={() => handleSortList(title.name)}
          className={classNames({
            'selected-title': title.name === searchParams.get('sortBy'),
          })}
        >
          {title.name}
          {
            title.name === searchParams.get('sortBy')
              ? title.isSortable
                  && (
                    <img
                      src={`images/sort_${sortOrder[title.name]}.png`}
                      alt={`sort_${sortOrder[title.name]}`}
                    />
                  )
              : title.isSortable
                && (
                  <img
                    src="images/sort_both.png"
                    alt="sort_both"
                  />
                )
          }
        </td>
      ))}
    </tr>
  );
};
