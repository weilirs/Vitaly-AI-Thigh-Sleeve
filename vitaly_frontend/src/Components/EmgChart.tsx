import React, { useEffect } from "react";
import * as echarts from "echarts";
import {
  boxShadowSm,
  colorWhite
} from "../utils/styles";

interface EmgChartProps {
  emgData: number[];
}

const EmgChart: React.FC<EmgChartProps> = ({ emgData }) => {
  useEffect(() => {
    // EMG Chart
    const chartDom = document.getElementById("emgChart");
    if (chartDom) {
      const myChart = echarts.init(chartDom);
      const option = {
        grid: { top: 8, right: 8, bottom: 24, left: 36 },
        xAxis: {
          type: "category",
          data: Array.from({ length: 20 }, (_, i) => i),
        },
        yAxis: { type: "value" },
        series: [
          {
            data: emgData,
            type: "line",
            smooth: true,
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: "rgba(0,168,232,0.2)" },
                  { offset: 1, color: "rgba(0,168,232,0)" },
                ],
              },
            },
            lineStyle: { color: "#00A8E8" },
            symbol: "none",
          },
        ],
      };
      myChart.setOption(option);
    }
  }, [emgData]);

  return (
    <div
      style={{
        backgroundColor: colorWhite,
        borderRadius: "0.75rem",
        padding: "16px",
        boxShadow: boxShadowSm,
        marginBottom: "24px",
      }}
    >
      <h3
        style={{
          fontSize: "0.875rem",
          fontWeight: 500,
          marginBottom: "16px",
        }}
      >
        Real-time Muscle Activity
      </h3>
      <div id="emgChart" style={{ width: "100%", height: "150px" }}></div>
    </div>
  );
};

export default EmgChart; 