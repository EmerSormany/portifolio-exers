class Node {
    constructor(car, time) {
        this.car = car;
        this.time = time;
    }
}

class PriorityQueue {
    constructor() {
        this.items = [];
    }

    enqueue(car, newTime) {
        const indexExistente = this.items.findIndex(item => item.car.id === car.id);

        if (indexExistente !== -1) {
            if (newTime < this.items[indexExistente].time) {
                this.items[indexExistente].time = newTime;
                this.sort();
            }
        } else {
            const newElement = new Node(car, newTime);
            this.items.push(newElement);
            this.sort();
        }
    }

    sort() {
        this.items.sort((a, b) => a.time - b.time);
    }

    queu() {
        return this.items;
    }
}

const grid = new PriorityQueue();

const canvas = document.getElementById('raceTrack');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('startBtn');
const statusText = document.getElementById('statusText');
const timerText = document.getElementById('timerText');
const leaderboardBody = document.getElementById('leaderboardBody');

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radiusX = 250;
const radiusY = 120;

const carsData = [
    { id: 1, color: '#FF0000', name: 'Ferrari' },
    { id: 2, color: '#00FFFF', name: 'Alpine' },
    { id: 3, color: '#0000FF', name: 'Red Bull' },
    { id: 4, color: '#00FF00', name: 'Kick Sauber' },
    { id: 5, color: '#FFA500', name: 'McLaren' },
    { id: 6, color: '#FFFFFF', name: 'Haas' },
    { id: 7, color: '#FFFF00', name: 'Renault' },
    { id: 8, color: '#FF00FF', name: 'Racing Point' }
];

let cars = []; 
let state = 'idle'; 
let currentCarIndex = 0;
let animationId;
let currentAngle = 0;
let startTime = 0;

function init() {
    resetSimulationState();
    drawStaticTrack();
    renderLeaderboard();
}

function resetSimulationState() {

    cars = carsData.map(c => ({
        ...c,
        speed: 0,
        running: false,
        finished: false,
        currentRunTime: null 
    }));

    currentCarIndex = 0;
    state = 'idle';
    statusText.textContent = "Aguardando início...";
    timerText.textContent = "00.000";
    startBtn.disabled = false;
}

function drawStaticTrack() {
    ctx.fillStyle = '#2d3436';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 40;
    ctx.stroke();

    ctx.lineWidth = 2;
    ctx.strokeStyle = '#fff';
    
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, radiusX - 20, radiusY - 20, 0, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(centerX, centerY, radiusX + 20, radiusY + 20, 0, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX + radiusX - 20, centerY);
    ctx.lineTo(centerX + radiusX + 20, centerY);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 4;
    ctx.stroke();
    
    for(let i=0; i<4; i++) {
        ctx.fillStyle = i % 2 === 0 ? '#fff' : '#000';
        ctx.fillRect(centerX + radiusX - 20 + (i*10), centerY - 4, 10, 8);
    }
}

function drawCar(car, angle) {
    const x = centerX + radiusX * Math.cos(angle);
    const y = centerY + radiusY * Math.sin(angle);

    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = car.color;
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = (car.color === '#FFFFFF' || car.color === '#FFFF00' || car.color === '#00FFFF') ? '#000' : '#fff';
    ctx.font = 'bold 10px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(car.id, x, y);
}

function startQualifying() {
    if (animationId) cancelAnimationFrame(animationId);
    resetSimulationState();
    state = 'running';
    startBtn.disabled = true;
    statusText.textContent = "Nova Sessão Iniciada!";
    
    startNextCar();
    loop();
}

function startNextCar() {
    if (currentCarIndex >= cars.length) {
        state = 'finished';
        statusText.textContent = "Sessão Finalizada! Grid Atualizado.";
        statusText.style.color = "#4cd137";
        startBtn.disabled = false;
        startBtn.textContent = "Iniciar Nova Sessão";
        renderLeaderboard(); 
        return;
    }

    const car = cars[currentCarIndex];
    statusText.textContent = `Pista: Carro ${car.id}`;
    statusText.style.color = car.color;
    
    const minSpeed = 60;
    const maxSpeed = 100;
    const randomPerf = Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed;
    car.speed = randomPerf;

    const baseSpeed = 0.03;
    const speedMultiplier = (car.speed - 60) / (100 - 60);
    const angularVelocity = baseSpeed + (speedMultiplier * 0.03);

    currentAngle = 0;
    car.running = true;
    car.angularVel = angularVelocity;
    startTime = Date.now();
    
    renderLeaderboard(); 
}

function loop() {
    if (state !== 'running') return;

    drawStaticTrack();

    const car = cars[currentCarIndex];

    if (car && car.running) {
        currentAngle += car.angularVel;
        
        const now = Date.now();
        const currentRunTime = (now - startTime) / 1000;
        timerText.textContent = currentRunTime.toFixed(3);

        drawCar(car, currentAngle);

        if (currentAngle >= 2 * Math.PI) {
            finishLap(car, currentRunTime);
        }
    }

    animationId = requestAnimationFrame(loop);
}

function finishLap(car, time) {
    car.running = false;
    car.finished = true;
    car.currentRunTime = time;
    
    grid.enqueue(car, time);
    
    renderLeaderboard();
    
    currentCarIndex++;
    setTimeout(() => {
        startNextCar();
    }, 1000);
}

function renderLeaderboard() {
    leaderboardBody.innerHTML = '';

    const sortedGrid = grid.queu();

    const idsNoGrid = new Set(sortedGrid.map(i => i.car.id));
    
    const carsWithoutTime = carsData.filter(c => !idsNoGrid.has(c.id));

    sortedGrid.forEach((item, index) => {
        createTable(index + 1, item.car, item.time, true);
    });

    carsWithoutTime.forEach((car, index) => {
        createTable('-', car, null, false);
    });
}

function createTable(posicao, car, time, hasTime) {
    const tr = document.createElement('tr');

    if (state === 'running' && cars[currentCarIndex] && 
        cars[currentCarIndex].id === car.id && 
        cars[currentCarIndex].running) {
        tr.classList.add('active-row');
    }

    const posTd = document.createElement('td');
    posTd.textContent = posicao;

    const carTd = document.createElement('td');
    const badge = document.createElement('span');
    badge.className = 'car-badge';
    badge.style.backgroundColor = car.color;
    badge.textContent = car.id;
    carTd.appendChild(badge);

    const timeTd = document.createElement('td');
    if (hasTime) {
        timeTd.textContent = time.toFixed(3) + 's';
        if (posicao === 1) timeTd.classList.add('best-time');
    } else {
        if (state === 'running' && cars[currentCarIndex] && cars[currentCarIndex].id === car.id) {
            timeTd.textContent = "Na pista...";
            timeTd.style.color = '#4cd137';
        } else {
            timeTd.textContent = "-";
        }
    }

    tr.appendChild(posTd);
    tr.appendChild(carTd);
    tr.appendChild(timeTd);
    
    leaderboardBody.appendChild(tr);
}

init();