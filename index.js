const fs = require('fs')

// Факториал
function getFactorial(n) {
    return (n <= 1) ? 1 : n * getFactorial(n - 1)
}

// получить i-й элемент многочлена
function getBezierBasis(i, n, t) {
    return (getFactorial(n) / (getFactorial(i) * getFactorial(n - i))) * Math.pow(t, i) * Math.pow(1 - t, n - i)
}

function getBezierCurve(array, step = 0.01) {

    let result = []

    for (let t = 0; t < 1 + step; t += step) {
        if (t > 1) t = 1
        let index = result.length

        result[index] = [0, 0]

        for (let i = 0; i < array.length; i++) {
            let b = getBezierBasis(i, array.length - 1, t)

            result[index][0] += array[i][0] * b
            result[index][1] += array[i][1] * b
        }
    }

    return result
}

// получить строку точки в зависимости от угла
function getPointString(calc, n) {

    if (calc)
        return 'calc(100% - ' + n + 'px) '
    else
        return n + 'px '
}

// получить строку точек для полигона из расчета квадратичной кривой
function getString(start, end, fulcrum, calcX = false, calcY = false) {

    let result = ''

    const points = getBezierCurve([start, fulcrum, end])

    for (let point of points) {
        result += getPointString(calcX, point[0])
        result += getPointString(calcY, point[1])
        result += ','
    }

    return result
}

function start() {
    const str = getString([0, 20], [20, 0], [0, 0], false, true)
    fs.writeFileSync('./out.txt', str)
    console.log(str)
}

start()