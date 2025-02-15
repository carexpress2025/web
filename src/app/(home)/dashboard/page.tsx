import { JSX } from 'react';
import ChartView from './components/ChartView';
import StatsCards from './components/StatsCardView';
import StatsChart from './components/StatsChartView';

export default function Page(): JSX.Element {
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
