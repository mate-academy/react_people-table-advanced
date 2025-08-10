import React from 'react';

type Props = {
  title: string;
};

export const DefaultPage: React.FC<Props> = ({ title }) => (
  <h1 className="title">{title}</h1>
);
