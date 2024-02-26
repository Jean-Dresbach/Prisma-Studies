import { Request, Response } from "express"

import { StudentService } from "../services/student.service"
import { CreateStudentDTO, UpdateStudentDTO } from "../dtos/student.dto"

const studentService = new StudentService()

export class StudentController {
  public async index(_: Request, res: Response) {
    try {
      const result = await studentService.findAll()

      return res.json(result)
    } catch (error) {
      return res.status(500).json({
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
          code: res.statusCode,
          message: "Preencha todos os campos obrigatórios."
        })
      }

      const student: CreateStudentDTO = { age, email, name, password }

      const result = await studentService.create(student)

      return res.status(result.code).json(result)
    } catch (error) {
      return res.status(500).json({
        code: res.statusCode,
        message: "Erro ao criar aluno."
      })
    }
  }

  public async show(req: Request, res: Response) {
    try {
      const { studentId } = req.params

      const result = await studentService.show(studentId)

      return res.status(result.code).json(result)
    } catch (error) {
      return res.status(500).json({
        code: res.statusCode,
        message: "Erro ao buscar aluno."
      })
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { name, age, email, password } = req.body

      const updatedStudent = {
        id,
        name,
        age,
        email,
        password
      }

      const result = await studentService.update(updatedStudent)

      return res.status(result.code).json(result)
    } catch (error) {
      return res.status(500).json({
        code: res.statusCode,
        message: "Erro ao atualizar aluno."
      })
    }
  }

  public async delete(request: Request, response: Response) {
    try {
      const { id } = request.params

      const result = await studentService.delete(id)

      response.status(result.code).json(result)
    } catch (error) {
      return response.status(500).json({
        code: response.statusCode,
        message: "Erro ao exluir aluno."
      })
    }
  }
}
