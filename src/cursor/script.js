import { isTouchscreen } from "../common/helpers";
import { useCursorMove } from "../common/cursorMove";

import './style.scss';

export const useHeroCursor = () => {
    if (isTouchscreen) {
        return;
    }

    const hero = document.querySelector('.hero');
    const cursor = document.querySelector('.cursor');

    const { setTarget } = useCursorMove(cursor, hero, { x: window.innerWidth / 2, y: window.innerHeight / 2, isSmooth: false, isFixed: true });

    setTarget(window.innerWidth / 2, window.innerHeight / 2);
};
