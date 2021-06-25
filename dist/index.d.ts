import { Stayt } from 'stayt';
export declare const useStayt: <T>(state: Stayt<T>) => T;
export declare const useOptionStayt: <T>(state: Stayt<T | null>) => Stayt<T extends null ? never : T> | null;
declare type Narrow<T, N> = T extends {
    kind: N;
} ? T : never;
declare type MapDisc<T, U extends T[keyof T & "kind"]> = U extends unknown ? {
    kind: U;
    state: Stayt<Narrow<T, U>>;
} : undefined;
export declare const useDiscStayt: <U extends T["kind" & keyof T] & string, T extends {
    kind: string;
}>(state: Stayt<T>) => MapDisc<T, U>;
export declare const useArrStayt: <T>(state: Stayt<T[]>) => any[];
export {};
