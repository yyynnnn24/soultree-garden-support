import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  FileText, 
  Mic, 
  Plus, 
  Eye, 
  Edit,
  Trash2,
  Calendar,
  User,
  Heart,
  MessageCircle
} from "lucide-react";

interface Article {
  id: string;
  title: string;
  content: string;
  type: 'article' | 'podcast';
  author: string;
  publishDate: Date;
  tags: string[];
  views: number;
  likes: number;
  comments: number;
  status: 'draft' | 'published';
}

const VolunteerArticles = () => {
  const [articles, setArticles] = useState<Article[]>([
    {
      id: '1',
      title: "Managing Academic Stress: 5 Proven Techniques",
      content: "Academic stress is a common experience for university students. Here are five evidence-based techniques to help manage stress levels and improve academic performance...",
      type: 'article',
      author: "Dr. Sarah Johnson",
      publishDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      tags: ['stress', 'academic', 'techniques'],
      views: 156,
      likes: 23,
      comments: 8,
      status: 'published'
    },
    {
      id: '2',
      title: "Mental Health Podcast: Anxiety and College Life",
      content: "In this episode, we discuss common anxiety triggers in college and practical coping strategies students can use in their daily lives...",
      type: 'podcast',
      author: "Mental Health Team",
      publishDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      tags: ['anxiety', 'podcast', 'coping'],
      views: 89,
      likes: 34,
      comments: 12,
      status: 'published'
    },
    {
      id: '3',
      title: "Building Resilience in University Students",
      content: "Draft: This article explores the concept of resilience and how students can develop this crucial skill...",
      type: 'article',
      author: "Dr. Michael Chen",
      publishDate: new Date(),
      tags: ['resilience', 'development'],
      views: 0,
      likes: 0,
      comments: 0,
      status: 'draft'
    }
  ]);

  const [newArticle, setNewArticle] = useState({
    title: '',
    content: '',
    type: 'article' as 'article' | 'podcast',
    tags: ''
  });

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleCreateArticle = () => {
    if (!newArticle.title.trim() || !newArticle.content.trim()) return;

    const article: Article = {
      id: Date.now().toString(),
      title: newArticle.title,
      content: newArticle.content,
      type: newArticle.type,
      author: "Current Volunteer", // Would get from user context
      publishDate: new Date(),
      tags: newArticle.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      views: 0,
      likes: 0,
      comments: 0,
      status: 'draft'
    };

    setArticles(prev => [article, ...prev]);
    setNewArticle({ title: '', content: '', type: 'article', tags: '' });
    setIsCreateDialogOpen(false);
  };

  const publishArticle = (articleId: string) => {
    setArticles(prev => prev.map(article =>
      article.id === articleId 
        ? { ...article, status: 'published' as const, publishDate: new Date() }
        : article
    ));
  };

  const deleteArticle = (articleId: string) => {
    setArticles(prev => prev.filter(article => article.id !== articleId));
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const publishedArticles = articles.filter(article => article.status === 'published');
  const draftArticles = articles.filter(article => article.status === 'draft');

  return (
    <div className="min-h-screen garden-bg p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold text-glow">
              Content & Resources 📚
            </h1>
            <p className="text-muted-foreground">
              Share knowledge and create supportive content for students
            </p>
          </div>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl btn-magical">
                <Plus className="w-4 h-4 mr-2" />
                Create Content
              </Button>
            </DialogTrigger>
            
            <DialogContent className="rounded-3xl max-w-2xl">
              <DialogHeader>
                <DialogTitle className="font-heading">Create New Content</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Content Type</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant={newArticle.type === 'article' ? 'default' : 'outline'}
                        onClick={() => setNewArticle(prev => ({ ...prev, type: 'article' }))}
                        className="rounded-xl"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Article
                      </Button>
                      <Button
                        variant={newArticle.type === 'podcast' ? 'default' : 'outline'}
                        onClick={() => setNewArticle(prev => ({ ...prev, type: 'podcast' }))}
                        className="rounded-xl"
                      >
                        <Mic className="w-4 h-4 mr-2" />
                        Podcast
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input
                      id="tags"
                      value={newArticle.tags}
                      onChange={(e) => setNewArticle(prev => ({ ...prev, tags: e.target.value }))}
                      placeholder="stress, anxiety, coping"
                      className="rounded-xl"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newArticle.title}
                    onChange={(e) => setNewArticle(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter a compelling title..."
                    className="rounded-xl"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={newArticle.content}
                    onChange={(e) => setNewArticle(prev => ({ ...prev, content: e.target.value }))}
                    placeholder={newArticle.type === 'article' 
                      ? "Write your article content..." 
                      : "Describe your podcast episode..."
                    }
                    className="rounded-xl resize-none min-h-32"
                    rows={6}
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
                    onClick={handleCreateArticle}
                    disabled={!newArticle.title.trim() || !newArticle.content.trim()}
                    className="flex-1 rounded-xl"
                  >
                    Save as Draft
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
              <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary">{publishedArticles.length}</div>
              <p className="text-sm text-muted-foreground">Published</p>
            </CardContent>
          </Card>
          
          <Card className="floating-card">
            <CardContent className="p-4 text-center">
              <Edit className="w-8 h-8 text-sunshine mx-auto mb-2" />
              <div className="text-2xl font-bold text-sunshine">{draftArticles.length}</div>
              <p className="text-sm text-muted-foreground">Drafts</p>
            </CardContent>
          </Card>
          
          <Card className="floating-card">
            <CardContent className="p-4 text-center">
              <Eye className="w-8 h-8 text-mint mx-auto mb-2" />
              <div className="text-2xl font-bold text-mint">
                {articles.reduce((sum, article) => sum + article.views, 0)}
              </div>
              <p className="text-sm text-muted-foreground">Total Views</p>
            </CardContent>
          </Card>
          
          <Card className="floating-card">
            <CardContent className="p-4 text-center">
              <Heart className="w-8 h-8 text-blush mx-auto mb-2" />
              <div className="text-2xl font-bold text-blush">
                {articles.reduce((sum, article) => sum + article.likes, 0)}
              </div>
              <p className="text-sm text-muted-foreground">Total Likes</p>
            </CardContent>
          </Card>
        </div>

        {/* Draft Articles */}
        {draftArticles.length > 0 && (
          <Card className="floating-card">
            <CardHeader>
              <CardTitle className="font-heading flex items-center">
                <Edit className="w-5 h-5 mr-2 text-sunshine" />
                Draft Content ({draftArticles.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {draftArticles.map((article) => (
                <div 
                  key={article.id}
                  className="p-4 bg-sunshine/10 rounded-xl border border-sunshine/20"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        article.type === 'article' ? 'bg-primary' : 'bg-blush'
                      }`}>
                        {article.type === 'article' 
                          ? <FileText className="w-4 h-4 text-white" />
                          : <Mic className="w-4 h-4 text-white" />
                        }
                      </div>
                      <div>
                        <h3 className="font-semibold">{article.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          by {article.author}
                        </p>
                      </div>
                    </div>
                    
                    <Badge variant="secondary" className="rounded-full">
                      Draft
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {article.content.substring(0, 120)}...
                  </p>
                  
                  {article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {article.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs rounded-full">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => publishArticle(article.id)}
                      size="sm"
                      className="rounded-xl"
                    >
                      Publish
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-xl">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => deleteArticle(article.id)}
                      className="rounded-xl text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Published Articles */}
        <Card className="floating-card">
          <CardHeader>
            <CardTitle className="font-heading flex items-center">
              <FileText className="w-5 h-5 mr-2 text-primary" />
              Published Content ({publishedArticles.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {publishedArticles.length > 0 ? (
              publishedArticles.map((article) => (
                <div 
                  key={article.id}
                  className="p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        article.type === 'article' ? 'bg-primary' : 'bg-blush'
                      }`}>
                        {article.type === 'article' 
                          ? <FileText className="w-4 h-4 text-white" />
                          : <Mic className="w-4 h-4 text-white" />
                        }
                      </div>
                      <div>
                        <h3 className="font-semibold">{article.title}</h3>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <User className="w-3 h-3 mr-1" />
                          {article.author}
                          <span className="mx-2">•</span>
                          <Calendar className="w-3 h-3 mr-1" />
                          {formatDate(article.publishDate)}
                        </p>
                      </div>
                    </div>
                    
                    <Badge className="bg-mint/20 text-mint rounded-full">
                      Published
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {article.content.substring(0, 150)}...
                  </p>
                  
                  {article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {article.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs rounded-full">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {article.views}
                      </span>
                      <span className="flex items-center">
                        <Heart className="w-4 h-4 mr-1" />
                        {article.likes}
                      </span>
                      <span className="flex items-center">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {article.comments}
                      </span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="rounded-xl">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-xl">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground">
                  No published content yet. Create your first article or podcast!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VolunteerArticles;