import { Link, useSearchParams } from 'react-router-dom';
import { useState } from 'react';

interface Props {
  type: string;
}

export const Sort: React.FC<Props> = ({ type }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [click, setClick] = useState(0);

  const handleOnClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const params = new URLSearchParams(searchParams);

    if (click === 0) {
      params.delete('order');
      params.delete('sort');
      setClick(1);
      params.append('sort', type);
    }

    if (click === 1) {
      setClick(2);
      params.append('order', 'desc');
    }

    if (click === 2) {
      setClick(0);
      params.delete('order');
      params.delete('sort');
    }

    setSearchParams(params);
  };

  return (
    <Link to={`/people?${searchParams.toString()}`} onClick={handleOnClick}>
      <span className="icon">
        {(searchParams.get('sort') !== type)
        && <i className="fas fa-sort" />}

        {(searchParams.get('sort') === type
        && searchParams.get('order') !== 'desc')
        && <i className="fas fa-sort-up" />}

        {(searchParams.get('sort') === type
        && searchParams.get('order') === 'desc')
        && <i className="fas fa-sort-down" />}
      </span>
    </Link>
  );
};
