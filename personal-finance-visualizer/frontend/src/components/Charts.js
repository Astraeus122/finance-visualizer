import React from "react";
import { Pie, Line } from "react-chartjs-2";
import styled from "styled-components";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

const ChartContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
    margin-top: 20px;
    background-color: #121212;
    padding: 20px;
    border-radius: 10px;
`;

const ChartWrapper = styled.div`
    width: ${(props) => props.size || "450px"};  
    height: ${(props) => props.size || "450px"};
    background: #1e1e1e;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ChartTitle = styled.h3`
    color: #ffffff;
    margin-bottom: 10px;
`;

const Charts = ({ data }) => {
    if (!data || data.total_transactions === 0) return <p style={{ color: "#ffffff" }}>No data available for visualization.</p>;

    const categoryCounts = data.categories.reduce((acc, category, index) => {
        acc[category] = (acc[category] || 0) + data.amounts[index];
        return acc;
    }, {});

    const midnightColors = ["#FF6B6B", "#FFD93D", "#6A4C93", "#1FAB89", "#4D96FF", "#FF784F", "#C06C84", "#2D4059"];

    const pieData = {
        labels: Object.keys(categoryCounts),
        datasets: [
            {
                data: Object.values(categoryCounts),
                backgroundColor: midnightColors,
                hoverOffset: 10, // Increase effect on hover
            },
        ],
    };

    const pieOptions = {
        responsive: true,
        maintainAspectRatio: false, // Prevents chart overflow
        layout: {
            padding: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        let dataset = tooltipItem.dataset;
                        let value = dataset.data[tooltipItem.dataIndex];
                        return ` $${value.toFixed(2)}`;
                    },
                },
            },
            legend: {
                labels: {
                    color: "#ffffff",
                },
            },
        },
    };

    const lineData = {
        labels: data.dates || [],
        datasets: [
            {
                label: "Total Spending Over Time",
                data: data.amounts || [],
                borderColor: "#FFD93D",
                backgroundColor: "rgba(255, 217, 61, 0.2)",
                fill: true,
            },
        ],
    };

    return (
        <ChartContainer>
            <ChartWrapper size="450px">
                <ChartTitle>Spending Breakdown</ChartTitle>
                <div style={{ width: "80%", height: "80%" }}> {/* Adjust chart size */}
                    <Pie data={pieData} options={pieOptions} />
                </div>
                <h4 style={{ color: "#FFD93D", marginTop: "10px" }}>Total Spent: ${data.total_spent.toFixed(2)}</h4>
            </ChartWrapper>

            <ChartWrapper size="500px">
                <ChartTitle>Spending Over Time</ChartTitle>
                <Line data={lineData} options={{ responsive: true, maintainAspectRatio: false }} />
            </ChartWrapper>
        </ChartContainer>
    );
};

export default Charts;
