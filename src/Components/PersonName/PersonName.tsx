import { Link, useLocation } from 'react-router-dom';

type Props = {
  name: string,
  slug: string,
  sex: string,
};

export const PersonName: React.FC<Props> = ({
  name,
  slug,
  sex,
}) => {
  const { search } = useLocation();

  return (
    <Link to={{
      pathname: `/people/${slug}`,
      search,
    }}
    >
      <span
        style={{ color: sex === 'm' ? '#2785db' : '#d83939' }}
      >
        {name}
      </span>
    </Link>
  );
};
