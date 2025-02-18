import CardScanQrcode from '@/presentation/components/CardScanQrcode';
import HeaderView from '@/presentation/components/HeaderView';
import { JSX } from 'react';

export default function Page(): JSX.Element {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center">
      <HeaderView itemKey={'pages.whatsapp.qrcode.title'} />
      <CardScanQrcode />
    </div>
  );
}
