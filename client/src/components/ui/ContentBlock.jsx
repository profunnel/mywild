import './ContentBlock.css';

/**
 * ContentBlock Component - Alternating text/image layouts
 * 
 * Purpose: Display content with accompanying images in alternating layouts
 * Design: Responsive grid (desktop) / stack (mobile)
 * Accessibility: Semantic HTML, descriptive alt text
 * SEO: Proper heading hierarchy, descriptive image alt text
 */
export function ContentBlock({
    title,
    overline,
    image,
    imagePosition = 'right',
    children
}) {
    const blockClasses = [
        'content-block',
        `content-block--image-${imagePosition}`,
    ].join(' ');

    return (
        <article className={blockClasses}>
            <div className="content-block__text">
                {overline && (
                    <span className="content-block__overline overline">
                        {overline}
                    </span>
                )}

                <h2 className="content-block__title">
                    {title}
                </h2>

                <div className="content-block__body">
                    {children}
                </div>
            </div>

            <div className="content-block__image-container">
                <img
                    src={image}
                    alt={title}
                    className="content-block__image"
                    loading="lazy"
                />
            </div>
        </article>
    );
}

export default ContentBlock;
