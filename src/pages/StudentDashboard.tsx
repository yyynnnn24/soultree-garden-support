import { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Heart, Users, Headphones, HelpCircle, Home } from "lucide-react";
import StudentGarden from "@/components/student/StudentGarden";
import StudentCommunity from "@/components/student/StudentCommunity";
import StudentTools from "@/components/student/StudentTools";
import StudentSupport from "@/components/student/StudentSupport";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const currentPath = location.pathname.split('/')[2] || 'garden';
  
  const navigationItems = [
    { id: 'garden', label: 'Garden', icon: Home, path: '/student/garden' },
    { id: 'community', label: 'Community', icon: Users, path: '/student/community' },
    { id: 'tools', label: 'Tools', icon: Headphones, path: '/student/tools' },
    { id: 'support', label: 'Support', icon: HelpCircle, path: '/student/support' },
  ];

  return (
    <div className="flex flex-col h-screen bg-gradient-peaceful">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="garden" element={<StudentGarden />} />
          <Route path="community" element={<StudentCommunity />} />
          <Route path="tools" element={<StudentTools />} />
          <Route path="support" element={<StudentSupport />} />
          <Route path="" element={<StudentGarden />} />
        </Routes>
      </div>

      {/* Bottom Navigation */}
      <nav className="bg-card/80 backdrop-blur-lg border-t border-card-border">
        <div className="flex justify-around items-center py-2 px-4 max-w-md mx-auto">
          {navigationItems.map((item) => {
            const isActive = currentPath === item.id;
            const Icon = item.icon;
            
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center space-y-1 p-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'text-primary bg-primary/10 scale-105'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'animate-pulse' : ''}`} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default StudentDashboard;