import cn from 'classnames';

type ClassChangeProps = {
  isActive: boolean;
};

export const classChange = ({ isActive }: ClassChangeProps) => cn(
  'navbar-item', {
    'has-background-grey-lighter': isActive,
  },
);
