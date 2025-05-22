import './scroll.scss';

const BLOCKED_SCROLL_CLASS_NAME = 'scroll-blocked';

const BLOCKED_SCROLL_HARD_CLASS_NAME = 'scroll-blocked--reset';

export const blockScroll = (isReset = false) => {
    document.documentElement.classList.add(BLOCKED_SCROLL_CLASS_NAME);

    if (isReset) {
        document.documentElement.classList.add(BLOCKED_SCROLL_HARD_CLASS_NAME);
    }
};

export const unblockScroll = () => {
    document.documentElement.classList.remove(BLOCKED_SCROLL_CLASS_NAME);
    document.documentElement.classList.remove(BLOCKED_SCROLL_HARD_CLASS_NAME);
};