import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Users, 
  Phone, 
  MessageSquare, 
  FileText, 
  AlertTriangle,
  ExternalLink,
  Download,
  Video,
  Calendar,
  Shield,
  Heart,
  Lightbulb
} from "lucide-react";

const VolunteerSupport = () => {
  const trainingResources = [
    {
      title: "Active Listening Fundamentals",
      description: "Learn core techniques for effective listening and empathy",
      type: "video",
      duration: "15 min",
      status: "required"
    },
    {
      title: "Crisis Recognition & Response",
      description: "How to identify and respond to mental health crises",
      type: "course",
      duration: "45 min",
      status: "required"
    },
    {
      title: "Boundary Setting for Volunteers",
      description: "Maintaining healthy boundaries while providing support",
      type: "article",
      duration: "10 min",
      status: "recommended"
    },
    {
      title: "Cultural Sensitivity in Mental Health",
      description: "Understanding diverse cultural perspectives on mental wellness",
      type: "webinar",
      duration: "30 min",
      status: "optional"
    }
  ];

  const guidelines = [
    {
      category: "Communication",
      rules: [
        "Always maintain a supportive and non-judgmental tone",
        "Use person-first language (e.g., 'person experiencing anxiety')",
        "Avoid giving direct advice; instead, help students explore their options",
        "Respect confidentiality and anonymity at all times"
      ]
    },
    {
      category: "Boundaries",
      rules: [
        "Do not share personal contact information",
        "Keep conversations within the platform",
        "End sessions if they become inappropriate or unsafe",
        "Take breaks between sessions to maintain your wellbeing"
      ]
    },
    {
      category: "Crisis Situations",
      rules: [
        "Immediately escalate if someone mentions self-harm or suicide",
        "Know emergency contacts and procedures",
        "Stay calm and follow crisis protocols",
        "Document incidents according to guidelines"
      ]
    }
  ];

  const supportContacts = [
    {
      name: "Volunteer Coordinator",
      role: "Sarah Johnson",
      phone: "(555) 123-HELP",
      email: "sarah.johnson@university.edu",
      hours: "Mon-Fri: 9AM-5PM"
    },
    {
      name: "Crisis Support Line",
      role: "Emergency Escalation",
      phone: "(555) 911-HELP",
      email: "crisis@university.edu",
      hours: "24/7 Available"
    },
    {
      name: "Volunteer Peer Support",
      role: "Volunteer Community",
      phone: "Group Chat",
      email: "volunteers@university.edu",
      hours: "Ongoing"
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'course': return BookOpen;
      case 'article': return FileText;
      case 'webinar': return Users;
      default: return FileText;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'required': return 'bg-destructive/20 text-destructive';
      case 'recommended': return 'bg-sunshine/20 text-sunshine';
      default: return 'bg-mint/20 text-mint';
    }
  };

  return (
    <div className="min-h-screen garden-bg p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-6">
          <h1 className="text-3xl font-heading font-bold text-glow">
            Volunteer Support Hub 📚
          </h1>
          <p className="text-muted-foreground">
            Resources, guidelines, and support for our volunteer community
          </p>
        </div>

        {/* Emergency Alert */}
        <Card className="floating-card border-destructive/20 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center font-heading text-destructive">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Crisis Response Protocol
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-destructive/10 p-4 rounded-xl">
              <p className="text-sm font-medium text-destructive mb-2">
                🚨 If a student mentions self-harm, suicide, or is in immediate danger:
              </p>
              <ol className="text-sm text-muted-foreground space-y-1">
                <li>1. Stay calm and supportive</li>
                <li>2. Immediately contact crisis line: <strong>(555) 911-HELP</strong></li>
                <li>3. Do not leave the student alone</li>
                <li>4. Follow up with volunteer coordinator</li>
              </ol>
            </div>
            
            <div className="flex space-x-3">
              <Button size="sm" variant="destructive" className="rounded-xl">
                <Phone className="w-4 h-4 mr-2" />
                Crisis Line: (555) 911-HELP
              </Button>
              <Button size="sm" variant="outline" className="rounded-xl">
                <FileText className="w-4 h-4 mr-2" />
                View Full Protocol
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Training Resources */}
        <Card className="floating-card">
          <CardHeader>
            <CardTitle className="font-heading flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-primary" />
              Training & Education
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trainingResources.map((resource, index) => {
                const Icon = getTypeIcon(resource.type);
                
                return (
                  <div 
                    key={index}
                    className="p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-garden rounded-full flex items-center justify-center">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm">{resource.title}</h3>
                          <p className="text-xs text-muted-foreground">{resource.duration}</p>
                        </div>
                      </div>
                      
                      <Badge className={`text-xs rounded-full ${getStatusColor(resource.status)}`}>
                        {resource.status}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4">
                      {resource.description}
                    </p>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" className="rounded-xl flex-1">
                        Start Learning
                      </Button>
                      <Button size="sm" variant="ghost" className="rounded-xl">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Guidelines */}
        <Card className="floating-card">
          <CardHeader>
            <CardTitle className="font-heading flex items-center">
              <Shield className="w-5 h-5 mr-2 text-primary" />
              Volunteer Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {guidelines.map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold mb-3 flex items-center">
                  <Lightbulb className="w-4 h-4 mr-2 text-sunshine" />
                  {section.category}
                </h3>
                <div className="space-y-2">
                  {section.rules.map((rule, ruleIndex) => (
                    <div 
                      key={ruleIndex}
                      className="flex items-start space-x-3 p-3 bg-muted/30 rounded-xl"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <p className="text-sm">{rule}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Support Contacts */}
        <Card className="floating-card">
          <CardHeader>
            <CardTitle className="font-heading flex items-center">
              <Users className="w-5 h-5 mr-2 text-primary" />
              Support Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {supportContacts.map((contact, index) => (
                <div 
                  key={index}
                  className="p-4 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl"
                >
                  <h3 className="font-semibold mb-1">{contact.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{contact.role}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-mint" />
                      <span>{contact.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="w-4 h-4 text-sky" />
                      <span>{contact.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-blush" />
                      <span>{contact.hours}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex space-x-2">
                    <Button size="sm" className="flex-1 rounded-xl">
                      Contact
                    </Button>
                    <Button size="sm" variant="ghost" className="rounded-xl">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Peer Support */}
        <Card className="floating-card bg-gradient-blossom text-white">
          <CardHeader>
            <CardTitle className="font-heading text-white flex items-center">
              <Heart className="w-5 h-5 mr-2" />
              Volunteer Community
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-white/90">
              Connect with fellow volunteers for support, advice, and community building.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-3 bg-white/10 rounded-xl">
                <h4 className="font-semibold mb-2">Monthly Meetups</h4>
                <p className="text-sm text-white/80">
                  Join our virtual coffee chats every first Friday
                </p>
              </div>
              
              <div className="p-3 bg-white/10 rounded-xl">
                <h4 className="font-semibold mb-2">Peer Mentorship</h4>
                <p className="text-sm text-white/80">
                  Get paired with experienced volunteers for guidance
                </p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button 
                variant="secondary"
                className="rounded-xl"
              >
                Join Community Chat
              </Button>
              <Button 
                variant="ghost" 
                className="rounded-xl text-white border-white/30 hover:bg-white/10"
              >
                Schedule Mentorship
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Self-Care Reminder */}
        <Card className="floating-card">
          <CardHeader>
            <CardTitle className="font-heading flex items-center">
              <Heart className="w-5 h-5 mr-2 text-blush" />
              Your Wellbeing Matters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="p-4 bg-blush/10 rounded-xl">
              <p className="font-medium text-blush mb-2">Remember to take care of yourself!</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Take breaks between sessions</li>
                <li>• Debrief difficult conversations with supervisors</li>
                <li>• Practice self-care activities regularly</li>
                <li>• Reach out for support when you need it</li>
              </ul>
            </div>
            
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="rounded-xl flex-1">
                Self-Care Resources
              </Button>
              <Button size="sm" variant="outline" className="rounded-xl flex-1">
                Request Debriefing
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VolunteerSupport;