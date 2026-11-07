export default function Constellations() {
  return (
    <svg
      className="backdrop-constellations"
      viewBox="0 0 1400 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="constellationStarGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="45%" stopColor="var(--ui-accent)" stopOpacity="0.85" />
          <stop offset="100%" stopColor="var(--ui-accent)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Celestial Coordinate Grids & Ecliptic Arcs */}
      <g className="celestial-grid" stroke="var(--ui-accent)" strokeWidth="0.6" strokeDasharray="3 14" opacity="0.18">
        <path d="M-50,220 C 350,120 850,380 1450,200" fill="none" />
        <path d="M-50,650 C 400,520 900,740 1450,580" fill="none" />
        <path d="M420,-50 C 380,350 480,650 440,950" fill="none" />
        <path d="M980,-50 C 940,300 1020,680 960,950" fill="none" />
      </g>

      {/* Constellation 1: Cassiopeia (Upper Left) */}
      <g className="constellation constellation-cassiopeia">
        <polyline
          points="130,170 190,230 250,180 310,240 375,200"
          fill="none"
          stroke="var(--ui-accent)"
          strokeWidth="0.9"
          opacity="0.38"
        />
        <circle cx="130" cy="170" r="3.2" fill="url(#constellationStarGlow)" />
        <circle cx="190" cy="230" r="2.6" fill="url(#constellationStarGlow)" />
        <circle cx="250" cy="180" r="3.6" fill="url(#constellationStarGlow)" />
        <circle cx="310" cy="240" r="2.8" fill="url(#constellationStarGlow)" />
        <circle cx="375" cy="200" r="3" fill="url(#constellationStarGlow)" />
        <text x="115" y="160" className="constellation-star-label">β Caph</text>
        <text x="240" y="165" className="constellation-star-label">γ Navi</text>
        <text x="365" y="190" className="constellation-star-label">ε Segin</text>
        <text x="205" y="275" className="constellation-name">CASSIOPEIA</text>
      </g>

      {/* Constellation 2: Cygnus / Northern Cross (Upper Center-Right) */}
      <g className="constellation constellation-cygnus">
        <line x1="720" y1="110" x2="790" y2="210" stroke="var(--ui-accent)" strokeWidth="0.9" opacity="0.38" />
        <line x1="790" y1="210" x2="860" y2="330" stroke="var(--ui-accent)" strokeWidth="0.9" opacity="0.38" />
        <line x1="680" y1="240" x2="790" y2="210" stroke="var(--ui-accent)" strokeWidth="0.9" opacity="0.38" />
        <line x1="790" y1="210" x2="900" y2="180" stroke="var(--ui-accent)" strokeWidth="0.9" opacity="0.38" />
        <circle cx="720" cy="110" r="4" fill="url(#constellationStarGlow)" />
        <circle cx="790" cy="210" r="3.4" fill="url(#constellationStarGlow)" />
        <circle cx="860" cy="330" r="2.8" fill="url(#constellationStarGlow)" />
        <circle cx="680" cy="240" r="2.8" fill="url(#constellationStarGlow)" />
        <circle cx="900" cy="180" r="3" fill="url(#constellationStarGlow)" />
        <text x="700" y="98" className="constellation-star-label">α Deneb</text>
        <text x="800" y="205" className="constellation-star-label">γ Sadr</text>
        <text x="870" y="345" className="constellation-star-label">β Albireo</text>
        <text x="750" y="375" className="constellation-name">CYGNUS // NORTHERN CROSS</text>
      </g>

      {/* Constellation 3: Ursa Major / Big Dipper (Lower Left) */}
      <g className="constellation constellation-ursa">
        <polygon
          points="220,680 310,660 350,740 250,755"
          fill="none"
          stroke="var(--ui-accent)"
          strokeWidth="0.9"
          opacity="0.35"
        />
        <polyline
          points="310,660 390,620 460,570 530,510"
          fill="none"
          stroke="var(--ui-accent)"
          strokeWidth="0.9"
          opacity="0.35"
        />
        <circle cx="220" cy="680" r="3.2" fill="url(#constellationStarGlow)" />
        <circle cx="310" cy="660" r="3.4" fill="url(#constellationStarGlow)" />
        <circle cx="350" cy="740" r="3" fill="url(#constellationStarGlow)" />
        <circle cx="250" cy="755" r="2.8" fill="url(#constellationStarGlow)" />
        <circle cx="390" cy="620" r="3.2" fill="url(#constellationStarGlow)" />
        <circle cx="460" cy="570" r="3" fill="url(#constellationStarGlow)" />
        <circle cx="530" cy="510" r="3.6" fill="url(#constellationStarGlow)" />
        <text x="180" y="675" className="constellation-star-label">Dubhe</text>
        <text x="540" y="505" className="constellation-star-label">Alkaid</text>
        <text x="250" y="795" className="constellation-name">URSA MAJOR</text>
      </g>

      {/* Constellation 4: Orion (Lower Right) */}
      <g className="constellation constellation-orion">
        <line x1="1120" y1="520" x2="1170" y2="610" stroke="var(--ui-accent)" strokeWidth="0.8" opacity="0.32" />
        <line x1="1260" y1="540" x2="1210" y2="630" stroke="var(--ui-accent)" strokeWidth="0.8" opacity="0.32" />
        <line x1="1170" y1="610" x2="1140" y2="720" stroke="var(--ui-accent)" strokeWidth="0.8" opacity="0.32" />
        <line x1="1210" y1="630" x2="1250" y2="730" stroke="var(--ui-accent)" strokeWidth="0.8" opacity="0.32" />
        <line x1="1170" y1="610" x2="1210" y2="630" stroke="var(--ui-accent)" strokeWidth="1.2" opacity="0.5" />
        <circle cx="1120" cy="520" r="4" fill="url(#constellationStarGlow)" />
        <circle cx="1260" cy="540" r="3.2" fill="url(#constellationStarGlow)" />
        <circle cx="1170" cy="610" r="3.2" fill="url(#constellationStarGlow)" />
        <circle cx="1190" cy="620" r="3.2" fill="url(#constellationStarGlow)" />
        <circle cx="1210" cy="630" r="3.2" fill="url(#constellationStarGlow)" />
        <circle cx="1140" cy="720" r="3.2" fill="url(#constellationStarGlow)" />
        <circle cx="1250" cy="730" r="4.2" fill="url(#constellationStarGlow)" />
        <text x="1070" y="510" className="constellation-star-label">α Betelgeuse</text>
        <text x="1260" y="750" className="constellation-star-label">β Rigel</text>
        <text x="1150" y="775" className="constellation-name">ORION</text>
      </g>

      {/* Navigational Coordinate Crosshairs */}
      <g className="coordinate-markers" fill="var(--ui-accent)" opacity="0.35">
        <text x="130" y="80" className="coord-text">+ 14.8386° N // RA: 02h 31m</text>
        <text x="1160" y="80" className="coord-text">+ 120.2842° E // DEC: +89°</text>
      </g>
    </svg>
  );
}
