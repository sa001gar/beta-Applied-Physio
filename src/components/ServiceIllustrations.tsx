import React from 'react';

interface IconProps {
  className?: string;
}

// 1. Manual Therapy
export const ManualTherapyIcon: React.FC<IconProps> = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="45" fill="#14532d" fillOpacity="0.5" stroke="#16a34a" strokeWidth="1.5" />
    <circle cx="50" cy="50" r="30" stroke="#86efac" strokeWidth="1" strokeDasharray="3 3" />
    {/* Hands holding a heart/joint */}
    <path d="M40 65C35 60 30 52 35 45C38 40 45 40 50 46C55 40 62 40 65 45C70 52 65 60 60 65L50 75L40 65Z" stroke="#4ade80" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M30 45C22 50 25 65 38 72" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
    <path d="M70 45C78 50 75 65 62 72" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
    <circle cx="50" cy="53" r="3" fill="#ffffff" />
  </svg>
);

// 2. Orthopedic Physiotherapy
export const OrthopedicIcon: React.FC<IconProps> = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="45" fill="#14532d" fillOpacity="0.5" stroke="#16a34a" strokeWidth="1.5" />
    {/* Stylized Joint / Bones Connection */}
    <path d="M50 25V75" stroke="#86efac" strokeWidth="4" strokeLinecap="round" opacity="0.3" />
    <rect x="46" y="35" width="8" height="30" rx="4" fill="#4ade80" />
    <circle cx="50" cy="35" r="7" fill="#ffffff" stroke="#166534" strokeWidth="2" />
    <circle cx="50" cy="65" r="7" fill="#ffffff" stroke="#166534" strokeWidth="2" />
    {/* Healing Arrow Orbits */}
    <path d="M30 50C30 38.95 38.95 30 50 30" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M70 50C70 61.05 59.05 70 50 70" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// 3. Sports Rehabilitation
export const SportsIcon: React.FC<IconProps> = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="45" fill="#14532d" fillOpacity="0.5" stroke="#16a34a" strokeWidth="1.5" />
    <circle cx="50" cy="50" r="35" stroke="#86efac" strokeWidth="1" strokeDasharray="5 3" />
    {/* Dumbbell & Athletic Pulse */}
    <path d="M30 65L65 30" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
    <path d="M25 60L35 70" stroke="#4ade80" strokeWidth="7" strokeLinecap="round" />
    <path d="M60 25L70 35" stroke="#4ade80" strokeWidth="7" strokeLinecap="round" />
    {/* Dynamic pulse / speed line */}
    <path d="M20 50H35L42 32L50 68L58 45L65 50H80" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 4. Neurological Physiotherapy
export const NeurologicalIcon: React.FC<IconProps> = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="45" fill="#14532d" fillOpacity="0.5" stroke="#16a34a" strokeWidth="1.5" />
    {/* Brain profile and neural pathways */}
    <path d="M50 25C36 25 32 35 32 48C32 58 40 65 44 68C48 70 50 78 50 78" stroke="#86efac" stroke-width="3" stroke-linecap="round" fill="none"/>
    <path d="M50 25C64 25 68 35 68 48C68 58 60 65 56 68C52 70 50 78 50 78" stroke="#86efac" stroke-width="3" stroke-linecap="round" fill="none"/>
    {/* Connected Nodes */}
    <circle cx="50" cy="35" r="4" fill="#ffffff" />
    <circle cx="40" cy="48" r="4" fill="#4ade80" />
    <circle cx="60" cy="48" r="4" fill="#4ade80" />
    <circle cx="50" cy="60" r="4" fill="#facc15" />
    
    <path d="M50 35L40 48M50 35L60 48M40 48L50 60M60 48L50 60" stroke="#ffffff" strokeWidth="1.5" />
  </svg>
);

// 5. Pediatric Physiotherapy
export const PediatricIcon: React.FC<IconProps> = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="45" fill="#14532d" fillOpacity="0.5" stroke="#16a34a" strokeWidth="1.5" />
    {/* Growing plant and child reaching representing development */}
    <path d="M50 80V45" stroke="#86efac" strokeWidth="4" stroke-linecap="round" />
    {/* Leaves */}
    <path d="M50 65C40 60 35 50 38 45C43 45 48 55 50 65Z" fill="#4ade80" />
    <path d="M50 55C60 50 65 40 62 35C57 35 52 45 50 55Z" fill="#4ade80" />
    {/* Floating stars */}
    <path d="M30 30L33 33L30 36L27 33Z" fill="#facc15" />
    <path d="M70 25L73 28L70 31L67 28Z" fill="#facc15" />
    <circle cx="50" cy="30" r="5" fill="#ffffff" />
  </svg>
);

// 6. Geriatric Physiotherapy
export const GeriatricIcon: React.FC<IconProps> = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="45" fill="#14532d" fillOpacity="0.5" stroke="#16a34a" strokeWidth="1.5" />
    {/* Healing Shield and cane/support silhouette */}
    <path d="M50 25C65 25 70 32 70 48C70 65 50 78 50 78C50 78 30 65 30 48C30 32 35 25 50 25Z" stroke="#86efac" strokeWidth="3" stroke-linejoin="round" />
    {/* Supportive walker/cane model */}
    <path d="M45 42H55M42 42V65M58 42V65" stroke="#facc15" strokeWidth="2.5" stroke-linecap="round" />
    <circle cx="50" cy="52" r="5" fill="#ffffff" />
  </svg>
);

// 7. Post Surgical Rehabilitation
export const PostSurgicalIcon: React.FC<IconProps> = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="45" fill="#14532d" fillOpacity="0.5" stroke="#16a34a" strokeWidth="1.5" />
    <circle cx="50" cy="50" r="35" stroke="#86efac" strokeWidth="1" strokeDasharray="8 4" />
    {/* Medical Cross and Checkmark */}
    <path d="M50 32V68M32 50H68" stroke="#4ade80" strokeWidth="4.5" stroke-linecap="round" opacity="0.4" />
    {/* Bold Success Checkmark */}
    <path d="M35 52L46 63L68 37" stroke="#ffffff" strokeWidth="5" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="68" cy="37" r="3.5" fill="#facc15" />
  </svg>
);

// 8. Dry Needling
export const DryNeedlingIcon: React.FC<IconProps> = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="45" fill="#14532d" fillOpacity="0.5" stroke="#16a34a" strokeWidth="1.5" />
    {/* Target point (concentric circles) and needle release */}
    <circle cx="50" cy="50" r="15" stroke="#86efac" strokeWidth="2" stroke-dasharray="3 3" />
    <circle cx="50" cy="50" r="8" stroke="#86efac" strokeWidth="2" />
    <circle cx="50" cy="50" r="2.5" fill="#ffffff" />
    {/* Needle path */}
    <path d="M72 28L54 46" stroke="#facc15" strokeWidth="3" stroke-linecap="round" />
    <path d="M76 24L70 30" stroke="#ffffff" strokeWidth="5.5" stroke-linecap="round" />
    {/* Wave energy release */}
    <path d="M32 58C36 54 44 54 48 58" stroke="#4ade80" strokeWidth="2.5" stroke-linecap="round" />
    <path d="M28 64C34 58 46 58 52 64" stroke="#4ade80" strokeWidth="1.5" stroke-linecap="round" />
  </svg>
);

// 9. Electrotherapy
export const ElectrotherapyIcon: React.FC<IconProps> = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="45" fill="#14532d" fillOpacity="0.5" stroke="#16a34a" strokeWidth="1.5" />
    {/* Electrical signals/sparks and waves */}
    <path d="M50 20L45 42H58L50 80L55 58H42L50 20Z" fill="#facc15" />
    {/* Concentric TENS waves */}
    <path d="M25 40C22 46 22 54 25 60" stroke="#86efac" strokeWidth="2.5" stroke-linecap="round" />
    <path d="M18 35C13 44 13 56 18 65" stroke="#86efac" strokeWidth="1.5" stroke-linecap="round" />
    <path d="M75 40C78 46 78 54 75 60" stroke="#86efac" strokeWidth="2.5" stroke-linecap="round" />
    <path d="M82 35C87 44 87 56 82 65" stroke="#86efac" strokeWidth="1.5" stroke-linecap="round" />
  </svg>
);

// 10. Posture Correction
export const PostureIcon: React.FC<IconProps> = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="45" fill="#14532d" fillOpacity="0.5" stroke="#16a34a" strokeWidth="1.5" />
    {/* Perfectly aligned spine with vertical balance guide */}
    <path d="M50 20V80" stroke="#facc15" strokeWidth="1.5" stroke-dasharray="4 4" />
    {/* Vertebrae details */}
    <path d="M50 30 C45 35, 55 35, 50 40 C45 45, 55 45, 50 50 C45 55, 55 55, 50 60 C45 65, 55 65, 50 70" stroke="#86efac" strokeWidth="4.5" stroke-linecap="round" fill="none" />
    {/* Balance weights */}
    <circle cx="50" cy="25" r="5" fill="#ffffff" />
    <path d="M35 50H65" stroke="#ffffff" strokeWidth="2" stroke-linecap="round" />
    <circle cx="35" cy="50" r="3.5" fill="#4ade80" />
    <circle cx="65" cy="50" r="3.5" fill="#4ade80" />
  </svg>
);

// 11. Home Physiotherapy
export const HomePhysioIcon: React.FC<IconProps> = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="45" fill="#14532d" fillOpacity="0.5" stroke="#16a34a" strokeWidth="1.5" />
    {/* Home with Medical Cross */}
    <path d="M50 25L25 45V75H75V45L50 25Z" stroke="#86efac" strokeWidth="3" stroke-linejoin="round" />
    <path d="M42 55H58M50 47V63" stroke="#facc15" strokeWidth="4.5" stroke-linecap="round" />
    <rect x="44" y="65" width="12" height="10" fill="#ffffff" opacity="0.3" />
    <circle cx="50" cy="38" r="2.5" fill="#ffffff" />
  </svg>
);

// 12. Corporate Physiotherapy
export const CorporateIcon: React.FC<IconProps> = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="45" fill="#14532d" fillOpacity="0.5" stroke="#16a34a" strokeWidth="1.5" />
    {/* Ergonomics screen / group synergy */}
    <rect x="30" y="30" width="40" height="26" rx="3" stroke="#86efac" strokeWidth="3" />
    <path d="M45 56L40 70H60L55 56" fill="#86efac" opacity="0.4" stroke="#86efac" strokeWidth="1.5" />
    <path d="M35 70H65" stroke="#ffffff" strokeWidth="3" stroke-linecap="round" />
    {/* Ergonomic wellness waves */}
    <path d="M38 43C42 39 48 47 52 43C56 39 60 45 62 43" stroke="#facc15" strokeWidth="2" stroke-linecap="round" />
  </svg>
);

// Helper function to map service ID to the correct custom premium illustration
export const getServiceIllustration = (id: string, className?: string) => {
  switch (id) {
    case 'manual':
      return <ManualTherapyIcon className={className} />;
    case 'orthopaedic':
      return <OrthopedicIcon className={className} />;
    case 'sports':
      return <SportsIcon className={className} />;
    case 'neurological':
      return <NeurologicalIcon className={className} />;
    case 'pediatric':
      return <PediatricIcon className={className} />;
    case 'geriatric':
      return <GeriatricIcon className={className} />;
    case 'post-surgical':
      return <PostSurgicalIcon className={className} />;
    case 'dry-needling':
      return <DryNeedlingIcon className={className} />;
    case 'electrotherapy':
      return <ElectrotherapyIcon className={className} />;
    case 'posture':
      return <PostureIcon className={className} />;
    case 'home-physio':
      return <HomePhysioIcon className={className} />;
    case 'corporate':
      return <CorporateIcon className={className} />;
    default:
      return <OrthopedicIcon className={className} />;
  }
};
