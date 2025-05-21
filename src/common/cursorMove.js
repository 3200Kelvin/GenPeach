import { getRaf, getSetVariable, isTouchscreen } from "./helpers";

export const useCursorMove = (cursor, elements, { x: startX = 0, y: startY = 0, isSmooth = true, isFixed = false } = {}) => {
    if (isTouchscreen) {
        return () => {};
    }

    const position = {
        x: startX,
        y: startY,
    };
    const positionProxy = new Proxy(position, {
        set: (target, key, value) => {
            target[key] = value;
            requestAnimationFrame(moveTip);
            return true;
        },
    });

    const getPosition = getGetPosition();

    const setX = isSmooth ? getSetVariable(positionProxy, 'x') : (val) => positionProxy.x = val;
    const setY = isSmooth ? getSetVariable(positionProxy, 'y') : (val) => positionProxy.y = val;;
    const moveRaf = getRaf();

    if (elements.length) {
        elements.forEach((element) => element.addEventListener('mouseenter', onMouseEnter))
    } else if (elements) {
        elements.addEventListener('mouseenter', onMouseEnter);
    }

    return { setTarget };

    function onMouseEnter(event) {
        const { target } = event;
        const { x, y } = getPosition(event);
        setTarget(x, y);
        cursor.classList.add('entered');
        
        target.addEventListener('mousemove', onMouseMove);
        target.addEventListener('mouseleave', omMouseLeave);
    }

    function onMouseMove(event) {
        const { x, y } = getPosition(event);
        setTarget(x, y);
    }

    function omMouseLeave(event) {
        const { target } = event;
        const { x, y } = getPosition(event);
        setTarget(x, y);
        cursor.classList.remove('entered');
        
        target.removeEventListener('mousemove', onMouseMove);
        target.removeEventListener('mouseleave', omMouseLeave);
    }

    function setTarget(x, y) {
        moveRaf(() => {
            setX(x);
            setY(y);
        });
    }

    function moveTip() {
        const { x, y } = position;
        cursor.style.setProperty('--transform', `translate(${x}px, ${y}px)`);
    }

    function getGetPosition() {
        return isFixed ? ({ clientX, clientY }) => ({ x: clientX, y: clientY }) : ({ pageX, pageY }) => ({ x: pageX, y: pageY });
    }
};
