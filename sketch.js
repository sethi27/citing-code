/*
TUTORIAL SOURCES:
Tutorial 1 (Base Code): 3D Orbit Control (https://p5js.org/examples/3d-orbit-control.html)
- Basic sphere of cubes structure
- Orbit control functionality
- Basic 3D setup with WEBGL

Tutorial 2 (Color Inspiration): Color Linear Gradient (https://p5js.org/tutorials/color-gradients/)
- Inspiration for color transitions
- Gradient mapping concepts

MY EXTENSIONS AND MODIFICATIONS:

1. Color System Enhancements:
   - Switched to HSB color mode for better control
   - Added dynamic color palettes (Cool, Warm, Random)
   - Implemented gradient colors based on cube positions
   - Added pastel pink background
   Reason: Enhanced visual aesthetics and color control

2. Interactive Controls:
   - Created three color scheme buttons
   - Added spacebar functionality for dynamic box sizing
   - Implemented auto-rotation feature
   Reason: Improved user interaction and engagement

3. Visual Improvements:
   - Created alternating filled/wireframe cube pattern
   - Added smooth color transitions with colorPhase
   - Enhanced depth with ambient lighting
   Reason: Better visual depth and interest

4. Responsive Design:
   - Implemented fullscreen canvas
   - Added window resize handling
   - Optimized sphere positioning
   Reason: Better cross-device experience
*/

// --- Global Variables ---
// Tutorial: Basic size variable
// My Extension: Added colorPhase and baseHue for color animations
let colorPhase = 0;
let boxSize = 50;
let baseHue = 200; // Starting with cool blue

function setup() {
    // Tutorial: Basic 3D setup
    createCanvas(windowWidth, windowHeight, WEBGL);
    angleMode(DEGREES);
    
    // My Extension: HSB color mode and UI setup
    colorMode(HSB, 255);
    strokeWeight(2);
    describe(
        'Interactive 3D sphere of cubes with color gradients. Click and drag to rotate view.'
    );
    
    // My Extension: Color scheme initialization and controls
    baseHue = 200;
    document.getElementById('coolBtn').addEventListener('click', () => baseHue = 200);
    document.getElementById('warmBtn').addEventListener('click', () => baseHue = 0);
    document.getElementById('randomBtn').addEventListener('click', () => baseHue = random(255));
}

// My Extension: Responsive canvas handling
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// My Extension: Custom gradient color calculation
function getGradientColor(zAngle, xAngle) {
    let hue = (baseHue + map(zAngle, 0, 180, 0, 60) + colorPhase) % 255;
    let saturation = map(sin(xAngle + colorPhase), -1, 1, 150, 255);
    let brightness = map(cos(zAngle * 2), -1, 1, 150, 255);
    return color(hue, saturation, brightness);
}

function draw() {
    // My Extension: Custom background color
    background(340, 40, 255); // Light pastel pink in HSB

    // My Extension: Enhanced lighting
    ambientLight(100);
    pointLight(255, 255, 255, 0, 0, 200);

    // Tutorial: Basic orbit control
    orbitControl();

    // My Extension: Centered sphere with auto-rotation
    translate(0, 0, 0);
    rotateX(30);
    rotateY(colorPhase/2);

    // Tutorial: Basic sphere structure with nested loops
    for (let zAngle = 0; zAngle < 180; zAngle += 30) {
        for (let xAngle = 0; xAngle < 360; xAngle += 30) {
            push();
            
            // Tutorial: Basic cube positioning
            rotateZ(zAngle);
            rotateX(xAngle);

            // My Extension: Dynamic color and style
            let cubeColor = getGradientColor(zAngle, xAngle);
            stroke(cubeColor);
            if ((zAngle + xAngle) % 60 === 0) {
                fill(cubeColor);
            } else {
                noFill();
            }

            // Tutorial: Cube creation
            translate(0, 200, 0);
            box(boxSize);
            pop();
        }
    }

    // My Extension: Color animation
    colorPhase += 0.5;
}

// My Extension: Interactive size control
function keyPressed() {
    if (key === ' ') {
        boxSize = random(30, 70);
    }
}