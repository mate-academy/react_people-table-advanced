import classNames from 'classnames';

type Props = {
  sortType: string,
};

export const Icon: React.FC<Props> = ({ sortType }) => (
  <span className="icon">
    <i className={classNames('fas', {
      'fa-sort': sortType === 'default',
      'fa-sort-up': sortType === 'asc',
      'fa-sort-down': sortType === 'desc',
    })}
    />
  </span>
);
