import { JSX } from 'react';
import SectionsView from '../components/SectionsView';

export default function Page(): JSX.Element {
  return (
    <main className="ml-64 flex-1 bg-gray-100 p-8">
      <SectionsView mainKey="privacy" />
    </main>
  );
}
