import { blockScroll } from "../common/scroll";

const STORAGE_KEY = 'preloader';

export const getIsPreloaded = () => sessionStorage.getItem(STORAGE_KEY) === 'true';

export const setIsPreloaded = () => sessionStorage.setItem(STORAGE_KEY, true);

export const usePreloaderInit = () => {
    const style = document.createElement('style');
    style.textContent = '.preloader { display: block; }';
    document.head.appendChild(style);

    blockScroll(!getIsPreloaded());
};
