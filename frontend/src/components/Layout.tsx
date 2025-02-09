import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, MessageSquare, Calendar, FileText, User, Menu } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const pathname = location.pathname;

  // Define valid routes for doctor and patient dashboards
  const doctorRoutes = ["/doctor", "/doctor/chat", "/doctor/appointments", "/doctor/reports"];
  const patientRoutes = ["/patient", "/patient/chat", "/patient/appointments", "/patient/reports"];

  const isLandingPage = pathname === "/";
  const isDoctorDashboard = doctorRoutes.includes(pathname);
  const isPatientDashboard = patientRoutes.includes(pathname);

  // Set dashboard title
  const dashboardTitle = isLandingPage
    ? "Welcome"
    : isDoctorDashboard
    ? "Doctor Dashboard"
    : isPatientDashboard
    ? "Patient Dashboard"
    : "";

  return (
    <div className={`min-h-screen ${isLandingPage ? "bg-white" : "bg-gradient-to-br from-gray-50 to-blue-50"}`}>
      {/* Top Navigation (Hidden on Landing Page) */}
      {!isLandingPage && dashboardTitle && (
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Menu className="h-6 w-6 text-gray-600" />
                <span className="ml-3 text-xl font-semibold text-blue-600">
                  {dashboardTitle}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-2 rounded-full bg-blue-50 text-blue-600">
                  <User className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main
        className={`${
          isLandingPage ? "w-full min-h-screen flex items-center justify-center p-0" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        }`}
      >
        {children}
      </main>

      {/* Bottom Navigation (Only for specific Doctor & Patient Dashboard Pages) */}
      {(isDoctorDashboard || isPatientDashboard) && (
        <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-around py-3">
              <NavLink to={isDoctorDashboard ? "/doctor" : "/patient"} icon={<Home />} label="Home" />
              {/* <NavLink to={isDoctorDashboard ? "/doctor/chat" : "/patient/chat"} icon={<MessageSquare />} label="Chat" /> */}
              <NavLink to={isDoctorDashboard ? "/doctor/appointments" : "/patient/appointments"} icon={<Calendar />} label="Appointments" />
              <NavLink to={isDoctorDashboard ? "/doctor/reports" : "/patient/reports"} icon={<FileText />} label="Reports" />
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}

function NavLink({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex flex-col items-center space-y-1 ${isActive ? "text-blue-600" : "text-gray-600"}`}
    >
      {icon}
      <span className="text-xs">{label}</span>
    </Link>
  );
}
