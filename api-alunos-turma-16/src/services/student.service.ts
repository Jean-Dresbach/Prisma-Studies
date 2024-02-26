import { prisma } from "../database/prisma.connections"
import { ResponseDTO } from "../dtos/response.dto"
import { CreateStudentDTO, UpdateStudentDTO } from "../dtos/student.dto"
import { Student } from "../model/student.model"

export class StudentService {
  public async findAll(): Promise<ResponseDTO> {
    const students = await prisma.student.findMany()

    return {
      code: 200,
      message: "Alunos listados com sucesso.",
      data: students
    }
  }

  public async create(studentDTO: CreateStudentDTO): Promise<ResponseDTO> {
    const newStudent = new Student(
      studentDTO.name,
      studentDTO.age,
      studentDTO.email,
      studentDTO.password
    )

    const createdStudent = await prisma.student.create({
      data: {
        name: newStudent.name,
        age: newStudent.age,
        email: newStudent.email,
        password: newStudent.password
      }
    })

    return {
      code: 201,
      message: "Aluno criado com sucesso.",
      data: {
        createdStudent
      }
    }
  }

  public async show(studentId: string): Promise<ResponseDTO> {
    const student = await prisma.student.findUnique({
      where: {
        id: studentId
      }
    })

    if (!student) {
      return {
        code: 404,
        message: "Aluno não encontrado."
      }
    }

    return {
      code: 200,
      message: "Aluno encontrado com sucesso.",
      data: {
        student
      }
    }
  }

  public async update(studentDTO: UpdateStudentDTO): Promise<ResponseDTO> {
    const student = await prisma.student.findUnique({
      where: {
        id: studentDTO.id
      }
    })

    if (!student) {
      return {
        code: 404,
        message: "Aluno não encontrado."
      }
    }

    const updateStudent = await prisma.student.update({
      where: {
        id: studentDTO.id
      },
      data: {
        name: studentDTO.name,
        age: studentDTO.age,
        email: studentDTO.email,
        password: studentDTO.password
      }
    })

    return {
      code: 200,
      message: "Aluno atulizado com sucesso.",
      data: updateStudent
    }
  }

  public async delete(id: string): Promise<ResponseDTO> {
    const student = await prisma.student.findUnique({
      where: {
        id
      }
    })

    if (!student) {
      return {
        code: 404,
        message: "Aluno não encontrado."
      }
    }

    const deletedStudent = await prisma.student.delete({
      where: {
        id
      }
    })

    return {
      code: 200,
      message: "Aluno removido com sucesso.",
      data: deletedStudent
    }
  }
}
