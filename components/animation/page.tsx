import lottie from 'lottie-web'
import {useRef, useEffect } from 'react';
const Animation = () =>{
    
    const animationContainer = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (animationContainer.current) {
          lottie.loadAnimation({
            container: animationContainer.current as Element, // Type assertion aquí
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: '/Animation.json',
          });
        }
        return () => {
          lottie.destroy(); // Limpia la animación al desmontar el componente
        };
      }, []);

    return(
        <div ref={animationContainer} className='w-10 h-10 absolute  transition  delay-100 ease-in-out 
                       
                       transform 
                       hover:scale-150
                       hover:cursor-pointer
                       '></div>
    )

}

export default Animation;