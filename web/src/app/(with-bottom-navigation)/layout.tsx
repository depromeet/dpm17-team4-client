'use client';
import type React from 'react';
import {
  NavigationProvider,
  useNavigationContext,
} from '@/contexts/NavigationContext';
import { BottomNavigation } from './home/_components/ui';
import '@ncdai/react-wheel-picker/style.css';

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { navRef } = useNavigationContext();
  return (
    <>
      {children}
      <BottomNavigation navRef={navRef} />
    </>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <NavigationProvider>
      <LayoutContent>{children}</LayoutContent>
    </NavigationProvider>
  );
}
