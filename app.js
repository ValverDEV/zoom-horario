const diaNum = {
	lunes: 0,
	martes: 1,
	miercoles: 2,
	jueves: 3,
	viernes: 4,
	sabado: 5,
	domingo: 6
}

var numDia = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo']

const materiasData = [
	{
		nombre: 'Biofisica',
		dias: {
			martes: {
				inicio: "12:00",
				termina: "14:00"
			},
			miercoles: {
				inicio: "8:00",
				termina: "10:00"
			},
			jueves: {
				inicio: "8:00",
				termina: "10:00"
			}
		},
		inicio: [false, '12:00', '8:00', '8:00', false, false, false],
		termina: [false, '14:00', '10:00', '10:00', false, false, false]
	},
	{
		nombre: 'Computacion III',
		dias: {
			lunes: {
				inicio: "12:00",
				termina: "13:00"
			},
			martes: {
				inicio: "10:00",
				termina: "12:00"
			},
			jueves: {
				inicio: "12:00",
				termina: "14:00"
			}
		},
		inicio: ['12:00', '10:00', false, '12:00', false, false, false],
		termina: ['13:00', '12:00', false, '14:00', false, false, false]
	},
	{
		nombre: 'Estencia V',
		dias: {
			martes: {
				inicio: "17:00",
				termina: "19:00"
			},
			jueves: {
				inicio: "17:00",
				termina: "19:00"
			}
		},
		inicio: [false, '17:00', false, '17:00', false, false, false],
		termina: [false, '19:00', false, '19:00', false, false, false]
	},
	{
		nombre: 'Fisica Moderna',
		dias: {
			lunes: {
				inicio: "13:00",
				termina: "15:00"
			},
			martes: {
				inicio: "8:00",
				termina: "10:00"
			},
			viernes: {
				inicio: "8:00",
				termina: "10:00"
			}
		},
		inicio: ['13:00', '8:00', false, false, '8:00', false, false],
		termina: ['15:00', '10:00', false, false, '10:00', false, false]
	},
	{
		nombre: 'Microcontroladores',
		dias: {
			lunes: {
				inicio: "16:00",
				termina: "17:30"
			},
			miercoles: {
				inicio: "12:00",
				termina: "14:00"
			},
			jueves: {
				inicio: "10:00",
				termina: "12:00"
			},
			viernes: {
				inicio: "10:00",
				termina: "11:30"
			}
		},
		inicio: ['16:00', false, '12:00', '10:00', '10:00', false, false],
		termina: ['17:30', false, '14:00', '12:00', '11:30', false, false]
	},
	{
		nombre: 'Estadistica',
		dias: {
			lunes: {
				inicio: "10:00",
				termina: "12:00"
			},
			miercoles: {
				inicio: "10:00",
				termina: "12:00"
			}
		},
		inicio: ['10:00', false, '10:00', false, false, false, false],
		termina: ['12:00', false, '12:00', false, false, false, false]
	}
]

class Materia {

	hourToMins(hourString) {
		let split = hourString.split(':')
		return parseInt(split[0]) * 60 + parseInt(split[1])
	}

	getEarliest(horas) {
		horas = horas.filter(function (i) { if (i !== false) return i })
		return Math.min(...horas)
	}

	getLatest(horas) {
		horas = horas.filter(function (i) { if (i !== false) return i })
		return Math.max(...horas)
	}

	constructor(materia) {
		this.nombre = materia.nombre
		let inicio = [false, false, false, false, false, false, false]
		let termina = [false, false, false, false, false, false, false]
		for (let i = 0; i < 7; i++) {
			if (materia.inicio[i]) {
				inicio[i] = this.hourToMins(materia.inicio[i])
				termina[i] = this.hourToMins(materia.termina[i])
			}
		}
		this.inicio = inicio
		this.termina = termina
		this.earliest = this.getEarliest(inicio)
		this.latest = this.getLatest(termina)
	}

}

materias = []
for (let materia of materiasData) materias.push(new Materia(materia))