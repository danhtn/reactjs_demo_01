import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend
} from 'recharts';

// const data = [
//   { name: 'VIP Customers', value: 400 },
//   { name: 'Loyal Customers', value: 300 },
//   { name: 'Normal Customers', value: 300 },
//   { name: 'New Customers', value: 200 },
// ];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class Example extends PureComponent {
  render() {
    const { chartData } = this.props;
    console.log('KGIT-TED: Example -> render -> chartData', chartData);
    return (
      <PieChart width={200} height={200}>
        <Pie
          data={chartData}
          cx={100}
          cy={100}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {
            chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
        <Tooltip wrapperStyle={{ width: 200, backgroundColor: '#ccc' }} />
        <Legend width={200} wrapperStyle={{ top: 20, left: 240, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
      </PieChart>

    );
  }
}
