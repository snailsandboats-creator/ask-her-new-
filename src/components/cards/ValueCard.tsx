import { Target, MessageCircle, HeartHandshake } from 'lucide-react';

interface ValueCardProps {
  icon: string;
  title: string;
  description: string;
}

const iconMap: Record<string, React.ReactNode> = {
  target: <Target className="w-7 h-7 text-pink" />,
  'message-circle': <MessageCircle className="w-7 h-7 text-pink" />,
  'heart-handshake': <HeartHandshake className="w-7 h-7 text-pink" />,
};

export function ValueCard({ icon, title, description }: ValueCardProps) {
  return (
    <div className="text-center md:text-left">
      <div className="w-14 h-14 bg-offwhite rounded-xl flex items-center justify-center mb-6 mx-auto md:mx-0">
        {iconMap[icon] || <Target className="w-7 h-7 text-pink" />}
      </div>
      <h3 className="text-h4 text-black mb-3">{title}</h3>
      <p className="text-body text-slate">{description}</p>
    </div>
  );
}
