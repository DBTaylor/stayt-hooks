import {Stayt} from 'stayt'
import {useState, useEffect, useMemo, memo} from 'react'

export const useStayt = <T>(state: Stayt<T>) => {
    const [value, setValue] = useState(() => state.get())
    useEffect(() => {
        const v = state.get()
        if(v !== value)
            setValue(v)
        const fn = (val: T) => setValue(val)
        state.subscribe(fn)
        return () => state.unsubscribe(fn)
    }, [state])
    return value
}

export const useOptionStayt = <T>(state: Stayt<T | null>) => {
    const [isNull, setIsNull] = useState(() => state.get() === null)
    const option = useMemo(() => state.option(), [state])
    useEffect(() => {
        const isNull2 = state.get() === null
        if(isNull2 !== isNull)
            setIsNull(isNull2)
        const fn = (n: boolean) => setIsNull(n)
        state.subscribeNull(fn)
        return () => state.unsubscribeNull(fn)
    }, [state])
    return isNull ? null : option
}

type Narrow<T, N> = T extends { kind: N } ? T : never;

// export const useOptionStayt = <T>(state: Stayt<T>) => {
//     const value = useStayt(state)
//     const option = useMemo(() => state.option(), [state])
//     if(value !== null)
//         return option
//     else
//         return null
// }

type MapDisc<T, U extends T[keyof T & "kind"]> = U extends unknown ? {kind: U, state: Stayt<Narrow<T,U>>} : undefined

export const useDiscStayt = <U extends T["kind" & keyof T] & string, T extends {kind: string}>(state: Stayt<T>) => {
    const kindStayt = useMemo(() => state.prop("kind"), [state])
    const kind = useStayt(kindStayt)
    return useMemo(() => ({kind, state: state.disc(kind as any)} as any as MapDisc<T, U>), [kind])
}

export const useArrStayt = <T>(state: Stayt<T[]>) => {
    const len = useStayt(state.prop("length"))
    return useMemo(() =>{
        const arr = Array(len)
        for (let i = 0; i < len; ++i) {
            arr[i] = state.index(i);
        }
        return arr
    }, [len])
}