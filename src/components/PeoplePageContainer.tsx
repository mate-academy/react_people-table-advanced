import React, { ReactNode } from 'react';

interface Props {
  children?: ReactNode
}

export const PeoplePageContainer: React.FC<Props> = ({ children }) => (
  <>
    <h1 className="title">People Page</h1>
    {children}
  </>
);
