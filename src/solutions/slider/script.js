import './style.scss';

export const useSolutionsSlider = () => {
    const slider = document.querySelector('.slider');
    const entriesContainer = slider.querySelector('.slider__content__entries');
    const entries = entriesContainer.querySelectorAll('.slider__content__entry');
    const imagesContainer = slider.querySelector('.slider__images');
    const imageElement = imagesContainer.querySelector('.slider__image');
    const dotsContainer = slider.querySelector('.slider__content__dots')
    const dot = dotsContainer.querySelector('.slider__content__dot');
    const dots = [dot];
    const [previousBtn, nextBtn] = slider.querySelectorAll('.slider__content__button');

    let images = [];
    const imageElementClone = imageElement.cloneNode();
    imageElement.remove();
    entries.forEach((entry, index) => {
        const img = entry.querySelector('img');
        const image = imageElementClone.cloneNode();
        image.src = img.src;
        image.srcset = img.srcset;
        images.push(image);
    });

    imagesContainer.append(...images);

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
            const currentIndex = Math.floor(self.progress * (totalSections - 1));

            setActive(currentIndex);
        }
    });

    previousBtn.addEventListener('click', () => changeSlide(-1));
    nextBtn.addEventListener('click', () => changeSlide());

    function changeSlide(direction = 1) {
        const { top, height } = slider.getBoundingClientRect();
        const targetIndex = current + direction;
        const targetY = window.scrollY + top + targetIndex * height / totalSections;

        window.scrollTo({
            top: targetY,
        });
    }

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
        setButtons(index);

        current = index;
    }

    function setButtons(index) {
        if (index === 0) {
            gsap.to(previousBtn, { opacity: 0, pointerEvents: 'none' });
        } else if (index === totalSlides - 1) {
            gsap.to(nextBtn, { opacity: 0, pointerEvents: 'none' });
        } else {
            gsap.to(previousBtn, { opacity: 1, pointerEvents: 'auto' });
            gsap.to(nextBtn, { opacity: 1, pointerEvents: 'auto' });
        }
    }

    function showInitial(index) {
        gsap.to(entries[index], { display: 'block', opacity: 1 });
        gsap.to(images[index], { display: 'block', opacity: 1, filter: 'blur(0px)' });
        gsap.to(dots[index], { opacity: DOT_OPACITY.ACTIVE });
        setButtons(index);
    }

    function changeSlides(oldIndex, newIndex) {
        gsap.timeline()
            .to(entries[newIndex], { display: 'block', position: 'absolute', opacity: 0 })
            .to(entries[oldIndex], { opacity: 0, duration: TOTAL_TIME / 2 })
            .to(entries[oldIndex], { position: 'absolute' })
            .to(entries[newIndex], { position: 'relative' })
            .add(() => {
                const prevHeight = entries[oldIndex].offsetHeight;
                const height = entries[newIndex].offsetHeight;
                gsap.fromTo(entriesContainer, { height: prevHeight }, { height, duration: TOTAL_TIME / 2 });
            })
            .to(entries[newIndex], { opacity: 1, duration: TOTAL_TIME / 2 })
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
