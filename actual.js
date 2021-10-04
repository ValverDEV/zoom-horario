const estadistica1 = 'https://cuaieed-unam.zoom.us/j/89305431257'
const estadistica2 = 'https://cuaieed-unam.zoom.us/j/85252440658'
const computacion = 'https://cuaieed-unam.zoom.us/j/84692670727'
// const fisica = 'https://cuaieed-unam.zoom.us/j/88904812467?pwd=amd0WC9Zdi94TGJRaDVPVXFwaUFrQT09'
const fisica = 'https://cuaieed-unam.zoom.us/j/83516684281'
// const fisicaLab = 'https://cuaieed-unam.zoom.us/j/83516684281'
const fisicaLab = 'https://cuaieed-unam.zoom.us/j/88904812467?pwd=amd0WC9Zdi94TGJRaDVPVXFwaUFrQT09'
const micro = 'DOMINGO RANGEL MIRANDA'
// const micro = 'asdfasdfsdf'
const estancia = 'https://us02web.zoom.us/j/87055264048?pwd=VjBsMG82TEpiY21PMU9UVlZGZlM5Zz09'
const biofisica = 'https://us02web.zoom.us/j/88482667789?pwd=aG85WCtuZWMySXEyNW9qNW0rc29FUT09'

const h1 = document.querySelector('h1')

const clases = [
	//domingo
	false,
	//lunes
	[ //materias
		{
			nombre: 'Estadistica',
			inicio: '10:00',
			termina: '12:00',
			url: estadistica1
		},
		{
			nombre: 'Computacion III',
			inicio: '12:00',
			termina: '13:00',
			url: computacion
		},
		{
			nombre: 'Fisica Moderna',
			inicio: '13:00',
			termina: '16:00',
			url: fisica
		},
		{
			nombre: 'Microcontroladores',
			inicio: '16:00',
			termina: '17:30',
			url: micro
		}
	],
	//martes
	[//materias
		{
			nombre: 'Fisica Moderna',
			inicio: '8:00',
			termina: '10:00',
			url: fisica
		},
		{
			nombre: 'Computacion III',
			inicio: '10:00',
			termina: '12:00',
			url: computacion
		},
		{
			nombre: 'Biofisica',
			inicio: '12:00',
			termina: '14:00',
			url: biofisica
		},
		{
			nombre: 'Estancia V',
			inicio: '17:00',
			termina: '19:00',
			url: estancia
		}
	],
	//miercoles
	[
		{
			nombre: 'Biofisica',
			inicio: '8:00',
			termina: '10:00',
			url: biofisica
		},
		{
			nombre: 'Estadistica',
			inicio: '10:00',
			termina: '12:00',
			url: estadistica2
		},
		{
			nombre: 'Microcontroladores',
			inicio: '12:00',
			termina: '14:00',
			url: micro
		}
	],
	//jueves
	[
		{
			nombre: 'Biofisica',
			inicio: '8:00',
			termina: '10:00',
			url: biofisica
		},
		{
			nombre: 'Microcontroladores',
			inicio: '10:00',
			termina: '12:00',
			url: micro
		},
		{
			nombre: 'Computacion III',
			inicio: '12:00',
			termina: '14:00',
			url: computacion
		},
		{
			nombre: 'Estancia V',
			inicio: '17:00',
			termina: '19:00',
			url: estancia
		}
	],
	//viernes
	[
		{
			nombre: 'Fisica Moderna (Lab)',
			inicio: '8:00',
			termina: '10:00',
			url: fisicaLab
		},
		{
			nombre: 'Microcontroladores',
			inicio: '10:00',
			termina: '11:30',
			url: micro
		}
	],
	//sabado
	false
]

const hourToMins = function (hourString) {
	let split = hourString.split(':')
	return parseInt(split[0]) * 60 + parseInt(split[1])
}

const launchCurrent = function (nombre, url) {
	h1.innerText = nombre
	console.log(nombre)
	setTimeout(function () {
		window.location.href = url
	}, 5000)
}

const encontrar = function (res) {
	let data = res.data
	console.log(data)
	for (let obj of data) {
		if (obj.host == micro) {
			let url = 'https://cuaieed-unam.zoom.us/j/'
			url += obj.id
			launchCurrent('Microcontroladores', url)
			return true
		}
	}
	h1.innerText = 'Aún no está la clase en Aulas, espera'
	setTimeout(function () { casoEspecial() }, 5000)
	return false
}

const casoEspecial = function () {
	h1.innerText = 'Espera...'
	axios.get('https://aulas-virtuales.cuaieed.unam.mx:3000/api/zoom_live_meetings')
		.then(encontrar)
}

const claseActual = function (clasesDia, currentMins) {
	for (let clase of clasesDia) {
		const inicio = hourToMins(clase.inicio)
		const termina = hourToMins(clase.termina)
		if (inicio - 5 < currentMins && termina - 5 > currentMins) {
			if (clase.nombre == 'Microcontroladores') {
				casoEspecial()
				return true
			}
			launchCurrent(clase.nombre, clase.url)
			return true
		}
	}
	h1.innerText = 'No hay clase a esta hora!'
}

const time = new Date
const dia = time.getDay()
const currentMins = time.getHours() * 60 + time.getMinutes()

if (clases[dia]) {
	claseActual(clases[dia], currentMins)
} else {
	h1.innerText = 'No hay clase hoy!'
}
