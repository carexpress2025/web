'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function StatsCards() {
  const stats = [
    { title: 'Total Mensagens Enviadas', value: 3500 },
    { title: 'Total Mensagens Recebidas', value: 4200 },
    { title: 'Total Mensagens Respondidas', value: 2800 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{stat.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stat.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
