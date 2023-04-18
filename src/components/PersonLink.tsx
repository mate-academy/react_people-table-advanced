import classNames from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  pathname: string;
  search: string;
  name: string;
  sex: string;
};

export const PersonLink: FC<Props> = ({
  pathname,
  search,
  name,
  sex,
}) => (
  <Link
    className={classNames({ 'has-text-danger': sex === 'f' })}
    to={{
      pathname,
      search,
    }}
  >

    {name}
  </Link>
);
