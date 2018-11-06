import { h } from './framework';
export const Button = (props) => {
    const { children } = props;
    delete props.children;
    return h("button", Object.assign({}, props),
        h("span", null, children));
};
