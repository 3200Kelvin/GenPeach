export const useExpandables = () => {
    const expandables = document.querySelectorAll('.expandable');

    const intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.target.isExpanded && !entry.isIntersecting) {
                entry.target.collapse();
            }
        });
    }, { rootMargin: '-25% 0% -25% 0%' });

    expandables.forEach((expandable) => {
        const container = expandable.querySelector('.expandable__container');
        const openBtn = expandable.querySelector('[data-trigger="show-more"]');
        const closeBtn = expandable.querySelector('[data-trigger="show-less"]');

        gsap.timeline()
            .to(container, { height: 0 })
            .to(closeBtn, { display: 'none' })
            .to(openBtn, { display: 'block' })
            .to(container, { display: 'none' });

        openBtn.addEventListener('click', expand);
        closeBtn.addEventListener('click', collapse);

        intersectionObserver.observe(expandable);

        expandable.isExpanded = true;
        expandable.collapse = collapse;

        function expand() {
            gsap.timeline()
                .to(container, { display: 'block' })
                .to(openBtn, { display: 'none' })
                .to(closeBtn, { display: 'block' })
                .to(container, { height: 'auto', duration: 0.4})
                .add(() => expandable.isExpanded = true);
        }

        function collapse() {
            gsap.timeline()
                .to(closeBtn, { display: 'none' })
                .to(openBtn, { display: 'block' })
                .to(container, { height: 0, duration: 0.4 })
                .to(container, { display: 'none' })
                .add(() => expandable.isExpanded = false);
        }
    });
};
