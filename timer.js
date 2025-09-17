
let startTime = null;
let timerRunning = false;

export function startTimer() {
    if (timerRunning) return; // Защита от повторного запуска
    startTime = performance.now(); // Точное время в мс с высокой точностью
    timerRunning = true;
    console.log("Таймер запущен");
}

export function stopTimer() {
    if (!timerRunning || startTime === null) {
        console.warn("Таймер не был запущен!");
        return 0;
    }

    const endTime = performance.now();
    const elapsed = endTime - startTime; // Прошедшее время в миллисекундах
    timerRunning = false;
    startTime = null;

    console.log(`Таймер остановлен. Прошло: ${elapsed.toFixed(2)} мс`);
    return elapsed;
}