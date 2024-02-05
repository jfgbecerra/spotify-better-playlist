import Footer from '@/components/Footer';
import LoginPageInfo from '@/components/LoginPageInfo';
import NavigationBar from '@/components/NavigationBar';
import { Divider } from '@nextui-org/divider';

export default function Login() {
  return (
    <div className='flex h-full w-full flex-col items-center gap-5'>
      <div className='w-full self-start'>
        <NavigationBar />
      </div>
      <div className='flex h-full w-full items-center justify-center'>
        <LoginPageInfo />
      </div>
      <div className='w-full self-end'>
        <Divider />
        <Footer />
      </div>
    </div>
  );
}
