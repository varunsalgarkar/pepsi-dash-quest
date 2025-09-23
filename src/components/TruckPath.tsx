import { useEffect, useState } from "react";

interface TruckPathProps {
  currentCheckpoint: number;
  totalCheckpoints: number;
  isMoving: boolean;
}

export const TruckPath = ({ currentCheckpoint, totalCheckpoints, isMoving }: TruckPathProps) => {
  const [truckPosition, setTruckPosition] = useState({ x: 0, y: 0 });

  // Calculate sinusoidal path positions
  const getCheckpointPosition = (checkpoint: number) => {
    const progress = checkpoint / (totalCheckpoints - 1);
    const x = progress * 80; // 80% of container width
    const y = Math.sin(progress * Math.PI * 2) * 15 + 50; // Sinusoidal wave
    return { x, y };
  };

  useEffect(() => {
    if (isMoving && currentCheckpoint > 0) {
      const newPosition = getCheckpointPosition(currentCheckpoint - 1);
      setTruckPosition(newPosition);
    }
  }, [currentCheckpoint, isMoving, totalCheckpoints]);

  const checkpoints = Array.from({ length: totalCheckpoints }, (_, i) => {
    const position = getCheckpointPosition(i);
    const isReached = i < currentCheckpoint;
    const isCurrent = i === currentCheckpoint - 1;
    
    return (
      <div
        key={i}
        className={`absolute w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 transition-all duration-500 ${
          isReached 
            ? 'bg-correct border-correct shadow-lg' 
            : isCurrent
            ? 'bg-pepsi-blue border-pepsi-blue pulse-effect'
            : 'bg-neutral border-neutral'
        }`}
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="absolute -bottom-6 sm:-bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-foreground/70 whitespace-nowrap">
          Q{i + 1}
        </div>
      </div>
    );
  });

  // Draw the path line
  const pathPoints = Array.from({ length: 100 }, (_, i) => {
    const progress = i / 99;
    const x = progress * 80 + 10; // Start at 10%, end at 90%
    const y = Math.sin(progress * Math.PI * 2) * 15 + 50;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="relative w-full h-32 sm:h-36 md:h-40 glass-card overflow-hidden">
      {/* Path line */}
      <svg className="absolute inset-0 w-full h-full">
        <polyline
          points={pathPoints}
          fill="none"
          stroke="hsl(var(--sting-gold))"
          strokeWidth="2"
          strokeDasharray="4,4"
          className="opacity-70 sm:stroke-[3]"
        />
      </svg>

      {/* Checkpoints */}
      {checkpoints}

      {/* Truck */}
      <div
        className={`absolute text-lg sm:text-xl md:text-2xl transition-all duration-1000 ${
          isMoving ? 'truck-animate' : ''
        }`}
        style={{
          left: `${truckPosition.x}%`,
          top: `${truckPosition.y}%`,
          transform: 'translate(-50%, -50%)',
          '--truck-x': `${truckPosition.x}%`,
          '--truck-y': `${truckPosition.y}%`,
        } as any}
      >
        🚛
      </div>

      {/* Revenue meter backdrop */}
      <div className="absolute bottom-1 sm:bottom-2 left-2 sm:left-4 right-2 sm:right-4">
        <div className="text-xs font-medium text-sting-white/70 mb-1 hidden sm:block">Sting Revenue Progress</div>
        <div className="w-full bg-sting-black/30 rounded-full h-1.5 sm:h-2">
          <div 
            className="sting-gradient h-1.5 sm:h-2 rounded-full transition-all duration-1000"
            style={{ width: `${(currentCheckpoint / totalCheckpoints) * 100}%` }}
          />
        </div>
        <div className="text-xs text-sting-gold font-medium mt-1">
          ${currentCheckpoint}M / ${totalCheckpoints}M Target
        </div>
      </div>
    </div>
  );
};