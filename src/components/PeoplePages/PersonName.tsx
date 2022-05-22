import ScrollIntoView from 'react-scroll-into-view';
import { Link, useLocation } from 'react-router-dom';

type Props = {
  person: People,
};

export const PersonName: React.FC<Props> = ({ person }) => {
  const { search } = useLocation();

  return (
    <ScrollIntoView
      selector={`#${person.slug}`}
      smooth
      scrollOptions={{
        block: 'center',
      }}
    >
      <Link
        to={{
          pathname: `/people/${person.slug}`,
          search,
        }}
        className={person.sex === 'm' ? 'has-text-link' : 'has-text-danger'}
      >
        {person.name}
      </Link>
    </ScrollIntoView>
  );
};
