import { SearchLink } from '../../SearchLink';
import { peopleFilterParams } from '../../../common/constants';

export const ResetAll = () => {
  const resetParam = Object.fromEntries(
    peopleFilterParams.map(key => [key, null]),
  );

  return (
    <div className="panel-block">
      <SearchLink
        className="button is-link is-outlined is-fullwidth"
        params={resetParam}
      >
        Reset all filters
      </SearchLink>
    </div>
  );
};
