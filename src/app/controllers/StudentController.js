import * as Yup from 'yup'

import Student from '../models/Student'

class StudentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      birthday: Yup.date().required(),
      weight: Yup.number().min(0),
      height: Yup.number().min(0),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation failed',
      })
    }

    const userExists = await Student.findOne({
      where: {
        email: req.body.email,
      },
    })

    if (userExists) {
      return res.status(400).json({
        error: 'There is already an user with this email address',
      })
    }

    const { id, name, email } = await Student.create(req.body)

    return res.json({
      id,
      name,
      email,
    })
  }

  async update(req, res) {
    const { student_id } = req.params
    const paramSchema = Yup.number()
      .required()
      .min(1)

    if (!(await paramSchema.isValid(student_id))) {
      return res.status(401).json({
        error: 'Validation failed: student_id is required',
      })
    }

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      birthday: Yup.date().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({
        error: 'Validation failed',
      })
    }

    const { email } = req.body

    const student = await Student.findByPk(student_id)

    if (email !== student.email) {
      const emailExists = await Student.findOne({
        where: { email },
      })

      if (emailExists) {
        return res.status(400).json({
          error: 'There is already a student with this email address',
        })
      }
    }

    const { id, name } = await student.update(req.body)

    return res.json({
      id,
      name,
      email,
    })
  }
}

export default new StudentController()
