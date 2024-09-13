import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { format, subDays, subMonths } from 'date-fns';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import './chart.css'; // Import the CSS

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const BabyAnalysisChart = ({ recordings }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [timeRange, setTimeRange] = useState('week');

  const handleTimeRangeChange = (e) => {
    setTimeRange(e.target.value);
  };

  // Generate date ranges based on the selected time range (daily, weekly, monthly, yearly)
  const generateDateRange = () => {
    const today = new Date();
    switch (timeRange) {
      case 'day':
        return [format(today, 'yyyy-MM-dd')]; // Display only today's date
      case 'week':
        // Return the last 7 days with day names (e.g., "Monday", "Tuesday")
        return Array.from({ length: 7 }, (_, i) => format(subDays(today, i), 'EEEE')).reverse(); // 'EEEE' gives full day names
      case 'month':
        // Return the last 30 days (including today)
        return Array.from({ length: 30 }, (_, i) => format(subDays(today, i), 'yyyy-MM-dd')).reverse();
      case 'year':
        // Return the 12 months of the current year
        return Array.from({ length: 12 }, (_, i) => format(subMonths(today, i), 'MMMM')).reverse(); // 'MMMM' gives month names
      default:
        return Array.from({ length: 7 }, (_, i) => format(subDays(today, i), 'yyyy-MM-dd')).reverse();
    }
  };

  // Group recordings by date and category
  const groupByDate = (category) => {
    const occurrencesByDate = {};
    const dateRange = generateDateRange();

    // Initialize occurrences for each date in the range
    dateRange.forEach((date) => {
      occurrencesByDate[date] = 0;
    });

    recordings.forEach((recording) => {
      const date = format(
        new Date(recording.timestamp),
        timeRange === 'week' ? 'EEEE' : timeRange === 'year' ? 'MMMM' : 'yyyy-MM-dd'
      );
      if (recording.analysisResults?.resultDetails === category && occurrencesByDate.hasOwnProperty(date)) {
        occurrencesByDate[date] += 1;
      }
    });

    return occurrencesByDate;
  };

  // Count occurrences for each category
  const categoryCount = {
    tired: 0,
    hungry: 0,
    discomfort: 0,
    belly_pain: 0,
    burping: 0,
    "Error: The audio is silent": 0,
  };

  recordings.forEach((recording) => {
    const category = recording.analysisResults?.resultDetails;
    if (category && categoryCount.hasOwnProperty(category)) {
      categoryCount[category]++;
    }
  });

  // Handle click on bar chart to select a category
  const handleBarClick = (element) => {
    if (element.length > 0) {
      const index = element[0].index;
      const selectedCategory = Object.keys(categoryCount)[index];
      setSelectedCategory(selectedCategory);
    }
  };

  // Options for the main chart (categories)
  const mainChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Analysis Result Categories',
        color: '#333',
        font: {
          size: 24,
          weight: 'bold',
          family: "'Inter', sans-serif",
        },
      },
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#FF6347',
        titleColor: '#fff',
        titleFont: { size: 16, family: "'Inter', sans-serif" },
        bodyColor: '#fff',
        bodyFont: { size: 14, family: "'Inter', sans-serif" },
        borderWidth: 3,
        borderColor: '#FF9A8B',
        cornerRadius: 12,
        shadowOffsetX: 4,
        shadowOffsetY: 4,
        shadowBlur: 10,
        shadowColor: 'rgba(0, 0, 0, 0.15)',
      },
    },
    scales: {
      x: { title: { display: true, text: 'Categories', color: '#333' }, grid: { display: false } },
      y: { title: { display: true, text: 'Count', color: '#333' }, beginAtZero: true },
    },
    onClick: (event, element) => handleBarClick(element), // Clickable
  };

  // Shared styling for bar charts
  const sharedBarSettings = {
    backgroundColor: (ctx) => {
      const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, '#FF9A8B');
      gradient.addColorStop(0.5, '#FF6347');
      gradient.addColorStop(1, '#FF99AC');
      return gradient;
    },
    borderColor: '#FF6347',
    borderWidth: 4,
    borderRadius: 15,
    hoverBackgroundColor: '#FF6347',
    hoverBorderWidth: 6,
    hoverBorderColor: '#FF386B',
    barPercentage: 0.8,
    barThickness: 'flex',
    shadowBlur: 8,
    shadowOffsetX: 4,
    shadowOffsetY: 4,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
  };

  // Data for the main chart
  const chartData = {
    labels: Object.keys(categoryCount),
    datasets: [
      {
        label: 'Count of Analysis Results',
        data: Object.values(categoryCount),
        ...sharedBarSettings,
      },
    ],
  };

  // Options for the second chart (time-based chart)
  const getTimeBasedChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: selectedCategory ? `Occurrences of ${selectedCategory} Over Time` : 'Analysis Result Categories',
        color: '#333',
        font: {
          size: 24,
          weight: 'bold',
          family: "'Inter', sans-serif",
        },
      },
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#FF6347',
        titleColor: '#fff',
        titleFont: { size: 16, family: "'Inter', sans-serif" },
        bodyColor: '#fff',
        bodyFont: { size: 14, family: "'Inter', sans-serif" },
        borderWidth: 3,
        borderColor: '#FF9A8B',
        cornerRadius: 12,
        shadowOffsetX: 4,
        shadowOffsetY: 4,
        shadowBlur: 10,
        shadowColor: 'rgba(0, 0, 0, 0.15)',
      },
    },
    scales: {
      x: { title: { display: true, text: 'Date', color: '#333' }, grid: { display: false } },
      y: { title: { display: true, text: 'Count', color: '#333' }, beginAtZero: true },
    },
    onClick: null, // Unclickable
  };

  // Data for the time-based chart
  const getTimeBasedChartData = (category) => {
    const occurrencesByDate = groupByDate(category);
    return {
      labels: Object.keys(occurrencesByDate),
      datasets: [
        {
          label: `Occurrences of ${category} over Time`,
          data: Object.values(occurrencesByDate),
          ...sharedBarSettings,
        },
      ],
    };
  };

  // Function to download the chart
  const downloadChart = () => {
    const chartId = selectedCategory ? 'timeChartId' : 'chartId';
    const link = document.createElement('a');
    const canvas = document.getElementById(chartId);
    link.href = canvas.toDataURL();
    link.download = `${selectedCategory || 'analysis'}-chart.png`;
    link.click();
  };

  return (
    <div className="chart-container">
      <h2 className="chart-title">
        {selectedCategory ? `Occurrences of ${selectedCategory} Over Time` : 'Analysis Result Categories'}
      </h2>

      {selectedCategory && (
        <div className="time-range-selector">
          <label htmlFor="timeRange">Select Time Range: </label>
          <select id="timeRange" value={timeRange} onChange={handleTimeRangeChange}>
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
        </div>
      )}

      <div className="chart-wrapper">
        {selectedCategory ? (
          <Bar data={getTimeBasedChartData(selectedCategory)} options={getTimeBasedChartOptions} id="timeChartId" />
        ) : (
          <Bar data={chartData} options={mainChartOptions} id="chartId" />
        )}
      </div>

      <button onClick={downloadChart} className="download-btn">
        Download Chart
      </button>
    </div>
  );
};

export default BabyAnalysisChart;
