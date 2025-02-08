type Props = {
  children?: React.ReactNode;
  fallback?: string | null;
};

export const Fallback: React.FC<Props> = ({ children, fallback }) => {
  return children ? children : (fallback ?? '-');
};
