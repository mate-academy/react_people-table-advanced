import { FC } from 'react';

interface Props {
  text: string;
}

export const Title: FC<Props> = ({ text }) => (
  <h1 className="title" style={{ paddingTop: '1rem' }}>
    {text}
  </h1>
);
