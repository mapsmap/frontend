import create from "zustand";
import produce from "immer";

const toggleDrawer = (state) => {
    return produce(state, draft => {
        draft.drawerVisible = !draft.drawerVisible;
    })
}

const openDialog = (state, name, args) => {
    return produce(state, draft => {
        draft.dialog = {
            name: name,
            args: args
        };
    })
}

const closeDialog = (state) => {
    return produce(state, draft => {
        draft.dialog = null;
    })
}

const createStoreLocal = (set) => ({
    drawerVisible: false,
    dialog: null,
    toggleDrawer: () =>
        set(state => toggleDrawer(state)),
    openDialog: (name, args) =>
        set(state => openDialog(state, name, args)),
    closeDialog: () =>
        set(state => closeDialog(state)),
});

const useStoreLocal = create(createStoreLocal);
export default useStoreLocal;