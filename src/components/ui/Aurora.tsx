'use client';

/**
 * Aurora Component
 *
 * Flowing, aurora-style gradient element with pink accents.
 * Uses SVG paths to create ribbon-like shapes, NOT circles or orbs.
 *
 * IMPORTANT: The key to this effect is the PATH shapes - they create
 * flowing ribbons that sweep across the canvas, not circular blobs.
 */

interface AuroraProps {
  /** Base hue (0-360) for the main color */
  hue?: number;
  /** Size of the aurora container in pixels */
  size?: number;
  /** Unique ID for gradient definitions (required when rendering multiple) */
  id?: string;
  /** Optional className for styling */
  className?: string;
  /** Variant determines the path shapes (1-6) */
  variant?: number;
}

export function Aurora({
  hue = 155,
  size = 400,
  id = 'aurora',
  className = '',
  variant = 1
}: AuroraProps) {
  // Generate color palette from base hue
  const c1 = `hsl(${hue}, 75%, 55%)`;
  const c2 = `hsl(${hue + 15}, 70%, 48%)`;
  const c3 = `hsl(${hue - 10}, 80%, 62%)`;
  const c4 = `hsl(${hue + 8}, 72%, 58%)`;

  // Pink accents (consistent across all auroras)
  const pink1 = '#FF69B4';
  const pink2 = '#FF8DC7';
  const pink3 = '#D64B91';

  // Define different path variants for each service
  const getMainRibbon1 = () => {
    const paths = [
      "M -20,180 C 60,120 120,100 200,130 C 280,160 340,140 420,100 C 420,140 340,180 280,190 C 200,205 100,200 40,220 C -10,235 -20,210 -20,180 Z",
      "M -20,160 C 70,110 140,95 210,125 C 290,155 350,130 420,85 C 420,125 350,170 290,185 C 210,200 110,195 50,215 C 0,230 -20,190 -20,160 Z",
      "M -20,190 C 50,135 110,115 190,140 C 270,165 330,150 420,115 C 420,155 330,190 270,200 C 190,215 90,208 30,228 C -15,240 -20,220 -20,190 Z",
      "M -20,170 C 65,125 125,105 205,135 C 285,165 345,145 420,105 C 420,145 345,185 285,195 C 205,210 105,203 45,223 C -5,238 -20,200 -20,170 Z",
      "M -20,185 C 55,130 115,110 195,138 C 275,168 335,148 420,110 C 420,150 335,188 275,198 C 195,213 95,206 35,226 C -12,238 -20,215 -20,185 Z",
      "M -20,175 C 58,118 118,98 198,128 C 278,158 338,138 420,98 C 420,138 338,178 278,188 C 198,203 98,198 38,218 C -8,233 -20,205 -20,175 Z"
    ];
    return paths[variant - 1] || paths[0];
  };

  const getMainRibbon2 = () => {
    const paths = [
      "M 420,200 C 350,160 280,150 200,170 C 120,190 60,170 -20,140 C -20,180 60,210 120,220 C 200,235 300,225 360,200 C 400,185 420,190 420,200 Z",
      "M 420,210 C 340,165 270,155 190,175 C 110,195 50,175 -20,145 C -20,185 50,215 110,225 C 190,240 290,230 350,205 C 395,190 420,200 420,210 Z",
      "M 420,195 C 355,155 285,145 205,165 C 125,185 65,165 -20,135 C -20,175 65,205 125,215 C 205,230 305,220 365,195 C 405,180 420,185 420,195 Z",
      "M 420,205 C 345,162 275,152 195,172 C 115,192 55,172 -20,142 C -20,182 55,212 115,222 C 195,237 295,227 355,202 C 398,187 420,195 420,205 Z",
      "M 420,198 C 352,158 282,148 202,168 C 122,188 62,168 -20,138 C -20,178 62,208 122,218 C 202,233 302,223 362,198 C 402,183 420,188 420,198 Z",
      "M 420,203 C 348,163 278,153 198,173 C 118,193 58,173 -20,143 C -20,183 58,213 118,223 C 198,238 298,228 358,203 C 400,188 420,193 420,203 Z"
    ];
    return paths[variant - 1] || paths[0];
  };

  const getUpperAccent = () => {
    const paths = [
      "M 30,140 C 100,90 180,85 250,110 C 320,135 370,120 400,90 C 390,130 330,155 270,160 C 190,168 110,165 60,175 C 30,182 30,160 30,140 Z",
      "M 40,135 C 110,85 190,80 260,105 C 330,130 380,115 410,85 C 400,125 340,150 280,155 C 200,163 120,160 70,170 C 40,177 40,155 40,135 Z",
      "M 25,145 C 95,95 175,90 245,115 C 315,140 365,125 395,95 C 385,135 325,160 265,165 C 185,173 105,170 55,180 C 25,187 25,165 25,145 Z",
      "M 35,138 C 105,88 185,83 255,108 C 325,133 375,118 405,88 C 395,128 335,153 275,158 C 195,166 115,163 65,173 C 35,180 35,158 35,138 Z",
      "M 32,142 C 102,92 182,87 252,112 C 322,137 372,122 402,92 C 392,132 332,157 272,162 C 192,170 112,167 62,177 C 32,184 32,162 32,142 Z",
      "M 28,143 C 98,93 178,88 248,113 C 318,138 368,123 398,93 C 388,133 328,158 268,163 C 188,171 108,168 58,178 C 28,185 28,163 28,143 Z"
    ];
    return paths[variant - 1] || paths[0];
  };

  const getLowerAccent = () => {
    const paths = [
      "M 50,240 C 120,210 200,200 280,215 C 340,225 380,215 400,195 C 395,235 340,255 280,258 C 200,262 120,255 70,265 C 40,270 45,255 50,240 Z",
      "M 60,245 C 130,215 210,205 290,220 C 350,230 390,220 410,200 C 405,240 350,260 290,263 C 210,267 130,260 80,270 C 50,275 55,260 60,245 Z",
      "M 45,238 C 115,208 195,198 275,213 C 335,223 375,213 395,193 C 390,233 335,253 275,256 C 195,260 115,253 65,263 C 35,268 40,253 45,238 Z",
      "M 55,242 C 125,212 205,202 285,217 C 345,227 385,217 405,197 C 400,237 345,257 285,260 C 205,264 125,257 75,267 C 45,272 50,257 55,242 Z",
      "M 52,241 C 122,211 202,201 282,216 C 342,226 382,216 402,196 C 397,236 342,256 282,259 C 202,263 122,256 72,266 C 42,271 47,256 52,241 Z",
      "M 48,239 C 118,209 198,199 278,214 C 338,224 378,214 398,194 C 393,234 338,254 278,257 C 198,261 118,254 68,264 C 38,269 43,254 48,239 Z"
    ];
    return paths[variant - 1] || paths[0];
  };

  const getPinkRibbon = () => {
    const paths = [
      "M 100,190 C 150,165 200,160 260,175 C 310,188 340,180 360,165 C 350,195 310,210 260,212 C 200,215 150,210 115,218 C 90,223 95,205 100,190 Z",
      "M 110,195 C 160,170 210,165 270,180 C 320,193 350,185 370,170 C 360,200 320,215 270,217 C 210,220 160,215 125,223 C 100,228 105,210 110,195 Z",
      "M 95,188 C 145,163 195,158 255,173 C 305,186 335,178 355,163 C 345,193 305,208 255,210 C 195,213 145,208 110,216 C 85,221 90,203 95,188 Z",
      "M 105,192 C 155,167 205,162 265,177 C 315,190 345,182 365,167 C 355,197 315,212 265,214 C 205,217 155,212 120,220 C 95,225 100,207 105,192 Z",
      "M 102,191 C 152,166 202,161 262,176 C 312,189 342,181 362,166 C 352,196 312,211 262,213 C 202,216 152,211 117,219 C 92,224 97,206 102,191 Z",
      "M 98,189 C 148,164 198,159 258,174 C 308,187 338,179 358,164 C 348,194 308,209 258,211 C 198,214 148,209 113,217 C 88,222 93,204 98,189 Z"
    ];
    return paths[variant - 1] || paths[0];
  };

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        position: 'relative'
      }}
    >
      {/* Keyframe animations */}
      <style>{`
        @keyframes auroraFlow1 {
          0%, 100% { transform: translateX(0) translateY(0) rotate(0deg); }
          33% { transform: translateX(12px) translateY(-8px) rotate(1.5deg); }
          66% { transform: translateX(-8px) translateY(6px) rotate(-1deg); }
        }
        @keyframes auroraFlow2 {
          0%, 100% { transform: translateX(0) translateY(0) rotate(0deg); }
          50% { transform: translateX(-15px) translateY(10px) rotate(-2deg); }
        }
        @keyframes auroraFlow3 {
          0%, 100% { transform: translateX(0) translateY(0) scale(1); }
          50% { transform: translateX(18px) translateY(-12px) scale(1.04); }
        }
        @keyframes auroraFlow4 {
          0%, 100% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(-12px) translateY(8px); }
        }
        @keyframes auroraPinkFlow {
          0%, 100% { transform: translateX(0) translateY(0); opacity: 1; }
          50% { transform: translateX(10px) translateY(-6px); opacity: 0.75; }
        }
        @keyframes auroraPinkPulse {
          0%, 100% { transform: translateX(0) scale(1); opacity: 1; }
          50% { transform: translateX(8px) scale(1.1); opacity: 0.7; }
        }
        @keyframes auroraWisp1 {
          0%, 100% { transform: translateX(0); opacity: 0.35; }
          50% { transform: translateX(-12px); opacity: 0.2; }
        }
        @keyframes auroraWisp2 {
          0%, 100% { transform: translateX(0); opacity: 0.3; }
          50% { transform: translateX(10px); opacity: 0.18; }
        }
        @keyframes auroraWisp3 {
          0%, 100% { transform: translateX(0); opacity: 0.32; }
          50% { transform: translateX(-8px); opacity: 0.18; }
        }
      `}</style>

      <svg
        viewBox="0 0 400 350"
        style={{
          width: '100%',
          height: '100%',
          overflow: 'visible'
        }}
      >
        <defs>
          {/* Blur filters - extended region to prevent hard edges */}
          <filter id={`${id}-blur1`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="12" />
          </filter>
          <filter id={`${id}-blur2`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
          <filter id={`${id}-blur3`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" />
          </filter>

          {/* Main color gradients - fade to transparent at edges */}
          <linearGradient id={`${id}-g1`} x1="0%" y1="30%" x2="100%" y2="70%">
            <stop offset="0%" stopColor={c1} stopOpacity="0" />
            <stop offset="20%" stopColor={c1} stopOpacity="0.9" />
            <stop offset="50%" stopColor={c2} stopOpacity="0.75" />
            <stop offset="80%" stopColor={c3} stopOpacity="0.5" />
            <stop offset="100%" stopColor={c4} stopOpacity="0" />
          </linearGradient>

          <linearGradient id={`${id}-g2`} x1="10%" y1="0%" x2="90%" y2="100%">
            <stop offset="0%" stopColor={c3} stopOpacity="0" />
            <stop offset="25%" stopColor={c3} stopOpacity="0.8" />
            <stop offset="60%" stopColor={c1} stopOpacity="0.6" />
            <stop offset="100%" stopColor={c2} stopOpacity="0" />
          </linearGradient>

          <linearGradient id={`${id}-g3`} x1="100%" y1="20%" x2="0%" y2="80%">
            <stop offset="0%" stopColor={c4} stopOpacity="0" />
            <stop offset="30%" stopColor={c2} stopOpacity="0.7" />
            <stop offset="70%" stopColor={c1} stopOpacity="0.5" />
            <stop offset="100%" stopColor={c3} stopOpacity="0" />
          </linearGradient>

          {/* Pink accent gradients */}
          <radialGradient id={`${id}-p1`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={pink2} stopOpacity="0.75" />
            <stop offset="50%" stopColor={pink1} stopOpacity="0.45" />
            <stop offset="100%" stopColor={pink3} stopOpacity="0" />
          </radialGradient>

          <linearGradient id={`${id}-p2`} x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor={pink1} stopOpacity="0" />
            <stop offset="30%" stopColor={pink2} stopOpacity="0.55" />
            <stop offset="70%" stopColor={pink1} stopOpacity="0.4" />
            <stop offset="100%" stopColor={pink3} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ============================================
            MAIN FLOWING RIBBONS
            These are PATH shapes, not circles!
            The curves create the aurora "flow" effect
            ============================================ */}

        {/* Main ribbon 1 - sweeps from left to right */}
        <path
          d={getMainRibbon1()}
          fill={`url(#${id}-g1)`}
          filter={`url(#${id}-blur2)`}
          style={{ animation: 'auroraFlow1 20s ease-in-out infinite' }}
        />

        {/* Main ribbon 2 - counter sweep */}
        <path
          d={getMainRibbon2()}
          fill={`url(#${id}-g2)`}
          filter={`url(#${id}-blur2)`}
          style={{ animation: 'auroraFlow2 24s ease-in-out infinite' }}
        />

        {/* Upper accent ribbon */}
        <path
          d={getUpperAccent()}
          fill={`url(#${id}-g3)`}
          filter={`url(#${id}-blur1)`}
          opacity="0.85"
          style={{ animation: 'auroraFlow3 18s ease-in-out infinite' }}
        />

        {/* Lower accent ribbon */}
        <path
          d={getLowerAccent()}
          fill={`url(#${id}-g1)`}
          filter={`url(#${id}-blur1)`}
          opacity="0.65"
          style={{ animation: 'auroraFlow4 22s ease-in-out infinite' }}
        />

        {/* ============================================
            PINK ACCENT ELEMENTS
            Woven into the aurora, not sitting on top
            ============================================ */}

        {/* Pink ribbon accent */}
        <path
          d={getPinkRibbon()}
          fill={`url(#${id}-p2)`}
          filter={`url(#${id}-blur3)`}
          style={{ animation: 'auroraPinkFlow 15s ease-in-out infinite' }}
        />

        {/* Pink center glow */}
        <ellipse
          cx="200"
          cy="185"
          rx="55"
          ry="32"
          fill={`url(#${id}-p1)`}
          filter={`url(#${id}-blur3)`}
          style={{ animation: 'auroraPinkPulse 12s ease-in-out infinite' }}
        />

        {/* Small pink wisps */}
        <ellipse
          cx="140"
          cy="195"
          rx="28"
          ry="14"
          fill={pink1}
          opacity="0.35"
          filter={`url(#${id}-blur3)`}
          style={{ animation: 'auroraWisp1 10s ease-in-out infinite' }}
        />

        <ellipse
          cx="270"
          cy="178"
          rx="22"
          ry="11"
          fill={pink2}
          opacity="0.3"
          filter={`url(#${id}-blur3)`}
          style={{ animation: 'auroraWisp2 11s ease-in-out infinite' }}
        />

        <ellipse
          cx="190"
          cy="212"
          rx="20"
          ry="9"
          fill={pink3}
          opacity="0.32"
          filter={`url(#${id}-blur3)`}
          style={{ animation: 'auroraWisp3 9s ease-in-out infinite' }}
        />
      </svg>
    </div>
  );
}

// Service hue mappings for reference
export const serviceHues: Record<string, number> = {
  'website-design': 330,    // Pink/Magenta
  'branding': 270,          // Purple
  'social-media': 185,      // Cyan
  'content-creation': 45,   // Gold
  'photography': 25,        // Orange
  'seo': 155,               // Emerald
};
