import classNames from 'classnames';

type Props = {
  isWoman: boolean;
  slug: string;
  name: string;
};

export const PersonLink: React.FC<Props> = ({ slug, isWoman, name }) => {
  if (slug) {
    return (
      <a
        href={`#/people/${slug}`}
        className={classNames({ 'has-text-danger': isWoman })}
      >
        {name}
      </a>
    );
  } else {
    return `${name}`;
  }
};
