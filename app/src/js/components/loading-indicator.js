import { h } from './framework';
export const LoadingIndicator = (props = {}) => {
    const classNames = ['loading'];
    if (props.class !== undefined) {
        classNames.push(props.class);
    }
    return h("div", { class: classNames.join(' ') }, "Loading...");
};
