import { randomUUID } from "crypto"

export class Student {
  private _id: string
  constructor(
    public name: string,
    public age: number,
    public email: string,
    public password: string
  ) {
    this._id = randomUUID()
  }

  get id(): string {
    return this._id
  }
}
