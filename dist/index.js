"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
exports.useView = (view) => {
    const [value, setValue] = react_1.useState(() => view.get());
    react_1.useEffect(() => {
        const v = view.get();
        if (v !== value)
            setValue(v);
        const fn = (val) => setValue(val);
        view.subscribe(fn);
        return () => view.unsubscribe(fn);
    }, [view]);
    return value;
};
exports.useOptionView = (view) => {
    const value = exports.useView(view);
    const option = react_1.useMemo(() => view.option(), [view]);
    if (value !== null)
        return option;
    else
        return null;
};
exports.useDiscView = (view) => {
    const kindView = react_1.useMemo(() => view.prop("kind"), [view]);
    const kind = exports.useView(kindView);
    return react_1.useMemo(() => ({ kind, view: view.disc(kind) }), [kind]);
};
exports.useArrView = (view) => {
    const len = exports.useView(view.prop("length"));
    return react_1.useMemo(() => {
        const arr = Array(len);
        for (let i = 0; i < len; ++i) {
            arr[i] = view.index(i);
        }
        return arr;
    }, [len]);
};
