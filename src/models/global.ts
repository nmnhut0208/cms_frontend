// Global variable example
import { DEFAULT_FALLBACK_IMAGE, DEFAULT_NAME } from '@/constants';
import { useState } from 'react';

export const useUser = () => {
  const [name, setName] = useState<string>(DEFAULT_NAME);
  return {
    name,
    setName,
  };
};

export const fallbackImage = DEFAULT_FALLBACK_IMAGE;
