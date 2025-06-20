
import React, { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
  onLoad?: () => void;
  priority?: boolean;
}

export default function OptimizedImage({ 
  src, 
  alt, 
  className = "", 
  placeholderClassName = "",
  onLoad,
  priority = false
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoaded(true);
  }, []);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {!isLoaded && (
        <div 
          className={cn(
            "absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 animate-pulse",
            placeholderClassName
          )}
        />
      )}
      <img
        src={hasError ? "/placeholder.svg" : src}
        alt={alt}
        className={cn(
          "transition-opacity duration-500",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    </div>
  );
}
