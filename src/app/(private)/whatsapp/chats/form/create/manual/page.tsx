import SendMessageView from '@/presentation/components/SendMessageView';
import { JSX } from 'react';

export default function Page(): JSX.Element {
  return (
    <main className="ml-[calc(1rem+16rem)] flex-1 p-8">
      <SendMessageView />
    </main>
  );
}
