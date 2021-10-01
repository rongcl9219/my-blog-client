/**
 * 本地存储
 */
import Cache from 'web-storage-cache'

const lsCache = new Cache()
const ssCache = new Cache({storage: 'sessionStorage'})

const KEYS = {
    accessToken: 'ak',
    refreshToken: 'rk',
    tokenExp: 'exp'
}

const nameSpace = 'MY_BLOG'

for (let key in KEYS) {
    if (Object.prototype.hasOwnProperty.call(KEYS, key)) {
        KEYS[key] = `${nameSpace}:${key}`.toUpperCase()
    }
}

/**
 * 本地存储类
 */
class CommonStorage {
    constructor (key, exp = null, type = 'localStorage') {
        this.key = key
        this.exp = exp
        this.storage = (type === 'localStorage') ? lsCache : ssCache
    }

    /**
     * 保存
     * @param value 值
     */
    save (value) {
        const options = this.exp ? {exp: this.exp} : null
        this.storage.set(this.key, value, options)
    }

    /**
     * 获取值
     * @returns {any}
     */
    load () {
        return this.storage.get(this.key)
    }

    /**
     * 删除
     */
    delete () {
        this.storage.delete(this.key)
    }
}

/**
 * 保存accessToken
 * @type {CommonStorage}
 */
const cacheAccessToken = new CommonStorage(KEYS.accessToken, null, 'sessionStorage')

/**
 * 保存refreshToken
 * @type {CommonStorage}
 */
const cacheRefreshToken = new CommonStorage(KEYS.refreshToken, 60 * 60 * 24, 'sessionStorage')

/**
 * 保存tokenExp
 * @type {CommonStorage}
 */
const cacheTokenExp = new CommonStorage(KEYS.tokenExp, null, 'sessionStorage')

export {
    cacheAccessToken,
    cacheRefreshToken,
    cacheTokenExp
}
