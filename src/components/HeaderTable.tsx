import { FC } from 'react';
import { SearchLink } from './SearchLink';

type Props = {
  sort: string | null,
  order: string | null,
  name: string,
};

export const HeaderTable: FC<Props> = ({ sort, order, name }) => {
  const sortTitle = sort;
  const isReversed = order === 'desc';
  const title = name.toLowerCase();

  return (
    <span className="is-flex is-flex-wrap-nowrap">
      {name}
      <SearchLink
        params={{
          sort: (sortTitle === title && isReversed)
            ? null
            : title,
          order: (sortTitle === title && !isReversed)
            ? 'desc'
            : null,
        }}
      >
        <span className="icon">
          <i className="fas fa-sort" />
        </span>
      </SearchLink>
    </span>
  );
};
