export interface Token {
    email: string,
    name: string,
    role: 'user' | 'admin',
    iat: Date,
    exp: Date
}