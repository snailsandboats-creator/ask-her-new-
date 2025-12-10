import { Target, MessageCircle, HeartHandshake } from 'lucide-react';
import { getIconGradientClass, cn } from '@/lib/utils';

interface ValueCardProps {
  icon: string;
  title: string;
  description: string;
  index?: number;
}

const iconMap: Record<string, React.ReactNode> = {
  target: <Target className="w-7 h-7 text-white" />,
  'message-circle': <MessageCircle className="w-7 h-7 text-white" />,
  'heart-handshake': <HeartHandshake className="w-7 h-7 text-white" />,
};

export function ValueCard({ icon, title, description, index = 0 }: ValueCardProps) {
  // Get deterministic gradient class based on index
  const iconGradientClass = getIconGradientClass(index);

  return (
    <div className="text-center md:text-left">
      <div 
        className={cn(
          "w-14 h-14 rounded-xl flex items-center justify-center mb-6 mx-auto md:mx-0 shadow-pink-glow",
          iconGradientClass
        )}
      >
        {iconMap[icon] || <Target className="w-7 h-7 text-white" />}
      </div>
      <h3 className="text-h4 text-white mb-3">{title}</h3>
      <p className="text-body text-slate">{description}</p>
    </div>
  );
}
