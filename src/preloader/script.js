import { unblockScroll } from "../common/scroll";
import { getIsPreloaded, setIsPreloaded } from "./initial";

export const PRELOADER_PROGRESS_AMOUNT = {
    SCRIPTS: 20,
    VIDEO_1: 40,
    VIDEO_2: 40,
    SKIP: 100,
};

export const usePreloader = (skipAll = false) => {
    const isPreloaded = getIsPreloaded();
    const preloader = document.querySelector('.preloader');
    const line = preloader.querySelector('.preloader__line');
    const runner = line.querySelector('.preloader__line__runner');
    const button = preloader.querySelector('.preloader__button');
    const hero = document.querySelector('.hero');

    const menu = document.querySelector('.menu__content');
    const cursor = document.querySelector('.cursor');
    const heroTitle = hero.querySelector('.heading');
    const heroCaption = hero.querySelector('.hero__caption > *');
    const heroWeights = hero.querySelectorAll('.weights > *');

    let loaded = 0;

    window.setPreloaderState = onPartLoaded;

    // const videoContainers = [
    //     hero.querySelector('.hero__video[data-order="1"]'),
    //     hero.querySelector('.hero__video[data-order="2"]'),
    // ];

    // const [video1, video2] = [...videoContainers].map((container) => {
    //     const video = container.querySelector('video');
    //     // const source = video.querySelector('source');
    //     // const src = container.dataset.src;
    //     // source.src = src;
    //     return video;
    // });

    const video1 = hero.querySelector('.hero__video--first video');
    const video2 = hero.querySelector('.hero__video--second video');

    if (!video1 || !video2) {
        return removePreloader();
    }

    if (skipAll) {
        onPartLoaded(PRELOADER_PROGRESS_AMOUNT.SKIP)
            .add(() => {
                removePreloader();
                showHeroElements();
                unblockScroll();
            });
        return;
    }

    if (!video1 || !video2) {
        return removePreloader();
    }

    if (isPreloaded) {
        useSkipFunctionality();
    } else {
        usePreloaderFunctionality();
    }

    return onPartLoaded;

    function onPartLoaded(percentage) {
        loaded += percentage;
        if (loaded > 100) {
            loaded = 100;
        }
        return moveLine();
    }

    function moveLine() {
        return gsap.timeline().to(runner, { transform: `scaleX(${loaded / 100})`, duration: 0.4 });
    }

    function usePreloaderFunctionality() {
        hideHeroElements();

        if (video1.networkState === 2 && video2.networkState === 2) {
            waitForVideos().then(() => onVideosPreloaded());
        } else {
            onPartLoaded(PRELOADER_PROGRESS_AMOUNT.SKIP)
                .add(() => {
                    button.addEventListener('click', () => {
                        button.firstElementChild.textContent = 'Wait a sec...';
                        waitForVideos().then(() => onContentReady());
                        preloadVideos();
                    }, { once: true });
                })
                .add(showButton());
        }
    }

    function checkPlaybackAvailability() {
        return new Promise((res) => {
            video1.play()
                .then(() => {
                    video1.pause();
                    res(true);
                })
                .catch(() => res(false));
        });
    }

    function useSkipFunctionality() {
        video2.play()
            .then(() => {
                video1.remove();
                onPartLoaded(PRELOADER_PROGRESS_AMOUNT.SKIP)
                    .add(() => {
                        removePreloader();
                        showHeroElements();
                        unblockScroll();
                    });
            })
            .catch(() => {
                usePreloaderFunctionality();
            });
    }

    async function onVideosPreloaded() {
        checkPlaybackAvailability().then((isAvailable) => {
            if (isAvailable) {
                onContentReady();
            } else {
                button.addEventListener('click', () => {
                    button.firstElementChild.textContent = 'Wait a sec...';
                    onContentReady();
                }, { once: true });
                showButton();
            }
        });
    }

    async function onContentReady() {
        setTimeout(() => {
            removePreloader();
            startSequence();
        }, 1000);
    }

    function removePreloader() {
        const onComplete = () => {
            preloader.remove();
            setIsPreloaded();
        };

        gsap.to(preloader, { opacity: 0, duration: 0.4, onComplete });
    }

    function startSequence() {
        video1.play();

        video1.addEventListener('ended', () => {
            video2.play();
            video1.remove();
            showHeroElements();
            unblockScroll();
        });
    }

    function showButton() {
        return gsap.timeline()
            .to(line, { opacity: 0, duration: 0.5 })
            .to(line, { display: 'none' })
            .to(button, {  opacity: 0, display: 'block' })
            .to(button, { opacity: 1, duration: 0.5 });
    }

    function hideHeroElements() {
        gsap.to(cursor, { display: 'none' });
        gsap.to(menu, { transform: 'translateY(-150%)' });
        gsap.to(heroCaption, { opacity: 0 });
        gsap.to(heroWeights, { opacity: 0 });
    }

    function showHeroElements() {
        heroTitle.appear();
        gsap.to(cursor, { display: 'block' });
        gsap.to(menu, { transform: 'translateY(0%)', duration: 0.7 });
        gsap.to(heroCaption, { opacity: 1, duration: 0.7 });
        gsap.to(heroWeights, { opacity: 1, duration: 0.7 });
    }

    async function waitForVideos() {
        const p1 = new Promise((res) => {
            video1.addEventListener('canplaythrough', () => {
                onPartLoaded(PRELOADER_PROGRESS_AMOUNT.VIDEO_1);
                res();
            }, { once: true });
        });
        
        const p2 = new Promise((res) => {
            video2.addEventListener('canplay', () => {
                onPartLoaded(PRELOADER_PROGRESS_AMOUNT.VIDEO_2);
                res();
            }, { once: true });
        });

        preloadVideos();

        return Promise.all([p1, p2]);
    }

    function preloadVideos() {
        video1.load();
        video2.load();
    }
};
