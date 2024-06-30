let circle;
let button;
let state = 'idle';
let timer = 0;
let cycle = 0;
let maxCycles = 4;

function setup() {
    createCanvas(550, 800); // Increased size
    circle = new BreathCircle(width / 2, height / 2, 100);
    button = createButton('Begin');
    button.position((windowWidth - button.width) / 2, height - 100); // Adjusted for centering 
    button.mousePressed(startExercise);

    // Center the canvas
    let canvas = document.querySelector('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '50%';
    canvas.style.left = '50%';
    canvas.style.transform = 'translate(-50%, -50%)';
}
function draw() {
    background(0, 0, 50); // depper blue

    // Display static text for the breathing exercise
    fill(255); // White color for text
    textSize(24); // Smaller text size for the description
    text("Breathing Exercise", width / 2, 50); // Centered at the top
    textSize(16); // Even smaller text size for the sub-description
    text("This is 4-7-8 breathing exercise that repeats 4 times", width / 2, 80); // Slightly below the first text

    // Ensure text is centered
    textAlign(CENTER, CENTER);

    circle.display();
    circle.update();

    if (state !== 'idle') {
        displayTimer();
        displayInstructions();
    }
}

function startExercise() {
    if (state === 'idle') {
        state = 'inhale';
        timer = 4;
        cycle = 0;
    }
}

function displayTimer() {

    fill(255);
    textSize(24);
    textAlign(CENTER, CENTER);
    text(ceil(timer), width / 2, height / 3 - 80);
}

function displayInstructions() {
    fill(255);
    textSize(18);
    textAlign(CENTER, CENTER);
    let instruction = '';
    if (state === 'inhale') instruction = 'Inhale';
    if (state === 'hold') instruction = 'Hold';
    if (state === 'exhale') instruction = 'Exhale';
    text(instruction, width / 2, height / 3 - 110);
}

class BreathCircle {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.targetSize = size;
        this.color = color(0, 100, 255);
        this.targetColor = color(0, 100, 255);
    }

    display() {
        fill(this.color);
        noStroke();
        ellipse(this.x, this.y, this.size);
    }
    0
    update() {
        this.size = lerp(this.size, this.targetSize, 0.01);
        this.color = lerpColor(this.color, this.targetColor, 0.01);

        if (state !== 'idle') {
            timer -= 1 / 60;

            if (timer <= 0) {
                if (state === 'inhale') {
                    state = 'hold';
                    timer = 7;
                } else if (state === 'hold') {
                    state = 'exhale';
                    timer = 8;
                    this.targetSize = 100;
                    this.targetColor = color(0, 100, 255);
                } else if (state === 'exhale') {
                    cycle++;
                    if (cycle >= maxCycles) {
                        state = 'idle';
                        this.targetSize = 100;
                        this.targetColor = color(0, 100, 255);
                    } else {
                        state = 'inhale';
                        timer = 4;
                        this.targetSize = 200;
                        this.targetColor = color(100, 200, 255);
                    }
                }
            }
        }

        if (state === 'inhale') {
            this.targetSize = 200;
            this.targetColor = color(100, 200, 255);
        }
    }
}