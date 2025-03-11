const { prisma } = require('../prisma/prisma-client')
const jwt = require('jsonwebtoken')

/**
 * @route GET /api/employees
 * */

const all = async (req, res) => {
	try {
		const employees = await prisma.employee.findMany({
			where: {
				userId: req.user.id,
			},
		})

		res.status(200).json(employees)
	} catch (error) {
		res(500).json({ message: 'Не удалось получить сотрудников' })
	}
}

/**
 * @route POST /api/employees/add
 */

const add = async (req, res) => {
	try {
		const data = req.body

		if (!data.firstName || !data.lastName || !data.address || !data.age) {
			return res.status(400).json({ message: 'Пожалуйста, заполните все поля' })
		}

		const employee = await prisma.employee.create({
			data: {
				...data,
				userId: req.user.id,
			},
		})

		res.status(201).json(employee)
	} catch (error) {
		res.status(500).json({ message: 'Не удалось создать сотрудника' })
	}
}

/**
 * @route POST /api/employees/remove/:id
 */
const remove = async (req, res) => {
	try {
		const { id } = req.params

		await prisma.employee.delete({
			where: {
				id,
			},
		})

		res.status(204).json({ message: 'Сотрудник успешно удалён' })
	} catch (error) {
		res.status(500).json({ message: 'Не удалось удалить сотрудника' })
	}
}

/**
 * @route PUT /api/employees/edit/:id
 */
const edit = async (req, res) => {
	const { id } = req.params

	try {
		const updatedEmployee = await prisma.employee.update({
			where: {
				id,
			},
			data: req.body,
		})

		res.status(204).json({ message: 'Сотрудник успешно изменён' })
	} catch (error) {
		res.status(500).json({ message: 'Не удалось изменить сотрудника' })
	}
}

/**
 * @route get /api/employees/:id
 */
const employee = async (req, res) => {
	try {
		const { id } = req.params

		const employee = await prisma.employee.findUnique({
			where: {
				id,
			},
		})

		if (!employee) {
			return res.status(400).json({ message: 'Сотрудник не найден' })
		}

		res.status(200).json(employee)
	} catch (error) {
		res.status(500).json({ message: 'Не удалось получить сотрудника' })
	}
}

module.exports = {
	all,
	add,
	remove,
	edit,
	employee,
}
