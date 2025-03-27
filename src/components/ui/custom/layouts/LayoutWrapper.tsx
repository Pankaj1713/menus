'use client'
import React from 'react'
import StoreProvider from '@/lib/store/storeProvider';
import { AddToCard } from '../models';

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      {children}
     <div className="fixed bottom-0 right-0">
     <AddToCard />
     </div>
    </StoreProvider>
  );
};

export default LayoutWrapper