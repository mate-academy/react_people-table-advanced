import React from 'react';
import { Navigate } from 'react-router-dom';

export const Redirect: React.FC = () => <Navigate to="/" replace />;
