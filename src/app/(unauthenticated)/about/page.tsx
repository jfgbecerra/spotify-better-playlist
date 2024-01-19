import Footer from '@/components/Footer';
import NavigationBar from '@/components/NavigationBar';
import Grid from '@/components/hero/Grid';
import Hero from '@/components/hero/Hero';
import { Divider } from '@nextui-org/react';

export default function Privacy() {
  return (
    <div className='h-full'>
      <NavigationBar />
      <Hero />
      <Grid />
      <Divider />
      <Footer />
    </div>
  );
}
