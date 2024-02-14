import express from "express"
import cors from "cors"
import { prisma } from "./database/prisma.connections"
import { StudentController } from "./controllers/student.controller"

const app = express()
app.use(express.json())
app.use(cors())

const studentController = new StudentController()

app.get("/students", studentController.index)
app.get("/students/:studentId", studentController.show)

app.post("/students", studentController.store)

app.listen(3333, () => {
  console.log("Server running on port 3333.")
})
