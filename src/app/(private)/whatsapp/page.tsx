import { JSX } from 'react';
import WhatsappView from '@/presentation/components/WhatsappView';

export default function Page(): JSX.Element {
  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-6">
      <WhatsappView />
    </div>
  );
}
