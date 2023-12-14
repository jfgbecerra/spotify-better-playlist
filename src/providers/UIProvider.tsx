'use client';

import { NextUIProvider } from '@nextui-org/react';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function UIProvider({ children }: Props) {
  return <NextUIProvider className='h-full'>{children}</NextUIProvider>;
}
