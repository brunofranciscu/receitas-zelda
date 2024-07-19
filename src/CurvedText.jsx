import CircleType from 'circletype';
import React, { useEffect, useRef } from 'react';

export default function CurvedText({text, className}) {
    const textRef = useRef(null);

    useEffect(() => {
        const circleType = new CircleType(textRef.current);
        circleType.radius(200).dir(1);
        adjustTextSpacing();
    }, []);
    
    const adjustTextSpacing = () => {
        const textWidth = textRef.current.firstChild.offsetWidth;
        const letterSpacing = (300 - textWidth) / (text.length - 1);
        textRef.current.style.letterSpacing = `${letterSpacing}px`;
    };

    return (
        <div ref={textRef} className={className}>
            <span>{text}</span>
        </div>
    );
}