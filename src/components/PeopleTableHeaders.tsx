/* eslint-disable no-console */
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

export enum Headers {
  name = 'Name',
  sex = 'Sex',
  born = 'Born',
  died = 'Died',
  mother = 'Mother',
  father = 'Father',
}

export enum Order {
  asc = 'asc',
  desc = 'desc',
}

export interface PeopleTableHeadersProps {
  label: Headers;
  hasLink?: boolean;
  order?: Order;
}

export function PeopleTableHeaders({
  label,
  hasLink,
}: PeopleTableHeadersProps) {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const orderValue = order as Order;

  function handleSortOrder() {
    switch (true) {
      case sort && sort === label.toLowerCase() && !order:
        return `sort=${label.toLocaleLowerCase()}&order=desc`;
      case sort && sort === label.toLowerCase() && order === Order.desc:
        return ``;
      default:
        return `sort=${label.toLocaleLowerCase()}`;
    }
  }

  function handleIcon() {
    if (sort === label.toLowerCase()) {
      return orderValue !== Order.desc ? 'fa-sort-up' : 'fa-sort-down';
    }

    return 'fa-sort';
  }

  return (
    <>
      {hasLink ? (
        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            {label}
            <Link
              to={{
                pathname: '/people',
                search: handleSortOrder(),
              }}
              onClick={handleSortOrder}
            >
              <span className="icon">
                <i className={`fas ${handleIcon()}`} />
              </span>
            </Link>
          </span>
        </th>
      ) : (
        <th>{label}</th>
      )}
    </>
  );
}
