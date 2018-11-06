import { h } from './framework';
import { LoadingIndicator } from './loading-indicator';
import { debounce } from '../util';
import { Button } from './button';
export const TableSearchInput = (props, stProps) => {
    const { directive } = stProps;
    const oninput = debounce((ev) => directive.search(ev.target.value));
    return h("label", { class: "search-box" },
        h("span", null, "Search:"),
        h("input", { placeholder: props.placeholder, type: "search", oninput: oninput }));
};
export const TableIndicator = (props, stProps) => {
    const { state: { working = true } } = stProps;
    const className = working === false ? 'hidden' : '';
    return h(LoadingIndicator, { class: className + ' page-centered' });
};
export const TablePagination = (props, stProps) => {
    const { state, directive } = stProps;
    return h("div", { class: "pagination" },
        h("p", { class: "summary" },
            "Showing items ",
            h("em", null, state.lowerBoundIndex + 1),
            " - ",
            h("em", null, state.higherBoundIndex + 1),
            " of ",
            h("em", null, state.filteredCount),
            " matching items"),
        h("div", { class: "action-bar" },
            h(Button, { disabled: !directive.isPreviousPageEnabled(), onclick: () => directive.selectPreviousPage(), class: "action" }, "Previous"),
            h(Button, { disabled: !directive.isNextPageEnabled(), onclick: () => directive.selectNextPage(), class: "action" }, "Next")));
};
