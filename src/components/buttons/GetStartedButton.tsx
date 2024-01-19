'use client';

import { Button } from '@nextui-org/button';
import Link from 'next/link';

export default function GetStartedButton() {
  return (
    <Link href='/login'>
      <Button>Get Started</Button>
    </Link>
  );
}
