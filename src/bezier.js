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
function getPointString(calc, n, unit) {

    if (calc && unit != '%')
        return 'calc(100% - ' + n + unit + ') '
    else
        return n + unit + ' '
}

// получить строку точек для полигона из расчета квадратичной кривой
function getString(start, end, fulcrum, unit = 'px', calcX = false, calcY = false) {

    let result = ''

    const points = getBezierCurve([start, fulcrum, end])

    for (let point of points) {
        result += getPointString(calcX, point[0], unit)
        result += getPointString(calcY, point[1], unit)
        result += ','
    }

    return result
}

module.exports = { getBezierCurve, getString }