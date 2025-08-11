import cn from 'classnames';

export default function getActiveNavLink({ isActive }: { isActive: boolean }) {
  return cn('navbar-item', { 'has-background-grey-lighter': isActive });
}
