import classNames from 'classnames';
import React from 'react';

interface InterfacePersonLink {
  name: string | null;
  slug: string;
  sex?: string;
  setClick?: React.Dispatch<React.SetStateAction<number | undefined>>;
  index?: number;
}

export const PersonLink: React.FC<InterfacePersonLink> = ({
  name,
  slug,
  sex,
  setClick,
  index,
}) => {
  if (!name) {
    return <span>-</span>;
  }

  return (
    <a
      href={`#${slug}`}
      className={classNames('', {
        'has-text-danger': sex === 'f',
      })}
      onClick={event => {
        event.preventDefault();
        if (setClick && index !== undefined) {
          setClick(index);
        }
      }}
    >
      {name}
    </a>
  );
};
