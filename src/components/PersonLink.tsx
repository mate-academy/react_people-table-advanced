import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  parent: Person;
  handleOnClick: (personSlug: string) => void;
};

export const PersonLink: React.FC<Props> = ({ parent, handleOnClick }) => {
  return (
    <a
      className={classNames({ 'has-text-danger': parent.sex === 'f' })}
      href={`#/people/${parent.slug}`}
      onClick={e => {
        e.preventDefault();
        handleOnClick(parent.slug);
      }}
    >
      {parent.name || '-'}
    </a>
  );
};
