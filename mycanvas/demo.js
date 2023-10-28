main();

function main(){
    var canvas = document.getElementById("my_canvas");
    var gl = canvas.getContext("webgl");
    if(gl==null){
        alert("Unable to initialize");
        return;
    }

    // gl.clearColor(0.0,0.0,1.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    var vertices = [
        -0.5,0.5,
        -0.5,-0.5,
        0.5,-0.5,
    ];

    var indices = [0,1,2];

    var vertex_buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var index_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    var vertCode = `
            attribute vec2 coordinates;
            void main(void) {
                gl_Position = vec4(coordinates, 0.0, 1.0);
            }
        `;

        var vertShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertShader, vertCode);
        gl.compileShader(vertShader);

        var fragCode = `
            void main(void) {
                gl_FragColor = vec4(0.0, 1.0, 0.8, 1.0);
            }
        `;

        // var fragment_shader_source =
        // `precision mediump float;
        // uniform vec3 uColor;
        // void main() {
        //     gl_FragColor = vec4(uColor,1.0);
        // }`;

        // var uniformColor_Loc = gl.getUniformLocation(shaderProgram, "uColor")
        // gl.uniform3f(uniformColor_Loc, 0,1,0);
        // console.log("Complete shader program");

        var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragShader, fragCode);
        // gl.shaderSource(fragShader, fragment_shader_source);
        gl.compileShader(fragShader);

        var shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertShader);
        gl.attachShader(shaderProgram, fragShader);
        gl.linkProgram(shaderProgram);
        gl.useProgram(shaderProgram);

        var coord = gl.getAttribLocation(shaderProgram, "coordinates");
        gl.enableVertexAttribArray(coord);
        gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
        gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
        gl.clearColor(1.0, 1.0, 1.0, 1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

};
