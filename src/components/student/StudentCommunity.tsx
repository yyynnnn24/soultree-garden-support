import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Heart, MessageCircle, Plus, Send, Sparkles } from "lucide-react";

interface Post {
  id: string;
  content: string;
  author: string;
  timestamp: Date;
  likes: number;
  comments: number;
  type: 'student' | 'volunteer';
  tags: string[];
}

const StudentCommunity = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      content: "Starting my day with gratitude 🌅 Three things I'm thankful for: my morning coffee, the sunshine streaming through my window, and this supportive community. What's bringing you joy today?",
      author: "Sunrise_Walker",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      likes: 12,
      comments: 3,
      type: 'student',
      tags: ['gratitude', 'morning']
    },
    {
      id: '2',
      content: "💡 Mindful Moment: Remember, it's okay to take breaks. Your productivity doesn't define your worth. You're valuable simply because you exist. 🌱",
      author: "Dr. Sarah (Counselor)",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      likes: 28,
      comments: 7,
      type: 'volunteer',
      tags: ['mindfulness', 'self-care', 'reminder']
    },
    {
      id: '3',
      content: "Just finished my first meditation session ever! 10 minutes felt like forever but I feel so much calmer. Baby steps count, right? 🧘‍♀️",
      author: "Peaceful_Beginner",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      likes: 19,
      comments: 8,
      type: 'student',
      tags: ['meditation', 'first-time', 'progress']
    },
    {
      id: '4',
      content: "🌿 Weekly Challenge: Try the 5-4-3-2-1 grounding technique when you feel overwhelmed. Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste.",
      author: "Wellness Team",
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      likes: 35,
      comments: 12,
      type: 'volunteer',
      tags: ['grounding', 'technique', 'weekly-challenge']
    }
  ]);

  const [newPost, setNewPost] = useState("");
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem('soultree_user') || '{}');

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const handlePost = () => {
    if (!newPost.trim()) return;

    const post: Post = {
      id: Date.now().toString(),
      content: newPost,
      author: user.nickname || "Anonymous",
      timestamp: new Date(),
      likes: 0,
      comments: 0,
      type: 'student',
      tags: []
    };

    setPosts(prev => [post, ...prev]);
    setNewPost("");
    setIsPostDialogOpen(false);
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="min-h-screen garden-bg p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-6">
          <h1 className="text-3xl font-heading font-bold text-glow mb-2">
            Community Garden 🌸
          </h1>
          <p className="text-muted-foreground">
            Share support, encouragement, and grow together
          </p>
        </div>

        {/* Create Post Button */}
        <Dialog open={isPostDialogOpen} onOpenChange={setIsPostDialogOpen}>
          <DialogTrigger asChild>
            <Card className="floating-card cursor-pointer hover:shadow-floating">
              <CardContent className="flex items-center space-x-3 p-4">
                <div className="w-10 h-10 bg-gradient-garden rounded-full flex items-center justify-center">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-muted-foreground">
                    Share something positive with the community...
                  </p>
                </div>
                <Sparkles className="w-5 h-5 text-primary" />
              </CardContent>
            </Card>
          </DialogTrigger>
          
          <DialogContent className="rounded-3xl">
            <DialogHeader>
              <DialogTitle className="font-heading">Share with Community</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <Textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Share something uplifting, ask for support, or encourage others..."
                className="rounded-xl resize-none min-h-24"
                rows={4}
              />
              
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  Posts are anonymous and supportive 💚
                </p>
                <Button
                  onClick={handlePost}
                  disabled={!newPost.trim()}
                  className="rounded-xl"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Posts Feed */}
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="floating-card">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                      post.type === 'volunteer' 
                        ? 'bg-gradient-blossom' 
                        : 'bg-gradient-garden'
                    }`}>
                      {post.author.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{post.author}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatTimeAgo(post.timestamp)}
                      </p>
                    </div>
                  </div>
                  
                  {post.type === 'volunteer' && (
                    <Badge variant="secondary" className="text-xs rounded-full">
                      Counselor
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <p className="text-sm leading-relaxed">{post.content}</p>
                
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {post.tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="outline" 
                        className="text-xs rounded-full"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center justify-between pt-2 border-t border-card-border">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-blush transition-colors"
                  >
                    <Heart className="w-4 h-4" />
                    <span>{post.likes}</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-sky transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments}</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <Card className="floating-card">
          <CardContent className="text-center p-6">
            <Button variant="ghost" className="rounded-xl">
              Load more posts
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentCommunity;