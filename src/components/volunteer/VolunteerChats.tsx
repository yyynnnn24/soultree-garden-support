import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  MessageCircle, 
  Clock, 
  User, 
  ArrowRight, 
  CheckCircle,
  AlertCircle,
  Heart,
  Star
} from "lucide-react";

interface ChatRequest {
  id: string;
  topic: string;
  mood: string;
  timestamp: Date;
  status: 'waiting' | 'active' | 'completed';
  studentNickname: string;
  priority: 'low' | 'medium' | 'high';
}

const VolunteerChats = () => {
  const navigate = useNavigate();
  const [chatRequests, setChatRequests] = useState<ChatRequest[]>([
    {
      id: '1',
      topic: 'Feeling overwhelmed with midterm exams',
      mood: 'anxious',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      status: 'waiting',
      studentNickname: 'StudyStressed',
      priority: 'high'
    },
    {
      id: '2',
      topic: 'Struggling with homesickness',
      mood: 'sad',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      status: 'waiting',
      studentNickname: 'HomesickFreshman',
      priority: 'medium'
    },
    {
      id: '3',
      topic: 'Need someone to talk to about social anxiety',
      mood: 'nervous',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      status: 'active',
      studentNickname: 'QuietSoul',
      priority: 'medium'
    },
    {
      id: '4',
      topic: 'Celebrating small wins today!',
      mood: 'happy',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      status: 'completed',
      studentNickname: 'PositiveVibes',
      priority: 'low'
    }
  ]);

  const acceptChat = (chatId: string) => {
    setChatRequests(prev => prev.map(chat =>
      chat.id === chatId ? { ...chat, status: 'active' as const } : chat
    ));
    // In a real app, navigate to actual chat
    navigate('/tree-hole');
  };

  const completeChat = (chatId: string) => {
    setChatRequests(prev => prev.map(chat =>
      chat.id === chatId ? { ...chat, status: 'completed' as const } : chat
    ));
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    return `${Math.floor(minutes / 60)}h ago`;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-destructive bg-destructive/10';
      case 'medium': return 'text-sunshine bg-sunshine/10';
      default: return 'text-mint bg-mint/10';
    }
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'anxious': return 'text-blush';
      case 'sad': return 'text-sky';
      case 'nervous': return 'text-lavender';
      case 'happy': return 'text-sunshine';
      default: return 'text-primary';
    }
  };

  const waitingChats = chatRequests.filter(chat => chat.status === 'waiting');
  const activeChats = chatRequests.filter(chat => chat.status === 'active');
  const completedChats = chatRequests.filter(chat => chat.status === 'completed');

  return (
    <div className="min-h-screen garden-bg p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="floating-card">
            <CardContent className="p-4 text-center">
              <MessageCircle className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary">{waitingChats.length}</div>
              <p className="text-sm text-muted-foreground">Waiting</p>
            </CardContent>
          </Card>
          
          <Card className="floating-card">
            <CardContent className="p-4 text-center">
              <Clock className="w-8 h-8 text-sunshine mx-auto mb-2" />
              <div className="text-2xl font-bold text-sunshine">{activeChats.length}</div>
              <p className="text-sm text-muted-foreground">Active</p>
            </CardContent>
          </Card>
          
          <Card className="floating-card">
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-8 h-8 text-mint mx-auto mb-2" />
              <div className="text-2xl font-bold text-mint">{completedChats.length}</div>
              <p className="text-sm text-muted-foreground">Completed Today</p>
            </CardContent>
          </Card>
          
          <Card className="floating-card">
            <CardContent className="p-4 text-center">
              <Star className="w-8 h-8 text-blush mx-auto mb-2" />
              <div className="text-2xl font-bold text-blush">4.9</div>
              <p className="text-sm text-muted-foreground">Avg Rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Waiting Requests */}
        {waitingChats.length > 0 && (
          <Card className="floating-card">
            <CardHeader>
              <CardTitle className="font-heading flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-primary" />
                Students Waiting for Support ({waitingChats.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {waitingChats.map((chat) => (
                <div 
                  key={chat.id}
                  className="p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-garden rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{chat.studentNickname}</p>
                        <p className="text-xs text-muted-foreground flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {formatTimeAgo(chat.timestamp)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge className={`text-xs rounded-full ${getPriorityColor(chat.priority)}`}>
                        {chat.priority} priority
                      </Badge>
                      <Badge variant="outline" className={`text-xs rounded-full ${getMoodColor(chat.mood)}`}>
                        {chat.mood}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-sm mb-4 p-3 bg-card rounded-xl">
                    "{chat.topic}"
                  </p>
                  
                  <div className="flex space-x-3">
                    <Button
                      onClick={() => acceptChat(chat.id)}
                      className="flex-1 rounded-xl btn-magical"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Start Conversation
                    </Button>
                    <Button variant="ghost" size="sm" className="rounded-xl">
                      View Profile
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Active Conversations */}
        {activeChats.length > 0 && (
          <Card className="floating-card">
            <CardHeader>
              <CardTitle className="font-heading flex items-center">
                <MessageCircle className="w-5 h-5 mr-2 text-sunshine" />
                Active Conversations ({activeChats.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeChats.map((chat) => (
                <div 
                  key={chat.id}
                  className="p-4 bg-sunshine/10 rounded-xl border border-sunshine/20"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-sunshine rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{chat.studentNickname}</p>
                        <p className="text-xs text-muted-foreground">
                          Topic: {chat.topic.substring(0, 40)}...
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => navigate('/tree-hole')}
                        size="sm"
                        className="rounded-xl"
                      >
                        Continue Chat
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                      <Button
                        onClick={() => completeChat(chat.id)}
                        variant="outline"
                        size="sm"
                        className="rounded-xl"
                      >
                        End Chat
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Recent Completed */}
        <Card className="floating-card">
          <CardHeader>
            <CardTitle className="font-heading flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-mint" />
              Recent Completed Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {completedChats.length > 0 ? (
              <div className="space-y-3">
                {completedChats.map((chat) => (
                  <div 
                    key={chat.id}
                    className="flex items-center justify-between p-3 bg-mint/10 rounded-xl"
                  >
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-mint" />
                      <div>
                        <p className="font-medium text-sm">{chat.studentNickname}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatTimeAgo(chat.timestamp)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="flex text-sunshine">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                      <Badge variant="secondary" className="text-xs rounded-full">
                        Positive feedback
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground">
                  No completed sessions today. Ready to help someone?
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="floating-card bg-gradient-garden text-white">
          <CardHeader>
            <CardTitle className="font-heading text-white">
              Ready to Make a Difference? 🌱
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-white/90">
              Every conversation you have helps someone feel less alone. Your support matters.
            </p>
            <div className="flex space-x-3">
              <Button 
                variant="secondary"
                className="rounded-xl"
                disabled={waitingChats.length === 0}
              >
                Accept Next Request
              </Button>
              <Button 
                variant="ghost" 
                className="rounded-xl text-white border-white/30 hover:bg-white/10"
              >
                View Guidelines
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VolunteerChats;