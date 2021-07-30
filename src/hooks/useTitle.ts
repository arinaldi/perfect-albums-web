import { useEffect } from 'react';

function useTitle(title: string): void {
  useEffect(() => {
    document.title = `Perfect Albums | ${title}`;
  }, [title]);
}

export default useTitle;
