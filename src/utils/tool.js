/**
 * 生成uuid
 * @returns {string}
 */
export const getUuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0

        let v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
}

/**
 * 处理日期
 * @param fmt
 * @param date
 * @param type
 * @returns {string|*}
 */
export const formatDate = (fmt, date, type = 1) => {
    let dateObj = new Date(date)

    if (type === 1) {
        let o = {
            'M+': dateObj.getMonth() + 1,
            'd+': dateObj.getDate(),
            'h+': dateObj.getHours(),
            'm+': dateObj.getMinutes(),
            's+': dateObj.getSeconds(),
            'q+': Math.floor((dateObj.getMonth() + 3) / 3),
            'S': dateObj.getMilliseconds()
        }
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (dateObj.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        for (let k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
            }
        }
        return fmt
    } else {
        let year = dateObj.getFullYear()
        let month = (dateObj.getMonth() + 1).toString().padStart(2, '0')
        let day = (dateObj.getDate()).toString().padStart(2, '0')
        let hours = (dateObj.getHours()).toString().padStart(2, '0')
        let minute = (dateObj.getMinutes()).toString().padStart(2, '0')
        let second = (dateObj.getSeconds()).toString().padStart(2, '0')

        return year + '年' + month + '月' + day + '日 ' + hours + ':' + minute + ':' + second
    }
}
