export interface IHttpRes<A> {
    status: number
    data: A
    message: string
}