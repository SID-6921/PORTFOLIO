import React, { useState, useCallback, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
  onLoad?: () => void;
  priority?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  quality?: number;
}

export default function OptimizedImage({ 
  src, 
  alt, 
  className = "", 
  placeholderClassName = "",
  onLoad,
  priority = false,
  width,
  height,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality = 85
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isInView) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observerRef.current?.disconnect();
          }
        });
      },
      {
        rootMargin: "50px",
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [priority, isInView]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoaded(true);
  }, []);

  // Generate optimized image URLs for different formats and sizes
  const generateSrcSet = (originalSrc: string) => {
    // If it's a Cloudinary URL, generate optimized versions
    if (originalSrc.includes('cloudinary.com')) {
      try {
        const baseUrl = originalSrc.split('/upload/')[0] + '/upload/';
        const imagePath = originalSrc.split('/upload/')[1];
        
        if (!imagePath) {
          return originalSrc;
        }
      
        return [
          `${baseUrl}w_400,f_webp,q_${quality}/${imagePath} 400w`,
          `${baseUrl}w_800,f_webp,q_${quality}/${imagePath} 800w`,
          `${baseUrl}w_1200,f_webp,q_${quality}/${imagePath} 1200w`,
          `${baseUrl}w_1600,f_webp,q_${quality}/${imagePath} 1600w`
        ].join(', ');
      } catch (error) {
        console.warn('Error generating Cloudinary srcSet:', error);
        return originalSrc;
      }
    }
    
    return originalSrc;
  };

  const generateFallbackSrcSet = (originalSrc: string) => {
    if (originalSrc.includes('cloudinary.com')) {
      try {
        const baseUrl = originalSrc.split('/upload/')[0] + '/upload/';
        const imagePath = originalSrc.split('/upload/')[1];
        
        if (!imagePath) {
          return originalSrc;
        }
      
        return [
          `${baseUrl}w_400,q_${quality}/${imagePath} 400w`,
          `${baseUrl}w_800,q_${quality}/${imagePath} 800w`,
          `${baseUrl}w_1200,q_${quality}/${imagePath} 1200w`,
          `${baseUrl}w_1600,q_${quality}/${imagePath} 1600w`
        ].join(', ');
      } catch (error) {
        console.warn('Error generating Cloudinary fallback srcSet:', error);
        return originalSrc;
      }
    }
    
    return originalSrc;
  };

  return (
    <div className={cn("relative overflow-hidden", className)} ref={imgRef}>
      {/* Loading placeholder */}
      {!isLoaded && (
        <div 
          className={cn(
            "absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 animate-pulse",
            placeholderClassName
          )}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gray-300 dark:border-gray-600 border-t-blue-500 rounded-full animate-spin" />
          </div>
        </div>
      )}

      {/* Optimized image with WebP support */}
      {(isInView || priority) && (
        <picture>
          {/* WebP format for modern browsers */}
          <source
            srcSet={generateSrcSet(src)}
            sizes={sizes}
            type="image/webp"
          />
          
          {/* Fallback for older browsers */}
          <source
            srcSet={generateFallbackSrcSet(src)}
            sizes={sizes}
            type="image/jpeg"
          />
          
          {/* Main image element */}
          <img
            src={hasError ? "https://via.placeholder.com/400x400/e5e7eb/6b7280?text=Profile+Image" : src}
            alt={alt}
            width={width}
            height={height}
            className={cn(
              "transition-opacity duration-500 w-full h-full object-cover",
              isLoaded ? "opacity-100" : "opacity-0",
              className
            )}
            onLoad={handleLoad}
            onError={handleError}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            style={{
              aspectRatio: width && height ? `${width}/${height}` : undefined
            }}
          />
        </picture>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <div className="text-4xl mb-2">👤</div>
            <div className="text-sm">Profile Image</div>
          </div>
        </div>
      )}
    </div>
  );
}