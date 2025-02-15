'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

const statsData = [
  { name: 'Enviadas', ia: 1200, semIa: 2300 },
  { name: 'Respondidas', ia: 900, semIa: 1900 },
];

export default function StatsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Comparação de Mensagens (IA vs. Sem IA)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={statsData}>
            <XAxis dataKey="name" stroke="#8884d8" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="ia" fill="#4F46E5" name="IA" />
            <Bar dataKey="semIa" fill="#8884d8" name="Sem IA" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
