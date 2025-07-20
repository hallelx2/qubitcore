'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Brain, Users, Shield, Zap, Hospital, Building2, Banknote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SynapseStoryProps {
  useCase: 'healthcare' | 'research' | 'finance';
}

interface StoryChapter {
  id: string;
  title: string;
  content: string;
  character?: {
    name: string;
    role: string;
    avatar: string;
  };
  visual?: React.ReactNode;
  metrics?: Array<{
    label: string;
    value: string;
    icon: React.ReactNode;
  }>;
}

interface Participant {
  name: string;
  location: string;
  metric: string;
  metricLabel: string;
}

const useCaseData = {
  healthcare: {
    title: "Three Hospitals, One Breakthrough",
    subtitle: "How AI saved lives without seeing patient data",
    icon: <Hospital className="h-8 w-8" />,
    color: "bg-red-500",
    participants: [
      { name: "St. Mary's Hospital", location: "Boston", metric: "15,000", metricLabel: "patients" },
      { name: "General Medical Center", location: "Chicago", metric: "22,000", metricLabel: "patients" },
      { name: "University Hospital", location: "Seattle", metric: "18,000", metricLabel: "patients" }
    ] as Participant[]
  },
  research: {
    title: "Global Research Consortium",
    subtitle: "Breakthrough discoveries through secure collaboration",
    icon: <Building2 className="h-8 w-8" />,
    color: "bg-blue-500",
    participants: [
      { name: "MIT Research Lab", location: "Cambridge", metric: "2.3TB", metricLabel: "data" },
      { name: "Stanford AI Institute", location: "Palo Alto", metric: "1.8TB", metricLabel: "data" },
      { name: "Oxford Computing", location: "Oxford", metric: "3.1TB", metricLabel: "data" }
    ] as Participant[]
  },
  finance: {
    title: "Banking Alliance Initiative",
    subtitle: "Fraud detection without sharing customer data",
    icon: <Banknote className="h-8 w-8" />,
    color: "bg-green-500",
    participants: [
      { name: "First National Bank", location: "New York", metric: "2M/day", metricLabel: "transactions" },
      { name: "Global Trust Bank", location: "London", metric: "1.5M/day", metricLabel: "transactions" },
      { name: "Pacific Financial", location: "Tokyo", metric: "1.8M/day", metricLabel: "transactions" }
    ] as Participant[]
  }
};

export function SynapseStory({ useCase }: SynapseStoryProps) {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const data = useCaseData[useCase];

  const chapters: StoryChapter[] = [
    {
      id: 'setup',
      title: 'The Challenge',
      content: useCase === 'healthcare' 
        ? "Three hospitals had the same problem: rare disease patients were dying because no single institution had enough data to train effective AI models. Patient privacy laws made data sharing impossible."
        : useCase === 'research'
        ? "Leading research institutions worldwide possessed valuable datasets, but competitive concerns and privacy regulations prevented them from sharing their most sensitive research data."
        : "Major banks were losing billions to sophisticated fraud, but sharing transaction data with competitors was impossible due to regulatory and competitive constraints.",
      character: {
        name: useCase === 'healthcare' ? "Dr. Sarah Chen" : useCase === 'research' ? "Prof. Michael Torres" : "Alex Rodriguez",
        role: useCase === 'healthcare' ? "Chief Medical Officer" : useCase === 'research' ? "Research Director" : "Head of Risk Management",
        avatar: "/avatars/doctor.jpg"
      },
      visual: (
        <div className="grid grid-cols-3 gap-4 mt-6">
          {data.participants.map((participant, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-4">
                <div className={`w-12 h-12 ${data.color} rounded-full mx-auto mb-2 flex items-center justify-center text-white`}>
                  {data.icon}
                </div>
                <h4 className="font-semibold text-sm">{participant.name}</h4>
                <p className="text-xs text-muted-foreground">{participant.location}</p>
                <Badge variant="outline" className="mt-1 text-xs">
                  {participant.metric} {participant.metricLabel}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )
    },
    {
      id: 'quantum-threat',
      title: 'The Quantum Dilemma',
      content: "Traditional encryption wouldn't protect their collaborative AI models from quantum computers. Even if they could share data today, it would be vulnerable tomorrow. They needed a solution that was both private now and quantum-safe forever.",
      visual: (
        <div className="relative mt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-2">
                <Shield className="h-8 w-8 text-red-500" />
              </div>
              <p className="text-sm font-medium">Current Encryption</p>
              <p className="text-xs text-muted-foreground">Vulnerable to quantum</p>
            </div>
            <div className="flex-1 mx-4">
              <div className="h-2 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full relative">
                <motion.div 
                  className="absolute right-0 top-0 w-4 h-4 bg-yellow-500 rounded-full -mt-1"
                  animate={{ x: [0, -20, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </div>
              <p className="text-xs text-center mt-1">Quantum threat approaching</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                <Zap className="h-8 w-8 text-purple-500" />
              </div>
              <p className="text-sm font-medium">Quantum Computer</p>
              <p className="text-xs text-muted-foreground">Breaks encryption</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'synapse-solution',
      title: 'The Synapse Solution',
      content: "QubitCore Synapse enabled them to train AI models collaboratively without ever sharing raw data. Each institution's data stayed local, protected by quantum-resistant encryption, while the AI model learned from all datasets simultaneously.",
      visual: (
        <div className="mt-6">
          <div className="relative">
            <div className="grid grid-cols-3 gap-4 mb-6">
              {data.participants.map((participant, index) => (
                <div key={index} className="text-center">
                  <div className="relative">
                    <div className={`w-16 h-16 ${data.color} rounded-full mx-auto flex items-center justify-center text-white mb-2`}>
                      {data.icon}
                    </div>
                    <motion.div
                      className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2, delay: index * 0.3 }}
                    >
                      <Shield className="h-3 w-3 text-white" />
                    </motion.div>
                  </div>
                  <p className="text-xs font-medium">{participant.name}</p>
                  <Badge variant="outline" className="text-xs">Data stays local</Badge>
                </div>
              ))}
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto flex items-center justify-center mb-2">
                <Brain className="h-10 w-10 text-white" />
              </div>
              <p className="font-semibold">Shared AI Model</p>
              <p className="text-sm text-muted-foreground">Learns from all data</p>
              <Badge className="mt-1">Quantum-Safe</Badge>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'results',
      title: 'The Breakthrough',
      content: useCase === 'healthcare'
        ? "Within 6 months, the collaborative AI model achieved 94% accuracy in rare disease diagnosis - a 40% improvement over individual hospital models. Patient outcomes improved dramatically while privacy remained absolute."
        : useCase === 'research'
        ? "The federated research model accelerated breakthrough discoveries by 3x while maintaining complete data sovereignty. Publications increased 250% with no competitive data exposure."
        : "The collaborative fraud detection model reduced false positives by 60% and caught 85% more sophisticated attacks. Customer satisfaction improved while maintaining complete transaction privacy.",
      metrics: useCase === 'healthcare' ? [
        { label: "Diagnostic Accuracy", value: "94%", icon: <Brain className="h-4 w-4" /> },
        { label: "Improvement", value: "+40%", icon: <Zap className="h-4 w-4" /> },
        { label: "Patient Privacy", value: "100%", icon: <Shield className="h-4 w-4" /> }
      ] : useCase === 'research' ? [
        { label: "Discovery Speed", value: "3x faster", icon: <Zap className="h-4 w-4" /> },
        { label: "Publications", value: "+250%", icon: <Brain className="h-4 w-4" /> },
        { label: "Data Sovereignty", value: "100%", icon: <Shield className="h-4 w-4" /> }
      ] : [
        { label: "False Positives", value: "-60%", icon: <Brain className="h-4 w-4" /> },
        { label: "Attack Detection", value: "+85%", icon: <Zap className="h-4 w-4" /> },
        { label: "Privacy Protection", value: "100%", icon: <Shield className="h-4 w-4" /> }
      ]
    }
  ];

  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            if (currentChapter < chapters.length - 1) {
              setCurrentChapter(curr => curr + 1);
              return 0;
            } else {
              setIsPlaying(false);
              return 100;
            }
          }
          return prev + 2;
        });
      }, 100);

      return () => clearInterval(timer);
    }
  }, [isPlaying, currentChapter, chapters.length]);

  const currentStory = chapters[currentChapter];

  // Safety check to prevent undefined errors
  if (!currentStory) {
    return (
      <section className="py-24 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p>Loading story...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-200">
            <Brain className="h-4 w-4 mr-2" />
            Synapse: The Collaboration Bridge
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {data.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {currentStory.character && (
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={currentStory.character.avatar} />
                      <AvatarFallback>
                        {currentStory.character.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    <CardTitle className="text-2xl">{currentStory.title}</CardTitle>
                    {currentStory.character && (
                      <p className="text-sm text-muted-foreground">
                        {currentStory.character.name}, {currentStory.character.role}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={isPlaying ? "secondary" : "default"}
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    {isPlaying ? "Pause Story" : "Play Story"}
                  </Button>
                </div>
              </div>
              <Progress value={progress} className="mt-4" />
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentChapter}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-lg leading-relaxed mb-6">
                    {currentStory.content}
                  </p>
                  
                  {currentStory.visual && (
                    <div className="mb-6">
                      {currentStory.visual}
                    </div>
                  )}

                  {currentStory.metrics && (
                    <div className="grid grid-cols-3 gap-4 mt-6">
                      {currentStory.metrics.map((metric, index) => (
                        <Card key={index} className="text-center">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-center mb-2">
                              {metric.icon}
                            </div>
                            <p className="text-2xl font-bold text-purple-600">{metric.value}</p>
                            <p className="text-sm text-muted-foreground">{metric.label}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>

          <div className="flex justify-center space-x-2 mb-8">
            {chapters.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentChapter(index);
                  setProgress(0);
                  setIsPlaying(false);
                }}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentChapter ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              <Users className="h-5 w-5 mr-2" />
              Start Your Collaborative AI Project
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}