import { prisma } from "../database/prisma.connections"
import {
  CreateAssessmentDTO,
  UpdateAssessmentDTO
} from "../dtos/assessment.dto"
import { ResponseDTO } from "../dtos/response.dto"
import { Assessment } from "../models/assessment.model"

export class AssessmentService {
  public async findAll(idStudent: string): Promise<ResponseDTO> {
    const student = await prisma.student.findUnique({
      where: {
        id: idStudent
      },
      include: {
        assessment: true
      }
    })

    if (!student) {
      throw new Error("Aluno não encontrado")
    }

    // const assessments = await prisma.assessment.findMany({
    //   where: {
    //     idStudent
    //   }
    // })

    return {
      code: 200,
      message: "Avaliações listadas com sucesso.",
      data: student.assessment
    }
  }

  public async create(
    assessmentDTO: CreateAssessmentDTO
  ): Promise<ResponseDTO> {
    const student = await prisma.student.findUnique({
      where: {
        id: assessmentDTO.idStudent
      }
    })

    if (!student) {
      throw new Error("Aluno não encontrado.").cause
    }

    const newAssessment = new Assessment(
      assessmentDTO.discipline,
      assessmentDTO.grade,
      assessmentDTO.idStudent
    )

    const createdAssessment = await prisma.assessment.create({
      data: {
        discipline: newAssessment.discipline,
        grade: newAssessment.grade,
        idStudent: newAssessment.idStudent
      }
    })

    return {
      code: 201,
      message: "Avaliação criada com sucesso.",
      data: createdAssessment
    }
  }

  public async update(
    assessmentDTO: UpdateAssessmentDTO
  ): Promise<ResponseDTO> {
    const student = await prisma.student.findUnique({
      where: {
        id: assessmentDTO.idStudent
      }
    })

    if (!student) {
      throw new Error("Aluno não encontrado.")
    }

    const assessment = await prisma.assessment.findUnique({
      where: {
        id: assessmentDTO.id
      }
    })

    if (!assessment) {
      throw new Error("Avaliação não encontrada.")
    }

    const result = await prisma.assessment.update({
      where: {
        id: assessmentDTO.id
      },
      data: {
        grade: assessmentDTO.grade
      }
    })

    return {
      code: 200,
      message: "Avaliação atualizada com sucesso.",
      data: result
    }
  }

  public async delete(id: string, idStudent: string): Promise<ResponseDTO> {
    const student = await prisma.student.findUnique({
      where: {
        id: idStudent
      }
    })

    if (!student) {
      throw new Error("Aluno não encontrado.")
    }

    const assessment = await prisma.assessment.findUnique({
      where: {
        id
      }
    })

    if (!assessment) {
      throw new Error("Avaliação não encontrada.")
    }

    const result = await prisma.assessment.delete({
      where: {
        id
      }
    })

    return {
      code: 200,
      message: "Avaliação excluída com sucesso.",
      data: result
    }
  }
}
