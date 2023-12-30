import { getAuthSession } from '@/utils/serverUtils';
import LoginButton from './buttons/LoginButton';
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

export default async function NavigationBar() {
  // Handle checking if the session is valid
  const session = await getAuthSession();

  const getCorrectAuthButton = (session: AuthSession | null) => {
    if (!session) {
      return <LoginButton />;
    } else {
      return <LogoutButton />;
    }
  };

  return (
    <Navbar className='bg-cardBackground dark:text-white'>
      <NavbarBrand className='gap-2'>
        <PlaylistIcon />
        <p className='font-bold text-inherit dark:text-white'>
          Better Playlist
        </p>
      </NavbarBrand>
      <NavbarContent justify='end'>
        <ThemeSwitcher />
        <NavbarItem>{getCorrectAuthButton(session)}</NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
