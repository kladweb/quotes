import React, { useEffect, useState } from "react";
import './scrollUp.scss'

const ScrollUp = () => {
  const coords = window.innerHeight / 4;
  const [showScrollUp, changeShowScrollUp] = useState(false);


  useEffect(
    () => {
      document.addEventListener('scroll', checkScroll);
      return () => {
        document.removeEventListener('scroll', checkScroll);
      };
    },
    [showScrollUp]
  );

  function checkScroll() {
    let scrolled = window.scrollY;
    if (coords < scrolled && !showScrollUp) {
      changeShowScrollUp(true);
    }
    if (coords > scrolled && showScrollUp) {
      changeShowScrollUp(false);
    }
  }

  function scrollPage() {
    let scrolled = window.scrollY;
    window.scrollBy(0, -scrolled);
  }

  return (
    <div className={`scroll-up ${(!showScrollUp) && 'showScrollUp'}`} onClick={scrollPage}>
      <span className='material-icons-outlined'>expand_less</span>
    </div>
  );
}

export default React.memo(ScrollUp);