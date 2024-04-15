import { FC } from 'react';
import classNames from 'classnames';

interface Props {
  isActive: boolean;
  isReversed: boolean;
  onClick: () => void;
}

export const SortLink: FC<Props> = ({ isActive, isReversed, onClick }) => (
  <span className="icon">
    <i
      onClick={onClick}
      className={classNames('fas', {
        'fa-sort': !isActive,
        'fa-sort-up': isActive && !isReversed,
        'fa-sort-down': isActive && isReversed,
      })}
    />
  </span>
);
