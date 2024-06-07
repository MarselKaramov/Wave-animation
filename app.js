(() => {
    const cnv = document.querySelector(`canvas`);
    const ctx = cnv.getContext(`2d`);

    function init() {
        cnv.width = innerWidth;
        cnv.height = innerHeight;
    }
    init();

    const numberOfRings = 3;
    const ringRadiusOffset = 7;
    const waveOffset = 15;
    const colors = [`#771122`, `#bb1122`, `#ff1122`];
    let startAngel = 0;
    let ringRadius = 200;

    function updateRings() {
        for (let i = 0; i < numberOfRings; i++){
            let radius = i * ringRadiusOffset + ringRadius;
            let offsetAngel = i * waveOffset * Math.PI / 180;
            drawRing(radius, colors[i], offsetAngel)
        }
        startAngel >= 360 ? startAngel = 0: startAngel++;
    }

    let centerX = cnv.width / 2;
    let centerY = cnv.height / 2;

    let maxWaveAplitude = 17;
    let numberOfWaves = 7;
    

    function drawRing(radius , colors, offsetAngel){
        ctx.strokeStyle = colors;
        ctx.lineWidth = 9;

        ctx.beginPath();

        for (let j = -180; j < 180; j++) {
            let currentAngel = (j + startAngel) * Math.PI / 180;
            let displacment = 0;
            let now = Math.abs(j);

            if (now > 70) {
                displacment = (now - 70) / 70;
            }
            if (displacment >= 1) {
                displacment = 1;
            }

            let waveAmplitude = radius + displacment * Math.sin((currentAngel+offsetAngel) * numberOfWaves) * maxWaveAplitude;
            let x = centerX + Math.cos(currentAngel) * waveAmplitude;
            let y = centerY + Math.sin(currentAngel) * waveAmplitude;
            now > -180 ? ctx.lineTo(x, y) : ctx.moveTo(x, y)
            
        }
        ctx.closePath();
        ctx.stroke();
    }

    function loop(){
        cnv.width |= 0;
        updateRings();
        requestAnimationFrame(loop);
    }
    loop();



    window.addEventListener(`resize`, init);

})();

