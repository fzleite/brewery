export default function brewGraph(params) {
	if (!params) params = {};
	if (!params.theme) params.theme = {};
	if (!params.plan) params.plan = {};

	let plan = {};
	let dimensions = {};
	let info = {};
	let actual = [];

	// prettier-ignore
	const pictures = {
        hop : new Image(),
        grain : new Image(),
        water : new Image(),
        spice : new Image(),
	}

	// https://www.base64-image.de/
	pictures.hop.src =
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAZCAYAAAA14t7uAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAUUSURBVEhLnZQNaJVlFMfPee69m865pKWtljlFKcYU/GhmFto0tQxJy+8PUvEj0IooC4wummUhlkMqomWFRpRiRFnpLBWkaWnDwrn8qFl+zNSJTcfcve9z+r33XrSpYXTg5X2e8/E//3Oe8zzyf2RQfFB0yrL72mW2VxXN/P+L6Oy3+0YDl9/eEsnnI2LVXlyRmA2MumBuYJGRuCQKT3xTsWiR+Egm6Joy842yXupzJpsPxjjT4ahKVHUa1DqbuAZAl6PLPVLUb3XN2hq7JnA8HnfdJmqpE7fem3RxIt1RnzKRZlW5zrzuF3G1otZI+W2ym5purN5Qt/1fWzH2k7GR3FMNXZxPghnZpqI3i0kFDPeb+T5i2gDwaVMdI+YvwHgfFUymNS+2TWa9dFXGIctmVzuOkserumGoCgHZY87eVa9PqdMhAB3h6wHTW8Xpb+JkvXk5gV/PlojvelXgHuMjTxD0Ogw3wWAvgU1m0hnTL+inmtphJ/qxmf1AJVF87jHR7k7lDPZHRGw3LWstM1YOpWRdjLMLewiTcvo1l01/zjoCwwo1oafyKPYk3wSqylcvHUiex0d33K5WwNPL7+4ozpcS1D7cwyxPVLNSa7MmdZKH8jF6+aA3K2IaCgA6CtZ2/DaTkET2owS6rxWwRrNmkC7JiZ8jOEu8YbeAfT3M3mTU6LlEU76ie536nSyrWENABpP0JL7XmwumtgKm3BI1Wwi7JTBJAH6AoHJMa+hh4NR1SnsCrLITkEr+9FR6qViBqe/PucTwXePml4/ITruG5cqhsJfO5DYCniRwGEnm0eOnsQ5nX8O+FsdVXmQHIVNZ/5pqh+lBdZEN6FZGTKKRklGdJ/UZ2a209+ieBzTRQjKdyFfgnOyC11xYx8KkgCfU2XLKLcQ+EIYzWAfi3E5YktPa8JUAsCOmrsq5ZJRboktcy/ktBISn/h1sC5lJuiLMalpYcy9caXhwJLmFmLD/nIN/CP/70d+JPi9L3brTWzqcdhWPV9aRrorYvrh+xKXYKl6+R9ePQNjYn2CudBKZBe+fMknOYN8Eu2/Z5oY6rnsNXL5skeTLxcXF6bei7wPdsql1NMs24ekCtJGx+YNbthHdIQD7o3uGGuqc13WMYRUM82lAI7fwL+/tIJfjJFVMIOHSFQveT48bDahGwXlkRGWKVztG2ldozxJKLeNri+Fh77QroK/iNZYEd8H/dmwjLEXM3mvsmP95CJECjnh3gsOoD9ehkDnLWWQBjH4ONxl1uLhBxV+gFc1Mx1m1sM/SgS+btqxPWLB47bi1QeibAo4lImfFp/oF8bRQegGYZwBJsL6AIgRrwfIVX9w5twzGnzJmHxI0zwe2NMcFvHJpuchmzltDeyS97UmXTCiAPIcvcO/PMw7tKDXpvKsNnAxwas+FUxFOCn1vBMYTcISpGb5q/uZjYfxF4FBmvTlkKG/AawT1JOY4hW7yXidxMKlZJjgss5Kww7AsJnoAOszytcSCORWzt10cz1bAiM58p6yTT+gdvBhRF5UVqLpkbJck1RLZzbuyOmSazAkqP5i+rTltTEuqx/8Qs4Tci/IzJmUhl2RD2OyM7ZKED5TqAFg96+j/5aChXPHQj+o3raYxt46HXbdGYzkrvG+h7dxEUWadVKY8TlaP/Sj1hm/A4N6jimqrv6j7PQORkstbcYXE4+LqC8puSph24vY5L4HnGjckzJ0L7VEf49FLxji042wz1Yn8DfNYRPv/gEa7AAAAAElFTkSuQmCC';
	pictures.grain.src =
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAZCAYAAADuWXTMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAPGSURBVDhPdVN9aNVlFD7nvPdjTm+52+bKVY6McC5Jm2YSJSttBhb90T60ZRgJCbmMpKg/FuufcII1gwZ9sPJj7Ms+qMAokhH+UxpirpZmLWhmmxurlpv3/t5zeu71x60b7oHLfX/v+zznPOe852X6D3p6ap399v0OVaKGiZO7uIWwmhkS/l/CyECJKW/Cas0bVFVwaXNm5InNU5KZioUlXr4wnefqcuDu125eJeoSUyk7XhjXpFc5jDCDc5O8fnKSZgcpvUUtfXrD0z8MhZocxJSWm2lPPKp9gUYSZDYmxj9PTASVwUX9EJSuCMcWhvw8wCEdNaY0s9zJFDxrQh8R24+m0sUit8PFT9Oa/i7k50H4vB4jozfN7C9iqQG5xBstZ+LrMy6MqJWokDp3LpuPdV4fxIqlikQ+wPoJCD8X4q+c2ACz7Qe5CR2tirngsIsF23p7avMaLBbwRlL/BbJvR3ZYFvbE5d54HzE/jJJ2wEGc4vROXV2vD3VZiKX1VTP+BZoVyPqKqS5wxkeEaSsC1uB31owerdv67Snw821PlxQPc4Qa1NtuHJ2C1YY06SQECXx3i6NnUH9lz54lB7v3LF4R6rKQWX+ON2II30bXS5TkuYjII45orZKdge029fw4ut+GksqirGdCXRZwql/DdhEcNZJpp1e/DqK0MEpX24Lsa3B2kZX3Bj5WcXD3rdeEWpL6bQMnQKpHU95DfXNw3y/AcozJvoTwflY6gltoRk/uMrIuz7401OYawPvabkzEaM4y8goS6o3ZxwiaFHFDFFg79m5DkM8uXJl8cPPm/umMyCELL0ou2RK16FtEutrERmH5qHmrRcx1GN9rIXoA3LPK8nx0amrlQ/eV+r5Dv4+AR5Ys4gNq1AlyBZtsR7PaYVNx5y04vpuNRki0BQ/hSQzP60h4UyZzdmJqNp34W8p8K2puRJb9qOUctlehD6UI8G7a2T0Iim1ei/0Y9rPDkhu3+LlIGSb9DhDGcNiOKdtobFfgxd3rglghbuQxuCxAl8YRZjCjyYmnTSbRoPXI3MTMOx3ZAYF/pPvVuQCNtqqQ+um8pcnsfefE9U8dHzXmZmQewj0XYKoqkOUlZOzEei6YHrX2ORdprq7uDzIaDNO/qFy56HRR9MIhdiCbYRh4NhpW5B29z2rfpHjWrg1Nx0ZCeu6e89Dx4oKCxFWJch/IfIzmMJ7P1RbQDXLdyb11dZR7WZcV/x8dHasLCv8YbwV5MBUJPikbnTdc3dIf5D3umZCZqJSmX/ZkS13a9Z4vGltMRPQPhd+jxvRHghMAAAAASUVORK5CYII=';
	pictures.water.src =
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAZCAYAAAABmx/yAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAJnSURBVDhPjZNPaBNREMbnvc2+Tdo0pmIajEWqVEylVSJCQQWpWIiKipqChWLxEhD04FmqeBek4KW02oNUpAdBD730IAWRHCJS06L0oqglMTX4J22SbjLv+XbziI1N2/xg2Zlv9tudmd2FrQgPL3jOjCY6VFqBqnNNBsc/OQnLP3ASuKykChsahRBkqfDnOnIYkEdSyRU2NJ4fmzta4nBHhkwjwMrqP2oaoy8XG0wTH8rQa+UFxBbrvJZ1xuhIXP/6LXNPABxSEiBS+wZrWWdMacZxDuImACFKkmCwb3JSU4lNlfHsxPvmwireFwIMJdkIoLuL3zurnlplFFk6IJdZaXENe7hutqvYpmKMPFrwlRCHZINVLSlcRSRRFdvYxhN3XzmW87nbMvRZeS1KIPovjSaOqbRs9LR62gQh/bayAQSIK2fyofDwlD2/bUR0XJXrX/eu/geFOMW1QI8Vk76R+LZsic3LW+7icp1bQQR/o+vYS3PcCHlcdIfPravS5siRDprIOihy0dXhb2S6/CDrg7gpEWE5o2jvCjQSjdZrlAhxkRpM2xvwGtBk1Hp9tZFd6rSIPMm5gLbtTiVvDdO0FJWP/TCfXIHeYLNcbL2QKUoJicU+Z/P+JgahVrcqbIbIIBSnaYCY8XTWnHk++wP6j/ihgW0+q4PCs+5U6KPd3bnRuXZEPnXlcMs+S3j6Nm0twCpVoYGIMVOcfnEr9KsyVmRsdv+yCY8P7Gzo/rmC2uLvVVWxKci/ZrqlUbvxZLDziyVU7ePC+DsvKTlOrqKIYBGDssx1piUMB53I0PTrmWs9hfKVAH8BvIvTWuYOkWQAAAAASUVORK5CYII=';
	pictures.spice.src =
		'data:image/png;base64,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';

	/**
	 * Set the canvas context
	 */
	let mouseCoords = {
		x: 0,
		y: 0,
		idStep: null,
		overActual: false,
		actualTemp: 0,
		actualTime: 0,
		intersectionX: 0,
		intersectionY: 0,
	};

	/**
	 * Set the canvas object
	 */
	const setContext = (canvas) => {
		info.canvas = canvas;
		info.context = canvas.getContext('2d');

		canvas.addEventListener('mousemove', (event) => {
			let isStepOver = false;

			mouseCoords.x = event.clientX;
			mouseCoords.y = event.clientY;
			mouseCoords.overActual = false;

			if (isMouseOverActualLine(mouseCoords)) {
				mouseCoords.overActual = true;
				mouseCoords.idStep = null;
				draw();
			} else if (hoverBrewStep(mouseCoords, dimensions.data.coords)) {
				mouseCoords.idStep = null;

				plan.allSteps.forEach((step) => {
					isStepOver = hoverBrewStep(mouseCoords, step.coords.polygon);
					if (isStepOver) {
						if (mouseCoords.idStep != step.sequence) {
							mouseCoords.idStep = step;
							return;
						}
					}
				});
				draw();
			} else {
				mouseCoords.idStep = null;
				draw();
			}
		});
	};

	/**
	 * Set the actual data fron server
	 */
	const setActual = (actualData) => {
		if (!actualData) throw new BrewException('Actual data is nandatory');
		if (!actualData.actual) throw new BrewException('actual property [actual] is nandatory');
		if (Object.prototype.toString.call(actualData.actual) != '[object Array]') throw new BrewException('Actual data must be an Array');

		actualData.actual.forEach((measure) => {
			if (!measure.timeMinute) throw new BrewException('A time minute [actual.timeMinute] is mandatory');
			if (!measure.origin) throw new BrewException('A origin [actual.origin] is mandatory');
			if (!measure.step) throw new BrewException('A step name [actual.step] is mandatory');
			if (!measure.sensor1) throw new BrewException('A temperature measure for sensor1 [actual.sensor1] is mandatory');

			let x = dimensions.graph.borderX + (measure.timeMinute - 1) * dimensions.data.pw;
			let y = dimensions.data.h - measure.sensor1 * dimensions.data.ph + dimensions.graph.borderY + 12;

			actual.push({
				timeMinute: measure.timeMinute,
				time: measure.time ? measure.time : '',
				origin: measure.origin,
				step: measure.step,
				sensor1: measure.sensor1,
				sensor2: measure.sensor2 ? measure.sensor2 : null,
				sensor3: measure.sensor3 ? measure.sensor3 : null,
				sensor4: measure.sensor4 ? measure.sensor4 : null,
				sensor5: measure.sensor5 ? measure.sensor5 : null,
				coords: {
					x: x,
					y: y,
				},
			});

			// Recalculate the Heating reason
			// if( )
		});
	};

	/**
	 * Add a actual data fron server
	 */
	const addActual = (measure) => {
		if (!measure) throw new BrewException('Actual data is nandatory');

		if (!measure.timeMinute) throw new BrewException('A time minute [actual.timeMinute] is mandatory');
		if (!measure.origin) throw new BrewException('A origin [actual.origin] is mandatory');
		if (!measure.step) throw new BrewException('A step name [actual.step] is mandatory');
		if (!measure.sensor1) throw new BrewException('A temperature measure for sensor1 [actual.sensor1] is mandatory');

		let x = dimensions.graph.borderX + (measure.timeMinute - 1) * dimensions.data.pw;
		let y = dimensions.data.h - measure.sensor1 * dimensions.data.ph + dimensions.graph.borderY + 12;

		actual.push({
			timeMinute: measure.timeMinute,
			time: measure.time ? measure.time : '',
			origin: measure.origin,
			step: measure.step,
			sensor1: measure.sensor1,
			sensor2: measure.sensor2 ? measure.sensor2 : null,
			sensor3: measure.sensor3 ? measure.sensor3 : null,
			sensor4: measure.sensor4 ? measure.sensor4 : null,
			sensor5: measure.sensor5 ? measure.sensor5 : null,
			coords: {
				x: x,
				y: y,
			},
		});

		draw();
	};

	/**
	 * Init the Graph
	 */
	const initPlan = (params) => {
		// Define the dimension object
		const borderX = 50;
		const borderY = 50;
		const degreesScale = 120;

		// Add Mash Steps and Boiling
		if (!params.plan) throw new BrewException('A brewing plan [plan] is mandatory');

		/**
		 * Default theme
		 */
		let theme = setTheme(params.theme ? params.theme : {});

		/**
		 * Get all the input parameters
		 */
		info.title = params.title || 'Mash Graph';
		info.axisXLabel = params.axisXLabel || 'Tempo (Δt)';
		info.axisYLabel = params.axisYLabel || 'Temperatura (d)';
		info.legendTitle = params.legendTitle || 'Legenda:';
		info.heatingTitle = params.heatingTitle || 'Mudança de rampa';
		info.initialTemperature = params.initialTemperature || 20;
		info.heatingReasonDPM_UP = params.heatingReasonDPM_UP || '2:1';
		info.heatingReasonDPM_DOWN = params.heatingReasonDPM_UP || '1:5';
		info.width = params.width || 800;
		info.height = params.height || 600;
		info.theme = theme;
		info.actualColor = 'red';
		info.actualColorHighlight = 'green';
		info.plan = {
			mash: null,
			boiling: null,
		};

		addMash(params.plan.mash);
		addBoiling(params.plan.boiling);

		dimensions = {
			graph: {
				w: info.width,
				h: info.height,
				borderX: borderX,
				borderY: borderY,
			},
			scale: {
				maxDegrees: degreesScale,
			},
			data: {
				w: info.width - borderX * 2 - 10,
				h: info.height - borderY * 2 - 10,
				pw: (info.width - borderX * 2) / (getPlanTime() + 5),
				ph: (info.height - borderY * 2 - 11) / degreesScale,
				coords: [
					[borderX, borderY],
					[borderX + info.width - borderX * 2 - 10, borderY],
					[borderX + info.width - borderX * 2 - 10, borderY + info.height - borderY * 2 - 10],
					[borderX, borderY + info.height - borderY * 2 - 10],
				],
			},
			legend: {
				w: 0,
				h: 0,
			},
		};

		// Attributes the global plan
		plan = generatePlan();
	};

	/**
	 * set the Theme
	 */
	const setTheme = (theme) => {
		const defaultTheme = {
			backgroundColor: theme.backgroundColor || 'rgba(255,255,255,0)',
			plotAreaBackgroundColor: theme.plotAreaBackgroundColor || 'rgba(255,255,255,0)',
			axisLineColor: theme.axisLineColor || 'black',
			titleColor: theme.titleColor || 'blue',
			titleFont: theme.titleFont || 'bold 20px Arial',
			axisLabelColor: theme.axisLabelColor || 'black',
			axisLabelFont: theme.axisLabelFont || 'italic 16px Arial',
			axisScaleFont: theme.axisScaleFont || 'italic 12px Arial',
			legendFont: theme.legendFont || 'bold 16px Arial',
			legendItemFont: theme.legendItemFont || '14px Arial',
			dataLabelFontL1: theme.dataLabelFontL1 || '18px Arial',
			dataLabelFontL2: theme.dataLabelFontL2 || '14px Arial',
			dataLabelFontL3: theme.dataLabelFontL3 || '12px Arial',
			heatingColorAlpha: theme.heatingColor || 'rgba(100,100,100,0.2)',
			heatingColor: theme.heatingColor || 'rgba(100,100,100,0.5)',
			mashColors: theme.mashColors || [
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
			boilingColorAlpha: theme.boilingColor || 'rgba(255,10,10,0.4)',
			boilingColor: theme.boilingColor || 'rgba(255,10,10,0.7)',
		};

		info.theme = defaultTheme;
		return defaultTheme;
	};

	/**
	 * Add a new individual step
	 */
	const addMash = (MashInfo) => {
		if (!MashInfo) throw new BrewException('Mash info [mash] is mandatory. See the documentation');
		if (!MashInfo.ramps) throw new BrewException('Mash ramps [mash.ramps] info is mandatory. See the documentation');
		if (!typeof MashInfo.ramps == 'Array') throw new BrewException('Please inform Mash steps in an Array');

		MashInfo.ramps.forEach((MashStep) => {
			if (!MashStep.step) throw new BrewException('Mash step name [mash.ramps.step] is mandatory');
			if (!MashStep.time) throw new BrewException('Mash step time [time] is mandatory');
			if (!MashStep.temperature) throw new BrewException('Mash step temperature [temperature] is mandatory');

			if (MashStep.grainKg) if (!typeof MashStep.addGrain == 'boolean') BrewException('Mash flag grain is type boolean [mash.step.grainKg]');
			if (MashStep.waterL) if (!typeof MashStep.addWater == 'boolean') BrewException('Mash flag water is type boolean [mash.step.waterL]');
			if (MashStep.spiceMg) if (!typeof MashStep.addSpice == 'boolean') BrewException('Mash flag spice is type boolean [mash.step.spiceMg]');
			if (MashStep.spiceMg) if (!typeof MashStep.addHop == 'boolean') BrewException('Mash flag hop is type boolean [mash.step.spiceMg]');
		});

		info.plan.mash = MashInfo;
	};

	/**
	 * Add boiling step and check the fields
	 */
	const addBoiling = (BoilingInfo) => {
		if (typeof BoilingInfo != 'undefined') {
			if (!BoilingInfo.step) BoilingInfo.step = 'Boiling';
			if (!BoilingInfo.time) throw new BrewException('Boiling time [boiling.time] is mandatory');
			if (!BoilingInfo.temperature) BoilingInfo.temperature = 100;

			if (BoilingInfo.grainKg)
				if (!typeof BoilingInfo.addGrain == 'boolean') BrewException('Boiling flag grain is type boolean [boiling.grainKg]');
			if (BoilingInfo.waterL)
				if (!typeof BoilingInfo.addWater == 'boolean') BrewException('Boiling flag water is type boolean [boiling.waterL]');
			if (BoilingInfo.spiceMg)
				if (!typeof BoilingInfo.addSpice == 'boolean') BrewException('Boiling flag spice is type boolean [boiling.spiceMg]');
			if (BoilingInfo.hopsMg) if (!typeof BoilingInfo.addHop == 'boolean') BrewException('Boiling flag hop is type boolean [boiling.hopsMg]');

			if (BoilingInfo.hopping) {
				if (!typeof BoilingInfo.hopping == 'Array') throw new BrewException('Hopping schedule must be an array');

				BoilingInfo.hopping.forEach((hopInfo) => {
					if (!hopInfo.hopName) throw new BrewException('Hop name [boiling.hopping.hopName] is a mandatory in hopping specification');
					if (!hopInfo.time) throw new BrewException('Hop time [boiling.hopping.time] is a mandatory in hopping specification');
					if (!hopInfo.type) throw new BrewException('Hop type [boiling.hopping.type] is a mandatory in hopping specification');
					if (!hopInfo.amountMg) throw new BrewException('Hop amount [boiling.hopping.amountMg] is a mandatory in hopping specification');
				});
			}

			info.plan.boiling = BoilingInfo;
		}
	};

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
			colorAlpha: info.theme.heatingColorAlpha,
		});

		return colorScale;
	};

	/**
	 * Generate the Plan
	 */
	const generatePlan = () => {
		let colorScale = getColorScale();
		let totalTime = 0;
		let stepCount = 0;
		let mashSteps = 0;
		let executionPlan = {
			totalTime: 0,
			mashTime: 0,
			boilingTime: 0,
			allSteps: [],
		};
		let x1, y1, x2, y2, x3, y3, x4, y4;
		let coords = [];

		info.plan.mash.ramps.forEach((step) => {
			let startTemperature = stepCount == 0 ? info.initialTemperature : executionPlan.allSteps[stepCount - 1].temperature;

			// Create a heating step
			if (startTemperature < step.temperature) {
				let heatingTime = calculateHeatingTime(step.temperature - startTemperature);
				// Add the Mash step
				x1 = totalTime * dimensions.data.pw;
				y1 = dimensions.data.h;
				x2 = (totalTime + heatingTime) * dimensions.data.pw;
				y2 = dimensions.data.h;
				x3 = (totalTime + heatingTime) * dimensions.data.pw;
				y3 = dimensions.data.h - step.temperature * dimensions.data.ph;
				x4 = totalTime * dimensions.data.pw;
				y4 = dimensions.data.h - startTemperature * dimensions.data.ph;
				coords = [];
				coords.push([x4 + dimensions.graph.borderX, y4 + dimensions.graph.borderY + 12]);
				coords.push([x3 + dimensions.graph.borderX, y3 + dimensions.graph.borderY + 12]);
				coords.push([x2 + dimensions.graph.borderX, y2 + dimensions.graph.borderY + 12]);
				coords.push([x1 + dimensions.graph.borderX, y1 + dimensions.graph.borderY + 12]);

				executionPlan.allSteps.push({
					sequence: stepCount + 1,
					type: 'mash-heating',
					stepName: `Heating to ${step.step}`,
					startTemperature: startTemperature,
					temperature: step.temperature,
					time: heatingTime,
					startTime: totalTime,
					waterL: step.waterL ? step.waterL : null,
					grainKg: null,
					hopMg: null,
					spiceMg: null,
					color: info.theme.heatingColor,
					colorAlpha: info.theme.heatingColorAlpha,
					coords: {
						x1: x1,
						y1: y1,
						x2: x2,
						y2: y2,
						x3: x3,
						y3: y3,
						x4: x4,
						y4: y4,
						polygon: coords,
						labelX: (totalTime + heatingTime / 2) * dimensions.data.pw,
						labelY: dimensions.data.h - step.temperature * dimensions.data.ph + 10,
					},
					label: {
						label1: `+${step.temperature - startTemperature}°`,
						label2: `(Δt=${heatingTime}\'')`,
						label3: `(${info.heatingReasonDPM_UP})`,
					},
				});

				totalTime += heatingTime;
				stepCount++;
			}

			// Add the Mash step
			x1 = totalTime * dimensions.data.pw;
			y1 = dimensions.data.h;
			x2 = (totalTime + step.time) * dimensions.data.pw;
			y2 = dimensions.data.h;
			x3 = (totalTime + step.time) * dimensions.data.pw;
			y3 = dimensions.data.h - step.temperature * dimensions.data.ph;
			x4 = totalTime * dimensions.data.pw;
			y4 = dimensions.data.h - step.temperature * dimensions.data.ph;
			coords = [];
			coords.push([x4 + dimensions.graph.borderX, y4 + dimensions.graph.borderY + 12]);
			coords.push([x3 + dimensions.graph.borderX, y3 + dimensions.graph.borderY + 12]);
			coords.push([x2 + dimensions.graph.borderX, y2 + dimensions.graph.borderY + 12]);
			coords.push([x1 + dimensions.graph.borderX, y1 + dimensions.graph.borderY + 12]);

			executionPlan.allSteps.push({
				sequence: stepCount + 1,
				type: 'mash-step',
				stepName: step.step,
				startTemperature: step.temperature,
				temperature: step.temperature,
				time: step.time,
				startTime: totalTime,
				waterL: null,
				grainKg: step.grainKg ? step.grainKg : null,
				hopMg: step.hopMg ? step.hopMg : null,
				spiceMg: step.spiceMg ? step.spiceMg : null,
				color: colorScale[mashSteps].color,
				colorAlpha: colorScale[mashSteps].colorAlpha,
				coords: {
					x1: x1,
					y1: y1,
					x2: x2,
					y2: y2,
					x3: x3,
					y3: y3,
					x4: x4,
					y4: y4,
					polygon: coords,
					labelX: (totalTime + step.time / 2) * dimensions.data.pw,
					labelY: dimensions.data.h - step.temperature * dimensions.data.ph - 20,
				},
				label: {
					label1: `${step.temperature}°`,
					label2: `(Δt=${step.time}\'')`,
				},
			});

			totalTime += step.time;
			stepCount++;
			mashSteps++;
		});

		executionPlan.mashTime = totalTime;

		// Add boiling step
		if (info.plan.boiling) {
			let boiling = info.plan.boiling;
			let lastTemperature = executionPlan.allSteps[stepCount - 1].temperature;
			let heatingTime = calculateHeatingTime(boiling.temperature - lastTemperature);

			// Add the heating Boiling step
			if (boiling.temperature > lastTemperature) {
				x1 = totalTime * dimensions.data.pw;
				y1 = dimensions.data.h;
				x2 = (totalTime + heatingTime) * dimensions.data.pw;
				y2 = dimensions.data.h;
				x3 = (totalTime + heatingTime) * dimensions.data.pw;
				y3 = dimensions.data.h - boiling.temperature * dimensions.data.ph;
				x4 = totalTime * dimensions.data.pw;
				y4 = dimensions.data.h - lastTemperature * dimensions.data.ph;
				coords = [];
				coords.push([x4 + dimensions.graph.borderX, y4 + dimensions.graph.borderY]);
				coords.push([x3 + dimensions.graph.borderX, y3 + dimensions.graph.borderY]);
				coords.push([x2 + dimensions.graph.borderX, y2 + dimensions.graph.borderY]);
				coords.push([x1 + dimensions.graph.borderX, y1 + dimensions.graph.borderY]);

				executionPlan.allSteps.push({
					sequence: stepCount + 1,
					type: 'boiling-heating',
					stepName: boiling.step,
					startTemperature: lastTemperature,
					temperature: boiling.temperature,
					time: heatingTime,
					startTime: totalTime,
					waterL: boiling.waterL ? boiling.waterL : null,
					grainKg: null,
					hopMg: null,
					spiceMg: null,
					color: info.theme.heatingColor,
					colorAlpha: info.theme.heatingColorAlpha,
					coords: {
						x1: x1,
						y1: y1,
						x2: x2,
						y2: y2,
						x3: x3,
						y3: y3,
						x4: x4,
						y4: y4,
						polygon: coords,
						labelX: (totalTime + heatingTime / 2) * dimensions.data.pw,
						labelY: dimensions.data.h - boiling.temperature * dimensions.data.ph + 10,
					},
					label: {
						label1: `+${boiling.temperature - lastTemperature}°`,
						label2: `(Δt=${heatingTime}\'')`,
						label3: `(${info.heatingReasonDPM_UP})`,
					},
				});

				totalTime += heatingTime;
				stepCount++;
			}

			// Add Boiling info
			x1 = totalTime * dimensions.data.pw;
			y1 = dimensions.data.h;
			x2 = (totalTime + boiling.time) * dimensions.data.pw;
			y2 = dimensions.data.h;
			x3 = (totalTime + boiling.time) * dimensions.data.pw;
			y3 = dimensions.data.h - boiling.temperature * dimensions.data.ph;
			x4 = totalTime * dimensions.data.pw;
			y4 = dimensions.data.h - boiling.temperature * dimensions.data.ph;
			coords = [];
			coords.push([x4 + dimensions.graph.borderX, y4 + dimensions.graph.borderY]);
			coords.push([x3 + dimensions.graph.borderX, y3 + dimensions.graph.borderY]);
			coords.push([x2 + dimensions.graph.borderX, y2 + dimensions.graph.borderY]);
			coords.push([x1 + dimensions.graph.borderX, y1 + dimensions.graph.borderY]);

			executionPlan.allSteps.push({
				sequence: stepCount + 1,
				type: 'boiling',
				stepName: boiling.step,
				startTemperature: boiling.temperature,
				temperature: boiling.temperature,
				time: boiling.time,
				hopping: boiling.hopping,
				startTime: totalTime,
				waterL: null,
				grainKg: boiling.grainKg ? boiling.grainKg : null,
				hopMg: boiling.hopMg ? boiling.hopMg : null,
				spiceMg: boiling.spiceMg ? boiling.spiceMg : null,
				color: colorScale[mashSteps].color,
				colorAlpha: colorScale[mashSteps].colorAlpha,
				coords: {
					x1: x1,
					y1: y1,
					x2: x2,
					y2: y2,
					x3: x3,
					y3: y3,
					x4: x4,
					y4: y4,
					polygon: coords,
					labelX: (totalTime + boiling.time / 2) * dimensions.data.pw,
					labelY: dimensions.data.h - boiling.temperature * dimensions.data.ph - 20,
				},
				label: {
					label1: `${boiling.temperature}°`,
					label2: `(Δt=${boiling.time}\'')`,
				},
			});

			totalTime += boiling.time;
			executionPlan.boilingTime = heatingTime + boiling.time;
		}

		executionPlan.totalTime = totalTime;

		console.log(executionPlan);
		return executionPlan;
	};

	/**
	 * Creates a new temporary canvas
	 */
	const getNewCanvasContext = (w, h) => {
		let cnv = document.createElement('canvas');
		cnv.width = w;
		cnv.height = h;
		return cnv.getContext('2d');
	};

	/**
	 * Draw the Graph frame
	 */
	const drawGraph = () => {
		let bX = dimensions.graph.borderX;
		let bY = dimensions.graph.borderY;
		let w = dimensions.graph.w;
		let h = dimensions.graph.h;
		let ctx = getNewCanvasContext(w, h);

		ctx.fillStyle = info.theme.backgroundColor;
		ctx.fillRect(0, 0, w, h);

		ctx.font = info.theme.titleFont;
		ctx.fillStyle = info.theme.titleColor;
		ctx.textAlign = 'center';
		ctx.fillText(info.title, w / 2, bY / 2);

		// Draw the X and Y axis
		ctx.lineWidth = 2;
		ctx.lineColor = info.theme.axisLineColor;
		ctx.beginPath();
		ctx.moveTo(bX, bY);
		ctx.lineTo(bX, bY + h - bY * 2);
		ctx.lineTo(bX + w - bX * 2, bY + h - bY * 2);
		ctx.stroke();

		//Draw arroy in X axis
		ctx.beginPath();
		ctx.moveTo(bX, bY);
		ctx.lineTo(bX + 5, bY + 10);
		ctx.lineTo(bX - 5, bY + 10);
		ctx.closePath();
		ctx.fill();

		//Draw arroy in Y axis
		ctx.beginPath();
		ctx.moveTo(bX + w - bX * 2, bY + h - bY * 2);
		ctx.lineTo(bX + w - bX * 2 - 10, bY + h - bY * 2 - 5);
		ctx.lineTo(bX + w - bX * 2 - 10, bY + h - bY * 2 + 5);
		ctx.closePath();
		ctx.fill();

		// Draw Axis labes
		ctx.font = info.theme.axisLabelFont;
		ctx.fillStyle = info.theme.axisLabelColor;
		ctx.textAlign = 'center';
		ctx.fillText(info.axisXLabel + ` - ETB (Estimated Time to Brew)=${getPlanTime()}\'\'`, w / 2, h - bY / 6);
		ctx.save();
		ctx.translate(8, ctx.measureText(info.axisYLabel) / 2);
		ctx.rotate(-Math.PI / 2);
		ctx.fillText(info.axisYLabel, -(h / 2), bX / 4);
		ctx.restore();

		// Draw the graphic data
		let graphData = drawData();
		ctx.putImageData(graphData.image, bX + 1, bY + 10);

		// Draw the Mash and Boiling titles
		ctx.font = info.theme.dataLabelFontL1;
		ctx.fillStyle = info.theme.titleColor;
		ctx.textAlign = 'center';
		ctx.fillText('Mash', bX + (plan.mashTime / 2) * dimensions.data.pw, bY + (bY / 4) * 3);
		ctx.fillText('Boiling', bX + (plan.mashTime + plan.boilingTime / 2) * dimensions.data.pw, bY + (bY / 4) * 3);

		// Draw X axis the scale
		ctx.lineWidth = 2;
		ctx.font = info.theme.axisScaleFont;
		ctx.fillStyle = info.theme.axisLabelColor;
		ctx.textAlign = 'right';
		for (let i = 0; i <= dimensions.scale.maxDegrees / 10; i++) {
			let y = (i * dimensions.data.h) / (dimensions.scale.maxDegrees / 10) + 12;
			ctx.lineWidth = 2;
			ctx.setLineDash([]);
			ctx.beginPath();
			ctx.moveTo(bX - 5, bY + y);
			ctx.lineTo(bX, bY + y);
			ctx.closePath();
			ctx.stroke();

			// Draw the grid line
			ctx.lineWidth = 0.1;
			ctx.lineColor = 'grey';
			ctx.setLineDash([3, 3]);
			ctx.beginPath();
			ctx.moveTo(bX, bY + y);
			ctx.lineTo(bX + dimensions.data.w, bY + y);
			ctx.closePath();
			ctx.stroke();

			// Draw the Y axis label
			ctx.fillText(`${dimensions.scale.maxDegrees + 10 - (i + 1) * 10}°`, bX - 10, bY + y + 5);
		}

		// Draw Y axis the scale
		let timeUnit = (10 * dimensions.data.w) / (getPlanTime() + 5);
		let scale = parseInt(dimensions.data.w / timeUnit) + 1;
		let lastStep = bX;

		ctx.textAlign = 'center';
		for (let i = 0; i < scale; i++) {
			ctx.lineWidth = 2;
			ctx.setLineDash([]);
			ctx.beginPath();
			ctx.moveTo(lastStep, bY + dimensions.data.h + 12);
			ctx.lineTo(lastStep, bY + dimensions.data.h + 17);
			ctx.closePath();
			ctx.stroke();

			// Draw the grid line
			ctx.lineWidth = 0.1;
			ctx.lineColor = 'grey';
			ctx.setLineDash([3, 3]);
			ctx.beginPath();
			ctx.moveTo(bX + i * timeUnit, bY + 12);
			ctx.lineTo(bX + i * timeUnit, bY + dimensions.data.h);
			ctx.closePath();
			ctx.stroke();

			// Draw the Y axis label
			ctx.fillText(`${i * 10}\'\'`, lastStep, bY + dimensions.data.h + 31);

			lastStep += timeUnit;
		}

		return {
			image: ctx.getImageData(0, 0, w, h),
		};
	};

	/**
	 * Draw the Mash Step
	 */
	const drawStepIcons = (ctx, step) => {
		//check if has water
		let yItemCount = 1;

		ctx.font = info.theme.axisScaleFont;
		ctx.fillStyle = info.theme.axisLabelColor;
		ctx.textAlign = 'center';

		if (step.waterL) {
			ctx.drawImage(pictures.water, step.coords.x1 + 10, step.coords.y1 - yItemCount * 50);
			ctx.fillText(`${step.draw} l`, step.coords.x1 + 17, step.coords.y1 - yItemCount * 30 + 17);
			yItemCount++;
		}

		//check if has grain
		if (step.grainKg) {
			ctx.drawImage(pictures.grain, step.coords.x1 + 10, step.coords.y1 - yItemCount * 50);
			ctx.fillText(`${step.grainKg} kg`, step.coords.x1 + 17, step.coords.y1 - yItemCount * 30 + 17);
			yItemCount++;
		}

		//check if has hop
		if (step.hopMg) {
			ctx.drawImage(pictures.hop, step.coords.x1 + 10, step.coords.y1 - yItemCount * 50);
			ctx.fillText(`${step.hopMg} mg`, step.coords.x1 + 17, step.coords.y1 - yItemCount * 30 + 17);
			yItemCount++;
		}

		//check if has spice
		if (step.spiceMg) {
			ctx.drawImage(pictures.spice, step.coords.x1 + 10, step.coords.y1 - yItemCount * 50);
			ctx.fillText(`${step.spiceMg} mg`, step.coords.x1 + 17, step.coords.y1 - yItemCount * 30);
		}
	};

	/**
	 * Draw the Hop Schedule
	 */
	const drawHopSchedule = (ctx, step) => {
		// Draw the hopping schedule

		if (step.type == 'boiling') {
			let space = 20 * dimensions.data.ph;
			let startTemp = 100 * dimensions.data.ph;

			step.hopping.forEach((hopInfo) => {
				ctx.font = info.theme.dataLabelFontL2;
				ctx.fillStyle = info.theme.axisLabelColor;
				ctx.textAlign = 'center';
				ctx.fillText(`${hopInfo.hopName}`, (step.startTime + hopInfo.time) * dimensions.data.pw + 10, dimensions.data.h - startTemp);
				ctx.fillText(
					`${hopInfo.time}\'\'-${hopInfo.amountMg}mg`,
					(step.startTime + hopInfo.time) * dimensions.data.pw + 10,
					dimensions.data.h - startTemp + 18
				);

				ctx.drawImage(pictures.hop, (step.startTime + hopInfo.time) * dimensions.data.pw, dimensions.data.h - startTemp + 24);

				// Draw the Line
				ctx.beginPath();
				ctx.lineWidth = 1;
				ctx.lineColor = 'green';
				ctx.setLineDash([5, 5]);
				ctx.moveTo((step.startTime + hopInfo.time) * dimensions.data.pw + 10, dimensions.data.h - startTemp + 60);
				ctx.lineTo((step.startTime + hopInfo.time) * dimensions.data.pw + 10, dimensions.data.h);
				ctx.closePath();
				ctx.stroke();

				startTemp -= space;
			});
		}
	};

	/**
	 * Draw the step label
	 */
	const drawLabel = (ctx, step) => {
		//Draw label
		ctx.font = info.theme.dataLabelFontL1;
		ctx.fillStyle = info.theme.axisLabelColor;
		ctx.textAlign = 'center';
		ctx.fillText(step.label.label1, step.coords.labelX, step.coords.labelY);

		ctx.font = info.theme.dataLabelFontL2;
		ctx.fillStyle = 'green';
		ctx.textAlign = 'center';
		ctx.fillText(step.label.label2, step.coords.labelX, step.coords.labelY + 15);

		if (step.label.label3) {
			ctx.font = info.theme.dataLabelFontL3;
			ctx.fillStyle = 'red';
			ctx.textAlign = 'center';
			ctx.fillText(step.label.label3, step.coords.labelX, step.coords.labelY + 30);
		}
	};

	/**
	 * Draw splitter line between the steps
	 */
	const drawSplitterLine = (ctx, time) => {
		// Draw the Line
		ctx.beginPath();
		ctx.lineWidth = 2;
		ctx.lineColor = info.theme.axisLineColor;
		ctx.moveTo(time * dimensions.data.pw, dimensions.data.h);
		ctx.lineTo(time * dimensions.data.pw, 0);
		ctx.setLineDash([3, 3]);
		ctx.closePath();
		ctx.stroke();
	};

	/**
	 * Draw the step poligon
	 */
	const drawDataPolygon = (ctx, step) => {
		ctx.beginPath();
		ctx.fillStyle = step.colorAlpha;
		ctx.shadowBlur = 0;
		ctx.shadowColor = 'grey';
		if (mouseCoords.idStep)
			if (mouseCoords.idStep.sequence == step.sequence) {
				ctx.fillStyle = step.color;
				//ctx.shadowBlur = 20;
			}

		ctx.moveTo(step.coords.x1, step.coords.y1);
		ctx.lineTo(step.coords.x2, step.coords.y2);
		ctx.lineTo(step.coords.x3, step.coords.y3);
		ctx.lineTo(step.coords.x4, step.coords.y4);

		ctx.closePath();
		ctx.fill();
		ctx.shadowBlur = 0;
	};

	/**
	 * Draw the graphic data
	 */
	const drawData = () => {
		let ctx = getNewCanvasContext(info.width, info.height);

		plan.allSteps.forEach((step) => {
			drawDataPolygon(ctx, step);
			drawStepIcons(ctx, step);
			drawLabel(ctx, step);

			switch (step.type) {
				case 'boiling-heating':
					drawSplitterLine(ctx, step.startTime);
					break;
				case 'boiling':
					drawSplitterLine(ctx, step.startTime + step.time);
					drawHopSchedule(ctx, step);
					break;
			}
		});

		return {
			image: ctx.getImageData(0, 0, dimensions.data.w, dimensions.data.h),
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
		let ctx = getNewCanvasContext(info.width, info.height);

		ctx.fillStyle = info.theme.backgroundColor;
		ctx.fillRect(0, 0, info.width, info.height);

		let data = {
			space: 20,
			beginH: 30,
			markSize: 30,
			mashStepCount: 0,
		};

		ctx.fillStyle = info.theme.backgroundColor;
		ctx.shadowBlur = 4;
		ctx.shadowColor = 'grey';
		ctx.lineWidth = 2;
		ctx.fillRect(5, 5, 250, data.beginH + (info.plan.mash.ramps.length + 2) * data.space + (data.space + 8) * 4);
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
		data = drawLegendItem(ctx, {step: info.heatingTitle}, data);

		// Draw the icons
		data = drawLegendIcon(ctx, data, pictures.grain, `Grain`);
		data = drawLegendIcon(ctx, data, pictures.water, `Water`);
		data = drawLegendIcon(ctx, data, pictures.hop, `Hop`);
		data = drawLegendIcon(ctx, data, pictures.spice, `Spice`);

		return {
			width: info.width,
			height: data.beginH,
			image: ctx.getImageData(0, 0, 265, data.beginH + (info.plan.mash.ramps.length + 1) * data.space + 10),
		};
	};

	/**
	 * Draw info box to step
	 */
	const drawInfoBox = (ctx, step, boxHeight) => {
		let stepName = step.type == 'mash-heating' || step.type == 'boiling-heating' ? step.type : step.stepName;
		let temperature =
			step.type != 'mash-heating' && step.type != 'boiling-heating' ? `${step.temperature}°` : `+${step.temperature - step.startTemperature}°`;
		let initY = mouseCoords.y - boxHeight / 2 + 5;

		if (step.type == 'boiling') ctx.fillStyle = 'white';
		else ctx.fillStyle = info.theme.axisLabelColor;

		ctx.font = info.theme.dataLabelFontL1;
		ctx.textAlign = 'left';
		ctx.fillText(stepName, mouseCoords.x + 30, initY + 10);
		ctx.font = info.theme.dataLabelFontL2;
		ctx.fillText(`type: ${step.type}`, mouseCoords.x + 30, initY + 30);
		ctx.fillText(`Teperature: ${temperature}`, mouseCoords.x + 30, initY + 50);
		ctx.fillText(`Start at: ${step.startTime} minutes`, mouseCoords.x + 30, initY + 70);
		ctx.fillText(`Finish at: ${step.startTime + step.time} minutes`, mouseCoords.x + 30, initY + 90);
		ctx.fillText(`Duration: ${step.time} minutes`, mouseCoords.x + 30, initY + 110);

		let xItemCount = 0;
		let yStart = 120;
		if (step.waterL) {
			ctx.drawImage(pictures.water, mouseCoords.x + 30 + xItemCount * 40, initY + yStart);
			ctx.fillText(`${step.waterL} l`, mouseCoords.x + 30 + xItemCount * 40, initY + yStart + 40);
			xItemCount++;
		}

		//check if has grain
		if (step.grainKg) {
			ctx.drawImage(pictures.grain, mouseCoords.x + 30 + xItemCount * 40, initY + yStart);
			ctx.fillText(`${step.grainKg} kg`, mouseCoords.x + 30 + xItemCount * 40, initY + yStart + 40);
			xItemCount++;
		}

		//check if has hop
		if (step.hopMg) {
			ctx.drawImage(pictures.hop, mouseCoords.x + 30 + xItemCount * 40, initY + yStart);
			ctx.fillText(`${step.hopMg} mg`, mouseCoords.x + 30 + xItemCount * 40, initY + yStart + 40);
			xItemCount++;
		}

		//check if has spice
		if (step.spiceMg) {
			ctx.drawImage(pictures.spice, mouseCoords.x + 30 + xItemCount * 40, initY + yStart);
			ctx.fillText(`${step.spiceMg} mg`, mouseCoords.x + 30 + xItemCount * 40, initY + yStart + 40);
		}

		return {
			image: ctx.getImageData(0, 0, 110, 110),
		};
	};

	/**
	 * Draw actal data
	 */
	const drawActual = (ctx) => {
		let itemCount = 0;

		ctx.beginPath();
		if (mouseCoords.overActual) {
			ctx.strokeStyle = info.actualColorHighlight;
			ctx.shadowBlur = 20;
			ctx.shadowColor = 'green';
		} else ctx.strokeStyle = info.actualColor;

		ctx.lineWidth = 8;
		ctx.lineCap = 'round';
		actual.forEach((measure) => {
			if (itemCount == 0) ctx.moveTo(measure.coords.x, measure.coords.y);
			else ctx.lineTo(measure.coords.x, measure.coords.y);

			itemCount++;
		});

		ctx.stroke();
		ctx.shadowBlur = 0;
	};

	/**
	 * Detect if mouse is over the actual line
	 */
	const isMouseOverActualLine = (coord) => {
		let lastMeasure = 0;

		mouseCoords.overActual = false;
		actual.forEach((measure) => {
			//let x = dimensions.graph.borderX + (measure.timeMinute - 1) * dimensions.data.pw;
			if (coord.x > dimensions.graph.borderX && coord.x < dimensions.data.w - dimensions.graph.borderX) {
				if (coord.x > measure.coords.x) {
					lastMeasure = measure;
				} else {
					if (coord.y >= measure.coords.y - 30 && coord.y <= measure.coords.y + 30) {
						mouseCoords.overActual = true;
						mouseCoords.actualTemp = lastMeasure.sensor1;
						mouseCoords.actualTime = lastMeasure.timeMinute;
						mouseCoords.intersectionX = coord.x;
						mouseCoords.intersectionY =
							(measure.coords.x - lastMeasure.coords.x) *
								((lastMeasure.coords.y - measure.coords.y) / (measure.coords.x - lastMeasure.coords.x)) +
							measure.coords.y;

						return true;
					}
				}
			}
		});

		return false;
	};

	/**
	 * Draw the graphic
	 */
	const draw = () => {
		// Adjust element
		let graph = drawGraph();
		let legend = drawLegend();

		info.canvas.width = info.width;
		info.canvas.height = info.height + legend.height + 50;

		let ctx = info.context;
		ctx.fillStyle = info.theme.backgroundColor;
		ctx.fillRect(0, 0, info.width, info.height + legend.height + 50);

		// Draw the header
		ctx.putImageData(graph.image, 0, 0);

		// Draw the legend
		ctx.putImageData(legend.image, 50, info.height);

		// Draw the actual
		drawActual(ctx);

		if (mouseCoords.overActual) {
			ctx.fillStyle = 'rgba(0,100,0,1)';
			ctx.lineWidth = 1;
			ctx.beginPath();
			ctx.arc(mouseCoords.intersectionX, mouseCoords.intersectionY, 10, 0, 2 * Math.PI);
			ctx.fill();

			ctx.fillStyle = 'yellow';
			ctx.popupCoord(mouseCoords.x, mouseCoords.y - 20, 90, 50, {upperLeft: 10, upperRight: 10, lowerRight: 10, lowerLeft: 10}, true, true);

			ctx.font = info.theme.dataLabelFontL1;
			ctx.textAlign = 'center';
			ctx.fillStyle = info.theme.axisLabelColor;

			ctx.fillText(`Temp: ${mouseCoords.actualTemp}°`, mouseCoords.x - 5, mouseCoords.y - 80);
			ctx.fillText(`${mouseCoords.actualTime} min`, mouseCoords.x - 5, mouseCoords.y - 58);
		} else if (mouseCoords.idStep) {
			if (mouseCoords.idStep.type != 'mash-heating' && mouseCoords.idStep.type != 'boiling-heating') ctx.fillStyle = mouseCoords.idStep.color;
			else ctx.fillStyle = 'yellow';

			ctx.font = info.theme.dataLabelFontL1;
			let txtWidth = ctx.measureText(mouseCoords.idStep.stepName).width;
			let boxHeight =
				mouseCoords.idStep.waterL || mouseCoords.idStep.hopMg || mouseCoords.idStep.grainKg || mouseCoords.idStep.spiceMg ? 180 : 130;
			txtWidth = txtWidth < 150 ? 150 : txtWidth + 40;

			ctx.popup(
				mouseCoords.x + 20,
				mouseCoords.y - boxHeight / 2 - 5,
				txtWidth,
				boxHeight,
				{upperLeft: 10, upperRight: 10, lowerRight: 10, lowerLeft: 10},
				true,
				true
			);
			drawInfoBox(ctx, mouseCoords.idStep, boxHeight);
		}
	};

	/**
	 * Detect if a mouse coordinate is inside a brew step
	 */
	const hoverBrewStep = (coordinate, step) => {
		// ray-casting algorithm based on
		// http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
		// https://stackoverflow.com/questions/22521982/check-if-point-is-inside-a-polygon

		let x = coordinate.x,
			y = coordinate.y;

		let inside = false;
		for (var i = 0, j = step.length - 1; i < step.length; j = i++) {
			let xi = step[i][0],
				yi = step[i][1];
			let xj = step[j][0],
				yj = step[j][1];

			let intersect = yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
			if (intersect) inside = !inside;
		}

		return inside;
	};

	//Export
	return {
		execution: {
			getMashTime,
			getBoilingTime,
			getPlanTime,
		},
		setActual,
		addActual,
		setContext,
		initPlan,
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

// Draw info box
CanvasRenderingContext2D.prototype.popup = function (x, y, width, height, radius, fill, stroke) {
	var cornerRadius = {upperLeft: 0, upperRight: 0, lowerLeft: 0, lowerRight: 0};
	if (typeof stroke == 'undefined') {
		stroke = true;
	}
	if (typeof radius === 'object') {
		for (var side in radius) {
			cornerRadius[side] = radius[side];
		}
	}

	let pastShadowBlur = this.shadowBlur;
	this.lineWidth = 1;
	this.shadowBlur = 20;
	this.shadowColor = 'grey';
	this.beginPath();
	this.moveTo(x + cornerRadius.upperLeft, y);
	this.lineTo(x + width - cornerRadius.upperRight, y);
	this.quadraticCurveTo(x + width, y, x + width, y + cornerRadius.upperRight);
	this.lineTo(x + width, y + height - cornerRadius.lowerRight);
	this.quadraticCurveTo(x + width, y + height, x + width - cornerRadius.lowerRight, y + height);
	this.lineTo(x + cornerRadius.lowerLeft, y + height);
	this.quadraticCurveTo(x, y + height, x, y + height - cornerRadius.lowerLeft);
	this.lineTo(x, y + height / 2 + 10);
	this.lineTo(x - 10, y + height / 2);
	this.lineTo(x, y + height / 2 - 10);
	this.lineTo(x, y + cornerRadius.upperLeft);
	this.quadraticCurveTo(x, y, x + cornerRadius.upperLeft, y);
	this.closePath();
	if (stroke) {
		this.stroke();
	}
	if (fill) {
		this.fill();
	}
	this.shadowBlur = pastShadowBlur;
};

// Draw info box
CanvasRenderingContext2D.prototype.popupCoord = function (x, y, width, height, radius, fill, stroke) {
	var cornerRadius = {upperLeft: 0, upperRight: 0, lowerLeft: 0, lowerRight: 0};
	if (typeof stroke == 'undefined') {
		stroke = true;
	}
	if (typeof radius === 'object') {
		for (var side in radius) {
			cornerRadius[side] = radius[side];
		}
	}

	y = y - height - 30;
	x = x - width + width / 2 - 3;

	let pastShadowBlur = this.shadowBlur;
	this.lineWidth = 1;
	this.shadowBlur = 20;
	this.shadowColor = 'grey';
	this.beginPath();
	this.moveTo(x + cornerRadius.upperLeft, y);
	this.lineTo(x + width - cornerRadius.upperRight, y);
	this.quadraticCurveTo(x + width, y, x + width, y + cornerRadius.upperRight);
	this.lineTo(x + width, y + height - cornerRadius.lowerRight);
	this.quadraticCurveTo(x + width, y + height, x + width - cornerRadius.lowerRight, y + height);
	this.lineTo(x + width / 2 - 10, y + height);
	this.lineTo(x + width / 2, y + height + 10);
	this.lineTo(x + width / 2 + 10, y + height);
	this.lineTo(x + cornerRadius.lowerLeft, y + height);
	this.quadraticCurveTo(x, y + height, x, y + height - cornerRadius.lowerLeft);
	this.lineTo(x, y + cornerRadius.upperLeft);
	this.quadraticCurveTo(x, y, x + cornerRadius.upperLeft, y);
	this.closePath();
	if (stroke) {
		this.stroke();
	}
	if (fill) {
		this.fill();
	}
	this.shadowBlur = pastShadowBlur;
};
