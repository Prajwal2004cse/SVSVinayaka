import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function LeadChart({ data }) {

  const chartData = data.map(item => ({
    date: new Date(item.created_at).toLocaleDateString(),
    leads: 1,
  }));

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow mb-8">

      <h3 className="text-lg font-semibold mb-4">
        Leads Trend
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="date" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="leads"
            stroke="#2563eb"
            strokeWidth={3}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}

export default LeadChart;
