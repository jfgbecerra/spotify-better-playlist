'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { AuthSession } from '@/types/auth';
import { getServerSession } from 'next-auth/next';

export const customGet = async (url: string, session: AuthSession | null) => {
  if (!session) {
    return null;
  }
  const options: RequestInit = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
      'Content-Type': 'application/json',
    },
  };
  const res = await fetch(url, options).then((res) => res.json());

  return res;
};

export const customDelete = async (
  url: string,
  session: AuthSession | null,
  data: any = null
) => {
  if (!session) {
    return null;
  }
  const options: RequestInit = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
      'Content-Type': 'application/json',
    },
  };
  if (data) {
    options.body = JSON.stringify(data);
  }
  const res = await fetch(url, options).then((res) => res.json());

  return res;
};

export const customPost = async (
  url: string,
  session: AuthSession | null,
  data: any = null
) => {
  if (!session) {
    return null;
  }
  const options: RequestInit = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
      'Content-Type': 'application/json',
    },
  };
  if (data) {
    options.body = JSON.stringify(data);
  }
  const res = await fetch(url, options).then((res) => res.json());

  return res;
};

export const getAuthSession = async () => {
  const session = (await getServerSession(authOptions)) as AuthSession;
  if (!session) {
    return null;
  }

  const currentTimestamp = Math.floor(Date.now());
  if (currentTimestamp >= session.user.expires_at * 1000) {
    return null;
  }

  return session;
};
