import { View } from 'fokis';
export declare const useView: <T>(view: any) => any;
declare type Narrow<T, N> = T extends {
    kind: N;
} ? T : never;
export declare const useOptionView: <T>(view: any) => any;
declare type MapDisc<T, U extends T[keyof T & "kind"]> = U extends unknown ? {
    kind: U;
    view: View<Narrow<T, U>>;
} : undefined;
export declare const useDiscView: <U extends T["kind" & keyof T] & string, T extends {
    kind: string;
}>(view: any) => MapDisc<T, U>;
export declare const useArrView: <T>(view: any) => any[];
export {};
