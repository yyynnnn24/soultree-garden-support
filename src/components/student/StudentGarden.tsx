import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Smile, 
  Meh, 
  Frown, 
  Sun, 
  Cloud, 
  CloudRain, 
  Plus,
  TreePine,
  Flower,
  CheckCircle2
} from "lucide-react";
import gardenHero from "@/assets/garden-hero.jpg";
import treeHoleIcon from "@/assets/tree-hole-icon.jpg";

const StudentGarden = () => {
  const navigate = useNavigate();
  const [currentMood, setCurrentMood] = useState<string>('');
  const [gardenLevel, setGardenLevel] = useState(3);
  const [weeklyProgress, setWeeklyProgress] = useState(65);
  const [todos, setTodos] = useState([
    { id: 1, text: "Complete morning meditation", completed: true },
    { id: 2, text: "Take a 10-minute walk", completed: false },
    { id: 3, text: "Practice deep breathing", completed: false },
    { id: 4, text: "Write in gratitude journal", completed: false },
  ]);

  const user = JSON.parse(localStorage.getItem('soultree_user') || '{}');

  const moodOptions = [
    { icon: Sun, label: 'Great', color: 'text-sunshine', value: 'great' },
    { icon: Smile, label: 'Good', color: 'text-mint', value: 'good' },
    { icon: Meh, label: 'Okay', color: 'text-sky', value: 'okay' },
    { icon: Cloud, label: 'Low', color: 'text-lavender', value: 'low' },
    { icon: CloudRain, label: 'Difficult', color: 'text-blush', value: 'difficult' },
  ];

  const toggleTodo = (id: number) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const completedTodos = todos.filter(todo => todo.completed).length;
  const todoProgress = (completedTodos / todos.length) * 100;

  return (
    <div className="min-h-screen garden-bg relative overflow-y-auto pb-20">
      {/* Background */}
      <div 
        className="absolute inset-0 opacity-30 bg-cover bg-center"
        style={{ backgroundImage: `url(${gardenHero})` }}
      />
      <div className="absolute inset-0 bg-gradient-peaceful" />
      
      {/* Content */}
      <div className="relative z-10 p-4 space-y-6 max-w-6xl mx-auto">
        {/* Welcome Header */}
        <div className="text-center py-4">
          <h1 className="text-2xl font-heading font-bold text-glow mb-1">
            Welcome back, {user.nickname}! 🌱
          </h1>
          <p className="text-sm text-muted-foreground">
            Your digital garden is growing beautifully
          </p>
        </div>

        {/* Garden Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="floating-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium flex items-center">
                <TreePine className="w-3 h-3 mr-1 text-mint" />
                Garden Level
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-mint">{gardenLevel}</div>
              <p className="text-xs text-muted-foreground">Keep nurturing to grow!</p>
            </CardContent>
          </Card>

          <Card className="floating-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium flex items-center">
                <Flower className="w-3 h-3 mr-1 text-blush" />
                Weekly Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-xl font-bold text-blush">{weeklyProgress}%</div>
                <Progress value={weeklyProgress} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="floating-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium flex items-center">
                <CheckCircle2 className="w-3 h-3 mr-1 text-sky" />
                Daily Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-xl font-bold text-sky">{completedTodos}/{todos.length}</div>
                <Progress value={todoProgress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Garden Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Mood Tracker */}
          <Card className="floating-card lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base font-heading flex items-center">
                <Sun className="w-4 h-4 mr-2 text-sunshine" />
                How are you feeling today?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-3">
                {moodOptions.map((mood) => {
                  const Icon = mood.icon;
                  const isSelected = currentMood === mood.value;
                  
                  return (
                    <button
                      key={mood.value}
                      onClick={() => setCurrentMood(mood.value)}
                      className={`flex flex-col items-center space-y-2 p-4 rounded-2xl transition-all duration-300 ${
                        isSelected 
                          ? 'bg-primary/10 scale-105 shadow-glow' 
                          : 'hover:bg-muted/50 hover:scale-102'
                      }`}
                    >
                      <Icon className={`w-8 h-8 ${mood.color} ${isSelected ? 'animate-pulse' : ''}`} />
                      <span className="text-xs font-medium">{mood.label}</span>
                    </button>
                  );
                })}
              </div>
              
              {currentMood && (
                <div className="mt-4 p-3 bg-muted/50 rounded-xl">
                  <p className="text-sm text-muted-foreground">
                    Mood logged for today! Your feelings help your garden grow. 🌸
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tree Hole Access */}
          <Card className="floating-card pulse-glow">
            <CardHeader>
              <CardTitle className="text-base font-heading">Tree Hole</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-3">
              <div 
                className="w-20 h-20 mx-auto rounded-full bg-cover bg-center floating"
                style={{ backgroundImage: `url(${treeHoleIcon})` }}
              />
              <div>
                <h3 className="text-sm font-medium mb-2">Need someone to talk to?</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Connect anonymously with a trained volunteer for support.
                </p>
                <Button
                  onClick={() => navigate('/tree-hole')}
                  className="w-full btn-magical rounded-xl"
                >
                  Enter Tree Hole 🌳
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Daily Tasks */}
        <Card className="floating-card">
          <CardHeader>
            <CardTitle className="text-base font-heading flex items-center justify-between">
              <span className="flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-2 text-primary" />
                Today's Self-Care Tasks
              </span>
              <Badge variant="secondary" className="text-xs rounded-full">
                {completedTodos}/{todos.length} Complete
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  onClick={() => toggleTodo(todo.id)}
                  className={`flex items-center space-x-3 p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                    todo.completed
                      ? 'bg-mint/20 text-mint-foreground'
                      : 'bg-muted/50 hover:bg-muted'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    todo.completed
                      ? 'bg-mint border-mint text-white'
                      : 'border-muted-foreground'
                  }`}>
                    {todo.completed && <CheckCircle2 className="w-3 h-3" />}
                  </div>
                  <span className={`flex-1 ${todo.completed ? 'line-through' : ''}`}>
                    {todo.text}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-3 p-3 bg-gradient-garden rounded-xl text-white">
              <p className="text-xs font-medium">
                🌟 Complete tasks to help your garden flourish and unlock new features!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentGarden;