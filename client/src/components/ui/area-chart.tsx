// @bklit/area-chart — shadcn registry component (added manually; recharts is a project dependency).
// A minimal, themeable area chart with gradient fill and glass-friendly tooltip.
import { useId } from "react";
import {
  Area,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface AreaChartProps {
  data: Array<Record<string, string | number>>;
  dataKey: string;
  xKey?: string;
  color?: string;
  height?: number;
  showGrid?: boolean;
  showAxis?: boolean;
}

export function AreaChart({
  data,
  dataKey,
  xKey,
  color = "#3EA6FF",
  height = 260,
  showGrid = true,
  showAxis = true,
}: AreaChartProps) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const gradientId = `area-gradient-${id}`;

  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart data={data} margin={{ top: 12, right: 12, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.45} />
              <stop offset="100%" stopColor={color} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          {showGrid && <CartesianGrid stroke="rgba(238,244,255,0.08)" vertical={false} />}
          {showAxis && (
            <>
              <XAxis
                dataKey={xKey}
                tick={{ fill: "rgba(238,244,255,0.45)", fontSize: 11, fontFamily: "Space Grotesk" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                width={38}
                tick={{ fill: "rgba(238,244,255,0.45)", fontSize: 11, fontFamily: "Space Grotesk" }}
                axisLine={false}
                tickLine={false}
              />
            </>
          )}
          <Tooltip
            cursor={{ stroke: "rgba(238,244,255,0.2)", strokeDasharray: "4 4" }}
            contentStyle={{
              background: "rgba(10,16,34,0.85)",
              backdropFilter: "blur(16px) saturate(160%)",
              WebkitBackdropFilter: "blur(16px) saturate(160%)",
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: 12,
              color: "#EEF4FF",
              fontSize: 12,
            }}
            labelStyle={{ color: "rgba(238,244,255,0.6)" }}
          />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2}
            fill={`url(#${gradientId})`}
            dot={false}
            activeDot={{ r: 4, fill: color, stroke: "rgba(4,6,15,0.9)", strokeWidth: 2 }}
          />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
}
