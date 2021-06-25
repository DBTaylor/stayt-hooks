"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useArrStayt = exports.useDiscStayt = exports.useOptionStayt = exports.useStayt = void 0;
const react_1 = require("react");
const useStayt = (state) => {
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
exports.useStayt = useStayt;
const useOptionStayt = (state) => {
    const [isNull, setIsNull] = react_1.useState(() => state.get() === null);
    const option = react_1.useMemo(() => state.option(), [state]);
    react_1.useEffect(() => {
        const isNull2 = state.get() === null;
        if (isNull2 !== isNull)
            setIsNull(isNull2);
        const fn = (n) => setIsNull(n);
        state.subscribeNull(fn);
        return () => state.unsubscribeNull(fn);
    }, [state]);
    return isNull ? null : option;
};
exports.useOptionStayt = useOptionStayt;
const useDiscStayt = (state) => {
    const kindStayt = react_1.useMemo(() => state.prop("kind"), [state]);
    const kind = exports.useStayt(kindStayt);
    return react_1.useMemo(() => ({ kind, state: state.disc(kind) }), [kind]);
};
exports.useDiscStayt = useDiscStayt;
const useArrStayt = (state) => {
    const len = exports.useStayt(state.prop("length"));
    return react_1.useMemo(() => {
        const arr = Array(len);
        for (let i = 0; i < len; ++i) {
            arr[i] = state.index(i);
        }
        return arr;
    }, [len]);
};
exports.useArrStayt = useArrStayt;
