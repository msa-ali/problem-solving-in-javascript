type CacheKey = {
    value: number;
    timer: number;
};

class TimeLimitedCache {
    private cache: Map<number, CacheKey>;

    constructor() {
        this.cache = new Map();
    }

    set(key: number, value: number, duration: number): boolean {
        const existingValue = this.cache.get(key);
        if (existingValue) {
            clearTimeout(existingValue.timer);
        }
        this.cache.set(key, {
            value,
            timer: this.setExpiration(key, duration)
        });
        return existingValue !== undefined;
    }

    get(key: number): number {
        if (!this.cache.has(key)) return -1;
        return this.cache.get(key)!.value;
    }

    count(): number {
        return this.cache.size;
    }

    private setExpiration(key: number, duration: number): any {
        return setTimeout(() => {
            this.cache.delete(key);
        }, duration);
    }
}

/**
 * const timeLimitedCache = new TimeLimitedCache()
 * timeLimitedCache.set(1, 42, 1000); // false
 * timeLimitedCache.get(1) // 42
 * timeLimitedCache.count() // 1
 */