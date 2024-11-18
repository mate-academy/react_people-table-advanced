import { FC } from 'react';

interface Props {
  text: string;
}

export const Title: FC<Props> = ({ text }) => <h1 className="title">{text}</h1>;
