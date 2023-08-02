import React from 'react';

type Props = {
  title: string;
  children?: React.ReactNode;
};
export const Layout: React.FC<Props> = ({
  title,
  children,
}) => {
  return (
    <div className="container">
      <h1 className="title">{title }</h1>
      {children}
    </div>
  );
};
