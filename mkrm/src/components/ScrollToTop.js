import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// page 전환후 scroll 가리키는 위치 함수(default는 맨위(0,0))
// ----------------------------------------------------------------------

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
