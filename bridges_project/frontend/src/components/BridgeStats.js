import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { Chart, ArcElement, Tooltip, Legend, Title } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend, Title);

const BridgeStats = () => {
  const [chartData, setChartData] = useState({});
  const [haveData, setHaveData] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:8000/api/bridges/')
      .then(response => {
        const statuses = response.data.reduce((acc, bridge) => {
          acc[bridge.status] = (acc[bridge.status] || 0) + 1;
          return acc;
        }, {});

        const totalCount = Object.values(statuses).reduce((sum, count) => sum + count, 0);
        setTotal(totalCount);

        // labels sorting and colors

        const statusColors = {
          'Good': '#679966',
          'Fair': '#D1C246',
          'Poor': '#E68912',
          'Bad': '#993B3B'  
        };
        const sortedLabels = ['Good', 'Fair', 'Poor', 'Bad'];
        const data = sortedLabels.map(label => ({
          label: label,
          data: [statuses[label] || 0],
          backgroundColor: statusColors[label],
          hoverOffset: 20,
        }));

        setChartData({
          labels: sortedLabels,
          datasets: [{
            data: sortedLabels.map(label => statuses[label] || 0),
            backgroundColor: data.map(item => item.backgroundColor),
            hoverOffset: 20,
          }]
        });

        setHaveData(true);
      })
      .catch(error => {
        console.error('There was an error fetching the bridge statuses!', error);
      });
  }, []);

  const options = {
    responsive: true,
    aspectRatio: 2,
    plugins: {
      title: {
        display: true,
        text: 'Bridge Status Distribution',
        position: 'top',
        align: 'start',
        color: 'rgba(255, 255, 255, 1)',
        font: {
          size: 18
        }
      },
      legend: {
        position: 'left',
        labels: {
          usePointStyle: true,
          padding: 20,

          // custom labels to display %

          generateLabels: function(chart) {
            const { data } = chart;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label, i) => {
                const meta = chart.getDatasetMeta(0);
                const style = meta.controller.getStyle(i);
                const percentage = ((data.datasets[0].data[i] / total) * 100).toFixed(1);
                return {
                  text: `${label} (${percentage}%)`,
                  fillStyle: style.backgroundColor,
                  fontColor: 'white',
                  strokeStyle: style.borderColor,
                  lineWidth: style.borderWidth,
                  hidden: isNaN(data.datasets[0].data[i]) || meta.data[i].hidden,
                  index: i
                };
              });
            }
            return [];
          }
        }
      }
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
    layout: {
      padding: {
        left: 30,
        right: 0,
        top: 10,
        bottom: 20,
      }
    },
  };

  if (!haveData) {
    return <div>Loading...</div>;
  } else {
    return (
      <div style={{ margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', minWidth: '500px' }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '600px', justifyContent: 'center', backgroundColor: 'rgba(1, 1, 1, 0.8)', padding: '20px', borderRadius: '10px' }}>
          <Pie data={chartData} options={options} />
        </div>
      </div>
    );
  }
};

export default BridgeStats;
