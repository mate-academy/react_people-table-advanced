import { Link, LinkProps, useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';
import classNames from 'classnames';

type Props = Omit<LinkProps, 'to'> & {
  params: SearchParams;
  personLink: string;
  femalePerson?: boolean;
};

export const SearchLink: React.FC<Props> = ({
  children,
  params,
  ...props // all usual Link props like `className`, `style` and `id`
}) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{
        pathname: props.personLink,
        search: getSearchWith(searchParams, params),
      }}
      className={classNames({
        'has-text-danger': props.femalePerson,
      })}
    >
      {children}
    </Link>
  );
};
