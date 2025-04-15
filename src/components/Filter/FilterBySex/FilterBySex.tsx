import { SexFilterValue } from '../../../types/FilterParams';
import { SearchLink } from '../../SearchLink';
import classNames from 'classnames';

interface Props {
  selectedSex: string | null;
}

export const FilterBySex: React.FC<Props> = ({ selectedSex }) => {
  return (
    <p className="panel-tabs" data-cy="SexFilter">
      <SearchLink
        className={classNames({
          'is-active': selectedSex === null,
        })}
        params={{ sex: null }}
      >
        All
      </SearchLink>
      <SearchLink
        className={classNames({
          'is-active': selectedSex === SexFilterValue.Male,
        })}
        params={{ sex: SexFilterValue.Male }}
      >
        Male
      </SearchLink>
      <SearchLink
        className={classNames({
          'is-active': selectedSex === SexFilterValue.Female,
        })}
        params={{ sex: SexFilterValue.Female }}
      >
        Female
      </SearchLink>
    </p>
  );
};
