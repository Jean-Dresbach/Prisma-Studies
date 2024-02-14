import { Request, Response } from "express"
import { prisma } from "../database/prisma.connections"

export class StudentController {
  public async index(req: Request, res: Response) {
    try {
      const students = await prisma.student.findMany()

      return res.status(200).json({
        sucess: true,
        code: res.statusCode,
        message: "Alunos listados com sucesso.",
        data: {
          students
        }
      })
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        code: res.statusCode,
        message: "Erro ao listar alunos."
      })
    }
  }

  public async store(req: Request, res: Response) {
    try {
      const { name, age, email, password } = req.body

      if (!name || !age || !email || !password) {
        return res.status(400).json({
          sucess: false,
          code: res.statusCode,
          message: "Preencha todos os campos obrigatórios."
        })
      }

      const newStudent = await prisma.student.create({
        data: {
          name,
          age,
          email,
          password
        }
      })

      return res.status(200).json({
        sucess: true,
        code: res.statusCode,
        message: "Aluno criado com sucesso.",
        data: {
          newStudent
        }
      })
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        code: res.statusCode,
        message: "Erro ao criar aluno."
      })
    }
  }

  public async show(req: Request, res: Response) {
    try {
      const { studentId } = req.params
      const student = await prisma.student.findUnique({
        where: {
          id: studentId
        }
      })

      if (!student) {
        return res.status(404).json({
          sucess: false,
          code: res.statusCode,
          message: "Aluno não encontrado."
        })
      }

      return res.status(200).json({
        sucess: true,
        code: res.statusCode,
        message: "Aluno encontrado com sucesso.",
        data: {
          student
        }
      })
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        code: res.statusCode,
        message: "Erro ao buscar aluno."
      })
    }
  }
}
