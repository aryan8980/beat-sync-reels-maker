import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Hash, Copy, Sparkles, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const HashtagGenerator = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState("travel");
  
  const hashtagData = {
    travel: {
      trending: ["#wanderlust", "#travel", "#adventure", "#explore", "#vacation", "#travelgram", "#paradise", "#journey", "#wanderer", "#globetrotter"],
      popular: ["#traveling", "#trip", "#holiday", "#backpacking", "#roadtrip", "#nature", "#landscape", "#mountains", "#beach", "#sunset"]
    },
    dance: {
      trending: ["#dance", "#dancing", "#choreography", "#moves", "#rhythm", "#dancechallenge", "#freestyle", "#hiphop", "#ballet", "#contemporary"],
      popular: ["#dancer", "#dancelife", "#movement", "#groove", "#performance", "#dancevideo", "#talent", "#skills", "#passion", "#art"]
    },
    comedy: {
      trending: ["#funny", "#comedy", "#humor", "#laugh", "#meme", "#viral", "#entertainment", "#jokes", "#fun", "#hilarious"],
      popular: ["#comedian", "#standup", "#sketch", "#parody", "#satire", "#improvise", "#witty", "#punchline", "#slapstick", "#comic"]
    },
    music: {
      trending: ["#music", "#musician", "#song", "#beat", "#melody", "#audio", "#sound", "#track", "#remix", "#cover"],
      popular: ["#musicproducer", "#artist", "#vocals", "#instrumental", "#rhythm", "#harmony", "#recording", "#studio", "#live", "#acoustic"]
    },
    fitness: {
      trending: ["#fitness", "#workout", "#gym", "#training", "#health", "#exercise", "#strength", "#cardio", "#motivation", "#fitlife"],
      popular: ["#bodybuilding", "#yoga", "#running", "#crossfit", "#weightlifting", "#healthy", "#nutrition", "#wellness", "#athlete", "#gains"]
    }
  };

  const categories = [
    { id: "travel", label: "Travel", icon: "🌍" },
    { id: "dance", label: "Dance", icon: "💃" },
    { id: "comedy", label: "Comedy", icon: "😂" },
    { id: "music", label: "Music", icon: "🎵" },
    { id: "fitness", label: "Fitness", icon: "💪" }
  ];

  const copyHashtags = (hashtags: string[]) => {
    const text = hashtags.join(" ");
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${hashtags.length} hashtags copied to clipboard`,
    });
  };

  const currentHashtags = hashtagData[selectedCategory as keyof typeof hashtagData];

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Hash className="w-5 h-5 text-accent" />
          Trending Hashtags
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid grid-cols-5 w-full mb-4">
            {categories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="text-xs"
              >
                <span className="mr-1">{category.icon}</span>
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-4">
              {/* Trending Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    Trending Now
                  </h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyHashtags(currentHashtags.trending)}
                    className="text-xs"
                  >
                    <Copy className="w-3 h-3 mr-1" />
                    Copy All
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {currentHashtags.trending.map((hashtag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="cursor-pointer hover:bg-primary/20 transition-colors animate-glow-pulse"
                      onClick={() => {
                        navigator.clipboard.writeText(hashtag);
                        toast({
                          title: "Copied!",
                          description: `${hashtag} copied to clipboard`,
                        });
                      }}
                    >
                      {hashtag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Popular Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-secondary" />
                    Popular
                  </h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyHashtags(currentHashtags.popular)}
                    className="text-xs"
                  >
                    <Copy className="w-3 h-3 mr-1" />
                    Copy All
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {currentHashtags.popular.map((hashtag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer hover:bg-secondary/20 transition-colors"
                      onClick={() => {
                        navigator.clipboard.writeText(hashtag);
                        toast({
                          title: "Copied!",
                          description: `${hashtag} copied to clipboard`,
                        });
                      }}
                    >
                      {hashtag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="p-3 bg-muted/20 rounded-lg space-y-2">
                <h5 className="text-xs font-medium text-muted-foreground">Quick Actions</h5>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyHashtags([...currentHashtags.trending.slice(0, 5), ...currentHashtags.popular.slice(0, 5)])}
                    className="text-xs"
                  >
                    Mix Top 10
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyHashtags(currentHashtags.trending.slice(0, 3))}
                    className="text-xs"
                  >
                    Top 3 Trending
                  </Button>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-4 text-xs text-muted-foreground text-center p-2 bg-muted/10 rounded">
          💡 Tip: Click any hashtag to copy it individually, or use "Copy All" for the entire set
        </div>
      </CardContent>
    </Card>
  );
};

export default HashtagGenerator;