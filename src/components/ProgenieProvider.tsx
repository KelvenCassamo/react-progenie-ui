import React, { ReactNode } from 'react';
import DialogProvider from './DialogProvider';

interface ProgenieProviderProps {
  children?: ReactNode;
}

const ProgenieProvider: React.FC<ProgenieProviderProps> = ({ children }) => {
  return (
    <>
      <DialogProvider />
      {children}
    </>
  );
};

export default ProgenieProvider;