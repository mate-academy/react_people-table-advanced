import { useSearchParams } from 'react-router-dom';
import { Sex } from '../types/Sex';
import { getSexOptionsText } from '../utils/helper';
import { SearchLink } from './SearchLink';

const sexOptions = Object.values(Sex);

export const SexFilter: React.FC = () => {
  const [searchParams] = useSearchParams();

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      {sexOptions.map(sex => {
        const sexSearchParam = searchParams.get('sex');
        const isActive = sex === (sexSearchParam || '');

        return (
          <SearchLink
            key={sex}
            className={isActive ? 'is-active' : ''}
            params={{ sex: sex || null }}
          >
            {getSexOptionsText(sex)}
          </SearchLink>
        );
      })}
    </p>
  );
};
