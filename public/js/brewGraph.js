export default function brewGraph(params) {
    if (!params) params = {};
    if (!params.theme) params.theme = {};
    if (!params.plan) params.plan = {};

    // prettier-ignore
    const pictures = {
        hop : new Image(),
        grain : new Image(),
        water : new Image(),
        spice : new Image(),
    }
    pictures.hop.src =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAZCAYAAAA14t7uAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAUUSURBVEhLnZQNaJVlFMfPee69m865pKWtljlFKcYU/GhmFto0tQxJy+8PUvEj0IooC4wummUhlkMqomWFRpRiRFnpLBWkaWnDwrn8qFl+zNSJTcfcve9z+r33XrSpYXTg5X2e8/E//3Oe8zzyf2RQfFB0yrL72mW2VxXN/P+L6Oy3+0YDl9/eEsnnI2LVXlyRmA2MumBuYJGRuCQKT3xTsWiR+Egm6Joy842yXupzJpsPxjjT4ahKVHUa1DqbuAZAl6PLPVLUb3XN2hq7JnA8HnfdJmqpE7fem3RxIt1RnzKRZlW5zrzuF3G1otZI+W2ym5purN5Qt/1fWzH2k7GR3FMNXZxPghnZpqI3i0kFDPeb+T5i2gDwaVMdI+YvwHgfFUymNS+2TWa9dFXGIctmVzuOkserumGoCgHZY87eVa9PqdMhAB3h6wHTW8Xpb+JkvXk5gV/PlojvelXgHuMjTxD0Ogw3wWAvgU1m0hnTL+inmtphJ/qxmf1AJVF87jHR7k7lDPZHRGw3LWstM1YOpWRdjLMLewiTcvo1l01/zjoCwwo1oafyKPYk3wSqylcvHUiex0d33K5WwNPL7+4ozpcS1D7cwyxPVLNSa7MmdZKH8jF6+aA3K2IaCgA6CtZ2/DaTkET2owS6rxWwRrNmkC7JiZ8jOEu8YbeAfT3M3mTU6LlEU76ie536nSyrWENABpP0JL7XmwumtgKm3BI1Wwi7JTBJAH6AoHJMa+hh4NR1SnsCrLITkEr+9FR6qViBqe/PucTwXePml4/ITruG5cqhsJfO5DYCniRwGEnm0eOnsQ5nX8O+FsdVXmQHIVNZ/5pqh+lBdZEN6FZGTKKRklGdJ/UZ2a209+ieBzTRQjKdyFfgnOyC11xYx8KkgCfU2XLKLcQ+EIYzWAfi3E5YktPa8JUAsCOmrsq5ZJRboktcy/ktBISn/h1sC5lJuiLMalpYcy9caXhwJLmFmLD/nIN/CP/70d+JPi9L3brTWzqcdhWPV9aRrorYvrh+xKXYKl6+R9ePQNjYn2CudBKZBe+fMknOYN8Eu2/Z5oY6rnsNXL5skeTLxcXF6bei7wPdsql1NMs24ekCtJGx+YNbthHdIQD7o3uGGuqc13WMYRUM82lAI7fwL+/tIJfjJFVMIOHSFQveT48bDahGwXlkRGWKVztG2ldozxJKLeNri+Fh77QroK/iNZYEd8H/dmwjLEXM3mvsmP95CJECjnh3gsOoD9ehkDnLWWQBjH4ONxl1uLhBxV+gFc1Mx1m1sM/SgS+btqxPWLB47bi1QeibAo4lImfFp/oF8bRQegGYZwBJsL6AIgRrwfIVX9w5twzGnzJmHxI0zwe2NMcFvHJpuchmzltDeyS97UmXTCiAPIcvcO/PMw7tKDXpvKsNnAxwas+FUxFOCn1vBMYTcISpGb5q/uZjYfxF4FBmvTlkKG/AawT1JOY4hW7yXidxMKlZJjgss5Kww7AsJnoAOszytcSCORWzt10cz1bAiM58p6yTT+gdvBhRF5UVqLpkbJck1RLZzbuyOmSazAkqP5i+rTltTEuqx/8Qs4Tci/IzJmUhl2RD2OyM7ZKED5TqAFg96+j/5aChXPHQj+o3raYxt46HXbdGYzkrvG+h7dxEUWadVKY8TlaP/Sj1hm/A4N6jimqrv6j7PQORkstbcYXE4+LqC8puSph24vY5L4HnGjckzJ0L7VEf49FLxji042wz1Yn8DfNYRPv/gEa7AAAAAElFTkSuQmCC';
    pictures.grain.src =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAZCAYAAADuWXTMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAPGSURBVDhPdVN9aNVlFD7nvPdjTm+52+bKVY6McC5Jm2YSJSttBhb90T60ZRgJCbmMpKg/FuufcII1gwZ9sPJj7Ms+qMAokhH+UxpirpZmLWhmmxurlpv3/t5zeu71x60b7oHLfX/v+zznPOe852X6D3p6ap399v0OVaKGiZO7uIWwmhkS/l/CyECJKW/Cas0bVFVwaXNm5InNU5KZioUlXr4wnefqcuDu125eJeoSUyk7XhjXpFc5jDCDc5O8fnKSZgcpvUUtfXrD0z8MhZocxJSWm2lPPKp9gUYSZDYmxj9PTASVwUX9EJSuCMcWhvw8wCEdNaY0s9zJFDxrQh8R24+m0sUit8PFT9Oa/i7k50H4vB4jozfN7C9iqQG5xBstZ+LrMy6MqJWokDp3LpuPdV4fxIqlikQ+wPoJCD8X4q+c2ACz7Qe5CR2tirngsIsF23p7avMaLBbwRlL/BbJvR3ZYFvbE5d54HzE/jJJ2wEGc4vROXV2vD3VZiKX1VTP+BZoVyPqKqS5wxkeEaSsC1uB31owerdv67Snw821PlxQPc4Qa1NtuHJ2C1YY06SQECXx3i6NnUH9lz54lB7v3LF4R6rKQWX+ON2II30bXS5TkuYjII45orZKdge029fw4ut+GksqirGdCXRZwql/DdhEcNZJpp1e/DqK0MEpX24Lsa3B2kZX3Bj5WcXD3rdeEWpL6bQMnQKpHU95DfXNw3y/AcozJvoTwflY6gltoRk/uMrIuz7401OYawPvabkzEaM4y8goS6o3ZxwiaFHFDFFg79m5DkM8uXJl8cPPm/umMyCELL0ou2RK16FtEutrERmH5qHmrRcx1GN9rIXoA3LPK8nx0amrlQ/eV+r5Dv4+AR5Ys4gNq1AlyBZtsR7PaYVNx5y04vpuNRki0BQ/hSQzP60h4UyZzdmJqNp34W8p8K2puRJb9qOUctlehD6UI8G7a2T0Iim1ei/0Y9rPDkhu3+LlIGSb9DhDGcNiOKdtobFfgxd3rglghbuQxuCxAl8YRZjCjyYmnTSbRoPXI3MTMOx3ZAYF/pPvVuQCNtqqQ+um8pcnsfefE9U8dHzXmZmQewj0XYKoqkOUlZOzEei6YHrX2ORdprq7uDzIaDNO/qFy56HRR9MIhdiCbYRh4NhpW5B29z2rfpHjWrg1Nx0ZCeu6e89Dx4oKCxFWJch/IfIzmMJ7P1RbQDXLdyb11dZR7WZcV/x8dHasLCv8YbwV5MBUJPikbnTdc3dIf5D3umZCZqJSmX/ZkS13a9Z4vGltMRPQPhd+jxvRHghMAAAAASUVORK5CYII=';
    pictures.water.src =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAZCAYAAAABmx/yAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAJnSURBVDhPjZNPaBNREMbnvc2+Tdo0pmIajEWqVEylVSJCQQWpWIiKipqChWLxEhD04FmqeBek4KW02oNUpAdBD730IAWRHCJS06L0oqglMTX4J22SbjLv+XbziI1N2/xg2Zlv9tudmd2FrQgPL3jOjCY6VFqBqnNNBsc/OQnLP3ASuKykChsahRBkqfDnOnIYkEdSyRU2NJ4fmzta4nBHhkwjwMrqP2oaoy8XG0wTH8rQa+UFxBbrvJZ1xuhIXP/6LXNPABxSEiBS+wZrWWdMacZxDuImACFKkmCwb3JSU4lNlfHsxPvmwireFwIMJdkIoLuL3zurnlplFFk6IJdZaXENe7hutqvYpmKMPFrwlRCHZINVLSlcRSRRFdvYxhN3XzmW87nbMvRZeS1KIPovjSaOqbRs9LR62gQh/bayAQSIK2fyofDwlD2/bUR0XJXrX/eu/geFOMW1QI8Vk76R+LZsic3LW+7icp1bQQR/o+vYS3PcCHlcdIfPravS5siRDprIOihy0dXhb2S6/CDrg7gpEWE5o2jvCjQSjdZrlAhxkRpM2xvwGtBk1Hp9tZFd6rSIPMm5gLbtTiVvDdO0FJWP/TCfXIHeYLNcbL2QKUoJicU+Z/P+JgahVrcqbIbIIBSnaYCY8XTWnHk++wP6j/ihgW0+q4PCs+5U6KPd3bnRuXZEPnXlcMs+S3j6Nm0twCpVoYGIMVOcfnEr9KsyVmRsdv+yCY8P7Gzo/rmC2uLvVVWxKci/ZrqlUbvxZLDziyVU7ePC+DsvKTlOrqKIYBGDssx1piUMB53I0PTrmWs9hfKVAH8BvIvTWuYOkWQAAAAASUVORK5CYII=';
    pictures.spice.src =
        'data:image/png;base64,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';

    /**
     * Default theme
     */
    const defaultTheme = {
        backgroundColor: params.theme.backgroundColor || 'rgba(255,255,255,0)',
        plotAreaBackgroundColor: params.theme.plotAreaBackgroundColor || 'rgba(255,255,255,0)',
        axisLineColor: params.theme.axisLineColor || 'black',
        titleColor: params.theme.titleColor || 'blue',
        titleFont: params.theme.titleFont || 'bold 20px Arial',
        axisLabelColor: params.theme.axisLabelColor || 'black',
        axisLabelFont: params.theme.axisLabelFont || 'italic 16px Arial',
        axisScaleFont: params.theme.axisScaleFont || 'italic 12px Arial',
        legendFont: params.theme.legendFont || 'bold 16px Arial',
        legendItemFont: params.theme.legendItemFont || '14px Arial',
        dataLabelFontL1: params.theme.dataLabelFontL1 || '18px Arial',
        dataLabelFontL2: params.theme.dataLabelFontL2 || '14px Arial',
        dataLabelFontL3: params.theme.dataLabelFontL3 || '12px Arial',
        heatingColor: params.theme.heatingColor || 'rgba(100,100,100,0.2)',
        mashColors: params.theme.mashColors || [
            {
                color: 'rgba(175,238,238,1)',
                colorAlpha: 'rgba(175,238,238,0.5)',
            },
            {
                color: 'rgba(127,255,212,1)',
                colorAlpha: 'rgba(127,255,212,0.5)',
            },
            {
                color: 'rgba(64,224,208,1)',
                colorAlpha: 'rgba(64,224,208,0.5)',
            },
            {
                color: 'rgba(20,224,208,1)',
                colorAlpha: 'rgba(20,224,208,0.5)',
            },
        ],
        boilingColorAlpha: params.theme.boilingColor || 'rgba(255,10,10,0.4)',
        boilingColor: params.theme.boilingColor || 'rgba(255,10,10,0.4)',
    };

    /**
     * Get all the input parameters
     */
    const info = {
        title: params.title || 'Mash Graph',
        axisXLabel: params.axisXLabel || 'Tempo (Δt)',
        axisYLabel: params.axisYLabel || 'Temperatura (d)',
        legendTitle: params.legendTitle || 'Legenda:',
        heatingTitle: params.heatingTitle || 'Mudança de rampa',
        initialTemperature: params.initialTemperature || 20,
        heatingReasonDPM_UP: params.heatingReasonDPM_UP || '2:1',
        heatingReasonDPM_DOWN: params.heatingReasonDPM_UP || '1:5',
        width: params.width || 800,
        height: params.height || 600,
        theme: defaultTheme,
        plan: {
            mash: null,
            boiling: null,
        },
        context: null,
        canvas: null,
    };

    /**
     * Set the canvas context
     */
    const setContext = (context) => {
        info.canvas = context;
        info.context = context.getContext('2d');
    };

    /**
     * Add a new individual step
     */
    const addMash = (MashInfo) => {
        if (!MashInfo) throw new BrewException('Mash info [mash] is mandatory. See the documentation');
        if (!MashInfo.ramps)
            throw new BrewException('Mash ramps [mash.ramps] info is mandatory. See the documentation');
        if (!typeof MashInfo.ramps == 'Array') throw new BrewException('Please inform Mash steps in an Array');

        MashInfo.ramps.forEach((MashStep) => {
            if (!MashStep.step) throw new BrewException('Mash step name [mash.ramps.step] is mandatory');
            if (!MashStep.time) throw new BrewException('Mash step time [time] is mandatory');
            if (!MashStep.temperature) throw new BrewException('Mash step temperature [temperature] is mandatory');

            if (MashStep.addGrain)
                if (!typeof MashStep.addGrain == 'boolean') BrewException('Mash flag grain is type boolean [addGrain]');
            if (MashStep.addWater)
                if (!typeof MashStep.addWater == 'boolean') BrewException('Mash flag water is type boolean [addWater]');
            if (MashStep.addSpice)
                if (!typeof MashStep.addSpice == 'boolean') BrewException('Mash flag spice is type boolean [addSpice]');
            if (MashStep.addHop)
                if (!typeof MashStep.addHop == 'boolean') BrewException('Mash flag hop is type boolean [addHop]');
        });

        info.plan.mash = MashInfo;
    };

    const addBoiling = (BoilingInfo) => {
        if (typeof BoilingInfo != 'undefined') {
            if (!BoilingInfo.step) BoilingInfo.step = 'Boiling';
            if (!BoilingInfo.time) throw new BrewException('Boiling time [boiling.time] is mandatory');
            if (!BoilingInfo.temperature) BoilingInfo.temperature = 100;

            if (BoilingInfo.addGrain)
                if (!typeof BoilingInfo.addGrain == 'boolean')
                    BrewException('Boiling flag grain is type boolean [boiling.addGrain]');
            if (BoilingInfo.addWater)
                if (!typeof BoilingInfo.addWater == 'boolean')
                    BrewException('Boiling flag water is type boolean [boiling.addWater]');
            if (BoilingInfo.addSpice)
                if (!typeof BoilingInfo.addSpice == 'boolean')
                    BrewException('Boiling flag spice is type boolean [boiling.addSpice]');
            if (BoilingInfo.addHop)
                if (!typeof BoilingInfo.addHop == 'boolean')
                    BrewException('Boiling flag hop is type boolean [boiling.addHop]');

            if (BoilingInfo.hopping) {
                if (!typeof BoilingInfo.hopping == 'Array')
                    throw new BrewException('Hopping schedule must be an array');

                BoilingInfo.hopping.forEach((hopInfo) => {
                    if (!hopInfo.hopName)
                        throw new BrewException(
                            'Hop name [boiling.hopping.hopName] is a mandatory in hopping specification'
                        );
                    if (!hopInfo.time)
                        throw new BrewException(
                            'Hop time [boiling.hopping.time] is a mandatory in hopping specification'
                        );
                    if (!hopInfo.type)
                        throw new BrewException(
                            'Hop type [boiling.hopping.type] is a mandatory in hopping specification'
                        );
                    if (!hopInfo.amountMg)
                        throw new BrewException(
                            'Hop amount [boiling.hopping.amountMg] is a mandatory in hopping specification'
                        );
                });
            }

            info.plan.boiling = BoilingInfo;
        }
    };

    // Add Mash Steps and Boiling
    if (!params.plan) throw new BrewException('A brewing plan [plan] is mandatory');
    addMash(params.plan.mash);
    addBoiling(params.plan.boiling);

    /**
     * Calculate heating time based on the heating reason
     */
    const calculateHeatingTime = (degrees) => {
        let d = info.heatingReasonDPM_UP.split(':')[0];
        let t = info.heatingReasonDPM_UP.split(':')[1];

        return degrees / (d / t);
    };

    /**
     * Get the Mash time of all steps
     */
    const getMashTime = () => {
        let totalTime = 0;
        let lastTemp = info.initialTemperature;

        if (!info.plan) throw new BrewException('A plan is mandatory');
        if (!info.plan.mash) throw new BrewException('No mash information informed');

        info.plan.mash.ramps.forEach((step) => {
            if (!step.time) throw new BrewException('time property is mandatory in all the steps');
            if (!step.temperature) throw new BrewException('temperature property is mandatory in all the steps');
            totalTime += calculateHeatingTime(step.temperature - lastTemp) + step.time;
            lastTemp = step.temperature;
        });

        return {
            totalTime: totalTime,
            lastTemperature: lastTemp,
        };
    };

    /**
     * Get the boiling time  of all steps
     */
    const getBoilingTime = (lastMashTemperature) => {
        let totalTime = 0;

        if (!info.plan) throw new BrewException('A plan is mandatory');
        if (!info.plan.boiling) return 0;

        totalTime = calculateHeatingTime(info.plan.boiling.temperature - lastMashTemperature) + info.plan.boiling.time;

        return totalTime;
    };

    /**
     * Get the boiling time  of all steps
     */
    const getPlanTime = () => {
        let totalTime = 0;
        let mashTime = getMashTime();

        totalTime += mashTime.totalTime;
        totalTime += getBoilingTime(mashTime.lastTemperature);

        return totalTime;
    };

    /**
     * Get the Color Scale
     */
    const getColorScale = () => {
        let colorScale = [];
        for (let i = 0; i < info.plan.mash.ramps.length; i++) {
            colorScale.push(info.theme.mashColors[i]);
        }
        colorScale.push({
            color: info.theme.boilingColor,
            colorAlpha: info.theme.boilingColorAlpha,
        });
        colorScale.push({
            color: info.theme.heatingColor,
            colorAlpha: info.theme.heatingColor,
        });

        return colorScale;
    };

    /**
     * Draw the frame
     */
    const drawFrame = () => {
        let w = info.width;
        let h = info.height;
        let cnv = document.createElement('canvas');
        cnv.width = w;
        cnv.height = h;
        let ctx = cnv.getContext('2d');
        let borderX = 50;
        let borderY = 50;
        let ac = info.theme.axisLineColor;

        ctx.fillStyle = info.theme.backgroundColor;
        ctx.fillRect(0, 0, w, h);

        ctx.font = info.theme.titleFont;
        ctx.fillStyle = info.theme.titleColor;
        ctx.textAlign = 'center';
        ctx.fillText(info.title, w / 2, borderY / 2);

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

        ctx.font = info.theme.axisLabelFont;
        ctx.fillStyle = info.theme.axisLabelColor;
        ctx.textAlign = 'center';
        ctx.fillText(info.axisXLabel + ` - ETB (Estimated Time to Brew)=${getPlanTime()}\'\'`, w / 2, h - borderY / 6);

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
        ctx.lineTo(borderX + w - borderX * 2 - 10, borderY + h - borderY * 2 - 5);
        ctx.lineTo(borderX + w - borderX * 2 - 10, borderY + h - borderY * 2 + 5);
        ctx.closePath();
        ctx.fillStyle = ac;
        ctx.fill();

        // Draw the Y axis label
        ctx.font = info.theme.axisLabelFont;
        ctx.fillStyle = info.theme.axisLabelColor;
        ctx.textAlign = 'center';
        ctx.save();
        ctx.translate(8, ctx.measureText(info.axisYLabel) / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText(info.axisYLabel, -(h / 2), borderX / 4);
        ctx.restore();

        // Draw X axis the scale
        let sW = borderX + w - borderX * 2 - borderX - 15;
        let sH = borderY + h - borderY * 2 - borderY - 12;
        for (let i = 0; i < 13; i++) {
            let y = (i * sH) / 12 + 12;
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.moveTo(borderX - 5, borderY + y);
            ctx.lineTo(borderX, borderY + y);
            ctx.closePath();
            ctx.stroke();

            // Draw the Y axis label
            ctx.font = info.theme.axisScaleFont;
            ctx.fillStyle = info.theme.axisLabelColor;
            ctx.textAlign = 'right';
            ctx.fillText(`${130 - (i + 1) * 10}°`, borderX - 10, borderY + y + 5);
        }

        // Draw Y axis the scale
        let timeUnit = (10 * sW) / (getPlanTime() + 5);
        let scale = parseInt(sW / timeUnit) + 1;
        let lastStep = borderX;
        for (let i = 0; i < scale; i++) {
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.moveTo(lastStep, borderY + sH + 12);
            ctx.lineTo(lastStep, borderY + sH + 17);
            ctx.closePath();
            ctx.stroke();

            // Draw the Y axis label
            ctx.font = info.theme.axisScaleFont;
            ctx.fillStyle = info.theme.axisLabelColor;
            ctx.textAlign = 'center';
            ctx.fillText(`${i * 10}\'\'`, lastStep, borderY + sH + 31);

            lastStep += timeUnit;
        }

        return {
            coordX: borderX + 1,
            coordY: borderY + 1,
            width: sW,
            height: sH,
            image: ctx.getImageData(0, 0, w, h),
        };
    };

    /**
     * Draw the data grid
     */
    const drawDataGrid = (ctx, data) => {
        // Draw X axis the scale
        for (let i = 0; i < 13; i++) {
            ctx.beginPath();
            ctx.lineWidth = 0.1;
            ctx.lineColor = 'grey';
            ctx.setLineDash([3, 3]);
            ctx.moveTo(0, (i * data.h) / 12 + 2);
            ctx.lineTo(data.w, (i * data.h) / 12 + 2);
            ctx.closePath();
            ctx.stroke();
        }

        // Draw Y axis the scale
        let timeUnit = (10 * data.w) / getPlanTime();
        let scale = parseInt(data.w / timeUnit);
        for (let i = 0; i < scale; i++) {
            ctx.beginPath();
            ctx.lineWidth = 0.1;
            ctx.lineColor = 'grey';
            ctx.setLineDash([3, 3]);
            ctx.moveTo((i + 1) * timeUnit, 0);
            ctx.lineTo((i + 1) * timeUnit, data.h);
            ctx.closePath();
            ctx.stroke();
        }
    };

    /**
     * Draw the Step Title (Mash / Boiling / etc)
     */
    const drawStepTitle = (ctx, title, x, data) => {
        ctx.font = info.theme.axisLabelFont;
        ctx.fillStyle = info.theme.axisLabelColor;
        ctx.textAlign = 'center';
        ctx.fillText(`${title}`, x * data.pw, 20);
    };

    /**
     * Draw a give title
     */
    const drawHeatingStep = (ctx, step, data) => {
        let timeToAchieve = calculateHeatingTime(step.temperature - data.lastTemp);

        ctx.beginPath();
        ctx.moveTo(data.lastTime * data.pw, data.h);
        ctx.lineTo((data.lastTime + timeToAchieve) * data.pw, data.h);
        ctx.lineTo((data.lastTime + timeToAchieve) * data.pw, data.h - step.temperature * data.ph);
        ctx.lineTo(data.lastTime * data.pw, data.h - data.lastTemp * data.ph);
        ctx.closePath();
        ctx.fillStyle = info.theme.heatingColor;
        ctx.fill();

        //check if has water
        if (step.addWater) {
            if (step.addWater == true) ctx.drawImage(pictures.water, (data.lastTime + 1) * data.pw, data.h - 30);
        }

        //Draw label
        ctx.font = info.theme.dataLabelFontL1;
        ctx.fillStyle = info.theme.axisLabelColor;
        ctx.textAlign = 'center';
        ctx.fillText(
            `+${step.temperature - data.lastTemp}°`,
            (data.lastTime + timeToAchieve) * data.pw - (timeToAchieve * data.pw) / 2,
            data.h - step.temperature * data.ph - 5
        );

        ctx.font = info.theme.dataLabelFontL2;
        ctx.fillStyle = info.theme.axisLabelColor;
        ctx.textAlign = 'center';
        ctx.fillText(
            `(${(step.temperature - data.lastTemp) / timeToAchieve}°:1\'\')`,
            (data.lastTime + timeToAchieve) * data.pw - (timeToAchieve * data.pw) / 2,
            data.h - step.temperature * data.ph + 13
        );

        ctx.font = info.theme.dataLabelFontL3;
        ctx.fillStyle = 'red';
        ctx.textAlign = 'center';
        ctx.fillText(
            `(${info.heatingReasonDPM_UP} Δt=˜${timeToAchieve}\'\')`,
            (data.lastTime + timeToAchieve) * data.pw - (timeToAchieve * data.pw) / 2,
            data.h - step.temperature * data.ph + 30
        );

        data.lastTime += timeToAchieve;

        return data;
    };

    /**
     * Draw the Mash Step
     */
    const drawBrewStep = (ctx, step, data) => {
        let colorScale = getColorScale();
        // Draw step
        ctx.beginPath();
        ctx.fillStyle = colorScale[data.mashStepCount].colorAlpha;
        ctx.moveTo(data.lastTime * data.pw, data.h);
        ctx.lineTo((data.lastTime + step.time) * data.pw, data.h);
        ctx.lineTo((data.lastTime + step.time) * data.pw, data.h - step.temperature * data.ph);
        ctx.lineTo(data.lastTime * data.pw, data.h - step.temperature * data.ph);
        ctx.closePath();
        ctx.fill();

        //check if has grain
        let yItemCount = 1;
        if (step.addGrain) {
            if (step.addGrain == true) {
                ctx.drawImage(pictures.grain, data.lastTime * data.pw + 10, data.h - yItemCount * 30);
                yItemCount++;
            }
        }

        //check if has hop
        if (step.addHop) {
            if (step.addHop == true) {
                ctx.drawImage(pictures.hop, data.lastTime * data.pw + 5, data.h - yItemCount * 30);
                yItemCount++;
            }
        }

        //check if has spice
        if (step.addSpice) {
            if (step.addSpice == true) {
                ctx.drawImage(pictures.spice, data.lastTime * data.pw + 5, data.h - yItemCount * 30);
            }
        }

        //Draw label
        ctx.font = info.theme.dataLabelFontL1;
        ctx.fillStyle = info.theme.axisLabelColor;
        ctx.textAlign = 'center';
        ctx.fillText(
            step.temperature + '°',
            (data.lastTime + step.time) * data.pw - (step.time * data.pw) / 2,
            data.h - step.temperature * data.ph - 20
        );

        ctx.font = info.theme.dataLabelFontL2;
        ctx.fillStyle = 'green';
        ctx.textAlign = 'center';
        ctx.fillText(
            `(Δt=${step.time}\'')`,
            (data.lastTime + step.time) * data.pw - (step.time * data.pw) / 2,
            data.h - step.temperature * data.ph - 5
        );

        data.lastTemp = step.temperature;
        data.lastTime += step.time;
        data.mashStepCount++;

        return data;
    };

    /**
     * Draw splitter line between the steps
     */
    const drawSplitterLine = (ctx, time, data) => {
        // Draw the Line
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.lineColor = info.theme.axisLineColor;
        ctx.moveTo(time * data.pw, data.h);
        ctx.lineTo(time * data.pw, 0);
        ctx.setLineDash([3, 3]);
        ctx.closePath();
        ctx.stroke();
    };

    /**
     * Draw the Hop Schedule
     */
    const drawHopSchedule = (ctx, data) => {
        // Draw the hopping schedule

        if (info.plan.boiling.hopping) {
            let hopData = info.plan.boiling.hopping;
            let timeToBoil = getMashTime().totalTime;
            let stepY = 100;
            timeToBoil += calculateHeatingTime(
                info.plan.boiling.temperature - info.plan.mash.ramps[info.plan.mash.ramps.length - 1].temperature
            );

            hopData.forEach((hopInfo) => {
                ctx.drawImage(pictures.hop, (timeToBoil + hopInfo.time) * data.pw, stepY);

                ctx.font = info.theme.dataLabelFontL2;
                ctx.fillStyle = info.theme.axisLabelColor;
                ctx.textAlign = 'center';
                ctx.fillText(`${hopInfo.hopName}`, (timeToBoil + hopInfo.time) * data.pw + 10, stepY - 3);
                ctx.fillText(
                    `${hopInfo.time}\'\' - ${hopInfo.amountMg}mg`,
                    (timeToBoil + hopInfo.time) * data.pw + 10,
                    stepY + 40
                );

                // Draw the Line
                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.lineColor = 'green';
                ctx.setLineDash([5, 5]);
                ctx.moveTo((timeToBoil + hopInfo.time) * data.pw + 10, stepY + 60);
                ctx.lineTo((timeToBoil + hopInfo.time) * data.pw + 10, data.h);
                ctx.closePath();
                ctx.stroke();

                stepY += 70;
            });
        }
    };
    /**
     * draw the Graph
     */
    const drawData = (w, h) => {
        let cnv = document.createElement('canvas');
        let ctx = cnv.getContext('2d');
        cnv.width = info.width;
        cnv.height = info.height;

        let data = {
            w: w,
            h: h,
            pw: w / (getPlanTime() + 5),
            ph: h / 120,
            lastTime: 0,
            lastTemp: info.initialTemperature,
            mashStepCount: 0,
        };

        ctx.fillStyle = info.theme.plotAreaBackgroundColor;
        ctx.fillRect(0, 0, info.width, info.height);

        drawDataGrid(ctx, data); // Draw the data grid
        drawStepTitle(ctx, 'Mash', getMashTime().totalTime / 2, data); //Draw the Mash title

        // Draw the Mash Steps
        info.plan.mash.ramps.forEach((step) => {
            data = drawHeatingStep(ctx, step, data);
            data = drawBrewStep(ctx, step, data);
        });

        // *************
        //Start the boiling areas
        if (info.plan.boiling) {
            // Draw the Line
            drawSplitterLine(ctx, data.lastTime, data);
            data = drawHeatingStep(ctx, info.plan.boiling, data);
            //Draw the Boiling title
            drawStepTitle(
                ctx,
                info.plan.boiling.step,
                getMashTime().totalTime + getBoilingTime(data.lastTemp) / 2,
                data
            );

            data = drawBrewStep(ctx, info.plan.boiling, data);
            drawHopSchedule(ctx, data);
            drawSplitterLine(ctx, getPlanTime(), data);
        }

        return {
            image: ctx.getImageData(0, 0, data.w, data.h),
        };
    };

    /**
     * Draw Legend Item
     */
    const drawLegendItem = (ctx, element, data) => {
        let colorScale = getColorScale();

        ctx.fillStyle = colorScale[data.mashStepCount].color;
        ctx.fillRect(15, data.beginH + 5, data.markSize, data.space - 5);
        ctx.stroke();

        // Draw the mark's description
        ctx.font = info.theme.legendItemFont;
        ctx.fillStyle = info.theme.axisLabelColor;
        ctx.textAlign = 'left';
        ctx.fillText(element.step, data.markSize + 25, data.beginH + 18);

        data.beginH += data.space;
        data.mashStepCount++;

        return data;
    };

    /**
     * Draw the legend icon
     */
    const drawLegendIcon = (ctx, data, icon, title) => {
        ctx.drawImage(icon, 22, data.beginH + 5);
        ctx.fillText(title, data.markSize + 25, data.beginH + 22);
        data.beginH += data.space + 5;

        return data;
    };

    /**
     * Draw the Legend
     */
    const drawLegend = () => {
        let cnv = document.createElement('canvas');
        let ctx = cnv.getContext('2d');
        cnv.width = info.width;
        cnv.height = info.height;

        ctx = cnv.getContext('2d');
        ctx.fillStyle = info.theme.backgroundColor;
        ctx.fillRect(0, 0, info.width, info.height);

        let data = {
            space: 20,
            beginH: 30,
            markSize: 30,
            mashStepCount: 0,
        };

        ctx.fillStyle = 'rgba(200,200,200,1)';
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'grey';
        ctx.fillRect(5, 5, 250, data.beginH + (info.plan.length + 1) * data.space + 10);
        ctx.shadowBlur = 0;

        ctx.font = info.theme.legendFont;
        ctx.fillStyle = info.theme.axisLabelColor;
        ctx.textAlign = 'left';
        ctx.fillText(info.legendTitle, 15, 25);

        // Draw the mark
        info.plan.mash.ramps.forEach((element) => {
            data = drawLegendItem(ctx, element, data);
        });

        data = drawLegendItem(ctx, info.plan.boiling, data);
        data = drawLegendItem(
            ctx,
            {
                step: info.heatingTitle,
            },
            data
        );

        // Draw the icons
        data = drawLegendIcon(ctx, data, pictures.grain, `Grain`);
        data = drawLegendIcon(ctx, data, pictures.water, `Water`);
        data = drawLegendIcon(ctx, data, pictures.hop, `Hop`);
        data = drawLegendIcon(ctx, data, pictures.spice, `Spice`);

        return {
            width: cnv.width,
            height: data.beginH,
            image: ctx.getImageData(0, 0, 265, data.beginH + (info.plan.mash.ramps.length + 1) * data.space + 10),
        };
    };

    /**
     * Draw the graphic
     */
    const draw = () => {
        // Adjust element
        let frame = drawFrame();
        let legend = drawLegend();
        let plan = drawData(frame.width, frame.height);

        info.canvas.width = info.width;
        info.canvas.height = info.height + legend.height + 50;

        let ctx = info.context;
        ctx.fillStyle = info.theme.backgroundColor;
        ctx.fillRect(0, 0, info.width, info.height + legend.height + 50);

        // Draw the header
        ctx.putImageData(frame.image, 0, 0);

        // Draw the legend
        ctx.putImageData(legend.image, 50, info.height);

        // Draw the data
        ctx.putImageData(plan.image, frame.coordX, frame.coordY + 10);
    };

    return {
        plan: {
            addMash,
        },
        execution: {
            getMashTime,
            getBoilingTime,
            getPlanTime,
        },
        setContext,
        draw,
        info,
    };
}

/**
 * Exception
 */
function BrewException(message) {
    alert(message);
    this.message = message;
    this.name = 'BrewException';
}
