export interface CreateStudentDTO {
  name: string
  age: number
  email: string
  password: string
}

export interface UpdateStudentDTO {
  id: string
  name?: string
  age?: number
  email?: string
  password?: string
}
