export declare function here<T, E = any>(promise: Promise<T>): Promise<[E, undefined] | [null, T]>;
export declare function chain<T, R = T, E = any>(promise: Promise<T>, ...transformations: Array<(any: any) => any>): Promise<[E, undefined] | [null, R]>;
export default here;
