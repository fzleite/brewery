export default function brewGraph(graphConf) {
    if (!graphConf) graphConf = {};

    const graphInfo = {
        width: graphConf.width || 800,
        height: graphConf.height || 600,
        backgroundColor: graphConf.backgroundColor || 'rgba(255,255,255,0)',
        axisLineColor: graphConf.axisLineColor || 'black',
        title: graphConf.title || 'Mash Graph',
        titleColor: graphConf.titleColor || 'blue',
        titleFont: graphConf.titleFont || 'bold 20px Arial',
        axisXLabel: graphConf.axisXLabel || 'Tempo (t)',
        axisYLabel: graphConf.axisYLabel || 'Temperatura (c)',
        axisLabelColor: graphConf.axisLabelColor || 'black',
        axisLabelFont: graphConf.axisLabelFont || 'italic 16px Arial',
        legendTitle: graphConf.legendTitle || 'Legenda:',
        legendFont: graphConf.legendFont || 'bold 16px Arial',
        legendItemFont: graphConf.legendItemFont || '14px Arial',
        dataLabelFont: graphConf.dataLabelFont || '14px Arial',
        heatingTitle: graphConf.heatingTitle || 'Mudança de rampa',
        heatingColor: graphConf.heatingColor || 'rgba(100,100,100,0.3)',
        steps: graphConf.steps,
        context: null,
        canvas: null,
    };

    console.log(graphInfo);

    const setContext = (context) => {
        graphInfo.canvas = context;
        graphInfo.context = context.getContext('2d');
    };

    /** Exception */
    const StepException = (message) => {
        this.message = message;
        this.name = 'StepException';
    };

    /**
     * Add a new individual step
     */
    const addStep = (stepInfo) => {
        if (!stepInfo)
            throw new StepException(
                'Step info is mandatory. See the documentation'
            );
        if (!stepInfo.temperature)
            throw new StepException(
                'Temperature info into StepInfo is mandatory'
            );
        if (!stepInfo.duration)
            throw new StepException(
                'Steop duration info into StepInfo is mandatory'
            );

        stepInfo.name = stepInfo.name || `Step ${graphInfo.steps.length + 1}`;
        stepInfo.timeToAchieve = stepInfo.timeToAchieve || 10;

        graphInfo.steps.push(stepInfo);
    };

    const drawHeader = () => {
        let w = graphInfo.width;
        let h = 400;
        let cnv = document.createElement('canvas');
        cnv.width = w;
        cnv.height = h;
        let ctx = cnv.getContext('2d');
        let borderX = 50;
        let borderY = 50;
        let ac = graphInfo.axisLineColor;

        ctx.fillStyle = graphInfo.backgroundColor;
        ctx.clearRect(0, 0, w, h);

        ctx.font = graphInfo.titleFont;
        ctx.fillStyle = graphInfo.titleColor;
        ctx.textAlign = 'center';
        ctx.fillText(graphInfo.title, w / 2, borderY / 2);

        // Draw the X axis
        ctx.lineWidth = 2;
        ctx.lineColor = ac;
        ctx.beginPath();
        ctx.moveTo(borderX, borderY);
        ctx.lineTo(borderX, borderY + h - borderY * 2);
        ctx.stroke();

        //Draw arroy in X axis
        ctx.beginPath();
        ctx.moveTo(borderX, borderY);
        ctx.lineTo(borderX + 5, borderY + 10);
        ctx.lineTo(borderX - 5, borderY + 10);
        ctx.closePath();
        ctx.fillStyle = ac;
        ctx.fill();

        ctx.font = graphInfo.axisLabelFont;
        ctx.fillStyle = graphInfo.axisLabelColor;
        ctx.textAlign = 'center';
        ctx.fillText(graphInfo.axisXLabel + ` - ETM (Estimated Time to Mash)=${getTotalTime()}m`, w / 2, h - borderY / 2);

        // Draw the Y axis
        ctx.lineWidth = 2;
        ctx.lineColor = ac;
        ctx.beginPath();
        ctx.moveTo(borderX, borderY + h - borderY * 2);
        ctx.lineTo(borderX + w - borderX * 2, borderY + h - borderY * 2);
        ctx.stroke();

        //Draw arroy in Y axis
        ctx.beginPath();
        ctx.moveTo(borderX + w - borderX * 2, borderY + h - borderY * 2);
        ctx.lineTo(
            borderX + w - borderX * 2 - 10,
            borderY + h - borderY * 2 - 5
        );
        ctx.lineTo(
            borderX + w - borderX * 2 - 10,
            borderY + h - borderY * 2 + 5
        );
        ctx.closePath();
        ctx.fillStyle = ac;
        ctx.fill();

        ctx.font = graphInfo.axisLabelFont;
        ctx.fillStyle = graphInfo.axisLabelColor;
        ctx.textAlign = 'center';
        ctx.save();
        ctx.translate(8, ctx.measureText(graphInfo.axisYLabel) / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText(graphInfo.axisYLabel, -(h / 2), (borderX / 3) * 2);
        ctx.restore();

        return {
            dataX: borderX + 1,
            dataY: borderY + 1,
            dataW: borderX + w - borderX * 2 - borderX,
            dataH: borderY + h - borderY * 2 - borderY,
            image: ctx.getImageData(0, 0, w, h),
        };
    };

    /**
     * Get the total size of all steps
     */
    const getTotalTime = () => {
        let totalTime = 0;
        graphInfo.steps.forEach((elem) => {
            totalTime += elem.timeToAchieve + elem.time;
        });
        return totalTime;
    };

    /**
     * draw the Graph
     */
    const drawData = (w, h) => {
        let cnv = document.createElement('canvas');
        let ctx = cnv.getContext('2d');
        cnv.width = graphInfo.width;
        cnv.height = graphInfo.height;
        let pw = w / getTotalTime(); //percentage of width
        let ph = h / 100; // percentage of height

        let lastTime = 0;
        let lastTemp = 0;

        graphInfo.steps.forEach((step) => {
            // Time to achieve
            ctx.beginPath();
            ctx.moveTo(lastTime, h);
            ctx.lineTo(lastTime + step.timeToAchieve * pw, h);
            ctx.lineTo(
                lastTime + step.timeToAchieve * pw,
                h - step.temperature * ph
            );
            ctx.lineTo(lastTime, h - lastTemp * ph);
            ctx.closePath();
            ctx.fillStyle = graphInfo.heatingColor;
            ctx.fill();

            //Draw label
            ctx.font = graphInfo.dataLabelFont;
            ctx.fillStyle = graphInfo.axisLabelColor;
            ctx.textAlign = 'center';
            ctx.fillText(
                '(t=' + step.timeToAchieve + 'm)',
                lastTime + step.timeToAchieve * pw - (step.timeToAchieve * pw / 2),
                h - step.temperature * ph
            );


            lastTime += step.timeToAchieve * pw;

            // Draw step
            ctx.beginPath();
            ctx.moveTo(lastTime, h);
            ctx.lineTo(lastTime + step.time * pw, h);
            ctx.lineTo(lastTime + step.time * pw, h - step.temperature * ph);
            ctx.lineTo(lastTime, h - step.temperature * ph);
            ctx.closePath();
            ctx.fillStyle = step.colorAlpha;
            ctx.fill();

            //Draw label
            ctx.font = graphInfo.dataLabelFont;
            ctx.fillStyle = graphInfo.axisLabelColor;
            ctx.textAlign = 'center';
            ctx.fillText(
                step.temperature + '°',
                lastTime + step.time * pw - (step.time * pw / 2),
                h - step.temperature * ph - 10
            );

            lastTime += step.time * pw;
            lastTemp = step.temperature;
        });

        return {
            image: ctx.getImageData(0, 0, w, h),
        };
    };

    /**
     * Draw the Legend
     */
    const drawLegend = () => {
        let cnv = document.createElement('canvas');
        cnv.height = graphInfo.steps.length * 50;

        let ctx = cnv.getContext('2d');
        let space = 20;
        let beginH = 20;
        let markSize = 30;

        ctx.font = graphInfo.legendFont;
        ctx.fillStyle = graphInfo.axisLabelColor;
        ctx.textAlign = 'left';
        ctx.fillText(graphInfo.legendTitle, 0, 10);

        graphInfo.steps.forEach((element) => {
            // Draw the mark
            ctx.fillStyle = element.color;
            ctx.fillRect(0, beginH + 5, markSize, space - 5);
            ctx.stroke();

            // Draw the mark's description
            ctx.font = graphInfo.legendItemFont;
            ctx.fillStyle = graphInfo.axisLabelColor;
            ctx.textAlign = 'left';
            ctx.fillText(element.step, markSize + 10, beginH + 18);

            beginH += space;
        });

        // Draw the mark to Heating time
        ctx.fillStyle = graphInfo.heatingColor;
        ctx.fillRect(0, beginH + 5, markSize, space - 5);
        ctx.stroke();

        // Draw the mark's description
        ctx.font = graphInfo.legendItemFont;
        ctx.fillStyle = graphInfo.axisLabelColor;
        ctx.textAlign = 'left';
        ctx.fillText(graphInfo.heatingTitle, markSize + 10, beginH + 18);

        beginH += space;

        return {
            width: cnv.width,
            height: beginH,
            image: ctx.getImageData(0, 0, 200, beginH),
        };
    };
    /**
     * Draw the graphic
     */
    const draw = () => {
        // Adjust element
        graphInfo.canvas.width = graphInfo.width;
        graphInfo.canvas.height = graphInfo.height;

        let ctx = graphInfo.context;

        // Draw the header
        let header = drawHeader();
        ctx.putImageData(header.image, 0, 0);

        // Draw the legend
        let legend = drawLegend();
        ctx.putImageData(legend.image, 50, 400);

        // Draw the data
        let data = drawData(header.dataW - 15, header.dataH - 12);
        ctx.putImageData(data.image, header.dataX, header.dataY + 10);
    };

    return {
        setContext,
        addStep,
        draw,
        graphInfo
    };
}
