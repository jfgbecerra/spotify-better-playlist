import { getAuthSession } from '@/utils/serverUtils';
import Image from 'next/image';
import logoImage from '@/assets/playlist.png';
import { LoginButton, LogoutButton } from './Buttons';
import { AuthSession } from '@/types/types';
import { Navbar } from '@nextui-org/navbar';

export default async function NavigationBar() {
  // Handle checking if the session is valid
  const session = await getAuthSession();

  const getCorrectButton = (session: AuthSession | null) => {
    if (!session) {
      return <LoginButton />;
    } else {
      return <LogoutButton />;
    }
  };

  return <Navbar>{getCorrectButton(session)}</Navbar>;
}
