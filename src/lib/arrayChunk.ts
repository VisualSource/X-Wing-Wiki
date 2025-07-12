export function chunk<T>(arr: T[], n: number): T[][] {
    const list = [];

    for (let i = 0; i < arr.length; i += n) {
        list.push(arr.slice(i, i + n));
    }

    return list;
}