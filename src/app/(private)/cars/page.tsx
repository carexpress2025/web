import CarsListView from '@/presentation/components/CarsListView';
import { JSX } from 'react';

export default function Page(): JSX.Element {
  return (
    <div className="flex-1 flex flex-col">
      <main className="flex-1 p-8 ml-64">
        <div className="min-h-screen bg-white">
          <CarsListView />
        </div>
      </main>
    </div>
  );
}
