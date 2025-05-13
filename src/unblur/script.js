import './style.scss';

export const useUnblur = () => {
    const headings = document.querySelectorAll('[data-animation="unblur-letters"]');

    headings.forEach(initHeading);

    function initHeading(heading) {
        const highlight = heading.querySelector('.highlighted');

        if (highlight) {
            setTimeout(() => {
                highlight.classList.add('highlighted--transition');
            }, 10);
        }

        const split = SplitText.create(heading, {
            type: "chars",
        });

        gsap.to(split.chars, {
            transform: 'scale(0.95)',
            opacity: 0,
            filter: 'blur(10px)',
        });

        gsap.timeline({
            scrollTrigger: {
                trigger: heading,
                start: 'top 85%',
            }
        })
            .to(split.chars, {
                transform: 'scale(1)',
                opacity: 1,
                filter: 'blur(0px)',
                duration: 0.4,
                stagger: 0.02,
            })
            .add(() => {
                if (highlight) {
                    highlight.classList.add('highlighted--shown');
                }
            });
    }
};
