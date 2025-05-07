import cn from 'classnames';

export default function getActiveLink({ isActive }: { isActive: boolean }) {
  return cn('navbar-item', { 'has-background-grey-lighter': isActive });
}
