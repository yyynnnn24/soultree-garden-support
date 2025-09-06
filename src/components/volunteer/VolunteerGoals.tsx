import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Target, 
  Star, 
  TrendingUp, 
  Calendar, 
  Award,
  Plus,
  CheckCircle2,
  MessageCircle,
  Clock,
  Heart
} from "lucide-react";

interface Goal {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  category: 'chats' | 'articles' | 'feedback' | 'hours';
  deadline: Date;
  status: 'active' | 'completed' | 'paused';
}

interface Feedback {
  id: string;
  studentName: string;
  rating: number;
  comment: string;
  date: Date;
  chatTopic: string;
}

const VolunteerGoals = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Weekly Chat Sessions',
      description: 'Complete 10 meaningful conversations with students',
      target: 10,
      current: 7,
      category: 'chats',
      deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      status: 'active'
    },
    {
      id: '2',
      title: 'Content Creation',
      description: 'Write 2 helpful articles this month',
      target: 2,
      current: 1,
      category: 'articles',
      deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      status: 'active'
    },
    {
      id: '3',
      title: 'Volunteer Hours',
      description: 'Contribute 20 hours of volunteer work this month',
      target: 20,
      current: 15,
      category: 'hours',
      deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      status: 'active'
    }
  ]);

  const [feedback, setFeedback] = useState<Feedback[]>([
    {
      id: '1',
      studentName: 'StudyStressed',
      rating: 5,
      comment: 'Really helpful conversation! Felt much better after our chat about exam anxiety.',
      date: new Date(Date.now() - 2 * 60 * 60 * 1000),
      chatTopic: 'Exam anxiety'
    },
    {
      id: '2',
      studentName: 'HomesickFreshman',
      rating: 5,
      comment: 'Thank you for listening and understanding. Your advice really helped.',
      date: new Date(Date.now() - 6 * 60 * 60 * 1000),
      chatTopic: 'Homesickness'
    },
    {
      id: '3',
      studentName: 'QuietSoul',
      rating: 4,
      comment: 'Good conversation, appreciate the patience and support.',
      date: new Date(Date.now() - 12 * 60 * 60 * 1000),
      chatTopic: 'Social anxiety'
    }
  ]);

  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    target: 1,
    category: 'chats' as Goal['category'],
    deadline: ''
  });

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleCreateGoal = () => {
    if (!newGoal.title.trim() || !newGoal.deadline) return;

    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      description: newGoal.description,
      target: newGoal.target,
      current: 0,
      category: newGoal.category,
      deadline: new Date(newGoal.deadline),
      status: 'active'
    };

    setGoals(prev => [goal, ...prev]);
    setNewGoal({ title: '', description: '', target: 1, category: 'chats', deadline: '' });
    setIsCreateDialogOpen(false);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'chats': return MessageCircle;
      case 'articles': return Star;
      case 'hours': return Clock;
      default: return Target;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'chats': return 'text-primary';
      case 'articles': return 'text-blush';
      case 'hours': return 'text-mint';
      default: return 'text-sunshine';
    }
  };

  const averageRating = feedback.length > 0 
    ? (feedback.reduce((sum, fb) => sum + fb.rating, 0) / feedback.length).toFixed(1)
    : '0.0';

  const completedGoals = goals.filter(goal => goal.current >= goal.target).length;
  const totalGoals = goals.length;

  return (
    <div className="min-h-screen garden-bg p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold text-glow">
              Goals & Feedback ⭐
            </h1>
            <p className="text-muted-foreground">
              Track your progress and see the impact you're making
            </p>
          </div>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl btn-magical">
                <Plus className="w-4 h-4 mr-2" />
                New Goal
              </Button>
            </DialogTrigger>
            
            <DialogContent className="rounded-3xl">
              <DialogHeader>
                <DialogTitle className="font-heading">Create New Goal</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Goal Title</Label>
                  <Input
                    id="title"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Complete 15 chat sessions"
                    className="rounded-xl"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={newGoal.description}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief description of your goal"
                    className="rounded-xl"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { value: 'chats', label: 'Chats' },
                        { value: 'articles', label: 'Articles' },
                        { value: 'hours', label: 'Hours' },
                        { value: 'feedback', label: 'Feedback' }
                      ].map((option) => (
                        <Button
                          key={option.value}
                          variant={newGoal.category === option.value ? 'default' : 'outline'}
                          onClick={() => setNewGoal(prev => ({ 
                            ...prev, 
                            category: option.value as Goal['category'] 
                          }))}
                          className="rounded-xl text-sm"
                          size="sm"
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="target">Target Number</Label>
                    <Input
                      id="target"
                      type="number"
                      min="1"
                      value={newGoal.target}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, target: parseInt(e.target.value) || 1 }))}
                      className="rounded-xl"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="deadline">Deadline</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, deadline: e.target.value }))}
                    className="rounded-xl"
                  />
                </div>
                
                <div className="flex space-x-3">
                  <Button
                    onClick={() => setIsCreateDialogOpen(false)}
                    variant="outline"
                    className="flex-1 rounded-xl"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateGoal}
                    disabled={!newGoal.title.trim() || !newGoal.deadline}
                    className="flex-1 rounded-xl"
                  >
                    Create Goal
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="floating-card">
            <CardContent className="p-4 text-center">
              <Target className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary">{completedGoals}/{totalGoals}</div>
              <p className="text-sm text-muted-foreground">Goals Completed</p>
            </CardContent>
          </Card>
          
          <Card className="floating-card">
            <CardContent className="p-4 text-center">
              <Star className="w-8 h-8 text-sunshine mx-auto mb-2" />
              <div className="text-2xl font-bold text-sunshine">{averageRating}</div>
              <p className="text-sm text-muted-foreground">Avg Rating</p>
            </CardContent>
          </Card>
          
          <Card className="floating-card">
            <CardContent className="p-4 text-center">
              <MessageCircle className="w-8 h-8 text-mint mx-auto mb-2" />
              <div className="text-2xl font-bold text-mint">{feedback.length}</div>
              <p className="text-sm text-muted-foreground">Recent Feedback</p>
            </CardContent>
          </Card>
          
          <Card className="floating-card">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-blush mx-auto mb-2" />
              <div className="text-2xl font-bold text-blush">+12%</div>
              <p className="text-sm text-muted-foreground">This Week</p>
            </CardContent>
          </Card>
        </div>

        {/* Active Goals */}
        <Card className="floating-card">
          <CardHeader>
            <CardTitle className="font-heading flex items-center">
              <Target className="w-5 h-5 mr-2 text-primary" />
              Active Goals ({goals.filter(g => g.status === 'active').length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {goals.filter(goal => goal.status === 'active').map((goal) => {
              const Icon = getCategoryIcon(goal.category);
              const colorClass = getCategoryColor(goal.category);
              const progress = (goal.current / goal.target) * 100;
              const isCompleted = goal.current >= goal.target;
              
              return (
                <div 
                  key={goal.id}
                  className={`p-4 rounded-xl border transition-colors ${
                    isCompleted 
                      ? 'bg-mint/20 border-mint/30' 
                      : 'bg-muted/30 hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-garden rounded-full flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold flex items-center">
                          {goal.title}
                          {isCompleted && <CheckCircle2 className="w-4 h-4 ml-2 text-mint" />}
                        </h3>
                        <p className="text-sm text-muted-foreground">{goal.description}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <Badge variant="outline" className="rounded-full text-xs mb-1">
                        Due {formatDate(goal.deadline)}
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        {goal.current}/{goal.target}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className={colorClass}>Progress</span>
                      <span className="font-medium">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                </div>
              );
            })}
            
            {goals.filter(g => g.status === 'active').length === 0 && (
              <div className="text-center py-8">
                <Target className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground">
                  No active goals. Set your first goal to start tracking progress!
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Feedback */}
        <Card className="floating-card">
          <CardHeader>
            <CardTitle className="font-heading flex items-center">
              <Star className="w-5 h-5 mr-2 text-sunshine" />
              Recent Student Feedback
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {feedback.map((fb) => (
              <div 
                key={fb.id}
                className="p-4 bg-muted/30 rounded-xl"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-blossom rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {fb.studentName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{fb.studentName}</p>
                      <p className="text-xs text-muted-foreground">
                        {fb.chatTopic} • {formatTimeAgo(fb.date)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= fb.rating
                            ? 'text-sunshine fill-sunshine'
                            : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                
                <p className="text-sm p-3 bg-card rounded-xl">
                  "{fb.comment}"
                </p>
              </div>
            ))}
            
            {feedback.length === 0 && (
              <div className="text-center py-8">
                <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground">
                  No feedback yet. Complete some chat sessions to start receiving feedback!
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="floating-card bg-gradient-sunrise text-white">
          <CardHeader>
            <CardTitle className="font-heading flex items-center text-white">
              <Award className="w-5 h-5 mr-2" />
              Your Impact This Month 🏆
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
              <div className="text-center">
                <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-80" />
                <div className="text-2xl font-bold">24</div>
                <p className="text-sm opacity-90">Students Helped</p>
              </div>
              
              <div className="text-center">
                <Clock className="w-8 h-8 mx-auto mb-2 opacity-80" />
                <div className="text-2xl font-bold">15h</div>
                <p className="text-sm opacity-90">Hours Volunteered</p>
              </div>
              
              <div className="text-center">
                <Star className="w-8 h-8 mx-auto mb-2 opacity-80" />
                <div className="text-2xl font-bold">4.8</div>
                <p className="text-sm opacity-90">Avg Rating</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-white/10 rounded-xl">
              <p className="text-sm text-center">
                🌟 You're making a real difference in students' lives. Thank you for your dedication!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VolunteerGoals;