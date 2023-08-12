'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const fallbackImage = '/profile.svg';

type ImageWithFallbackProps = {
  src: string;
  alt: string;
  fallback?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
};

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallback = fallbackImage,
  ...props
}) => {
  const [hasError, setHasError] = useState(Boolean);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  return (
    <Image
      onError={() => setHasError(true)}
      src={hasError ? fallback : src}
      alt={alt}
      {...props}
    />
  );
};

export default ImageWithFallback;
