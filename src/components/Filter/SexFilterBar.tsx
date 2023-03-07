import cn from 'classnames';
import { SearchLink } from '../Table/SearchLink';

interface Props {
  sex: string | null,
}

export const SexFilterBar:React.FC<Props> = ({ sex }) => (
  <p className="panel-tabs" data-cy="SexFilter">
    <SearchLink
      params={{ sex: null }}
      className={cn({
        'is-active': !sex,
      })}
    >
      All
    </SearchLink>

    <SearchLink
      params={{ sex: 'm' }}
      className={cn({
        'is-active': sex === 'm',
      })}
    >
      Male
    </SearchLink>

    <SearchLink
      params={{ sex: 'f' }}
      className={cn({
        'is-active': sex === 'f',
      })}
    >
      Female
    </SearchLink>
  </p>
);
