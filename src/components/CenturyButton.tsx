import React from 'react';
import classNames from 'classnames';

type Props = {
  century: number;
  selectedCenturies: string[];
  toggleCentuary: (cent: string | null) => void;
};

export const CenturyButton: React.FC<Props> = ({
  century,
  selectedCenturies,
  toggleCentuary,
}) => {
  return (
    <a
      key={century}
      data-cy="century"
      className={classNames('button mr-1', {
        'is-info': selectedCenturies.includes(`${century}`),
      })}
      href={`#/people?centuries=${century}`}
      onClick={e => {
        e.preventDefault();
        toggleCentuary(`${century}`);
      }}
    >
      {century}
    </a>
  );
};
