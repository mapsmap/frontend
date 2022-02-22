import create from "zustand";
import produce from "immer";

const toggleDrawer = (state) => {
    return produce(state, draft => {
        draft.drawerVisible = !draft.drawerVisible;
    })
}

const createStoreLocal = (set) => ({
    drawerVisible: false,
    toggleDrawer: () =>
        set(state => toggleDrawer(state)),
});

const useStoreLocal = create(createStoreLocal);
export default useStoreLocal;