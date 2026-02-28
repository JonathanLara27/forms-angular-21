export interface Drop {
    id: number,
    name: string,
    month: number,
    quantity: number
}

export interface DropCreate extends Omit<Drop, 'id'>{}