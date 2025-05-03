/*
 * @Author: 言棠
 * @version: 3.0.0
 * @Descripttion: 授人以渔，功德无量，利在千秋
 * @Date: 2022-04-15 09:38:02
 * @LastEditTime: 2022-04-15 17:16:43
 */
interface ProxyStorage {
    getItem(key: string): any;
    setItem(Key: string, value: string): void;
    removeItem(key: string): void;
    clear(): void;
}

//sessionStorage operate
class sessionStorageProxy implements ProxyStorage {
    protected storage: ProxyStorage;

    constructor(storageModel: ProxyStorage) {
        this.storage = storageModel;
    }

    // 存
    public setItem(key: string, value: any): void {
        this.storage.setItem(key, value);
    }

    // 取
    public getItem(key: string): any {
        return this.storage.getItem(key);
    }

    // 删
    public removeItem(key: string): void {
        this.storage.removeItem(key);
    }

    // 清空
    public clear(): void {
        this.storage.clear();
    }
}

//localStorage operate
class localStorageProxy extends sessionStorageProxy implements ProxyStorage {
    constructor(localStorage: ProxyStorage) {
        super(localStorage);
    }
}

const storageSession = new sessionStorageProxy(sessionStorage);

const storageLocal = new localStorageProxy(localStorage);

// 存session
const setSession = (key: string, value: any): void => {
    return storageSession.setItem(key , JSON.stringify(value));
};

// 取session
const getSession = (key: string): any => {
    return JSON.parse(storageSession.getItem(key));
};

// 删session
const removeSession = (key: string): void => {
    return storageSession.removeItem(key);
};

// 清空session
const clearSession = (): void => {
    return storageSession.clear();
};

// 存local
const setLocal = (key: string, value: any): void => {
    return storageLocal.setItem(key , JSON.stringify(value));
};

// 取local
const getLocal = (key: string): any => {
    return JSON.parse(storageLocal.getItem(key));
};

// 删local
const removeLocal = (key: string): void => {
    return storageLocal.removeItem(key);
};

// 清空local
const clearLocal = (): void => {
    return storageLocal.clear();
};

export {
    storageSession,
    storageLocal,
    getSession,
    setSession,
    removeSession,
    clearSession,
    getLocal,
    setLocal,
    removeLocal,
    clearLocal
}