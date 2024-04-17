import classNames from 'classnames';

export function getNavLinkClass({ isActive }: { isActive: boolean }) {
  return classNames('navbar-item', { 'has-background-grey-lighter': isActive });
}
