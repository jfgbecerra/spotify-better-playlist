import { getAuthSession } from '@/utils/serverUtils';
import Image from 'next/image';
import logoImage from '@/assets/playlist.png';
import LoginButton from './buttons/LoginButton';
import LogoutButton from './buttons/LogoutButton';
import { AuthSession } from '@/types/types';
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarBrand,
} from '@nextui-org/navbar';
import PlaylistIcon from './PlaylistIcon';

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

  return (
    <Navbar isBordered={true}>
      <NavbarBrand className='gap-2'>
        <PlaylistIcon />
        <p className='font-bold text-inherit'>Better Playlist</p>
      </NavbarBrand>
      <NavbarContent justify='end'>
        <NavbarItem>{getCorrectButton(session)}</NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
