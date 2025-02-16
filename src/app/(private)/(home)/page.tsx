import { JSX } from 'react';
import ChartView from '@/presentation/components/ChartView';
import StatsCards from '@/presentation/components/StatsCardView';
import StatsChart from '@/presentation/components/StatsChartView';

export default function Home(): JSX.Element {
  return (
    <div className="flex-1 flex flex-col">
      <main className="flex-1 p-8 ml-64">
        <div className="min-h-screen bg-white">
          <ChartView />
          <StatsCards />
          <StatsChart />
        </div>
      </main>
    </div>
  );
}
