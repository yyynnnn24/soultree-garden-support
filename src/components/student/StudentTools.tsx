import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Brain, 
  Headphones, 
  Wind, 
  Quote, 
  Mic, 
  Moon, 
  Play, 
  Pause,
  SkipForward,
  Volume2
} from "lucide-react";
import wellnessIcons from "@/assets/wellness-icons.jpg";

interface Tool {
  id: string;
  title: string;
  description: string;
  category: 'meditation' | 'breathing' | 'asmr' | 'quotes' | 'podcasts' | 'timer';
  duration?: string;
  icon: React.ElementType;
  color: string;
}

const StudentTools = () => {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const tools: Tool[] = [
    {
      id: '1',
      title: "Breathing",
      description: "Guided breathing exercise",
      category: 'breathing',
      duration: "5 min",
      icon: Wind,
      color: 'text-green-600'
    },
    {
      id: '2',
      title: "Meditation",
      description: "Mindfulness & relaxation",
      category: 'meditation',
      duration: "10-20 min",
      icon: Brain,
      color: 'text-purple-600'
    },
    {
      id: '3',
      title: "ASMR & Sounds",
      description: "Calming audio experiences",
      category: 'asmr',
      duration: "30+ min",
      icon: Headphones,
      color: 'text-blue-600'
    },
    {
      id: '4',
      title: "Daily Quotes",
      description: "Uplifting & motivational",
      category: 'quotes',
      icon: Quote,
      color: 'text-pink-600'
    },
    {
      id: '5',
      title: "Mental Health Talks",
      description: "Educational podcasts about wellness and self-care",
      category: 'podcasts',
      duration: "15-45 min",
      icon: Mic,
      color: 'text-yellow-600'
    },
    {
      id: '6',
      title: "Guided Rest",
      description: "Progressive muscle relaxation",
      category: 'timer',
      duration: "25 min",
      icon: Moon,
      color: 'text-green-600'
    }
  ];

  const quotes = [
    "You are braver than you believe, stronger than you seem, and smarter than you think.",
    "Progress, not perfection, is what we should strive for.",
    "Your mental health is just as important as your physical health.",
    "It's okay to not be okay. What's important is that you're trying.",
    "Every small step forward is still progress."
  ];

  const [currentQuote, setCurrentQuote] = useState(0);

  const openTool = (tool: Tool) => {
    setSelectedTool(tool);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const renderToolContent = () => {
    if (!selectedTool) return null;

    switch (selectedTool.category) {
      case 'breathing':
        return (
          <div className="space-y-6 text-center">
            <div className="w-32 h-32 mx-auto bg-gradient-garden rounded-full flex items-center justify-center animate-pulse">
              <Wind className="w-12 h-12 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-heading font-semibold mb-4">4-7-8 Breathing</h3>
              <div className="space-y-2 text-sm">
                <p>1. Inhale through nose for 4 seconds</p>
                <p>2. Hold breath for 7 seconds</p>
                <p>3. Exhale through mouth for 8 seconds</p>
                <p>4. Repeat 3-4 times</p>
              </div>
            </div>
            <Button onClick={togglePlayPause} className="rounded-xl px-8">
              {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isPlaying ? 'Pause' : 'Start'} Exercise
            </Button>
          </div>
        );

      case 'meditation':
        return (
          <div className="space-y-6 text-center">
            <div className="w-32 h-32 mx-auto bg-gradient-blossom rounded-full flex items-center justify-center floating">
              <Brain className="w-12 h-12 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-heading font-semibold mb-4">Guided Meditation</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Find a comfortable position and let your mind settle into peace.
              </p>
              <div className="bg-muted/50 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span>0:00</span>
                  <span>10:00</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mt-2">
                  <div className="bg-primary h-2 rounded-full w-1/4"></div>
                </div>
              </div>
            </div>
            <div className="flex space-x-3 justify-center">
              <Button variant="outline" size="sm" className="rounded-xl">
                <SkipForward className="w-4 h-4" />
              </Button>
              <Button onClick={togglePlayPause} className="rounded-xl px-6">
                {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isPlaying ? 'Pause' : 'Play'}
              </Button>
              <Button variant="outline" size="sm" className="rounded-xl">
                <Volume2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        );

      case 'quotes':
        return (
          <div className="space-y-6 text-center">
            <div className="p-8 bg-gradient-sunrise rounded-2xl text-white">
              <Quote className="w-8 h-8 mx-auto mb-4 opacity-80" />
              <p className="text-lg font-medium leading-relaxed">
                "{quotes[currentQuote]}"
              </p>
            </div>
            <div className="flex space-x-3 justify-center">
              <Button
                variant="outline"
                onClick={() => setCurrentQuote((prev) => (prev - 1 + quotes.length) % quotes.length)}
                className="rounded-xl"
              >
                Previous
              </Button>
              <Button
                onClick={() => setCurrentQuote((prev) => (prev + 1) % quotes.length)}
                className="rounded-xl"
              >
                Next Quote
              </Button>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6 text-center">
            <div className="w-32 h-32 mx-auto bg-gradient-garden rounded-full flex items-center justify-center">
              <selectedTool.icon className="w-12 h-12 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-heading font-semibold mb-4">{selectedTool.title}</h3>
              <p className="text-muted-foreground mb-4">{selectedTool.description}</p>
            </div>
            <Button onClick={togglePlayPause} className="rounded-xl px-8">
              {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isPlaying ? 'Stop' : 'Start'}
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen garden-bg p-4 overflow-y-auto pb-20">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Header */}
        <div className="text-center py-4">
          <h1 className="text-2xl font-heading font-bold text-glow mb-1">
            Wellness Toolkit 🧘‍♀️
          </h1>
          <p className="text-sm text-muted-foreground">
            Discover tools and techniques for better mental health
          </p>
        </div>

        {/* Wellness Icons Banner */}
        <Card className="floating-card overflow-hidden">
          <div 
            className="h-24 bg-cover bg-center opacity-60"
            style={{ backgroundImage: `url(${wellnessIcons})` }}
          />
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">
              Take a moment for yourself. Your wellbeing matters. 🌸
            </p>
          </CardContent>
        </Card>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => {
            const Icon = tool.icon;
            
            return (
              <Card 
                key={tool.id} 
                className="floating-card cursor-pointer group"
                onClick={() => openTool(tool)}
              >
                <CardHeader className="text-center pb-2">
                  <div className="flex justify-center mb-2">
                    <div className="w-12 h-12 bg-gradient-garden rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className={`w-6 h-6 text-white`} />
                    </div>
                  </div>
                  <CardTitle className="text-base font-heading">{tool.title}</CardTitle>
                </CardHeader>
                
                <CardContent className="text-center space-y-2">
                  <p className="text-xs text-muted-foreground">
                    {tool.description}
                  </p>
                  
                  {tool.duration && (
                    <Badge variant="secondary" className="rounded-full">
                      {tool.duration}
                    </Badge>
                  )}
                  
                  <Button 
                    variant="ghost" 
                    className="w-full rounded-xl group-hover:bg-primary/10"
                  >
                    Try Now
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Access */}
        <Card className="floating-card">
          <CardHeader>
            <CardTitle className="text-base font-heading">Quick Start</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button 
                variant="outline" 
                className="rounded-xl p-4 h-auto flex-col space-y-2"
                onClick={() => openTool(tools[0])}
              >
                <Wind className="w-6 h-6 text-sky" />
                <span className="text-xs">Quick Breathing</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="rounded-xl p-4 h-auto flex-col space-y-2"
                onClick={() => openTool(tools[3])}
              >
                <Quote className="w-6 h-6 text-sunshine" />
                <span className="text-xs">Daily Quote</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="rounded-xl p-4 h-auto flex-col space-y-2"
                onClick={() => openTool(tools[1])}
              >
                <Brain className="w-6 h-6 text-lavender" />
                <span className="text-xs">5min Meditation</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="rounded-xl p-4 h-auto flex-col space-y-2"
                onClick={() => openTool(tools[2])}
              >
                <Headphones className="w-6 h-6 text-mint" />
                <span className="text-xs">Nature Sounds</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tool Dialog */}
      <Dialog open={!!selectedTool} onOpenChange={() => setSelectedTool(null)}>
        <DialogContent className="rounded-3xl max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-base font-heading">
              {selectedTool?.title}
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            {renderToolContent()}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentTools;
