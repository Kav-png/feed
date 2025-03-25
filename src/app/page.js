"use client";
import { useState } from "react";
import Navbar from "./components/Navbar";
import StatusDashboard from "./components/dashboard/StatusDashboard";
import NewsBanner from "./components/NewsBanner";
import Sidebar from "./components/dashboard/Sidebar";

export default function Home() {
  // Static dictionary for service divisions and their streams
  const sidebarOptions = [
    {
      title: "Asset Management",
      subOptions: [
        {
          stream: "AM Tech VC",
          staticSubOptions: ["Volume Analysis", "Historical Availability"],
        },
        {
          stream: "AM Tech TF",
          staticSubOptions: ["Volume Analysis", "Historical Availability"],
        },
      ],
    },
    {
      title: "Investment Bank",
      subOptions: [
        {
          stream: "IB Tech Trading",
          staticSubOptions: ["Volume Analysis", "Historical Availability"],
        },
        {
          stream: "IB Tech Risk",
          staticSubOptions: ["Volume Analysis", "Historical Availability"],
        },
      ],
    },
    {
      title: "Group Functions",
      subOptions: [
        {
          stream: "GF Tech HR",
          staticSubOptions: ["Volume Analysis", "Historical Availability"],
        },
        {
          stream: "GF Tech Finance",
          staticSubOptions: ["Volume Analysis", "Historical Availability"],
        },
      ],
    },
    {
      title: "Wealth Management",
      subOptions: [
        {
          stream: "WM Tech Advisory",
          staticSubOptions: ["Volume Analysis", "Historical Availability"],
        },
        {
          stream: "WM Tech Operations",
          staticSubOptions: ["Volume Analysis", "Historical Availability"],
        },
      ],
    },
    {
      title: "Technology Services",
      subOptions: [
        {
          stream: "TS Cloud",
          staticSubOptions: ["Volume Analysis", "Historical Availability"],
        },
        {
          stream: "TS Infrastructure",
          staticSubOptions: ["Volume Analysis", "Historical Availability"],
        },
      ],
    },
  ];

  // News items for the banner
  const newsItems = [
    "System maintenance scheduled for this weekend.",
    "New feature release: Enhanced reporting tools.",
    "Incident resolved: Network latency in APAC region.",
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      {/* <Navbar /> */}

      {/* News Banner */}
      {/* <NewsBanner newsItems={newsItems} /> */}

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar sidebarOptions={sidebarOptions} />

        {/* Main Content */}
        <main className="flex-1 bg-gray-50 p-4">
          <StatusDashboard />
        </main>
      </div>
    </div>
  );
}
