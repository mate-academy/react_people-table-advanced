import { useMemo } from 'react';
import classNames from 'classnames';

import './Button.scss';

interface Sort {
  name: string,
  sex: string,
  born: string,
  died: string,
}

type Props = {
  sortKey: keyof Sort,
  text: string,
  updateSearch(params: {
    [key: string]: number[] | string | null
  }):void,
  sort: string | null,
  order: string | null,
};

export const Icon: React.FC<Props> = ({
  sortKey,
  text,
  updateSearch,
  sort,
  order,
}) => {
  const HandleClick = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (sort === null || sort !== sortKey) {
      updateSearch({ sort: sortKey });
      updateSearch({ order: null });
    }

    if (sort === sortKey && order === null) {
      updateSearch({ order: 'desc' });
    }

    if (sort === sortKey && order !== null) {
      updateSearch({ order: null });
      updateSearch({ sort: null });
    }
  };

  useMemo((() => {
    if (sort === sortKey && order === null) {
      updateSearch({ sort: sortKey });
    }

    if (sort === sortKey && order === 'desc') {
      updateSearch({ order: 'desc' });
    }

    if ((sort === null && order === null)) {
      updateSearch({ order: null, sort: null });
    }
  }), [sort, order]);

  return (
    <button
      className="is-flex is-flex-wrap-nowrap button__sort"
      type="button"
      onClick={HandleClick}
    >
      <p>
        {text}
      </p>
      <a
        href="/"
      >
        <span className="icon">
          <i className={classNames('fas', {
            'fa-sort': sort === null || sort !== sortKey,
            'fa-sort-up': order !== 'desc' && sort === sortKey,
            'fa-sort-down': order === 'desc' && sort === sortKey,
          })}
          />
        </span>
      </a>
    </button>
  );
};
