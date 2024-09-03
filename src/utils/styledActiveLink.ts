export const styledActive = ({ isActive }: { isActive: boolean }) => {
  return ['navbar-item', isActive ? 'has-background-grey-lighter' : ''].join(
    ' ',
  );
};
