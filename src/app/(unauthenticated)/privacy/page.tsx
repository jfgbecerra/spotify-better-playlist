import Footer from '@/components/Footer';
import NavigationBar from '@/components/NavigationBar';
import PrivacyContent from '@/components/PrivacyContent';
import { Divider } from '@nextui-org/react';

export default function Privacy() {
  return (
    <div>
      <NavigationBar />
      <PrivacyContent />
      <Divider />
      <Footer />
    </div>
  );
}
