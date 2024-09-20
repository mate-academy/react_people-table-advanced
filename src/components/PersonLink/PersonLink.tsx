import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  name: string;
  sex: string;
  slug: string;
  searchParamValue: string;
}

export const PersonLink: React.FC<Props> = ({
  name,
  sex,
  slug,
  searchParamValue,
}) => {
  const isFemale = sex === 'f';

  return (
    <Link
      to={`/people/${slug}?${searchParamValue}`}
      className={classNames({
        'has-text-danger': isFemale,
      })}
    >
      {name}
    </Link>
  );
};
