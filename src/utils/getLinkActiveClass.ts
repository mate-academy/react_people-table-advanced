import cn from 'classnames';

export const getLinkActiveClass = ({ isActive }: { isActive: boolean }) => cn("navbar-item", { "has-background-grey-lighter": isActive });

