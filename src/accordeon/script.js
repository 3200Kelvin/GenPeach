import './style.scss';

export const useAccordeon = () => {
    const accordeons = document.querySelectorAll('.accordeon');

    accordeons.forEach(init);

    function init(accordeon) {
        const openWhenVisible = accordeon.dataset.openWhenVisible === 'true';

        const entries = [...accordeon.querySelectorAll('.accordeon__entry')].map((entry, index) => {
            const button = entry.querySelector('.accordeon__entry__header');
            const body = entry.querySelector('.accordeon__entry__body');
            const content = entry.querySelector('.accordeon__entry__content');
            const icon = entry.querySelector('.accordeon__entry__iicon');

            button.addEventListener('click', () => setEntry(index));
            button.addEventListener('keydown', (event) => handleKeyDown(event, index));

            gsap.timeline()
                .to(button, { opacity: 0.6, backgroundColor: 'transparent', clearProps: 'all' })
                .to(icon, { opacity: 1 })
                .to(body, { height: 0 })
                .to(content, { display: 'none' });

            return { button, body, content, icon };
        });

        let active = null;

        if (openWhenVisible) {
            const intersectionObserver = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    setEntry(0);
                    intersectionObserver.disconnect();
                }
            }, { threshold: 1 });

            intersectionObserver.observe(accordeon);
        }

        function handleKeyDown(event, index) {
            if (event.key === 'Enter' || event.code === 'Space') {
                event.preventDefault();
                setEntry(index);
            }
        }

        function setEntry(index) {
            if (active !== null) {
                close(entries[active]);
            }

            if (active === index) {
                active = null;
                return;
            }

            open(entries[index]);
            active = index;
        }

        function open(entry) {
            const { button, body, content, icon } = entry;

            gsap.timeline()
                .to(content, { display: 'block' })
                .to(button, { opacity: 1, backgroundColor: 'var(--orange)' })
                .to(icon, { opacity: 0 })
                .to(body, { height: 'auto', duration: 0.4 });
        }

        function close(entry) {
            const { button, body, content, icon } = entry;

            gsap.timeline()
                .to(button, { opacity: 0.6, backgroundColor: 'transparent', clearProps: 'all' })
                .to(icon, { opacity: 1 })
                .to(body, { height: 0, duration: 0.4 })
                .to(content, { display: 'none' });
        }
    }
};
