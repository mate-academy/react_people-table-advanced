import { PersonSex } from '../../../constants/PersonSex';
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
          'is-active': selectedSex === PersonSex.Male,
        })}
        params={{ sex: PersonSex.Male }}
      >
        Male
      </SearchLink>
      <SearchLink
        className={classNames({
          'is-active': selectedSex === PersonSex.Female,
        })}
        params={{ sex: PersonSex.Female }}
      >
        Female
      </SearchLink>
    </p>
  );
};
