import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SortFilterLinks/SearchLink';
import classNames from 'classnames';
import { SearchParamSex } from '../../types/enums';

export const SexFilter: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';

  return (
    <>
      <SearchLink
        className={classNames({
          'is-active': !sex,
        })}
        params={{ sex: null }}
      >
        All
      </SearchLink>
      <SearchLink
        className={classNames({
          'is-active': sex === SearchParamSex.Male,
        })}
        params={{ sex: SearchParamSex.Male }}
      >
        Male
      </SearchLink>
      <SearchLink
        className={classNames({
          'is-active': sex === SearchParamSex.Female,
        })}
        params={{ sex: SearchParamSex.Female }}
      >
        Female
      </SearchLink>
    </>
  );
};
