import { getAuthSession } from '@/utils/serverUtils';
import LogoutButton from './buttons/LogoutButton';
import { AuthSession } from '@/types/auth';
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarBrand,
} from '@nextui-org/navbar';
import PlaylistIcon from './PlaylistIcon';
import ThemeSwitcher from './buttons/ThemeSwitcher';
import GetStartedButton from './buttons/GetStartedButton';
import Link from 'next/link';

export default async function NavigationBar() {
  // Handle checking if the session is valid
  const session = await getAuthSession();

  const getCorrectAuthButton = (session: AuthSession | null) => {
    if (!session) {
      return <GetStartedButton />;
    } else {
      return <LogoutButton />;
    }
  };

  return (
    <Navbar className='bg-cardBackground dark:text-white'>
      <Link href='/'>
        <NavbarBrand className='gap-2'>
          <PlaylistIcon />
          <p className='font-bold text-inherit dark:text-white'>
            Better Playlist
          </p>
        </NavbarBrand>
      </Link>
      <NavbarContent justify='end'>
        <ThemeSwitcher />
        <NavbarItem>{getCorrectAuthButton(session)}</NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
