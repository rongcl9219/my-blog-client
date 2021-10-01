/**
 * 设置element message 每次只显示一个
 */

import { Message } from 'element-ui'

let messageInstance = null
const resetMessage = (options) => {
    if (messageInstance) {
        messageInstance.close()
    }
    messageInstance = Message(options)
}

['error', 'success', 'info', 'warning'].forEach(type => {
    resetMessage[type] = options => {
        if (typeof options === 'string') {
            options = {
                message: options
            }
        }
        options.type = type
        return resetMessage(options)
    }
})

export default resetMessage
