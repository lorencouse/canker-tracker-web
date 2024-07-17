'use client';

import * as React from 'react';
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { ChartConfig } from '@/components/ui/chart';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const chartData = [
  { date: '2024-04-01', sore1: 12, sore2: 5 },
  { date: '2024-04-02', sore1: 1, sore2: 8 },
  { date: '2024-04-03', sore1: 17, sore2: 2 },
  { date: '2024-04-04', sore1: 12, sore2: 6 },
  { date: '2024-04-05', sore1: 13, sore2: 9 },
  { date: '2024-04-06', sore1: 11, sore2: 4 },
  { date: '2024-04-07', sore1: 15, sore2: 8 },
  { date: '2024-04-08', sore1: 19, sore2: 2 },
  { date: '2024-04-09', sore1: 1, sore2: 1 },
  { date: '2024-04-10', sore1: 11, sore2: 9 },
  { date: '2024-04-11', sore1: 17, sore2: 5 },
  { date: '2024-04-12', sore1: 12, sore2: 1 },
  { date: '2024-04-13', sore1: 12, sore2: 8 },
  { date: '2024-04-14', sore1: 17, sore2: 2 },
  { date: '2024-04-15', sore1: 10, sore2: 7 },
  { date: '2024-04-16', sore1: 18, sore2: 9 },
  { date: '2024-04-17', sore1: 16, sore2: 6 },
  { date: '2024-04-18', sore1: 14, sore2: 1 },
  { date: '2024-04-19', sore1: 13, sore2: 8 },
  { date: '2024-04-20', sore1: 1, sore2: 5 },
  { date: '2024-04-21', sore1: 17, sore2: 1 },
  { date: '2024-04-22', sore1: 14, sore2: 7 },
  { date: '2024-04-23', sore1: 18, sore2: 3 },
  { date: '2024-04-24', sore1: 17, sore2: 9 },
  { date: '2024-04-25', sore1: 15, sore2: 5 },
  { date: '2024-04-26', sore1: 1, sore2: 3 },
  { date: '2024-04-27', sore1: 13, sore2: 2 },
  { date: '2024-04-28', sore1: 12, sore2: 8 },
  { date: '2024-04-29', sore1: 15, sore2: 4 },
  { date: '2024-04-30', sore1: 14, sore2: 8 },
  { date: '2024-05-01', sore1: 15, sore2: 2 },
  { date: '2024-05-02', sore1: 13, sore2: 1 },
  { date: '2024-05-03', sore1: 17, sore2: 9 },
  { date: '2024-05-04', sore1: 15, sore2: 2 },
  { date: '2024-05-05', sore1: 11, sore2: 9 },
  { date: '2024-05-06', sore1: 18, sore2: 2 },
  { date: '2024-05-07', sore1: 18, sore2: 1 },
  { date: '2024-05-08', sore1: 19, sore2: 1 },
  { date: '2024-05-09', sore1: 17, sore2: 8 },
  { date: '2024-05-10', sore1: 13, sore2: 3 },
  { date: '2024-05-11', sore1: 15, sore2: 7 },
  { date: '2024-05-12', sore1: 17, sore2: 4 },
  { date: '2024-05-13', sore1: 17, sore2: 6 },
  { date: '2024-05-14', sore1: 18, sore2: 9 },
  { date: '2024-05-15', sore1: 13, sore2: 8 },
  { date: '2024-05-16', sore1: 18, sore2: 1 },
  { date: '2024-05-17', sore1: 19, sore2: 2 },
  { date: '2024-05-18', sore1: 15, sore2: 5 },
  { date: '2024-05-19', sore1: 15, sore2: 8 },
  { date: '2024-05-20', sore1: 17, sore2: 3 },
  { date: '2024-05-21', sore1: 1, sore2: 4 },
  { date: '2024-05-22', sore1: 1, sore2: 2 },
  { date: '2024-05-23', sore1: 12, sore2: 9 },
  { date: '2024-05-24', sore1: 14, sore2: 2 },
  { date: '2024-05-25', sore1: 11, sore2: 5 },
  { date: '2024-05-26', sore1: 13, sore2: 7 },
  { date: '2024-05-27', sore1: 10, sore2: 6 },
  { date: '2024-05-28', sore1: 13, sore2: 9 },
  { date: '2024-05-29', sore1: 1, sore2: 3 },
  { date: '2024-05-30', sore1: 10, sore2: 8 },
  { date: '2024-05-31', sore1: 18, sore2: 3 },
  { date: '2024-06-01', sore1: 18, sore2: 1 },
  { date: '2024-06-02', sore1: 10, sore2: 1 },
  { date: '2024-06-03', sore1: 13, sore2: 6 },
  { date: '2024-06-04', sore1: 19, sore2: 8 },
  { date: '2024-06-05', sore1: 1, sore2: 4 },
  { date: '2024-06-06', sore1: 14, sore2: 5 },
  { date: '2024-06-07', sore1: 13, sore2: 7 },
  { date: '2024-06-08', sore1: 15, sore2: 2 },
  { date: '2024-06-09', sore1: 18, sore2: 8 },
  { date: '2024-06-10', sore1: 15, sore2: 1 },
  { date: '2024-06-11', sore1: 1, sore2: 5 },
  { date: '2024-06-12', sore1: 12, sore2: 2 },
  { date: '2024-06-13', sore1: 1, sore2: 3 },
  { date: '2024-06-14', sore1: 16, sore2: 8 },
  { date: '2024-06-15', sore1: 17, sore2: 5 },
  { date: '2024-06-16', sore1: 11, sore2: 1 },
  { date: '2024-06-17', sore1: 15, sore2: 2 },
  { date: '2024-06-18', sore1: 17, sore2: 7 },
  { date: '2024-06-19', sore1: 11, sore2: 9 },
  { date: '2024-06-20', sore1: 18, sore2: 5 },
  { date: '2024-06-21', sore1: 19, sore2: 1 },
  { date: '2024-06-22', sore1: 17, sore2: 7 },
  { date: '2024-06-23', sore1: 10, sore2: 3 },
  { date: '2024-06-24', sore1: 12, sore2: 8 },
  { date: '2024-06-25', sore1: 11, sore2: 9 },
  { date: '2024-06-26', sore1: 14, sore2: 8 },
  { date: '2024-06-27', sore1: 18, sore2: 9 },
  { date: '2024-06-28', sore1: 19, sore2: 0 },
  { date: '2024-06-29', sore1: 13, sore2: 6 },
  { date: '2024-06-30', sore1: 16, sore2: 0 },
];

const chartConfig = {
  visitors: {
    label: 'Sores',
  },
  sore1: {
    label: 'Sore 1',
    color: 'hsl(var(--chart-1))',
  },
  sore2: {
    label: 'Sore 2',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export default function ChartHistory() {
  const [timeRange, setTimeRange] = React.useState('90d');

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const now = new Date();
    let daysToSubtract = 90;
    if (timeRange === '30d') {
      daysToSubtract = 30;
    } else if (timeRange === '7d') {
      daysToSubtract = 7;
    }
    now.setDate(now.getDate() - daysToSubtract);
    return date >= now;
  });

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>History</CardTitle>
        </div>
        <CardDescription>Showing sores for</CardDescription>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={chartConfig.sore1.color}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={chartConfig.sore1.color}
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={chartConfig.sore2.color}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={chartConfig.sore2.color}
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                });
              }}
            />
            <YAxis domain={[1, 10]} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Line
              dataKey="sore1"
              type="natural"
              stroke={chartConfig.sore1.color}
              strokeWidth={1}
              dot={{
                fill: 'var(--color-desktop)',
                r: 2,
              }}
              activeDot={{
                r: 10,
              }}
            />
            <Line
              dataKey="sore2"
              type="natural"
              stroke={chartConfig.sore2.color}
              strokeWidth={1}
              dot={{
                fill: 'var(--color-mobile)',
                r: 2,
              }}
              activeDot={{
                r: 10,
              }}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
