import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'dark' | 'light';
  className?: string;
}

// === SPLOTCHY PINK GRADIENT FOR "ASK HER" ===
const askHerGradientStyle = {
  background: `
    radial-gradient(ellipse 60% 50% at 25% 30%, rgba(255, 46, 147, 0.95) 0%, transparent 55%),
    radial-gradient(ellipse 50% 60% at 75% 70%, rgba(255, 182, 193, 0.9) 0%, transparent 50%),
    radial-gradient(ellipse 45% 40% at 60% 25%, rgba(253, 224, 71, 0.85) 0%, transparent 50%),
    radial-gradient(ellipse 55% 45% at 35% 75%, rgba(253, 164, 175, 0.9) 0%, transparent 55%),
    radial-gradient(ellipse 35% 35% at 80% 40%, rgba(147, 197, 253, 0.5) 0%, transparent 50%),
    radial-gradient(ellipse 30% 30% at 15% 55%, rgba(110, 231, 183, 0.45) 0%, transparent 50%),
    radial-gradient(ellipse 40% 35% at 50% 50%, rgba(255, 255, 255, 0.7) 0%, transparent 45%),
    linear-gradient(135deg, #FF2E93 0%, #C91C6F 50%, #FF2E93 100%)
  `,
  backgroundSize: '150% 150%',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animation: 'splotch-drift 8s ease-in-out infinite',
  filter: 'drop-shadow(0 0 25px rgba(255,46,147,0.5))',
};

export function Logo({ variant = 'dark', className }: LogoProps) {
  return (
    <div className={cn('flex items-start gap-2', className)}>
      <span
        className="text-4xl font-bold leading-tight tracking-tight"
        style={askHerGradientStyle}
      >
        Ask Her
      </span>
      <svg
        width="34"
        height="34"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 speech-bubble-gradient"
        style={{
          filter: 'drop-shadow(0 0 15px rgba(255,46,147,0.4))',
          marginTop: '5px',
        }}
      >
        <path
          d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
          stroke="url(#speechGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <defs>
          <linearGradient id="speechGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF2E93">
              <animate
                attributeName="stop-color"
                values="#FF2E93; #FFB6C1; #FDE047; #FF2E93"
                dur="8s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="50%" stopColor="#C91C6F">
              <animate
                attributeName="stop-color"
                values="#C91C6F; #FF2E93; #FFB6C1; #C91C6F"
                dur="8s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#FF2E93">
              <animate
                attributeName="stop-color"
                values="#FF2E93; #FDE047; #FFB6C1; #FF2E93"
                dur="8s"
                repeatCount="indefinite"
              />
            </stop>
            <animateTransform
              attributeName="gradientTransform"
              type="rotate"
              from="0 0.5 0.5"
              to="360 0.5 0.5"
              dur="8s"
              repeatCount="indefinite"
            />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
