export interface user {
    id: number,
    name: string,
    access_token: accessToken,
    refresh_token: refreshToken
    type: string,
    viewAccess: [viewAccess]
    ative: boolean
}

interface accessToken {
    code: string,
    timeout: number,
}

interface refreshToken {
    code: string,
    timeout: number
}

interface viewAccess {
    id: number,
    name: string
}