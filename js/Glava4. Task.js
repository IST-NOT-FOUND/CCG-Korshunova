var gl;
var shaderProgram;
var vertexBuffer;
var colorBuffer;
var v1r = 1.0, v1g = 0.0, v1b = 0.0,
    v2r = 0.0, v2g = 1.0, v2b = 0.0,
    v3r = 0.0, v3g = 0.0, v3b = 1.0,
    v4r = 1.0, v4g = 0.5, v4b = 0.0,
    vtr = 0.0, vtg = 0.0, vtb = 0.0

function initShaders() {
    var fragmentShader = getShader(gl.FRAGMENT_SHADER, 'varying highp vec4 vColor;void main(void) {gl_FragColor = vColor;}');
    var vertexShader = getShader(gl.VERTEX_SHADER, 'attribute vec3 aVertexPosition;attribute vec3 aVertexColor;varying highp vec4 vColor;void main(void) {gl_Position = vec4(aVertexPosition, 1.0);vColor = vec4(aVertexColor, 1.0);}');

    shaderProgram = gl.createProgram();

    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);

    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Не удалось установить шейдеры");
    }

    gl.useProgram(shaderProgram);

    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
    shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
    gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
}

function getShader(type, shader) {
    var source = shader;

    var shader = gl.createShader(type);

    gl.shaderSource(shader, source);

    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert("Ошибка компиляции шейдера: " + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

function initBuffers() {

    var vertices = [
        -0.9, -0.5,  0.0,
        -0.5,  0.5,  0.0,
        0.1,  0.5,  0.0,
        0.1,  0.5,  0.0,
        0.5, -0.5,  0.0,
        -0.9, -0.5,  0.0
    ];

    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    vertexBuffer.itemSize = 3;
    vertexBuffer.numberOfItems = 6;
    var сolors = [
        v4r, v4g, v4b,
        v1r, v1g, v1b,
        v2r, v2g, v2b,
        v2r, v2g, v2b,
        v3r, v3g, v3b,
        v4r, v4g, v4b
    ];
    colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(сolors), gl.STATIC_DRAW);
}
function draw() {

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute,
        vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute,
        vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLES, 0, vertexBuffer.numberOfItems);
}

window.onload=function(){

    var canvas = document.getElementById("canvas3D");
    try {
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    }
    catch(e) {}

    if (!gl) {
        alert("Ваш браузер не поддерживает WebGL");
    }
    if(gl){
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;

        initShaders();

        initBuffers();

        draw();
    }
}
function colorReplacement(){
    vtr = v4r;
    vtg = v4g;
    vtb = v4b;
    v4r = v1r;
    v4g = v1g;
    v4b = v1b;
    v1r = v2r;
    v1g = v2g;
    v1b = v2b;
    v2r = v3r;
    v2g = v3g;
    v2b = v3b;
    v3r = vtr;
    v3g = vtg;
    v3b = vtb;
    var сolors = [
        v4r, v4g, v4b,
        v1r, v1g, v1b,
        v2r, v2g, v2b,
        v2r, v2g, v2b,
        v3r, v3g, v3b,
        v4r, v4g, v4b
    ];
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(сolors), gl.STATIC_DRAW);
    initShaders();
    draw();
}