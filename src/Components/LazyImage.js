import React, {useEffect, useState, useRef} from 'react';


function LazyImage (imageProps) {
    const [shouldLoad, setShouldLoad] = useState(false);
    const placeholderRef = useRef(null);
  
    useEffect(() => {
      if (!shouldLoad && placeholderRef.current) {
        const observer = new IntersectionObserver(([{ intersectionRatio }]) => {
          if (intersectionRatio > 0) {
            setShouldLoad(true);
          }
        });
        observer.observe(placeholderRef.current);
        return () => observer.disconnect();
      }
    }, [shouldLoad, placeholderRef]);
  
    return (shouldLoad 
      ? <img {...imageProps} alt="project-img"/> 
      : <div className="image img-placeholder" ref={placeholderRef}><h3>Loading...</h3></div>
    );
};

export default LazyImage;