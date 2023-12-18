import NavigationBar from '@/components/NavigationBar';
import ContentPane from '@/components/content-pane/ContentPane';
import Sidebar from '@/components/sidebar/Sidebar';

export default function Home() {
  return (
    <div className='flex h-full flex-col overflow-hidden'>
      <NavigationBar />
      <div className='flex h-full flex-row gap-x-2 overflow-hidden px-2 pt-2'>
        <Sidebar />
        <ContentPane />
      </div>
      <p className='h-28'>Testing</p>
    </div>
  );
}
