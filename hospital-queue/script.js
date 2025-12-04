class Node {
    constructor(id, type, priorityLevel) {
        this.id = id;
        this.type = type;
        this.priorityLevel = priorityLevel;
        this.entryTime = Date.now();
        this.next = null;
        this.elementId = `node-${id}`; 
    }
}

class LinkedQueue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    enqueue(node) {
        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
        this.length++;
    }

    dequeue() {
        if (!this.head) return null;
        const temp = this.head;
        this.head = this.head.next;
        if (!this.head) {
            this.tail = null;
        }
        this.length--;
        temp.next = null;
        return temp;
    }

    peek() {
        return this.head;
    }

    isEmpty() {
        return this.length === 0;
    }
    
    toArray() {
        const arr = [];
        let current = this.head;
        while(current) {
            arr.push(current);
            current = current.next;
        }
        return arr;
    }
}

let uniqueIdCounter = 1;
let attendedCount = 0;

const queueRed = new LinkedQueue();
const queueYellow = new LinkedQueue();
const queueGreen = new LinkedQueue();
const queueDoctor = new LinkedQueue();

function createVisualNode(node, startContainerId) {
    const el = document.createElement('div');
    el.id = node.elementId;
    el.className = `patient-node priority-${node.type === 'vermelho' ? 'red' : node.type === 'amarelo' ? 'yellow' : 'green'}`;
    el.innerText = node.id;
    
    el.style.opacity = '0';
    el.style.transform = 'scale(0.5)';
    
    document.getElementById(startContainerId).appendChild(el);

    setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'scale(1)';
    }, 50);

    return el;
}

function moveVisualNode(node, containerId, x, y, isUrgent = false) {
    let el = document.getElementById(node.elementId);
    
    if (!el) return;

    const newParent = document.getElementById(containerId);
    if (el.parentElement !== newParent) {
        newParent.appendChild(el);
    }

    el.style.left = x + 'px';
    el.style.bottom = y + 'px';
    
    if (containerId === 'doctor-queue-visual') {
        el.style.bottom = 'auto';
        el.style.top = '50%';
        el.style.transform = 'translateY(-50%)';
    } else {
            el.style.transform = 'none';
    }

    if (isUrgent) {
        el.classList.add('urgent-pulse');
    } else {
        el.classList.remove('urgent-pulse');
    }
}

function removeVisualNode(node) {
    const el = document.getElementById(node.elementId);
    if (el) {
        el.style.opacity = '0';
        el.style.transform = 'scale(0)';
        setTimeout(() => el.remove(), 500);
    }
}

function addPatient(type) {
    const node = new Node(uniqueIdCounter++, type, type === 'vermelho' ? 0 : type === 'amarelo' ? 1 : 2);
    
    let containerId = '';
    if (type === 'vermelho') {
        queueRed.enqueue(node);
        containerId = 'red-queue-visual';
    } else if (type === 'amarelo') {
        queueYellow.enqueue(node);
        containerId = 'yellow-queue-visual';
    } else {
        queueGreen.enqueue(node);
        containerId = 'green-queue-visual';
    }

    createVisualNode(node, containerId);
    updateVisuals();
}

function transferToDoctor(queue, queueName) {
    const node = queue.dequeue();
    if (node) {
        queueDoctor.enqueue(node);
    }
}

function schedulerLoop() {
    const now = Date.now();
    
    if (queueDoctor.isEmpty()) {
        const headRed = queueRed.peek();
        const headYellow = queueYellow.peek();
        const headGreen = queueGreen.peek();

        const isYellowLate = headYellow && (now - headYellow.entryTime > 60000); 
        const isGreenLate = headGreen && (now - headGreen.entryTime > 180000); 

        const isRedEligible = !!headRed;
        const isYellowEligible = headYellow && (!headRed || isYellowLate);
        const isGreenEligible = headGreen && ((!headRed && !headYellow) || isGreenLate);


        if (isRedEligible) {
            transferToDoctor(queueRed, 'red');
        } else if (isYellowLate) {
            transferToDoctor(queueYellow, 'yellow');
        } else if (isGreenLate) {
            transferToDoctor(queueGreen, 'green');
        } else if (isYellowEligible) {
            transferToDoctor(queueYellow, 'yellow');
        } else if (isGreenEligible) {
            transferToDoctor(queueGreen, 'green');
        }
    }

    updateVisuals();
    requestAnimationFrame(schedulerLoop);
}

function updateVisuals() {
    const now = Date.now();

    const renderVertical = (queue, containerId) => {
        const nodes = queue.toArray();
        nodes.forEach((node, index) => {
            const yPos = 10 + (index * 50); 
            const xPos = 28;
            
            let urgent = false;
            if (node.type === 'amarelo' && (now - node.entryTime > 60000)) urgent = true;
            if (node.type === 'verde' && (now - node.entryTime > 180000)) urgent = true;

            moveVisualNode(node, containerId, xPos, yPos, urgent);
        });
    };

    renderVertical(queueRed, 'red-queue-visual');
    renderVertical(queueYellow, 'yellow-queue-visual');
    renderVertical(queueGreen, 'green-queue-visual');

    const docNodes = queueDoctor.toArray();
    docNodes.forEach((node, index) => {
        const xPos = 10 + (index * 50);
        const yPos = 0; 
        moveVisualNode(node, 'doctor-queue-visual', xPos, yPos, false);
    });
}

let serviceTimer = 0;
const SERVICE_DURATION = 100;

setInterval(() => {
    const docStatus = document.getElementById('doctor-status');
    const progressBar = document.getElementById('service-progress');

    if (!queueDoctor.isEmpty()) {
        const currentPatient = queueDoctor.peek();
        docStatus.innerText = `Atendendo paciente ${currentPatient.id} (${currentPatient.type})...`;
        
        serviceTimer++;
        
        const percentage = (serviceTimer / SERVICE_DURATION) * 100;
        progressBar.style.width = `${percentage}%`;

        if (serviceTimer >= SERVICE_DURATION) {
            const finishedNode = queueDoctor.dequeue();
            removeVisualNode(finishedNode);
            attendedCount++;
            document.getElementById('total-attended').innerText = attendedCount;
            serviceTimer = 0;
            progressBar.style.width = '0%';
        }
    } else {
        docStatus.innerText = "Aguardando pacientes...";
        progressBar.style.width = '0%';
        serviceTimer = 0;
    }

}, 100);

schedulerLoop();
