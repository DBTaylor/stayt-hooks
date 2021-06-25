"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
exports.useStayt = (state) => {
    const [value, setValue] = react_1.useState(() => state.get());
    react_1.useEffect(() => {
        const v = state.get();
        if (v !== value)
            setValue(v);
        const fn = (val) => setValue(val);
        state.subscribe(fn);
        return () => state.unsubscribe(fn);
    }, [state]);
    return value;
};
exports.useOptionStayt = (state) => {
    const value = exports.useStayt(state);
    const option = react_1.useMemo(() => state.option(), [state]);
    if (value !== null)
        return option;
    else
        return null;
};
exports.useDiscStayt = (state) => {
    const kindStayt = react_1.useMemo(() => state.prop("kind"), [state]);
    const kind = exports.useStayt(kindStayt);
    return react_1.useMemo(() => ({ kind, state: state.disc(kind) }), [kind]);
};
exports.useArrStayt = (state) => {
    const len = exports.useStayt(state.prop("length"));
    return react_1.useMemo(() => {
        const arr = Array(len);
        for (let i = 0; i < len; ++i) {
            arr[i] = state.index(i);
        }
        return arr;
    }, [len]);
};
