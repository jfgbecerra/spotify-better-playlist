import Footer from '@/components/Footer';
import LoginPageInfo from '@/components/LoginPageInfo';
import NavigationBar from '@/components/NavigationBar';
import { Divider } from '@nextui-org/divider';

export default function Login() {
  return (
    <div className='flex h-full flex-col overflow-hidden'>
      <NavigationBar />
      <div className='flex h-full items-center justify-center'>
        <LoginPageInfo />
      </div>
      <Divider />
      <Footer />
    </div>
  );
}
