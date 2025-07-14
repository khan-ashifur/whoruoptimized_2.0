import React, { useState, useEffect } from 'react';
import { ChevronRight, Brain, Heart, Users, Target, Sparkles, ArrowLeft, RefreshCw, Share2, Download } from 'lucide-react';
import './App.css';

// Motivational quotes for loading screen
const motivationalQuotes = [
  "আপনার ব্যক্তিত্বের গভীরে লুকিয়ে আছে অসীম সম্ভাবনা...",
  "প্রতিটি মানুষের মধ্যে রয়েছে একটি অনন্য গল্প...",
  "নিজেকে জানা হলো জ্ঞানের প্রথম ধাপ...",
  "আপনার স্বপ্নগুলো আপনার ব্যক্তিত্বের প্রতিফলন...",
  "সত্যিকারের শক্তি আসে আত্মবোধ থেকে..."
];

// 16 personality types data
const personalityTypes = {
  INTJ: { name: "The Architect", description: "কৌশলগত চিন্তাবিদ এবং পরিকল্পনাকারী" },
  INTP: { name: "The Thinker", description: "উদ্ভাবনী আবিষ্কারক এবং বিশ্লেষক" },
  ENTJ: { name: "The Commander", description: "সাহসী নেতা এবং সংগঠক" },
  ENTP: { name: "The Debater", description: "স্মার্ট এবং কৌতূহলী চিন্তাবিদ" },
  INFJ: { name: "The Advocate", description: "সৃজনশীল এবং অন্তর্দৃষ্টিসম্পন্ন" },
  INFP: { name: "The Mediator", description: "কাব্যিক, দয়ালু এবং পরার্থপর" },
  ENFJ: { name: "The Protagonist", description: "ক্যারিশম্যাটিক এবং অনুপ্রেরণাদায়ক নেতা" },
  ENFP: { name: "The Campaigner", description: "উৎসাহী, সৃজনশীল এবং সামাজিক" },
  ISTJ: { name: "The Logistician", description: "ব্যবহারিক এবং বাস্তববাদী" },
  ISFJ: { name: "The Protector", description: "উষ্ণ-হৃদয় এবং নিবেদিতপ্রাণ" },
  ESTJ: { name: "The Executive", description: "দক্ষ প্রশাসক এবং ব্যবস্থাপক" },
  ESFJ: { name: "The Consul", description: "অত্যন্ত যত্নশীল এবং সামাজিক" },
  ISTP: { name: "The Virtuoso", description: "সাহসী এবং ব্যবহারিক পরীক্ষক" },
  ISFP: { name: "The Adventurer", description: "নমনীয় এবং কমনীয় শিল্পী" },
  ESTP: { name: "The Entrepreneur", description: "স্মার্ট, শক্তিশালী এবং অনুভূতিপ্রবণ" },
  ESFP: { name: "The Entertainer", description: "স্বতঃস্ফূর্ত, উৎসাহী এবং বন্ধুত্বপূর্ণ" }
};

// Quiz questions
const quizQuestions = [
  {
    id: 1,
    question: "একটি পার্টিতে আপনি সাধারণত কী করেন?",
    options: [
      { text: "অনেক মানুষের সাথে কথা বলি এবং নতুন বন্ধু তৈরি করি", type: "E" },
      { text: "কয়েকজন ঘনিষ্ঠ বন্ধুর সাথে গভীর আলোচনা করি", type: "I" }
    ]
  },
  {
    id: 2,
    question: "তথ্য প্রক্রিয়া করার সময় আপনি কোনটি বেশি পছন্দ করেন?",
    options: [
      { text: "বাস্তব তথ্য এবং বিস্তারিত বিবরণ", type: "S" },
      { text: "সম্ভাবনা এবং ভবিষ্যতের দৃষ্টিভঙ্গি", type: "N" }
    ]
  },
  {
    id: 3,
    question: "সিদ্ধান্ত নেওয়ার সময় আপনি কোনটিকে বেশি গুরুত্ব দেন?",
    options: [
      { text: "যুক্তি এবং বস্তুনিষ্ঠ বিশ্লেষণ", type: "T" },
      { text: "মানুষের অনুভূতি এবং মূল্যবোধ", type: "F" }
    ]
  },
  {
    id: 4,
    question: "আপনার জীবনযাত্রা সম্পর্কে কোনটি সত্য?",
    options: [
      { text: "পরিকল্পিত এবং সংগঠিত", type: "J" },
      { text: "নমনীয় এবং স্বতঃস্ফূর্ত", type: "P" }
    ]
  },
  {
    id: 5,
    question: "নতুন প্রকল্প শুরু করার সময় আপনি কী করেন?",
    options: [
      { text: "অন্যদের সাথে আলোচনা করে ধারণা বিকশিত করি", type: "E" },
      { text: "একা চিন্তা করে পরিকল্পনা তৈরি করি", type: "I" }
    ]
  },
  {
    id: 6,
    question: "শেখার ক্ষেত্রে আপনি কোনটি পছন্দ করেন?",
    options: [
      { text: "ধাপে ধাপে বিস্তারিত নির্দেশনা", type: "S" },
      { text: "সামগ্রিক ধারণা এবং তত্ত্ব", type: "N" }
    ]
  },
  {
    id: 7,
    question: "দ্বন্দ্ব সমাধানের সময় আপনি কী করেন?",
    options: [
      { text: "তথ্য এবং যুক্তি দিয়ে সমাধান খুঁজি", type: "T" },
      { text: "সবার অনুভূতি বিবেচনা করে সমঝোতা করি", type: "F" }
    ]
  },
  {
    id: 8,
    question: "কাজের পরিবেশে আপনি কোনটি পছন্দ করেন?",
    options: [
      { text: "স্পষ্ট সময়সীমা এবং কাঠামো", type: "J" },
      { text: "নমনীয়তা এবং বিকল্প সুযোগ", type: "P" }
    ]
  }
];

function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome'); // welcome, quiz, loading, result
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [personalityResult, setPersonalityResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Loading animation with quotes
  useEffect(() => {
    if (currentScreen === 'loading') {
      const quoteInterval = setInterval(() => {
        setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length);
      }, 3500);

      const progressInterval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 2;
        });
      }, 100);

      return () => {
        clearInterval(quoteInterval);
        clearInterval(progressInterval);
      };
    }
  }, [currentScreen]);

  const handleAnswer = (questionId, selectedOption) => {
    const newAnswers = { ...answers, [questionId]: selectedOption };
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      // Calculate personality type
      const typeScores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
      
      Object.values(newAnswers).forEach(answer => {
        typeScores[answer.type]++;
      });

      const personalityType = 
        (typeScores.E > typeScores.I ? 'E' : 'I') +
        (typeScores.S > typeScores.N ? 'S' : 'N') +
        (typeScores.T > typeScores.F ? 'T' : 'F') +
        (typeScores.J > typeScores.P ? 'J' : 'P');

      setCurrentScreen('loading');
      setLoadingProgress(0);
      
      // Simulate API call
      setTimeout(() => {
        setPersonalityResult({
          type: personalityType,
          ...personalityTypes[personalityType]
        });
        setCurrentScreen('result');
      }, 8000);
    }
  };

  const resetQuiz = () => {
    setCurrentScreen('welcome');
    setCurrentQuestion(0);
    setAnswers({});
    setPersonalityResult(null);
    setLoadingProgress(0);
  };

  const WelcomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <Brain className="w-24 h-24 mx-auto text-white relative z-10 mb-6" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          আপনি <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">কে</span>?
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          কার্ল জং-এর মনোবিজ্ঞান তত্ত্বের উপর ভিত্তি করে আবিষ্কার করুন আপনার প্রকৃত ব্যক্তিত্ব
        </p>
        
        <div className="grid md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
          {[
            { icon: Brain, title: "গভীর বিশ্লেষণ", desc: "বৈজ্ঞানিক পদ্ধতি" },
            { icon: Heart, title: "ব্যক্তিগত অন্তর্দৃষ্টি", desc: "আপনার অনুভূতি" },
            { icon: Users, title: "সম্পর্কের পরামর্শ", desc: "বন্ধুত্ব ও প্রেম" },
            { icon: Target, title: "ক্যারিয়ার গাইড", desc: "সঠিক পথ নির্দেশনা" }
          ].map((feature, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <feature.icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
        
        <button
          onClick={() => setCurrentScreen('quiz')}
          className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-12 py-4 rounded-full text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25"
        >
          <span className="flex items-center justify-center gap-3">
            পরীক্ষা শুরু করুন
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
        
        <p className="text-gray-400 mt-6 text-sm">
          ⏱️ মাত্র ৫ মিনিট • 🔒 সম্পূর্ণ গোপনীয় • 🎯 ১০০% নির্ভুল
        </p>
      </div>
    </div>
  );

  const QuizScreen = () => {
    const question = quizQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-3xl mx-auto w-full">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-white/70 text-sm">প্রশ্ন {currentQuestion + 1} / {quizQuestions.length}</span>
              <span className="text-white/70 text-sm">{Math.round(progress)}% সম্পন্ন</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-relaxed">
                {question.question}
              </h2>
            </div>

            <div className="space-y-4">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(question.id, option)}
                  className="w-full p-6 bg-white/5 hover:bg-white/15 border border-white/20 hover:border-white/40 rounded-2xl text-left transition-all duration-300 group hover:scale-[1.02] hover:shadow-xl"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white text-lg font-medium group-hover:text-blue-300 transition-colors">
                      {option.text}
                    </span>
                    <ChevronRight className="w-5 h-5 text-white/50 group-hover:text-blue-300 group-hover:translate-x-1 transition-all" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Back Button */}
          {currentQuestion > 0 && (
            <button
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
              className="mt-6 flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              পূর্ববর্তী প্রশ্ন
            </button>
          )}
        </div>
      </div>
    );
  };

  const LoadingScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <Brain className="w-20 h-20 mx-auto text-white relative z-10 animate-pulse" />
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
          আপনার ব্যক্তিত্ব বিশ্লেষণ করা হচ্ছে...
        </h2>

        {/* Progress Circle */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 40}`}
              strokeDashoffset={`${2 * Math.PI * 40 * (1 - loadingProgress / 100)}`}
              className="transition-all duration-300"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-xl font-bold">{Math.round(loadingProgress)}%</span>
          </div>
        </div>

        {/* Motivational Quote */}
        <div className="h-16 flex items-center justify-center">
          <p 
            key={currentQuote}
            className="text-xl text-gray-300 quote-animation max-w-lg"
          >
            {motivationalQuotes[currentQuote]}
          </p>
        </div>

        <div className="mt-8 flex justify-center space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-white/50 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );

  const ResultScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 p-4">
      <div className="max-w-4xl mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl font-bold text-white">{personalityResult?.type}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {personalityResult?.name}
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            {personalityResult?.description}
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full transition-all duration-300 backdrop-blur-lg border border-white/20">
              <Share2 className="w-4 h-4" />
              শেয়ার করুন
            </button>
            <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full transition-all duration-300 backdrop-blur-lg border border-white/20">
              <Download className="w-4 h-4" />
              ডাউনলোড করুন
            </button>
            <button 
              onClick={resetQuiz}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-6 py-3 rounded-full transition-all duration-300"
            >
              <RefreshCw className="w-4 h-4" />
              আবার পরীক্ষা করুন
            </button>
          </div>
        </div>

        {/* Result Content */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Heart className="w-6 h-6 text-pink-400" />
              আপনার শক্তিসমূহ
            </h3>
            <div className="space-y-4">
              {['সৃজনশীলতা', 'নেতৃত্ব', 'সহানুভূতি', 'বিশ্লেষণী ক্ষমতা'].map((strength, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span className="text-gray-300">{strength}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Target className="w-6 h-6 text-blue-400" />
              ক্যারিয়ার পরামর্শ
            </h3>
            <div className="space-y-4">
              {['সৃজনশীল ডিজাইনার', 'প্রজেক্ট ম্যানেজার', 'কাউন্সেলর', 'উদ্যোক্তা'].map((career, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-300">{career}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Description */}
        <div className="mt-8 bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
          <h3 className="text-2xl font-bold text-white mb-6">বিস্তারিত বিবরণ</h3>
          <p className="text-gray-300 leading-relaxed text-lg">
            আপনার ব্যক্তিত্বের ধরণ অনুযায়ী, আপনি একজন স্বাভাবিক নেতা যিনি অন্যদের অনুপ্রাণিত করতে পারেন। 
            আপনার সৃজনশীল চিন্তাভাবনা এবং দৃঢ় সিদ্ধান্ত গ্রহণের ক্ষমতা আপনাকে যেকোনো ক্ষেত্রে সফল হতে সাহায্য করবে। 
            তবে মাঝে মাঝে অন্যদের মতামতও শুনুন এবং ধৈর্য ধরে কাজ করুন।
          </p>
        </div>
      </div>
    </div>
  );

  // Render current screen
  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen />;
      case 'quiz':
        return <QuizScreen />;
      case 'loading':
        return <LoadingScreen />;
      case 'result':
        return <ResultScreen />;
      default:
        return <WelcomeScreen />;
    }
  };

  return <div className="font-inter">{renderScreen()}</div>;
}

export default App;