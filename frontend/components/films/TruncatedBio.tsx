'use client';

import React, { useRef } from 'react';

type TruncatedBioProps = {
    text: string;
}

export const TruncatedBio = ({ text }: TruncatedBioProps) => {
    const [isExpanded, setIsExpanded] = React.useState(false);
    const paragraphs = text.split('\n\n');
    const truncatedText = paragraphs.slice(0, 2).join('\n\n');
    const componentRef = useRef<HTMLDivElement>(null);
    const truncationPointRef = useRef<HTMLDivElement>(null);

    const handleExpand = () => {
        setIsExpanded(true);
        // Use requestAnimationFrame to ensure the DOM has updated
        requestAnimationFrame(() => {
            if (truncationPointRef.current) {
                truncationPointRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest'
                });
            }
        });
    };

    const handleCollapse = () => {
        setIsExpanded(false);
        // Scroll back to the top of the component
        requestAnimationFrame(() => {
            if (componentRef.current) {
                componentRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest'
                });
            }
        });
    };

    const renderText = (text: string) => {
        return text.split('\n')
            .filter(line => line.trim() !== '') // Remove empty lines
            .map((line, index, array) => (
                <p key={index} className="max-w-prose mb-2 whitespace-pre-wrap">
                    <span
                        className={line.includes('CC-BY-SA') ? 'text-sm uppercase font-noto-sans-display font-stretch-ultra-condensed text-foreground/80' : ''}
                    >
                        {line}
                    </span>
                </p>
            ));
    };

    if (paragraphs.length <= 2) {
        return <p className="max-w-prose whitespace-pre-wrap">{renderText(text)}</p>;
    }

    return (
        <div ref={componentRef}>
            {isExpanded ? renderText(text) : renderText(truncatedText)}
            {!isExpanded && <div ref={truncationPointRef} className="h-0" />}
            <button
                onClick={() => isExpanded ? handleCollapse() : handleExpand()}
                className="mt-4 text-xs font-medium text-primary border border-primary rounded-sm px-2 py-1 cursor-pointer hover:bg-primary hover:text-background transition-all duration-300 uppercase"
            >
                {isExpanded ? 'Less' : 'Read more'}
            </button>
        </div>
    );
}