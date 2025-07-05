import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  Play, 
  Pause, 
  Download, 
  Wand2, 
  Music, 
  Video,
  Hash,
  Settings,
  User
} from "lucide-react";
import AudioUpload from "@/components/AudioUpload";
import VideoUpload from "@/components/VideoUpload";
import BeatTimeline from "@/components/BeatTimeline";
import HashtagGenerator from "@/components/HashtagGenerator";

const Editor = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [beatPoints, setBeatPoints] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setExportProgress(0);
    
    // Simulate export progress
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExporting(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <Wand2 className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold">ReelEditr</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="p-4 max-w-7xl mx-auto space-y-6">
        {/* Upload Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AudioUpload 
            onAudioUpload={setAudioFile}
            audioFile={audioFile}
          />
          <VideoUpload 
            onVideoUpload={setVideoFiles}
            videoFiles={videoFiles}
          />
        </div>

        {/* Timeline Section */}
        {audioFile && (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music className="w-5 h-5 text-primary" />
                Beat Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BeatTimeline 
                audioFile={audioFile}
                beatPoints={beatPoints}
                onBeatPointsChange={setBeatPoints}
                isPlaying={isPlaying}
                onPlayToggle={setIsPlaying}
              />
            </CardContent>
          </Card>
        )}

        {/* Controls & Export */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Hashtag Generator */}
          <div className="lg:col-span-2">
            <HashtagGenerator />
          </div>

          {/* Export Section */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5 text-accent" />
                Export Video
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Ready to export</span>
                  <Badge variant="outline" className="text-accent">
                    {beatPoints.length} beats
                  </Badge>
                </div>
                
                {isExporting && (
                  <div className="space-y-2">
                    <Progress value={exportProgress} className="h-2" />
                    <p className="text-sm text-muted-foreground text-center">
                      Exporting... {exportProgress}%
                    </p>
                  </div>
                )}
              </div>

              <Button 
                onClick={handleExport}
                disabled={!audioFile || videoFiles.length === 0 || isExporting}
                className="w-full btn-creative bg-gradient-to-r from-accent to-secondary hover:shadow-glow"
              >
                {isExporting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Exporting...
                  </div>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Export Reel
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="glass-card text-center p-4">
            <Music className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Audio</p>
            <p className="font-semibold">{audioFile ? "1 file" : "No file"}</p>
          </Card>
          
          <Card className="glass-card text-center p-4">
            <Video className="w-6 h-6 text-secondary mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Videos</p>
            <p className="font-semibold">{videoFiles.length} files</p>
          </Card>
          
          <Card className="glass-card text-center p-4">
            <Wand2 className="w-6 h-6 text-accent mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Beats</p>
            <p className="font-semibold">{beatPoints.length} marks</p>
          </Card>
          
          <Card className="glass-card text-center p-4">
            <Hash className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Ready</p>
            <p className="font-semibold">
              {audioFile && videoFiles.length > 0 ? "Yes" : "No"}
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Editor;