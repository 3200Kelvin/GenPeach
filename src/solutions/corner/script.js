import './style.scss';

export const useSolutionsCorner = () => {
    const bg = document.querySelector('.slider__content__bg');
    const CUT_SIZE_VW = 10;

    const resizeObserver = new ResizeObserver((entries) => {
        const entry = entries[0];
        const { width, height } = entry.contentRect;

        const xCutPercent = CUT_SIZE_VW * (width / window.innerWidth);
        const yCurPercent = xCutPercent * (width / height);

        bg.style.setProperty('--xCut', `${xCutPercent}%`);
        bg.style.setProperty('--yCut', `${yCurPercent}%`);
    });

    resizeObserver.observe(bg);
};
