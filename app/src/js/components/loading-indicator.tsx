import {h} from './framework';

export const LoadingIndicator = (props: any = {}) => {
    const classNames = ['loading'];
    if (props.class !== undefined) {
        classNames.push(props.class);
    }

    return <div class={classNames.join(' ')}>Loading...</div>;
};
