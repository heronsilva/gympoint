import * as Yup from 'yup'

import Plan from '../models/Plan'

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll({
      attributes: ['id', 'title', 'duration', 'price'],
      order: ['id'],
    })

    return res.json(plans)
  }

  async show(req, res) {
    const { plan_id } = req.params

    const plan = await Plan.findByPk(plan_id)

    if (!plan) {
      return res.status(404).json({
        error: 'No plans found for the given ID',
      })
    }

    return res.json(plan)
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string()
        .min('3')
        .required(),
      duration: Yup.number()
        .integer()
        .min(1)
        .required(),
      price: Yup.number()
        .min(0)
        .required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation failed',
      })
    }

    try {
      const { id, title, duration, price } = await Plan.create(req.body)

      return res.json({ id, title, duration, price })
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({
          error: 'There is already a plan registered with this title',
        })
      }

      return res.status(500).json({
        error: 'Could not create the new plan',
      })
    }
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string()
        .min('3')
        .required(),
      duration: Yup.number()
        .integer()
        .min(1)
        .required(),
      price: Yup.number()
        .min(0)
        .required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation failed',
      })
    }

    const { plan_id } = req.params

    const plan = await Plan.findByPk(plan_id)

    if (!plan) {
      return res.status(404).json({
        error: 'No plans found for the given ID',
      })
    }

    try {
      const { id, title, duration, price } = await plan.update(req.body)

      return res.json({
        plan: {
          id,
          title,
          duration,
          price,
        },
      })
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({
          error: 'There is already a plan registered with this title',
        })
      }

      return res.status(500).json({
        error: 'Could not create the new plan',
      })
    }
  }

  async destroy(req, res) {
    const { plan_id } = req.params

    const deletedRows = await Plan.destroy({
      where: { plan_id },
    })

    if (!deletedRows) {
      return res.status(500).json({
        error: 'Could not delete the specified plan',
      })
    }

    return res.status(200).send('OK')
  }
}

export default new PlanController()
