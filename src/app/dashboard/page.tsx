import { SectionHomeView } from './components/sections';

export default function Page() {
  return (
    <div className="flex-1 flex flex-col">
      <main className="flex-1 p-8 ml-64">
        <div className="min-h-screen bg-white">
          <SectionHomeView />
        </div>
      </main>
    </div>
  );
}
