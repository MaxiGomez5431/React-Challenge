import { useEffect, useState } from 'react'
import Chart from "react-apexcharts";
import Papa from 'papaparse';

function Heatmap () {
  const [series, setSeries] = useState([])
  const [options, setOptions] = useState({
    options: {
      plotOptions: {
        heatmap: {
          distributed: false,
          colorScale: {
            ranges: [
              {
                from: 0,
                to: 20,
                color: '#00A100',
                name: 'very low',
              },
              {
                from: 21,
                to: 50,
                color: '#00BFAE',
                name: 'low',
              },
              {
                from: 51,
                to: 200,
                color: '#128FD9',
                name: 'medium',
              },
              {
                from: 201,
                to: 500,
                color: '#FFB200',
                name: 'high',
              },
              {
                from: 501,
                to: 50000,
                color: '#FF0000',
                name: 'very high',
              }
            ]
          },
          dataLabels: {
            enabled: false,
            style: {
              colors: ['#000000']
            }
          }
        }
      }
    },
    series: series 
  })
  
  useEffect(() => {
    componentDidMount()
  }, [])

  function componentDidMount() {
    if (series.length === 0) {
      const csvUrl = 'https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/multivariate.csv';

      Papa.parse(csvUrl, {
        download: true,
        header: true,
        delimiter: ";",
        complete: updateData,
      });
    }
  }

  function updateData (result) {
    const data = result.data;

    const countries = [...new Set(data.map(row => row['Country']))];

    const metrics = ['Pop', 'Birth rate', 'Mortality rate', 'Life expectancy', 'Infant mortality', 'Children per woman', 'Growth rate', 'Population aged 65+'];


    const newSeries = countries.map(country => {
      const countryData = data.find(row => row['Country'] === country);
      return {
        name: country,
        data: metrics.map(metric => ({
          x: metric,
          y: parseFloat(countryData[metric])
        }))
      };
    });

    setSeries(newSeries);
  }

  return (
    <Chart
      options={options}
      series={series}
      type="heatmap"
      width="1000"
      height="3000"
    />
  );

}

export default Heatmap;