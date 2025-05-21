import './scroll.scss';

const BLOCKED_SCROLL_CLASS_NAME = 'scroll-blocked';

export const blockScroll = () => document.documentElement.classList.add(BLOCKED_SCROLL_CLASS_NAME);

export const unblockScroll = () => document.documentElement.classList.remove(BLOCKED_SCROLL_CLASS_NAME);