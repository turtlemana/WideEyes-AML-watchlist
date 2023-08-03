import { useCallback } from 'react';

const useHandleImageError = () => {
    const handleWeatherImageError = useCallback(
      (event: React.SyntheticEvent<HTMLImageElement>) => {
        const target = event.target as HTMLImageElement;
        target.src = '/images/noProfile.svg';
      },
      []
    );
  
    return handleWeatherImageError;
  };


export default useHandleImageError;