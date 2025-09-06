import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Phone, 
  MessageSquare, 
  MapPin, 
  Clock, 
  Heart, 
  AlertTriangle,
  ExternalLink,
  Users,
  BookOpen,
  Shield
} from "lucide-react";

const StudentSupport = () => {
  const navigate = useNavigate();

  const emergencyContacts = [
    {
      name: "Crisis Text Line",
      number: "741741",
      description: "Text HOME to 741741",
      available: "24/7",
      type: "crisis"
    },
    {
      name: "National Suicide Prevention Lifeline",
      number: "988",
      description: "Call or chat online",
      available: "24/7",
      type: "crisis"
    },
    {
      name: "Campus Security",
      number: "(555) 123-4567",
      description: "Emergency campus assistance",
      available: "24/7",
      type: "campus"
    }
  ];

  const supportResources = [
    {
      title: "University Counseling Center",
      description: "Professional counseling services for students",
      location: "Student Life Building, Room 201",
      hours: "Mon-Fri: 8AM-5PM",
      phone: "(555) 123-HELP",
      type: "counseling"
    },
    {
      title: "Peer Support Groups",
      description: "Student-led support groups for various topics",
      location: "Community Center",
      hours: "Various times",
      phone: "(555) 123-PEER",
      type: "peer"
    },
    {
      title: "Academic Success Center",
      description: "Help with study skills and academic stress",
      location: "Library Building, 3rd Floor",
      hours: "Mon-Thu: 9AM-8PM, Fri: 9AM-5PM",
      phone: "(555) 123-STUDY",
      type: "academic"
    }
  ];

  const onlineResources = [
    {
      title: "Mental Health First Aid",
      description: "Learn to recognize signs of mental health issues",
      url: "#",
      icon: Heart
    },
    {
      title: "Stress Management Workshops",
      description: "Online workshops for managing academic stress",
      url: "#",
      icon: BookOpen
    },
    {
      title: "Anonymous Chat Support",
      description: "24/7 text-based mental health support",
      url: "#",
      icon: MessageSquare
    }
  ];

  return (
    <div className="min-h-screen garden-bg p-4 overflow-y-auto pb-20">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Header */}
        <div className="text-center py-4">
          <h1 className="text-2xl font-heading font-bold text-glow mb-1">
            Support & Resources 🤝
          </h1>
          <p className="text-sm text-muted-foreground">
            You're not alone. Help is always available when you need it.
          </p>
        </div>

        {/* Emergency Contacts */}
        <Card className="floating-card border-destructive/20 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center font-heading text-destructive">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Emergency Support - Available 24/7
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-destructive/10 p-4 rounded-xl">
              <p className="text-sm font-medium text-destructive mb-2">
                🚨 If you're in immediate danger or having thoughts of self-harm:
              </p>
              <p className="text-sm text-muted-foreground">
                Call 911 or go to your nearest emergency room immediately.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {emergencyContacts.map((contact, index) => (
                <div 
                  key={index}
                  className="p-4 bg-card rounded-xl border border-card-border hover:shadow-soft transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-sm">{contact.name}</h3>
                    <Badge 
                      variant={contact.type === 'crisis' ? 'destructive' : 'secondary'}
                      className="text-xs rounded-full"
                    >
                      {contact.available}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {contact.description}
                  </p>
                  <Button 
                    size="sm"
                    className="w-full rounded-xl"
                    onClick={() => window.open(`tel:${contact.number}`)}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    {contact.number}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Campus Resources */}
        <Card className="floating-card">
          <CardHeader>
            <CardTitle className="font-heading flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-primary" />
              Campus Support Services
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {supportResources.map((resource, index) => (
              <div 
                key={index}
                className="p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold">{resource.title}</h3>
                  <Badge variant="outline" className="rounded-full text-xs">
                    {resource.type}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">
                  {resource.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-mint" />
                    <span>{resource.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-sky" />
                    <span>{resource.hours}</span>
                  </div>
                </div>
                
                <div className="mt-3 flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="rounded-xl"
                    onClick={() => window.open(`tel:${resource.phone}`)}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    className="rounded-xl"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Directions
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Online Resources */}
        <Card className="floating-card">
          <CardHeader>
            <CardTitle className="font-heading flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-primary" />
              Online Resources & Learning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {onlineResources.map((resource, index) => {
                const Icon = resource.icon;
                return (
                  <div 
                    key={index}
                    className="p-4 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl hover:shadow-soft transition-shadow cursor-pointer"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-garden rounded-full flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-sm">{resource.title}</h3>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4">
                      {resource.description}
                    </p>
                    
                    <Button 
                      size="sm" 
                      variant="ghost"
                      className="w-full rounded-xl group"
                    >
                      <span>Learn More</span>
                      <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Volunteer Signup */}
        <Card className="floating-card bg-gradient-blossom text-white">
          <CardHeader>
            <CardTitle className="font-heading flex items-center text-white">
              <Users className="w-5 h-5 mr-2" />
              Want to Help Others?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-white/90">
              Join our volunteer program and help support fellow students in their mental health journey.
            </p>
            <div className="flex space-x-3">
              <Button 
                onClick={() => navigate('/')}
                variant="secondary"
                className="rounded-xl"
              >
                Become a Volunteer
              </Button>
              <Button 
                variant="ghost" 
                className="rounded-xl text-white border-white/30 hover:bg-white/10"
              >
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Safety */}
        <Card className="floating-card">
          <CardHeader>
            <CardTitle className="font-heading flex items-center">
              <Shield className="w-5 h-5 mr-2 text-primary" />
              Privacy & Safety
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>• All conversations in SoulTree are anonymous and confidential</p>
            <p>• Volunteers are trained and verified before joining our platform</p>
            <p>• We never store personal identifying information</p>
            <p>• Your safety and privacy are our top priorities</p>
            <div className="mt-4 p-3 bg-mint/10 rounded-xl">
              <p className="text-mint font-medium text-xs">
                💚 If you ever feel unsafe or uncomfortable, you can end any conversation immediately.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentSupport;