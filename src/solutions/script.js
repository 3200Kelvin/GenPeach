import { useSolutionsSlider } from "./slider/script";
import { useSolutionsCorner } from "./corner/script";

export const useSolutions = () => {
    useSolutionsSlider();
    useSolutionsCorner();
};
