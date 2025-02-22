import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';
import { useOptionForLink } from '../services/people';
import { memo } from 'react';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = memo(function PersonLinkComponent({
  person: { sex, slug, name },
}) {
  return (
    <Link
      className={cn({ 'has-text-danger': sex === 'f' })}
      to={useOptionForLink(`/people/${slug}`)}
    >
      {name}
    </Link>
  );
});
