import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SexOption } from '../../types/types';
import { SearchLink } from '../SearchLink';

type Props = {
  title: string;
  sexOption: SexOption;
};

export const SexFilterOption: React.FC<Props> = ({ title, sexOption }) => {
  const [searchParams] = useSearchParams();
  const sex = (searchParams.get('sex') as SexOption | null) || SexOption.All;

  return (
    <SearchLink
      className={classNames({ 'is-active': sex === sexOption })}
      params={{ sex: sexOption === SexOption.All ? null : sexOption }}
    >
      {title}
    </SearchLink>
  );
};
