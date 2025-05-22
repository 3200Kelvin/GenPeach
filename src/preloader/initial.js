import { blockScroll } from "../common/scroll";

export const usePreloaderInit = () => {
    const style = document.createElement('style');
    style.textContent = `.preloader { display: block; }`;
    document.head.appendChild(style);

    blockScroll();
};
