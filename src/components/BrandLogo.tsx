interface BrandLogoProps {
  src: string;
  alt?: string;
  className?: string;
}

export const BrandLogo = ({ 
  src, 
  alt = "Brand Logo",
  className = ""
}: BrandLogoProps) => {
  return (
    <div className={`fixed bottom-4 right-4 z-10 ${className}`}>
      <img 
        src={src} 
        alt={alt}
        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 object-contain opacity-80 hover:opacity-100 transition-opacity"
      />
    </div>
  );
};
