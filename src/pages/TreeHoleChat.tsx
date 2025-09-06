import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Send, Star } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import treeHoleIcon from "@/assets/tree-hole-icon.jpg";

interface Message {
  id: string;
  content: string;
  sender: 'student' | 'volunteer';
  timestamp: Date;
}

const TreeHoleChat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm here to listen and support you. How are you feeling today?",
      sender: 'volunteer',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'student',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");

    // Simulate volunteer response
    setTimeout(() => {
      const responses = [
        "Thank you for sharing that with me. Your feelings are valid.",
        "I hear you. It sounds like you're going through a challenging time.",
        "That takes courage to express. How can I best support you right now?",
        "I'm here with you. You're not alone in this.",
        "It's okay to feel this way. What do you think might help you feel a bit better?"
      ];
      
      const volunteerMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        sender: 'volunteer',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, volunteerMessage]);
    }, 1000 + Math.random() * 2000);
  };

  const endChat = () => {
    setShowFeedback(true);
  };

  const submitFeedback = () => {
    // Save feedback (would normally send to backend)
    console.log({ rating, feedback: feedbackText });
    setShowFeedback(false);
    navigate('/student/garden');
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-peaceful">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-lg border-b border-card-border p-4">
        <div className="flex items-center space-x-3 max-w-4xl mx-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/student/garden')}
            className="rounded-xl"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          
          <div className="flex items-center space-x-3 flex-1">
            <div 
              className="w-10 h-10 rounded-full bg-cover bg-center"
              style={{ backgroundImage: `url(${treeHoleIcon})` }}
            />
            <div>
              <h1 className="font-heading font-semibold">Tree Hole</h1>
              <p className="text-sm text-muted-foreground">Anonymous & Safe</p>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={endChat}
            className="rounded-xl"
          >
            End Chat
          </Button>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-w-4xl mx-auto w-full">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'student' ? 'justify-end' : 'justify-start'}`}
          >
            <Card 
              className={`max-w-xs md:max-w-sm p-4 ${
                message.sender === 'student'
                  ? 'bg-primary text-primary-foreground'
                  : 'floating-card'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className="text-xs opacity-70 mt-2">
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </Card>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-card/80 backdrop-blur-lg border-t border-card-border p-4">
        <div className="flex space-x-3 max-w-4xl mx-auto">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Share what's on your mind..."
            className="flex-1 rounded-xl"
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <Button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className="rounded-xl px-6"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Feedback Dialog */}
      <Dialog open={showFeedback} onOpenChange={setShowFeedback}>
        <DialogContent className="rounded-3xl">
          <DialogHeader>
            <DialogTitle className="font-heading text-center">
              How was your experience?
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Your feedback helps us improve support quality
              </p>
              
              <div className="flex justify-center space-x-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="transition-colors"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating
                          ? 'text-sunshine fill-sunshine'
                          : 'text-muted-foreground'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            
            <Textarea
              placeholder="Optional: Share your thoughts about this session..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              className="rounded-xl resize-none"
              rows={3}
            />
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowFeedback(false)}
                className="flex-1 rounded-xl"
              >
                Skip
              </Button>
              <Button
                onClick={submitFeedback}
                disabled={rating === 0}
                className="flex-1 rounded-xl"
              >
                Submit
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TreeHoleChat;