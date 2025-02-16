'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { month: 'Jan', messages: 120 },
  { month: 'Feb', messages: 150 },
  { month: 'Mar', messages: 180 },
  { month: 'Apr', messages: 220 },
  { month: 'May', messages: 300 },
  { month: 'Jun', messages: 250 },
  { month: 'Jul', messages: 400 },
  { month: 'Aug', messages: 380 },
  { month: 'Sep', messages: 310 },
  { month: 'Oct', messages: 270 },
  { month: 'Nov', messages: 290 },
  { month: 'Dec', messages: 350 },
];

export default function ChartView() {
  return (
    <div className="p-6 grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Mensagens Enviadas no Ano</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <XAxis dataKey="month" stroke="#8884d8" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="messages"
                stroke="#4F46E5"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
