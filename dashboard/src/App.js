import './App.css';
import { useEffect, useState, useRef } from 'react';
import { Chart } from 'chart.js/auto';

function App() {
  const [data, setData] = useState(null);
  const salesChartRef = useRef(null);
  const productsChartRef = useRef(null);
  const orderStatusChartRef = useRef(null);
  const inventoryChartRef = useRef(null);
  const revenueChartRef = useRef(null);
  const chartInstances = useRef({});

  useEffect(() => {
    // Simulate API response with mock data
    const mockData = {
      total_sales: 1200,
      total_revenue: 45000,
      monthly_sales: [
        { month: 'January', sales: 100 },
        { month: 'February', sales: 150 },
        { month: 'March', sales: 200 },
        { month: 'April', sales: 250 },
        { month: 'May', sales: 300 },
        { month: 'June', sales: 400 },
        { month: 'July', sales: 500 },
        { month: 'August', sales: 450 },
        { month: 'September', sales: 350 },
        { month: 'October', sales: 300 },
        { month: 'November', sales: 200 },
        { month: 'December', sales: 150 },
      ],
      top_products: [
        { name: 'Laptop', sales: 300 },
        { name: 'Smartphone', sales: 250 },
        { name: 'Headphones', sales: 200 },
        { name: 'Tablet', sales: 150 },
        { name: 'Smartwatch', sales: 100 },
      ],
      order_status: [
        { status: 'Pending', count: 50 },
        { status: 'Shipped', count: 100 },
        { status: 'Delivered', count: 200 },
        { status: 'Cancelled', count: 30 },
      ],
      inventory_levels: [
        { product: 'Laptop', stock: 80 },
        { product: 'Smartphone', stock: 120 },
        { product: 'Headphones', stock: 200 },
        { product: 'Tablet', stock: 50 },
        { product: 'Smartwatch', stock: 30 },
      ],
      revenue_by_category: [
        { quarter: 'Q1', electronics: 10000, clothing: 5000, accessories: 3000 },
        { quarter: 'Q2', electronics: 12000, clothing: 6000, accessories: 4000 },
        { quarter: 'Q3', electronics: 15000, clothing: 7000, accessories: 5000 },
        { quarter: 'Q4', electronics: 18000, clothing: 8000, accessories: 6000 },
      ],
    };

    // Simulate a delay like an API call
    setTimeout(() => {
      console.log(mockData);
      setData(mockData);
    }, 1000);
  }, []);

  useEffect(() => {
    if (!data) return;

    // Helper to create or update charts
    const createChart = (ref, config, key) => {
      if (ref.current) {
        if (chartInstances.current[key]) {
          chartInstances.current[key].destroy();
        }
        const ctx = ref.current.getContext('2d');
        chartInstances.current[key] = new Chart(ctx, config);
      }
    };

    // 1. Sales Trends (Line Chart)
    if (data.monthly_sales && salesChartRef.current) {
      const labels = data.monthly_sales.map(item => item.month);
      const salesData = data.monthly_sales.map(item => item.sales);
      createChart(salesChartRef, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: 'Sales ($)',
            data: salesData,
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            fill: true,
            tension: 0.4,
          }],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Sales Trends Over Time (2025)' },
          },
          scales: {
            y: { beginAtZero: true, title: { display: true, text: 'Sales ($)' } },
            x: { title: { display: true, text: 'Month' } },
          },
        },
      }, 'sales');
    }

    // 2. Top-Selling Products (Bar Chart)
    if (data.top_products && productsChartRef.current) {
      const labels = data.top_products.map(item => item.name);
      const salesData = data.top_products.map(item => item.sales);
      createChart(productsChartRef, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'Units Sold',
            data: salesData,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 1,
          }],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Top-Selling Products (2025)' },
          },
          scales: {
            y: { beginAtZero: true, title: { display: true, text: 'Units Sold' } },
            x: { title: { display: true, text: 'Product' } },
          },
        },
      }, 'products');
    }

    // 3. Order Status Distribution (Pie Chart)
    if (data.order_status && orderStatusChartRef.current) {
      const labels = data.order_status.map(item => item.status);
      const counts = data.order_status.map(item => item.count);
      createChart(orderStatusChartRef, {
        type: 'pie',
        data: {
          labels,
          datasets: [{
            label: 'Orders',
            data: counts,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(255, 206, 86, 0.6)',
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(75, 192, 192)',
              'rgb(255, 206, 86)',
            ],
            borderWidth: 1,
          }],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Order Status Distribution (2025)' },
          },
        },
      }, 'orderStatus');
    }

    // 4. Inventory Stock Levels (Bar Chart)
    if (data.inventory_levels && inventoryChartRef.current) {
      const labels = data.inventory_levels.map(item => item.product);
      const stockData = data.inventory_levels.map(item => item.stock);
      createChart(inventoryChartRef, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'Stock Level',
            data: stockData,
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
            borderColor: 'rgb(153, 102, 255)',
            borderWidth: 1,
          }],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Inventory Stock Levels (2025)' },
          },
          scales: {
            y: { beginAtZero: true, title: { display: true, text: 'Stock Units' } },
            x: { title: { display: true, text: 'Product' } },
          },
        },
      }, 'inventory');
    }

    // 5. Revenue by Product Category (Stacked Bar Chart)
    if (data.revenue_by_category && revenueChartRef.current) {
      const labels = data.revenue_by_category.map(item => item.quarter);
      createChart(revenueChartRef, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: 'Electronics',
              data: data.revenue_by_category.map(item => item.electronics),
              backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
            {
              label: 'Clothing',
              data: data.revenue_by_category.map(item => item.clothing),
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
            },
            {
              label: 'Accessories',
              data: data.revenue_by_category.map(item => item.accessories),
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Revenue by Product Category (2025)' },
          },
          scales: {
            x: { stacked: true, title: { display: true, text: 'Quarter' } },
            y: { stacked: true, beginAtZero: true, title: { display: true, text: 'Revenue ($)' } },
          },
        },
      }, 'revenue');
    }

    // Cleanup all charts on component unmount
    return () => {
      Object.values(chartInstances.current).forEach(chart => chart.destroy());
      chartInstances.current = {};
    };
  }, [data]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-8">E-commerce Dashboard</h1>
          {data ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Summary Metrics */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Summary Metrics</h2>
                <ul>
                  <li>
                    <strong>Total Sales:</strong> {data.total_sales} <br />
                    <strong>Total Revenue:</strong> ${data.total_revenue.toLocaleString()}
                  </li>
                </ul>
              </div>

              {/* Sales Trends */}
              {data.monthly_sales && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-4">Sales Trends</h2>
                  <canvas ref={salesChartRef}></canvas>
                </div>
              )}

              {/* Top-Selling Products */}
              {data.top_products && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-4">Top-Selling Products</h2>
                  <canvas ref={productsChartRef}></canvas>
                </div>
              )}

              {/* Order Status Distribution */}
              {data.order_status && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-4">Order Status Distribution</h2>
                  <canvas ref={orderStatusChartRef}></canvas>
                </div>
              )}

              {/* Inventory Stock Levels */}
              {data.inventory_levels && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-4">Inventory Stock Levels</h2>
                  <canvas ref={inventoryChartRef}></canvas>
                </div>
              )}

              {/* Revenue by Product Category */}
              {data.revenue_by_category && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-4">Revenue by Product Category</h2>
                  <canvas ref={revenueChartRef}></canvas>
                </div>
              )}
            </div>
          ) : (
            <p>Loading data...</p>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;