export async function getCachedData(caches: CacheStorage & { default: Cache } | undefined, key: string, queryfn: () => Promise<any>): Promise<any> {
    if (!caches) return;
    
    const cache = caches.default;
    const cachedResponse = await cache.match(key);

    if (cachedResponse) {
        return await cachedResponse.json();
    }

    const data = await queryfn();
    const response = new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    });

    await cache.put(key, response.clone());
    return data;
}
