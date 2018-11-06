import {h} from './framework';

export const Button = (props: any) => {
    const {children} = props;
    delete props.children;
    return <button {...props}><span>{children}</span></button>;
};
