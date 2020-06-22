export default function brewGraph(graphConf) {
    if (!graphConf) graphConf = {};

    const graphInfo = {
        width: graphConf.width || 600,
        height: graphConf.height || 600,
        backgroundColor: 'rgba(255,255,255,0)',
        axisLineColor: 'black',
        title: 'Mash Graph',
        titleColor: 'blue',
        titleFont: 'bold 20px Arial',
        axisXLabel: 'Tempo (t)',
        axisYLabel: 'Temperatura (c)',
        axisLabelColor: 'black',
        axisLabelFont: 'italic 16px Arial',
        legendTitle: 'Legenda:',
        legendFont: 'bold 16px Arial',
        legendItemFont: '14px Arial',
        steps: [
            {
                step: 'Liberação Enzimática',
                temperature: 55,
                time: 30,
                timeToAchieve: 10,
                color: 'rgba(0,200,0,1)',
                colorAlpha: 'rgba(0,200,0,5)',
            },
            {
                step: 'Liberação Proteica',
                temperature: 68,
                time: 30,
                timeToAchieve: 10,
                color: 'rgba(200,0,0,1)',
                colorAlpha: 'rgba(200,0,0,5)',
            },
            {
                step: 'Mash-out',
                temperature: 87,
                time: 15,
                timeToAchieve: 10,
                color: 'rgba(0,0,200,1)',
                colorAlpha: 'rgba(0,0,200,5)',
            },
        ],
        context: null,
        canvas: null,
    };

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
        ctx.fillText(graphInfo.axisXLabel, w / 2, h - borderY / 2);

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

        console.log(getTotalTime());
        console.log(w);
        console.log(h);
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
        drawData(header.dataW, header.dataH);
    };

    return {
        setContext,
        addStep,
        draw,
    };
}
