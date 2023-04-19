import { useSearchParams } from 'react-router-dom';
import { FC } from 'react';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { SexFilterType } from '../enums/SexFilterType';

type Props = {
  title: string;
  isSelected: boolean;
  sexValue: string | null;
};

const SexFilterOption: FC<Props> = ({ title, isSelected, sexValue }) => {
  return (
    <SearchLink
      className={classNames({ 'is-active': isSelected })}
      params={{ sex: sexValue }}
    >
      {title}
    </SearchLink>
  );
};

export const SexFilter = () => {
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      <SexFilterOption title="All" isSelected={!sex} sexValue={null} />

      <SexFilterOption
        title="Male"
        isSelected={sex === SexFilterType.Male}
        sexValue={SexFilterType.Male}
      />

      <SexFilterOption
        title="Female"
        isSelected={sex === SexFilterType.Female}
        sexValue={SexFilterType.Female}
      />
    </p>
  );
};
