import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Sprout, Users, Smile } from "lucide-react";
import gardenHero from "@/assets/garden-hero.jpg";

const Index = () => {
  const navigate = useNavigate();
  const [studentNickname, setStudentNickname] = useState("");
  const [volunteerEmail, setVolunteerEmail] = useState("");
  const [volunteerPassword, setVolunteerPassword] = useState("");

  const handleStudentLogin = () => {
    if (studentNickname.trim()) {
      // Store nickname in localStorage for demo
      localStorage.setItem('soultree_user', JSON.stringify({
        type: 'student',
        nickname: studentNickname
      }));
      navigate('/student/garden');
    }
  };

  const handleVolunteerLogin = () => {
    if (volunteerEmail && volunteerPassword) {
      // Store volunteer info for demo
      localStorage.setItem('soultree_user', JSON.stringify({
        type: 'volunteer',
        email: volunteerEmail
      }));
      navigate('/volunteer/chats');
    }
  };

  return (
    <div className="min-h-screen garden-bg relative overflow-hidden">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 opacity-40 bg-cover bg-center"
        style={{ backgroundImage: `url(${gardenHero})` }}
      />
      <div className="absolute inset-0 bg-gradient-peaceful" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        {/* Logo & Title */}
        <div className="text-center mb-8 space-y-4">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Sprout className="w-12 h-12 text-primary pulse-glow" />
            <h1 className="text-6xl font-heading font-bold text-glow">
              SoulTree
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Your digital garden for mental wellness. Connect, grow, and find support in a safe, 
            nurturing community designed for university students.
          </p>
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <Card className="floating-card text-center p-6">
            <Heart className="w-8 h-8 text-blush mx-auto mb-3" />
            <h3 className="font-heading font-semibold text-lg mb-2">Anonymous Support</h3>
            <p className="text-sm text-muted-foreground">
              Connect with trained volunteers through our Tree Hole feature
            </p>
          </Card>
          
          <Card className="floating-card text-center p-6">
            <Users className="w-8 h-8 text-sky mx-auto mb-3" />
            <h3 className="font-heading font-semibold text-lg mb-2">Community</h3>
            <p className="text-sm text-muted-foreground">
              Share experiences and find encouragement in our supportive community
            </p>
          </Card>
          
          <Card className="floating-card text-center p-6">
            <Smile className="w-8 h-8 text-sunshine mx-auto mb-3" />
            <h3 className="font-heading font-semibold text-lg mb-2">Wellness Tools</h3>
            <p className="text-sm text-muted-foreground">
              Access meditation, mood tracking, and self-care resources
            </p>
          </Card>
        </div>

        {/* Authentication Tabs */}
        <Card className="floating-card w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="font-heading">Welcome to SoulTree</CardTitle>
            <CardDescription>
              Choose how you'd like to join our community
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="student" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="student" className="font-medium">
                  I'm a Student
                </TabsTrigger>
                <TabsTrigger value="volunteer" className="font-medium">
                  I'm a Volunteer
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="student" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="nickname" className="text-sm font-medium">
                    Choose a nickname (anonymous)
                  </Label>
                  <Input
                    id="nickname"
                    placeholder="e.g. Garden_Walker, Peaceful_Soul"
                    value={studentNickname}
                    onChange={(e) => setStudentNickname(e.target.value)}
                    className="rounded-xl"
                  />
                  <p className="text-xs text-muted-foreground">
                    No personal information required. Your privacy is protected.
                  </p>
                </div>
                
                <Button 
                  onClick={handleStudentLogin}
                  disabled={!studentNickname.trim()}
                  className="w-full btn-magical rounded-xl font-medium py-3"
                >
                  Enter My Garden 🌱
                </Button>
              </TabsContent>
              
              <TabsContent value="volunteer" className="space-y-4 mt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="volunteer@university.edu"
                      value={volunteerEmail}
                      onChange={(e) => setVolunteerEmail(e.target.value)}
                      className="rounded-xl"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={volunteerPassword}
                      onChange={(e) => setVolunteerPassword(e.target.value)}
                      className="rounded-xl"
                    />
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    Volunteers must be verified. New to volunteering? 
                    <span className="text-primary cursor-pointer hover:underline ml-1">
                      Apply here
                    </span>
                  </p>
                </div>
                
                <Button 
                  onClick={handleVolunteerLogin}
                  disabled={!volunteerEmail || !volunteerPassword}
                  className="w-full btn-magical rounded-xl font-medium py-3"
                  variant="secondary"
                >
                  Access Support Hub 🤝
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;