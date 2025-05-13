import './style.scss';

export const useSolutionsSlider = () => {
    const slider = document.querySelector('.slider');
    const entries = document.querySelectorAll('.slider__content__entry');
    const images = slider.querySelectorAll('.slider__image');
    const dotsContainer = slider.querySelector('.slider__content__dots')
    const dot = dotsContainer.querySelector('.slider__content__dot');
    const dots = [dot];
    const [previousBtn, nextBtn] = slider.querySelectorAll('.slider__content__button');

    const totalSlides = entries.length;
    const totalSections = totalSlides + 1;

    const BLUR_STRENGTH = 15;
    const BLUR_TIME = 0.4;
    const FADE_TIME = 0.2;
    const TOTAL_TIME = BLUR_TIME * 2 + FADE_TIME;
    const DOT_OPACITY = {
        DEFAULT: 0.15,
        ACTIVE: 0.8,
    };

    addDots();
    showInitial(0);
    let current = 0;

    ScrollTrigger.create({
        trigger: slider,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
            const progress = self.progress; // value from 0 to 1
            const currentIndex = Math.floor(progress * totalSections);

            setActive(currentIndex);
        }
    });

    function addDots() {
        for (let i = dots.length; i < totalSlides; i++) {
            const dotClone = dot.cloneNode();
            dotsContainer.appendChild(dotClone);
            dots.push(dotClone);
        }
    }

    function setActive(index) {
        if (current === index || index >= totalSlides) {
            return;
        }

        changeSlides(current, index);

        current = index;
    }

    function showInitial(index) {
        gsap.to(entries[index], { display: 'block', opacity: 1 });
        gsap.to(images[index], { display: 'block', opacity: 1, filter: 'blur(0px)' });
        gsap.to(dots[index], { opacity: DOT_OPACITY.ACTIVE });
    }

    function changeSlides(oldIndex, newIndex) {
        gsap.timeline()
            .to(entries[newIndex], { display: 'block', opacity: 0 })
            .to(entries[newIndex], { opacity: 1, duration: TOTAL_TIME });
        
        gsap.timeline()
            .to(entries[oldIndex], { opacity: 0, duration: TOTAL_TIME })
            .to(entries[oldIndex], { display: 'none' });

        gsap.timeline()
            .to(images[newIndex], { display: 'block', opacity: 0, filter: `blur(${BLUR_STRENGTH}px)` })
            .to(images[oldIndex], { filter: `blur(${BLUR_STRENGTH}px)`, duration: BLUR_TIME })
            .add(() => {
                gsap.to(images[newIndex], { opacity: 1, duration: FADE_TIME });
                return gsap.to(images[oldIndex], { opacity: 0, duration: FADE_TIME });
            })
            .to(images[newIndex], { filter: 'blur(0px)', duration: BLUR_TIME });

        gsap.to(dots[newIndex], { opacity: DOT_OPACITY.ACTIVE, duration: TOTAL_TIME });
        gsap.to(dots[oldIndex], { opacity: DOT_OPACITY.DEFAULT, duration: TOTAL_TIME });
    }
};
