const enum AppRoutes {
  HOME = 'Home',
  PEOPLE = 'People',
}

export type RouterPathType = Record<AppRoutes, string>;

export const RouterPath: RouterPathType = {
  [AppRoutes.HOME]: '/',
  [AppRoutes.PEOPLE]: '/people',
};
