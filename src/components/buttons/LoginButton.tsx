'use client';

import { Button } from '@nextui-org/button';
import { signIn } from 'next-auth/react';

export default function LoginButton() {
  const handleLogin = () => {
    signIn('spotify', { callbackUrl: 'http://localhost:3000' });
  };

  return <Button onClick={handleLogin}>Login</Button>;
}
