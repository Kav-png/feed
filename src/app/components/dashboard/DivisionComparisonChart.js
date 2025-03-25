import { Bar } from "react-chartjs-2";

const divisionComparisonData = {
  labels: Object.keys(dashboardData.incidentCounts),
  datasets: [
    {
      label: "Total Incidents",
      data: Object.keys(dashboardData.incidentCounts).map(
        (division) =>
          dashboardData.incidentCounts[division]["1-2"] +
          dashboardData.incidentCounts[division][3] +
          dashboardData.incidentCounts[division]["4-5"]
      ),
      backgroundColor: "#42a5f5",
    },
  ],
};

const DivisionComparisonChart = () => (
  <div className="bg-white p-4 rounded-lg shadow-sm">
    <h3 className="text-lg font-medium text-gray-700 mb-4">
      Total Incidents by Division
    </h3>
    <Bar data={divisionComparisonData} />
  </div>
);

export default DivisionComparisonChart;
