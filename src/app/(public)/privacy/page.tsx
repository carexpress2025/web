import { JSX } from 'react';
import LegalSectionsView from '@/presentation/components/LegalSectionsView';

export default function Page(): JSX.Element {
  return (
    <main className="ml-64 flex-1 bg-gray-100 p-8">
      <LegalSectionsView mainKey="privacy" />
    </main>
  );
}
