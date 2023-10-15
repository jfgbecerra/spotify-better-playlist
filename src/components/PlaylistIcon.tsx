import Image from 'next/image';
import iconImg from '@/assets/icons8-playlist-64.png';

export default function PlaylistIcon() {
  return (
    <Image src={iconImg} width={45} height={45} alt='Playlist Editor picture' />
  );
}
