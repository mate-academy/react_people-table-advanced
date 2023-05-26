import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  name: 'All' | 'Male' | 'Female',
};

export const FilterSexLink: React.FC<Props> = ({ name }) => {
  const [searchParams] = useSearchParams();
  const sexParams = searchParams.get('sex');
  let params = null;

  if (name !== 'All') {
    params = name[0].toLocaleLowerCase();
  }

  const isActive = (!sexParams && name === 'All') || params === sexParams;

  return (
    <Link
      className={classNames({ 'is-active': isActive })}
      to={{ search: getSearchWith(searchParams, { sex: params }) }}
    >
      {name}
    </Link>
  );
};
