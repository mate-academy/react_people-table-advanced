import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../../utils/SearchLink';

type Props = {
  title: string;
  sexType: boolean;
  sexIs: string | null;
};

const SexType: React.FC<Props> = ({ title, sexType, sexIs }) => {
  return (
    <SearchLink
      className={classNames({ 'is-active': sexType })}
      params={{ sex: sexIs }}
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
      <SexType title="All" sexType={!sex} sexIs={null} />
      <SexType title="Male" sexType={sex === 'm'} sexIs="m" />
      <SexType title="Female" sexType={sex === 'f'} sexIs="f" />
    </p>
  );
};
