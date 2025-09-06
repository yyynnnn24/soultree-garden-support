import { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { MessageCircle, FileText, Target, BookOpen } from "lucide-react";
import VolunteerChats from "@/components/volunteer/VolunteerChats";
import VolunteerArticles from "@/components/volunteer/VolunteerArticles";
import VolunteerGoals from "@/components/volunteer/VolunteerGoals";
import VolunteerSupport from "@/components/volunteer/VolunteerSupport";

const VolunteerDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const currentPath = location.pathname.split('/')[2] || 'chats';
  
  const navigationItems = [
    { id: 'chats', label: 'Chats', icon: MessageCircle, path: '/volunteer/chats' },
    { id: 'articles', label: 'Articles', icon: FileText, path: '/volunteer/articles' },
    { id: 'goals', label: 'Goals', icon: Target, path: '/volunteer/goals' },
    { id: 'support', label: 'Support', icon: BookOpen, path: '/volunteer/support' },
  ];

  return (
    <div className="flex flex-col h-screen bg-gradient-peaceful">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-lg border-b border-card-border p-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-garden rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">V</span>
            </div>
            <div>
              <h1 className="font-heading font-semibold text-lg">SoulTree Volunteer</h1>
              <p className="text-sm text-muted-foreground">Supporting our community</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-mint rounded-full"></span>
            <span className="text-sm font-medium text-mint">Active</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <Routes>
          <Route path="chats" element={<VolunteerChats />} />
          <Route path="articles" element={<VolunteerArticles />} />
          <Route path="goals" element={<VolunteerGoals />} />
          <Route path="support" element={<VolunteerSupport />} />
          <Route path="" element={<VolunteerChats />} />
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
                <Icon className={`w-5 h-5 ${isActive ? 'animate-pulse' : ''}`} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default VolunteerDashboard;