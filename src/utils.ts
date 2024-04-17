export function isObjKey<T extends Object>(key: any, obj: T): key is keyof T {
    return key in obj;
}