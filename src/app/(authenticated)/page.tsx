import NavigationBar from '@/components/NavigationBar';
import Sidebar from '@/components/Sidebar';

export default function Home() {
  return (
    <div className='h-full overflow-hidden flex flex-col'>
      <NavigationBar />
      <Sidebar />
      <p>Test</p>
    </div>
  );
}
