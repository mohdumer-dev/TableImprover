import React from 'react';
import { TrendingUp, Flame, Trophy, Target, Star, Zap, Award, Crown, Calculator, Clock, Users } from 'lucide-react';

// Icon mapping for different card types
const iconMap = {
  'streak': Flame,
  'score': Trophy,
  'accuracy': Target,
  'level': Star,
  'speed': Zap,
  'achievements': Award,
  'rank': Crown,
  'improvement': TrendingUp
};

// Beautiful magenta to cyan gradient theme
const theme = {
  gradient: 'from-fuchsia-500 via-purple-500 to-cyan-500',
  bg: 'from-fuchsia-50 via-purple-50 to-cyan-50',
  glow: 'shadow-purple-500/30',
  iconBg: 'from-fuchsia-500 via-purple-500 to-cyan-500',
  accent: 'from-fuchsia-200 via-purple-200 to-cyan-200',
  text: 'from-fuchsia-600 via-purple-600 to-cyan-600'
};

export default function Card({ name, data, type = 'default', trend, animate = true, customIcon }) {
  const IconComponent = customIcon || iconMap[type.toLowerCase()] || Star;

  // Animation for the data number
  const [displayData, setDisplayData] = React.useState(0);
  
  React.useEffect(() => {
    if (animate && typeof data === 'number') {
      let start = 0;
      const end = data;
      const duration = 1500;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setDisplayData(end);
          clearInterval(timer);
        } else {
          setDisplayData(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    } else {
      setDisplayData(data);
    }
  }, [data, animate]);

  return (
    <div className={`group cursor-pointer relative overflow-hidden rounded-2xl bg-gradient-to-br ${theme.bg} 
      p-6 shadow-xl hover:shadow-2xl ${theme.glow} border border-white/20 backdrop-blur-sm 
      transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-1 
      w-full h-40 sm:h-44 md:h-48 lg:h-52`}>
      
      {/* Animated background glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
      
      {/* Floating orbs */}
      <div className="absolute top-2 right-2 w-8 h-8 bg-gradient-to-br from-white/20 to-white/5 rounded-full blur-sm animate-pulse" />
      <div className="absolute bottom-2 left-2 w-6 h-6 bg-gradient-to-br from-white/15 to-white/5 rounded-full blur-sm animate-pulse delay-700" />
      
      {/* Icon container */}
      <div className="relative z-10 mb-4">
        <div className="flex items-center justify-between">
          <div className={`p-2 rounded-xl bg-gradient-to-r ${theme.iconBg} shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
            <IconComponent className="w-5 h-5 text-white drop-shadow-sm" />
          </div>
          
          {/* Trend indicator */}
          {trend !== undefined && (
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-[10px] sm:text-xs font-semibold ${
              trend > 0 
                ? 'bg-emerald-100 text-emerald-700' 
                : trend < 0 
                ? 'bg-red-100 text-red-700'
                : 'bg-gray-100 text-gray-700'
            } backdrop-blur-sm`}>
              <TrendingUp className={`w-3 h-3 ${trend < 0 ? 'rotate-180' : ''} transition-transform duration-300`} />
              <span>{Math.abs(trend)}%</span>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Data display with gradient text */}
        <div className="mb-2">
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent leading-none`}>
            {typeof displayData === 'number' ? displayData.toLocaleString() : displayData}
          </h2>
        </div>
        
        {/* Label */}
        <p className="text-gray-700 font-medium text-sm sm:text-base capitalize tracking-wide">
          {name}
        </p>
      </div>

      {/* Animated bottom accent bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden">
        <div className={`h-full bg-gradient-to-r ${theme.gradient} transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out`} />
      </div>

      {/* Sparkle effects on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-ping" />
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-white rounded-full animate-ping delay-300" />
        <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-white rounded-full animate-ping delay-700" />
      </div>
    </div>
  );
}

// Example usage component
const CardExample = () => {
  return (
    <div className="p-4 sm:p-8 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-8">Dashboard Cards</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card name="Current Streak" data={42} type="streak" trend={15} />
          <Card name="Best Score" data={1250} type="score" trend={8} />
          <Card name="Accuracy" data="94%" type="accuracy" trend={-2} />
          <Card name="Total Problems" data={156} customIcon={Calculator} />
          <Card name="Study Time" data="2.5h" customIcon={Clock} />
          <Card name="Friends Beat" data={8} customIcon={Users} />
        </div>
        
        <div className="mt-8 p-4 sm:p-6 bg-white rounded-lg shadow">
          <h3 className="font-semibold mb-4 text-lg">How to use & customize:</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Basic Usage:</h4>
              <code className="text-sm bg-gray-100 p-3 rounded block">
                {'<Card name="Current Streak" data={42} type="streak" trend={15} />'}
              </code>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Custom Icons:</h4>
              <code className="text-sm bg-gray-100 p-3 rounded block">
                {'<Card name="Problems Solved" data={156} customIcon={Calculator} />'}
              </code>
              <p className="text-sm text-gray-600 mt-1">
                Import any icon from lucide-react and pass it as customIcon
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Available built-in types:</h4>
              <div className="text-sm text-gray-600 grid grid-cols-2 gap-2">
                <span>• streak (🔥 Flame)</span>
                <span>• score (🏆 Trophy)</span>
                <span>• accuracy (🎯 Target)</span>
                <span>• level (⭐ Star)</span>
                <span>• speed (⚡ Zap)</span>
                <span>• achievements (🏅 Award)</span>
                <span>• rank (👑 Crown)</span>
                <span>• improvement (📈 TrendingUp)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CardExample };
