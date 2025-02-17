import AiGenericResponseView from '@/presentation/components/AiGenericResponseView';
import { JSX } from 'react';

export default function Page(): JSX.Element {
  return (
    <main className="ml-[calc(1rem+16rem)] flex-1 p-8">
      <AiGenericResponseView />
    </main>
  );
}
