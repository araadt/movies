type FluidColumnProps = {
    children: React.ReactNode;
    id: string;
    backgroundImage?: string | null;
    className?: string;
};

const FluidColumn = ({ children, id: name, backgroundImage, className }: FluidColumnProps) => {
    return (
        <article
            className={`w-full text-sm md:text-base
                grid grid-cols-1 sm:grid-cols-2 grid-auto-rows grid-flow-row lg:grid-cols-6 3xl:grid-cols-12
                gap-4 m-0 mb-16 p-0
                relative ${className || ''}`}
            id={`${name}`}
            style={backgroundImage ? {
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            } : {}}
        >
            {children}
        </article>
    )
}

export default FluidColumn;