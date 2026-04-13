/* =========================================
   EXACT TYPE (TOP LEVEL STRICT)
========================================= */
export type Exact<T, Shape extends T> = T & {
  [K in Exclude<keyof Shape, keyof T>]: never;
};

/* =========================================
   DEEP EXACT (FIXED - SUPPORT NESTED & ARRAY)
========================================= */
export type DeepExact<T, Shape> =
  T extends object
    ? T extends Array<infer TItem>
      ? Shape extends Array<infer SItem>
        ? SItem extends TItem
          ? Array<DeepExact<TItem, SItem>>
          : never
        : never
      : Shape extends object
        ? {
            [K in keyof T]:
              K extends keyof Shape
                ? DeepExact<T[K], Shape[K]>
                : T[K];
          } & {
            [K in Exclude<keyof Shape, keyof T>]: never;
          }
        : never
    : T;

/* =========================================
   HELPER FUNCTION (TOP LEVEL)
========================================= */
export const exact = <T>() =>
  <U extends T>(value: Exact<T, U>) =>
    value;

/* =========================================
   HELPER FUNCTION (DEEP)
========================================= */
export const deepExact = <T>() =>
  <U extends T>(value: DeepExact<T, U>) =>
    value;