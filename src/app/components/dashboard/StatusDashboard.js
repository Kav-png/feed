"use client";
import { ChevronDown, ChevronUp, AlertTriangle, Zap } from "lucide-react";
import React, { useState } from "react";
import { Line } from "react-chartjs-2"; // If using react-chartjs-2, else use a simple div for dummy

const dummySeverityPrediction = (incident) => {
  // Dummy logic: If title contains "power" or "stuck", predict high severity
  if (/power|stuck/i.test(incident.title))
    return { severity: 1, confidence: 0.92 };
  if (/latency|delay/i.test(incident.title))
    return { severity: 3, confidence: 0.75 };
  return { severity: 4, confidence: 0.6 };
};

const dummyAnomalies = [
  {
    type: "Spike in Incidents",
    division: "Technology Services",
    detectedAt: "2025-03-21 09:00",
    description: "Unusual spike in incidents detected for Technology Services.",
  },
];

const dummyRootCauseSuggestions = (incident) => {
  // Dummy logic: Suggest root causes based on keywords
  if (/power/i.test(incident.title))
    return ["Utility Power Failure", "DNO Issue"];
  if (/latency|delay/i.test(incident.title))
    return ["Network Congestion", "Mail Server Delay"];
  if (/Teams/i.test(incident.title))
    return ["Microsoft Teams Outage", "Telephony Service Issue"];
  return ["No suggestion"];
};

// --- Dummy ML/AI Functions ---

// 4. Incident Resolution Time Estimation
const dummyResolutionTimeEstimation = (incident) => {
  // Dummy logic: Estimate based on severity
  if (incident.severity <= 2) return "2 hours";
  if (incident.severity === 3) return "6 hours";
  if (incident.severity === 4) return "1 day";
  return "3 days";
};

// 5. Change Impact Analysis
const dummyChangeImpact = (division) => {
  // Dummy logic: Highlight "Technology Services" as high risk
  if (division === "Technology Services")
    return { risk: "High", reason: "Recent spike in incidents" };
  if (division === "Investment Bank")
    return { risk: "Medium", reason: "Moderate change volume" };
  return { risk: "Low", reason: "Stable history" };
};

// 6. Automated Incident Categorization
const dummyIncidentCategory = (incident) => {
  if (/power|utility/i.test(incident.title)) return "Infrastructure";
  if (/Teams|mail|latency|delay/i.test(incident.title)) return "Application";
  if (/trade|brokerage|payments/i.test(incident.title))
    return "Business Process";
  return "Other";
};

const dummySentiment = (incident) => {
  // Dummy: negative if "unable", "stuck", "delay", else neutral/positive
  if (/unable|stuck|delay|dropped|not processed/i.test(incident.title))
    return { sentiment: "Negative", color: "#ef5350" };
  if (/success|restored|resolved/i.test(incident.title))
    return { sentiment: "Positive", color: "#7cb342" };
  return { sentiment: "Neutral", color: "#ffb74d" };
};

const dummyTrendForecast = {
  labels: [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
    "Next Mon",
    "Next Tue",
  ],
  data: [5, 7, 6, 8, 9, 7, 6, 10, 12], // Last 7 days + next 2 days (forecast)
};

const ProductionDashboard = () => {
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("");
  const [impactedConsumerFilter, setImpactedConsumerFilter] = useState("");
  const [impactedRegionFilter, setImpactedRegionFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of incidents per page
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const dummyRecommendations = () => [
    {
      type: "Monitoring",
      message:
        "Increase monitoring for Technology Services due to recent spike in incidents.",
      division: "Technology Services",
      severity: "High",
    },
    {
      type: "Maintenance",
      message:
        "Schedule preventive maintenance for Office 365 mail delivery systems.",
      division: "Technology Services",
      severity: "Medium",
    },
    {
      type: "Awareness",
      message:
        "Notify Investment Bank teams about potential trade processing delays.",
      division: "Investment Bank",
      severity: "Low",
    },
  ];

  // Status colors - using lighter modern palette
  const statusColors = {
    GREEN: "#7cb342",
    AMBER: "#ffb74d",
    RED: "#ef5350",
  };

  const severityColors = {
    "1-2": "#ef5350",
    3: "#ffb74d",
    "4-5": "#7cb342",
  };

  // Dashboard data
  const dashboardData = {
    overallStatus: "AMBER",
    timestamp: "Friday, March 21 2025 10:07:02 GMT",
    regions: [
      { name: "APAC", time: "07:00 SGT" },
      { name: "EMEA", time: "07:00 UTC" },
      { name: "AMER", time: "07:00 ET" },
    ],
    coreInfra: [
      { name: "Network Services", status: "GREEN" },
      { name: "Distributed Hosting", status: "AMBER" },
      { name: "TISO", status: "GREEN" },
      { name: "Data Centre Services", status: "GREEN" },
      { name: "Mainframe & Midrange", status: "GREEN" },
      { name: "Automation Services", status: "GREEN" },
    ],
    frontEndInfra: [
      { name: "Mobile Pass", status: "GREEN" },
      { name: "MS Office 365", status: "RED" },
      { name: "MS Teams / Voice", status: "GREEN" },
      { name: "Remote Access", status: "GREEN" },
      { name: "UBS Workspace Cloud", status: "GREEN" },
      { name: "UBS Workspace Virtual", status: "GREEN" },
    ],
    businessApplications: [
      { name: "Investment Bank", status: "GREEN" },
      { name: "Asset Management", status: "GREEN" },
      { name: "Group Functions", status: "GREEN" },
      { name: "Technology Services", status: "AMBER" },
      { name: "WMPC", status: "GREEN" },
      { name: "WM USA", status: "GREEN" },
    ],
    incidentCounts: {
      "Asset Management": { "1-2": 0, 3: 0, 4: 0, 5: 2 },
      "Investment Bank": { "1-2": 0, 3: 0, 4: 1, 5: 28 },
      "Group Functions": { "1-2": 0, 3: 0, 4: 1, 5: 43 },
      "WM USA": { "1-2": 0, 3: 0, 4: 0, 5: 3 },
      WMPC: { "1-2": 0, 3: 0, 4: 1, 5: 5 },
      "Technology Services": { "1-2": 0, 3: 2, 4: 3, 5: 45 },
    },
    incidents: [
      {
        division: "Group Functions",
        severity: 4,
        id: "INC1033975851",
        title:
          "[HACL][Office Tier G][IT Tier A], Clayton Road, London, United Kingdom - Utility Power Service - DNO",
        duration: "00 Days, 09 Hours 23 Minutes",
        impactedConsumer: "Corporate Users",
        impactedRegion: "EMEA",
      },
      {
        division: "Investment Bank",
        severity: 4,
        id: "INC1033958782",
        title:
          "Prime brokerage trade processing is stuck in Transaction Processing Engine (TPE) application",
        duration: "01 Days, 09 Hours 52 Minutes",
        impactedConsumer: "Investment Bank Clients",
        impactedRegion: "APAC",
      },
      {
        division: "Technology Services",
        severity: 3,
        id: "INC1033889297",
        title:
          "Multiple users across EMEA region are unable to make and receive calls using Microsoft Teams.",
        duration: "06 Days, 19 Hours 54 Minutes",
        impactedConsumer: "Corporate Users",
        impactedRegion: "EMEA",
      },
      {
        division: "Technology Services",
        severity: 4,
        id: "INC1033689369",
        title: "Delay in mail delivery for some users on Office 365",
        duration: "21 Days, 01 Hours 11 Minutes",
      },
      {
        division: "Technology Services",
        severity: 3,
        id: "INC1033778111",
        title:
          "Multiple applications across numerous LoB have reported latency and dropped packets.",
        duration: "14 Days, 15 Hours 12 Minutes",
      },
      {
        division: "WMPC",
        severity: 4,
        id: "INC1033321955",
        title:
          "Some account transfers and IP SIC outbound payments are not processed through Instant Payments (NPP)",
        duration: "48 Days, 23 Hours 28 Minutes",
      },
    ],
  };

  const changeStatistics = {
    "Asset Management": { last24Hours: 0, last7Days: 25, next7Days: 15 },
    "Investment Bank": { last24Hours: 5, last7Days: 30, next7Days: 20 },
    "Group Functions": { last24Hours: 8, last7Days: 18, next7Days: 12 },
    "WM USA": { last24Hours: 3, last7Days: 10, next7Days: 5 },
    WMPC: { last24Hours: 7, last7Days: 22, next7Days: 18 },
    "Technology Services": { last24Hours: 12, last7Days: 40, next7Days: 25 },
  };

  // Move getFilteredIncidents above its usage
  const getFilteredIncidents = () => {
    let filtered = dashboardData.incidents;

    // Filter by division
    if (selectedDivision) {
      filtered = filtered.filter(
        (incident) => incident.division === selectedDivision
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (incident) =>
          incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          incident.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          incident.division.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by severity
    if (severityFilter) {
      filtered = filtered.filter(
        (incident) => incident.severity.toString() === severityFilter
      );
    }

    // Filter by impacted consumer
    if (impactedConsumerFilter) {
      filtered = filtered.filter(
        (incident) => incident.impactedConsumer === impactedConsumerFilter
      );
    }

    // Filter by impacted region
    if (impactedRegionFilter) {
      filtered = filtered.filter(
        (incident) => incident.impactedRegion === impactedRegionFilter
      );
    }

    // Sort incidents
    if (sortConfig.key) {
      filtered = [...filtered].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  };

  const paginatedIncidents = getFilteredIncidents().slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(getFilteredIncidents().length / itemsPerPage);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const StatusBadge = ({ status }) => (
    <span
      className="px-3 py-1 rounded-full text-sm font-medium text-white"
      style={{ backgroundColor: statusColors[status] }}
    >
      {status}
    </span>
  );

  const SeverityBadge = ({ severity }) => {
    const sevKey = severity <= 2 ? "1-2" : severity === 3 ? "3" : "4-5";
    return (
      <span
        className="px-3 py-1 rounded-full text-sm font-medium text-white"
        style={{ backgroundColor: severityColors[sevKey] }}
      >
        {severity}
      </span>
    );
  };

  // --- AI/ML Feature: Anomaly Alerts ---
  const renderAnomalyAlerts = () => (
    <div className="mb-6">
      {dummyAnomalies.map((anomaly, idx) => (
        <div
          key={idx}
          className="flex items-center bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-2 rounded"
        >
          <AlertTriangle className="text-yellow-500 mr-2" size={20} />
          <div>
            <span className="font-semibold text-yellow-800">
              {anomaly.type}:{" "}
            </span>
            <span className="text-yellow-700">{anomaly.description}</span>
            <span className="block text-xs text-yellow-600">
              Division: {anomaly.division} | Detected: {anomaly.detectedAt}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4">
      {/* --- AI/ML Feature: Anomaly Alerts --- */}
      {renderAnomalyAlerts()}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-bold text-gray-800">
            Technology Production Stability View
          </h1>
          <p className="text-sm text-gray-500">{dashboardData.timestamp}</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-right">
            <p className="text-sm text-gray-600">Overall Readiness</p>
            <StatusBadge status={dashboardData.overallStatus} />
          </div>
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: statusColors[dashboardData.overallStatus],
            }}
          ></div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Regions Column */}
        <div className="md:col-end-1 flex flex-col justify-between">
          {dashboardData.regions.map((region, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-lg shadow-sm text-center mb-4 md:mb-0"
              style={{
                height: "calc(33.33% - 1rem)", // Ensures equal height for each region card
                maxWidth: "90%", // Reduces the width of the region column
                margin: "0 auto", // Centers the region cards horizontally
              }}
            >
              <h3 className="font-medium text-gray-700">{region.name}</h3>
              <p className="text-xs text-gray-500">{region.time}</p>
            </div>
          ))}
        </div>

        {/* Technology Infrastructure Tables */}
        <div className="md:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Core Technology Infra */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-gray-100 p-3 border-g">
              <h2 className="font-semibold text-gray-700">
                Core Technology Infra
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {dashboardData.coreInfra.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-3"
                >
                  <span className="text-sm text-gray-700">{item.name}</span>
                  <StatusBadge status={item.status} />
                </div>
              ))}
            </div>
          </div>

          {/* Front End Technology Infra */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-gray-100 p-3 border-g">
              <h2 className="font-semibold text-gray-700">
                Front End Technology Infra
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {dashboardData.frontEndInfra.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-3"
                >
                  <span className="text-sm text-gray-700">{item.name}</span>
                  <StatusBadge status={item.status} />
                </div>
              ))}
            </div>
          </div>

          {/* Business Application Portfolio */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-gray-100 p-3 border-g">
              <h2 className="font-semibold text-gray-700">
                Business Application Portfolio
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {dashboardData.businessApplications.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-3"
                >
                  <span className="text-sm text-gray-700">{item.name}</span>
                  <StatusBadge status={item.status} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Incident Summary by Division */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="bg-gray-100 p-3 border-g">
          <h2 className="font-semibold text-gray-700">
            Incident Summary by Division
          </h2>
        </div>
        <div className="p-4 overflow-x-auto">
          <table
            className="w-full text-sm text-left table-fixed"
            style={{ tableLayout: "fixed" }} // Ensures equal column widths
          >
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-2 w-1/6">Severity</th>
                {Object.keys(dashboardData.incidentCounts).map(
                  (division, idx) => (
                    <th
                      key={idx}
                      className="px-4 py-2 w-1/6 cursor-pointer hover:bg-gray-100"
                      onClick={() =>
                        setSelectedDivision(
                          division === selectedDivision ? null : division
                        )
                      }
                    >
                      <div
                        className={`flex flex-col items-center ${
                          division === selectedDivision ? "font-bold" : ""
                        }`}
                      >
                        {division}
                      </div>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {["1-2", "3", "4", "5"].map((sev, idx) => (
                <tr key={idx} className="border-g">
                  <td className="px-4 py-2 font-medium">{sev}</td>
                  {Object.keys(dashboardData.incidentCounts).map(
                    (division, idxDiv) => {
                      const count = dashboardData.incidentCounts[division][sev];
                      return (
                        <td key={idxDiv} className="px-4 py-2 text-center">
                          <div
                            className={`rounded py-1 ${
                              count > 0 ? "font-medium" : ""
                            }`}
                            style={{
                              backgroundColor:
                                count > 0
                                  ? sev === "1-2"
                                    ? "#ffebee"
                                    : sev === "3"
                                    ? "#fff8e1"
                                    : "#f1f8e9"
                                  : "#f5f5f5",
                              color:
                                count > 0
                                  ? sev === "1-2"
                                    ? "#d32f2f"
                                    : sev === "3"
                                    ? "#ff8f00"
                                    : "#558b2f"
                                  : "#9e9e9e",
                            }}
                          >
                            {count}
                          </div>
                        </td>
                      );
                    }
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Change Statistics Section */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="bg-gray-100 p-3 border-g">
          <h2 className="font-semibold text-gray-700">
            Change Statistics by Division
          </h2>
        </div>
        <div className="p-4 overflow-x-auto">
          <table
            className="w-full text-sm text-left table-fixed"
            style={{ tableLayout: "fixed" }} // Ensures equal column widths
          >
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-2 w-1/6">Time Period</th>
                {Object.keys(dashboardData.incidentCounts).map(
                  (division, idx) => (
                    <th key={idx} className="px-4 py-2 w-1/6 text-center">
                      {division}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Last 24 Hours", key: "last24Hours" },
                { label: "Last 7 Days", key: "last7Days" },
                { label: "Next 7 Days", key: "next7Days" },
              ].map((timePeriod, idx) => (
                <tr key={idx} className="border-g">
                  <td className="px-4 py-2 font-medium">{timePeriod.label}</td>
                  {Object.keys(changeStatistics).map((division, idxDiv) => {
                    const changeStats =
                      changeStatistics[division][timePeriod.key];
                    return (
                      <td key={idxDiv} className="px-4 py-2 text-center">
                        <div
                          className={`rounded py-1 ${
                            changeStats > 0 ? "font-medium" : ""
                          }`}
                          style={{
                            backgroundColor:
                              changeStats > 0 ? "#e3f2fd" : "#f5f5f5",
                            color: changeStats > 0 ? "#1e88e5" : "#9e9e9e",
                          }}
                        >
                          {changeStats}
                          {/* --- AI/ML Feature: Change Impact Analysis --- */}
                          <div className="text-xs mt-1">
                            <span
                              className={
                                dummyChangeImpact(division).risk === "High"
                                  ? "text-red-600"
                                  : dummyChangeImpact(division).risk ===
                                    "Medium"
                                  ? "text-yellow-700"
                                  : "text-green-700"
                              }
                            >
                              {dummyChangeImpact(division).risk} Risk
                            </span>
                          </div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- AI/ML Feature: Incident Trend Forecasting --- */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="bg-gray-100 p-3 border-g">
          <h2 className="font-semibold text-gray-700">
            Incident Trend Forecast
          </h2>
        </div>
        <div className="p-4">
          {/* Replace with a real chart if you have charting libs */}
          <div className="w-full h-32 flex items-end space-x-2">
            {dummyTrendForecast.data.map((val, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div
                  style={{
                    height: `${val * 10}px`,
                    width: "16px",
                    background: idx >= 7 ? "#90caf9" : "#1976d2",
                    borderRadius: "4px 4px 0 0",
                    marginBottom: "4px",
                  }}
                ></div>
                <span className="text-xs text-gray-500">
                  {dummyTrendForecast.labels[idx]}
                </span>
              </div>
            ))}
          </div>
          <div className="text-xs text-gray-500 mt-2">
            <span className="font-semibold text-blue-700">Blue</span>: Actual
            &nbsp;|&nbsp;
            <span className="font-semibold text-blue-300">Light Blue</span>:
            Forecast
          </div>
        </div>
      </div>

      {/* --- AI/ML Feature: Automated Recommendations --- */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="bg-gray-100 p-3 border-g flex items-center">
          <Zap size={18} className="mr-2 text-blue-400" />
          <h2 className="font-semibold text-gray-700">AI Recommendations</h2>
        </div>
        <div className="p-4">
          {dummyRecommendations().map((rec, idx) => (
            <div
              key={idx}
              className="mb-3 p-3 rounded border-l-4"
              style={{
                borderColor:
                  rec.severity === "High"
                    ? "#ef5350"
                    : rec.severity === "Medium"
                    ? "#ffb74d"
                    : "#7cb342",
                background:
                  rec.severity === "High"
                    ? "#ffebee"
                    : rec.severity === "Medium"
                    ? "#fff8e1"
                    : "#f1f8e9",
              }}
            >
              <div className="font-semibold text-gray-800">{rec.type}</div>
              <div className="text-gray-700 text-sm">{rec.message}</div>
              <div className="text-xs text-gray-500 mt-1">
                Division: {rec.division} &nbsp;|&nbsp; Severity: {rec.severity}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Incidents */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="bg-gray-100 p-3 border-g flex justify-between items-center">
          <h2 className="font-semibold text-gray-700">
            Current Incidents {selectedDivision ? `- ${selectedDivision}` : ""}
          </h2>
          {selectedDivision && (
            <button
              onClick={() => setSelectedDivision(null)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Clear Filter
            </button>
          )}
        </div>

        {/* Search and Filter */}
        <div className="p-4 flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex items-center bg-white rounded-lg px-3 py-2 shadow">
            <input
              type="text"
              placeholder="Search incidents..."
              className="w-full outline-none text-sm text-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Severity Filter */}
          <div className="relative">
            <select
              className="w-full bg-white rounded-lg pl-3 pr-7 py-2 shadow appearance-none cursor-pointer text-sm text-gray-700"
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
            >
              <option value="">All Severities</option>
              <option value="1">Severity 1</option>
              <option value="2">Severity 2</option>
              <option value="3">Severity 3</option>
              <option value="4">Severity 4</option>
              <option value="5">Severity 5</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <ChevronDown size={20} className="text-gray-400" />
            </div>
          </div>

          {/* Impacted Consumer Filter */}
          <div className="relative">
            <select
              className="w-full bg-white rounded-lg pl-3 pr-7 py-2 shadow appearance-none cursor-pointer text-sm text-gray-700"
              value={impactedConsumerFilter}
              onChange={(e) => setImpactedConsumerFilter(e.target.value)}
            >
              <option value="">All Consumers</option>
              {[
                ...new Set(
                  dashboardData.incidents.map((i) => i.impactedConsumer)
                ),
              ].map((consumer, idx) => (
                <option key={idx} value={consumer}>
                  {consumer}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <ChevronDown size={20} className="text-gray-400" />
            </div>
          </div>

          {/* Impacted Region Filter */}
          <div className="relative">
            <select
              className="w-full bg-white rounded-lg pl-3 pr-7 py-2 shadow appearance-none cursor-pointer text-sm text-gray-700"
              value={impactedRegionFilter}
              onChange={(e) => setImpactedRegionFilter(e.target.value)}
            >
              <option value="">All Regions</option>
              {[
                ...new Set(
                  dashboardData.incidents.map((i) => i.impactedRegion)
                ),
              ].map((region, idx) => (
                <option key={idx} value={region}>
                  {region}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <ChevronDown size={20} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Incident Table */}
        <div className="p-4 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th
                  className="px-4 py-2 cursor-pointer"
                  onClick={() => requestSort("division")}
                >
                  <div className="flex items-center">
                    Division
                    {sortConfig.key === "division" &&
                      (sortConfig.direction === "ascending" ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      ))}
                  </div>
                </th>
                <th
                  className="px-4 py-2 cursor-pointer"
                  onClick={() => requestSort("severity")}
                >
                  <div className="flex items-center">
                    Severity
                    {sortConfig.key === "severity" &&
                      (sortConfig.direction === "ascending" ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      ))}
                  </div>
                </th>
                <th
                  className="px-4 py-2 cursor-pointer"
                  onClick={() => requestSort("id")}
                >
                  <div className="flex items-center">
                    Incident ID
                    {sortConfig.key === "id" &&
                      (sortConfig.direction === "ascending" ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      ))}
                  </div>
                </th>
                <th
                  className="px-4 py-2 cursor-pointer"
                  onClick={() => requestSort("title")}
                >
                  <div className="flex items-center">
                    Title
                    {sortConfig.key === "title" &&
                      (sortConfig.direction === "ascending" ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      ))}
                  </div>
                </th>
                <th
                  className="px-4 py-2 cursor-pointer"
                  onClick={() => requestSort("duration")}
                >
                  <div className="flex items-center">
                    Duration
                    {sortConfig.key === "duration" &&
                      (sortConfig.direction === "ascending" ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      ))}
                  </div>
                </th>
                {/* <th className="px-4 py-2">AI Severity Prediction</th> */}
                <th className="px-4 py-2">AI Root Cause Suggestions</th>
                <th className="px-4 py-2">AI Resolution ETA</th>
                <th className="px-4 py-2">AI Category</th>
                <th className="px-4 py-2">AI Sentiment</th>
              </tr>
            </thead>
            <tbody>
              {paginatedIncidents.map((incident, idx) => {
                const prediction = dummySeverityPrediction(incident);
                const rootCauses = dummyRootCauseSuggestions(incident);
                const resolutionETA = dummyResolutionTimeEstimation(incident); // 4
                const incidentCategory = dummyIncidentCategory(incident); // 6
                const sentiment = dummySentiment(incident);
                return (
                  <tr key={idx} className="border-g hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-700">
                      {incident.division}
                    </td>
                    <td className="px-4 py-3">
                      <SeverityBadge severity={incident.severity} />
                    </td>
                    <td className="px-4 py-3 text-blue-600">{incident.id}</td>
                    <td className="px-4 py-3 text-gray-700 max-w-md truncate">
                      {incident.title}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {incident.duration}
                    </td>
                    {/* --- AI/ML Feature: Severity Prediction --- */}
                    {/* <td className="px-4 py-3 text-gray-700">
                      <span className="flex items-center">
                        <Zap className="text-blue-400 mr-1" size={16} />
                        <span>
                          {`Severity ${prediction.severity} `}
                          <span className="text-xs text-gray-500">
                            ({Math.round(prediction.confidence * 100)}%)
                          </span>
                        </span>
                      </span>
                    </td> */}
                    {/* --- AI/ML Feature: Root Cause Suggestions --- */}
                    <td className="px-4 py-3 text-gray-700">
                      {rootCauses.map((cause, i) => (
                        <div key={i} className="text-xs">
                          {cause}
                        </div>
                      ))}
                    </td>
                    {/* AI Resolution ETA */}
                    <td className="px-4 py-3 text-gray-700">{resolutionETA}</td>
                    {/* AI Category */}
                    <td className="px-4 py-3 text-gray-700">
                      {incidentCategory}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="px-2 py-1 rounded text-xs font-semibold"
                        style={{
                          backgroundColor: sentiment.color,
                          color: "#fff",
                        }}
                        title={sentiment.sentiment}
                      >
                        {sentiment.sentiment}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {paginatedIncidents.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="px-4 py-3 text-center text-gray-500"
                  ></td>
                  No incidents found
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 ml-2 mb-2"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 mr-2 mb-2"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Status Legend
        </h3>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <div
              className="w-4 h-4 rounded-full mr-2"
              style={{ backgroundColor: statusColors.RED }}
            ></div>
            <span className="text-xs text-gray-600">
              Severity 1-2 incident(s)
            </span>
          </div>
          <div className="flex items-center">
            <div
              className="w-4 h-4 rounded-full mr-2"
              style={{ backgroundColor: statusColors.AMBER }}
            ></div>
            <span className="text-xs text-gray-600">
              Severity 3 incident(s)
            </span>
          </div>
          <div className="flex items-center">
            <div
              className="w-4 h-4 rounded-full mr-2"
              style={{ backgroundColor: statusColors.GREEN }}
            ></div>
            <span className="text-xs text-gray-600">
              Severity 4-5 or no incidents
            </span>
          </div>
        </div>
      </div>

      {/* --- AI/ML Feature: Conversational AI Assistant (UI Placeholder) --- */}
      <div
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 1000,
          width: "320px",
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
          border: "1px solid #e0e0e0",
          padding: "16px",
        }}
      >
        <div className="font-semibold text-gray-700 mb-2 flex items-center">
          <Zap size={18} className="mr-2 text-blue-400" />
          Smart Assistant
        </div>
        <div className="text-xs text-gray-600 mb-2">
          <em>Ask about incidents, trends, or get recommendations!</em>
        </div>
        <input
          type="text"
          className="w-full border rounded px-2 py-1 text-sm mb-2"
          placeholder="Type your question..."
          disabled
        />
        <div className="text-xs text-gray-400">
          (Demo only. AI chat coming soon!)
        </div>
      </div>
    </div>
  );
};

export default ProductionDashboard;
