
export const STATUC_CODE_WITH_MESSAGE = Object.freeze({
    200: 'Ok',
    201: 'Created',
    400: 'Bad Request',
    500: "Internal server error",

})

export const STATUS_CODE = Object.freeze([200, 201, 400, 403, 404, 500])

export const MESSAGES = Object.freeze({
    GET: 'data retrived successfully',
    CREATE: 'created successfully',
    UPDATE: 'updated successfully',
    DELETE: 'deleted successfully',
    CANCEL: 'cancelled successfully',
    SUCCESS: 'success',
    FAILED: 'failed'
})