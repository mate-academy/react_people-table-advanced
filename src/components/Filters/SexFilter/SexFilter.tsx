import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../../SearchLink/SearchLink';
import { Sex } from '../../../types/sex-enum';

export const SexFilter = () => {
  const [searchParams] = useSearchParams();

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      <SearchLink
        className={cn({
          'is-active': !searchParams.get('sex'),
        })}
        params={{ sex: null }}
      >
        All
      </SearchLink>

      <SearchLink
        className={cn({
          'is-active': searchParams.get('sex') === Sex.MALE,
        })}
        params={{ sex: Sex.MALE }}
      >
        Male
      </SearchLink>

      <SearchLink
        className={cn({
          'is-active': searchParams.get('sex') === Sex.FEMALE,
        })}
        params={{ sex: Sex.FEMALE }}
      >
        Female
      </SearchLink>
    </p>
  );
};
