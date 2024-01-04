import { ReactNode, FC } from 'react';

type Props = {
  children: ReactNode,
};

export const Section: FC<Props> = ({ children }) => (
  <main className="section">
    <div className="container">
      {children}
    </div>
  </main>
);
