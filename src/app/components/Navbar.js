"use client";
import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [hoveredMenu, setHoveredMenu] = useState(null);

  const menuItems = [
    {
      title: "Home",
      route: "/",
      dropdown: [],
    },
    {
      title: "Dashboard",
      route: "/dashboard",
      dropdown: ["Status Overview", "Incident Reports", "Change Statistics"],
    },
    {
      title: "Services",
      route: "/services",
      dropdown: [
        "Core Infrastructure",
        "Front-End Infrastructure",
        "Business Applications",
      ],
    },
    {
      title: "Support",
      route: "/support",
      dropdown: ["Contact Us", "FAQs", "Documentation"],
    },
  ];

  const homeTabs = [
    { title: "Overview", route: "/overview" },
    { title: "Features", route: "/features" },
    { title: "Pricing", route: "/pricing" },
    { title: "Contact", route: "/contact" },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        {/* Top Navbar */}
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-xl font-bold text-gray-800">
            <Link href="/">MyApp</Link>
          </div>

          {/* Menu Items */}
          <ul className="flex space-x-6">
            {menuItems.map((item, idx) => (
              <li
                key={idx}
                className="relative group"
                onMouseEnter={() => setHoveredMenu(idx)}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                {/* Main Link */}
                <Link
                  href={item.route}
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  {item.title}
                </Link>

                {/* Dropdown */}
                {item.dropdown.length > 0 && hoveredMenu === idx && (
                  <ul className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg w-48">
                    {item.dropdown.map((option, optionIdx) => (
                      <li key={optionIdx} className="border-b last:border-none">
                        <Link
                          href={`${item.route}/${option
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                        >
                          {option}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Home Tabs */}
        <div className="mt-4">
          <ul className="flex space-x-6 border-t pt-2">
            {homeTabs.map((tab, idx) => (
              <li key={idx}>
                <Link
                  href={tab.route}
                  className="text-gray-600 hover:text-blue-600 font-medium"
                >
                  {tab.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
