import { COLORS, BORDER_RADIUS } from "../common/constants";

export const useMenu = () => {
    const menu = document.querySelector('.menu');

    useMobileMenu(menu);
};

function useMobileMenu(menuBlock) {
    const menu = menuBlock.querySelector('.menu__mobile');
    const button = menu.querySelector('.burger-btn');
    const dropdown = menu.querySelector('.menu__mobile__dropdown');
    const container = dropdown.querySelector('.menu__mobile__container');
    const content = dropdown.querySelector('.menu__mobile__content');
    const corner = dropdown.querySelector('.menu__mobile__corner');

    let isOpened = false;

    button.addEventListener('click', () => isOpened ? closeMenu() : openMenu());

    function openMenu() {
        isOpened = true;

        gsap.timeline()
            .add(() => {
                gsap.to(button, { transform: 'rotateZ(-45deg)', duration: 0.4 });
                gsap.to(menu, { backgroundColor: COLORS.ORANGE, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 });
                gsap.to(content, { backgroundColor: COLORS.ORANGE });
                gsap.to(corner, { color: COLORS.ORANGE });
            })
            .to(container, { transform: 'translateY(-100%)' })
            .to(dropdown, { display: 'block' })
            .to(container, { transform: 'translateY(0%)', duration: 0.4 });
    }

    function closeMenu() {
        isOpened = false;

        gsap.timeline()
            .add(() => {
                gsap.to(button, { transform: 'rotateZ(0deg)', duration: 0.4 });
                gsap.to(menu, { backgroundColor: COLORS.WHITE_15, borderBottomLeftRadius: BORDER_RADIUS, borderBottomRightRadius: BORDER_RADIUS });
                gsap.to(content, { backgroundColor: COLORS.WHITE_15 });
                gsap.to(corner, { color: COLORS.WHITE_15 });
            })
            .to(container, { transform: 'translateY(-100%)', duration: 0.4 })
            .to(dropdown, { display: 'none' });
    }
}