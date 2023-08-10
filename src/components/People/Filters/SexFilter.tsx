import React from 'react';
import classNames from 'classnames';
import { PersonSex } from '../../../types/PersonSex';
import { SearchLink } from '../../SearchLink';

type Props = {
  selectedSex: string,
  handleSexChange: (selectedSex: string) => void,
};

export const SexFilter: React.FC<Props> = ({
  selectedSex,
  handleSexChange,
}) => {
  return (
    <p className="panel-tabs" data-cy="SexFilter">
      <SearchLink
        params={{ sex: null }}
        className={classNames({ 'is-active': selectedSex === PersonSex.All })}
        onClick={() => handleSexChange(PersonSex.All)}
      >
        All
      </SearchLink>

      <SearchLink
        params={{ sex: 'm' }}
        className={classNames({ 'is-active': selectedSex === PersonSex.Male })}
        onClick={() => handleSexChange(PersonSex.Male)}

      >
        Male
      </SearchLink>

      <SearchLink
        params={{ sex: 'f' }}
        className={classNames({
          'is-active': selectedSex === PersonSex.Female,
        })}
        onClick={() => handleSexChange(PersonSex.Female)}

      >
        Female
      </SearchLink>
    </p>
  );
};
