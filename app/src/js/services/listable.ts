import {smartTable, SmartTableEvents} from 'smart-table-core';

const defaultTableState = (initValue = {}) => Object.assign({}, {
    search: {},
    filter: {},
    sort: {},
    slice: {
        page: 1, size: 15
    }
}, initValue);

// todo service should be itself a generic of the entity
// todo or a listable ... !
export const provider = <T, K>(service: T) => {
    return () => smartTable<K>({
        data: [],
        tableState: defaultTableState()
    },({tableState, table}) => {
        return {
            async eval() {
                const {slice: {page = 1, size = 15}, search: {value: search = ''}} = tableState;

                const params = {page, size};
                if (search) {
                    // @ts-ignore
                    params.search = search; //todo change sdk
                }

                // @ts-ignore
                const {items} = await service.list(params);

                return items.map(item => ({
                    index: item.id,
                    value: item
                }));
            },
            async exec() {
                try {
                    table.dispatch(SmartTableEvents.EXEC_CHANGED, {working: true});
                    const {slice: {page = 1, size = 20}, search: {value: search = ''}} = tableState;

                    const params = {page, size};
                    if (search) {
                        // @ts-ignore
                        params.search = search;
                    }

                    // @ts-ignore
                    const {count, items} = await service.list(params);

                    table.dispatch(SmartTableEvents.SUMMARY_CHANGED, {
                        page: tableState.slice.page,
                        size: tableState.slice.size,
                        filteredCount: count
                    });

                    table.dispatch(SmartTableEvents.DISPLAY_CHANGED, items.map(item => ({
                        index: item.id,
                        value: item
                    })));

                } catch (e) {
                    table.dispatch(SmartTableEvents.EXEC_ERROR, e);
                } finally {
                    table.dispatch(SmartTableEvents.EXEC_CHANGED, {working: false});
                }
            }
        };
    });
};
