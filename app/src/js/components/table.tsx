import {h} from './framework';
import {LoadingIndicator} from './loading-indicator';
import {debounce} from '../util';
import {Button} from './button';

export interface SearchInputProps {
    placeholder: string;
}

export const TableSearchInput = (props: SearchInputProps, stProps) => {
    const {directive} = stProps;
    const oninput = debounce((ev) => directive.search(ev.target.value));
    return <label class="search-box">
        <span>Search:</span>
        <input placeholder={props.placeholder} type="search" oninput={oninput}/>
    </label>;
};

export const TableIndicator = (props, stProps) => {
    const {state: {working = true}} = stProps;
    const className = working === false ? 'hidden' : '';
    return <LoadingIndicator class={className + ' page-centered'}/>;
};

export const TablePagination = (props, stProps) => {
    const {state, directive} = stProps;
    return <div class="pagination">
        <p class="summary">Showing
            items <em>{state.lowerBoundIndex + 1}</em> - <em>{state.higherBoundIndex + 1}</em> of <em>{state.filteredCount}</em> matching
            items</p>
        <div class="action-bar">
            <Button disabled={!directive.isPreviousPageEnabled()}
                    onclick={() => directive.selectPreviousPage()} class="action">Previous
            </Button>
            <Button disabled={!directive.isNextPageEnabled()} onclick={() => directive.selectNextPage()}
                    class="action">Next
            </Button>
        </div>
    </div>;
};
