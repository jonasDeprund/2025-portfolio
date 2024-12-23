import React, { useRef, useEffect, useState } from 'react';

function Background() {
  const canvasRef = useRef(null);
  const [scrollOpacity, setScrollOpacity] = useState(1);

  useEffect(() => {
    function handleScroll() {
      const scrollPosition = window.pageYOffset;
      const newOpacity = 1 - (scrollPosition * 1.5) / window.innerHeight;
      setScrollOpacity(newOpacity);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl', { preserveDrawingBuffer: true });

    const navElement = document.getElementsByTagName('nav')[0];

    navElement.appendChild(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style =
      'position:fixed;width:100vw;height:100vh;top:0;left:0;z-index:-1';

    let t = 0;
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0,
      ]),
      gl.STATIC_DRAW
    );

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    const program = gl.createProgram();
    const vshader = gl.createShader(gl.VERTEX_SHADER);
    const fshader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(
      vshader,
      `
    precision lowp float;
    attribute vec2 a_position;
    void main() {
    gl_Position = vec4(a_position, 0, 1);
    }
`
    );
    gl.shaderSource(
      fshader,
      `
    precision mediump float;
    uniform float time;
    uniform vec2 resolution;
  
    #define S sin
    #define C cos
    #define t time/2.
    #define X uv.x*32.
    #define Y -uv.y*32.
  
    void main( void ) {
      vec2 uv = ( gl_FragCoord.xy-.5* resolution.xy )/resolution.y-.5 ;
      float c = S(X/10.+Y/15.)*S(X/20.+t+S(2.*t+Y/5.));
      gl_FragColor = vec4( vec3( 0, c, .5+c), 1.0 );
    }
  `
    );
    gl.compileShader(vshader);
    gl.compileShader(fshader);
    gl.attachShader(program, vshader);
    gl.attachShader(program, fshader);
    gl.linkProgram(program);
    gl.useProgram(program);
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    function renderLoop() {
      gl.uniform1f(gl.getUniformLocation(program, 'time'), t);
      gl.uniform2f(
        gl.getUniformLocation(program, 'resolution'),
        window.innerWidth,
        window.innerHeight
      );

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      t += 0.003;
      requestAnimationFrame(renderLoop);
    }
    renderLoop();
  }, []);

  return (
    <>
      <canvas
        className="shape"
        style={{ opacity: scrollOpacity }}
        ref={canvasRef}
      ></canvas>
    </>
  );
}

export default Background;
