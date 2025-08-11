import React from 'react';
import { TitleType } from '../types/TitleType';

type Props = {
  text: TitleType;
};

export const Title: React.FC<Props> = ({ text }) => (
  <h1 className="title">{text}</h1>
);
