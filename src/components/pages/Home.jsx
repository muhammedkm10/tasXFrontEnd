import React, { useEffect, useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { fetchAnalyticsOverview } from "../api/api_functions";

// Random color generator for charts
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#9C27B0", "#E91E63"];

export default function Home() {
  const [overview, setOverview] = useState(null);
  const [performance, setPerformance] = useState([]);
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    loadOverview();
  }, []);

  async function loadOverview() {
    const res = await fetchAnalyticsOverview();
    if (res.success) {
      setOverview(res.data);
      setPerformance(res.data.user_performance || []);
      setTrends(res.data.daily_trends || []);
    } else {
      alert(res.message);
    }
  }

  if (!overview) return <div>Loading analytics...</div>;

  return (
    <div style={{ padding: "24px" }}>
      <h1 style={{ marginBottom: "30px" }}>📊 Task Manager Analytics</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "30px",
        }}
      >
        {/* -------------------- STATUS PIE CHART ---------------------- */}
        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            height: "300px",
          }}
        >
          <h3>Status Overview</h3>

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={overview.status_counts}
                dataKey="total"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {overview.status_counts.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* -------------------- PRIORITY BAR CHART ---------------------- */}
        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            height: "300px",
          }}
        >
          <h3>Priority Distribution</h3>

          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={overview.priority_counts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="priority" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* -------------------- USER PERFORMANCE ---------------------- */}
        

        {/* -------------------- TASK CREATION TRENDS ---------------------- */}
        
      </div>
    </div>
  );
}
