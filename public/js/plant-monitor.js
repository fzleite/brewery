import {picturesRes} from './resources.js';

export default function PlantMonitor() {
	let ctx = null;
	let canvas = null;
	const observers = [];
	let resistenciaPrincipal = null;
	let resistenciaCaldeira = null;
	let valvularDirecional_1 = null;
	let valvularDirecional_2 = null;
	let motorBomba = null;
	let pictures = {
		basePlant: new Image(),
		valve: new Image(),
		resistenciaCaldeira: new Image(),
		resistenciaPanela: new Image(),
		motorBomba: new Image(),
		water_h: new Image(),
		water_v: new Image(),
	};

	/**
	 * Sets the context of the canvas
	 */
	const setContext = (cnv) => {
		canvas = cnv;
		ctx = canvas.getContext('2d');
		cnv.width = 600;
		cnv.height = 648;
	};
	/**
	 * Subscrebes an component
	 */
	const subscribe = (component) => {
		observers.push(component);
	};

	/**
	 * Notify all components
	 */
	const notifyAll = () => {
		observers.forEach((component) => {
			component.run();
		});
	};

	/**
	 * Set the status of one component
	 */
	const setStatus = (id, status) => {
		observers.forEach((component) => {
			if (component.getId() == id) component.setStatus(status);
		});
	};

	/**
	 * Init the graphics and all the conponents
	 */
	const init = () => {
		pictures.basePlant.src = picturesRes.basePlant;
		pictures.valve.src = picturesRes.valvula;
		pictures.resistenciaPanela.src = picturesRes.resistencia1;
		pictures.resistenciaCaldeira.src = picturesRes.resistencia2;
		pictures.motorBomba.src = picturesRes.bomba;
		pictures.water_h.src = picturesRes.water_horizontal;
		pictures.water_v.src = picturesRes.water_vertical;

		resistenciaPrincipal = new controlComponent({id: 'Resistencia Principal', speed: 50});
		resistenciaCaldeira = new controlComponent({id: 'Resistencia Caldeira', speed: 70});
		valvularDirecional_1 = new controlComponent({id: 'Valvula Direcional 1', speed: 30});
		valvularDirecional_2 = new controlComponent({id: 'Valvula Direcional 2', speed: 40});
		motorBomba = new controlComponent({id: 'Bomba de Recirculação', speed: 80});

		ctx.clearRect(0, 0, 600, 648);
		ctx.drawImage(pictures.basePlant, 0, 0);

		resistenciaPrincipal.onDraw((comp) => {
			let cutAt = 0;
			switch (comp.getStatus()) {
				case 'on':
					cutAt = comp.getInternalFlag() == 'on' ? 100 : 0;
					comp.setInternalFlag(comp.getInternalFlag() == 'on' ? 'off' : 'on');
					ctx.clearRect(120, 540, 100, 22);
					ctx.drawImage(pictures.resistenciaPanela, cutAt, 0, 100, 22, 119, 540, 100, 22);
					break;
				case 'off':
					cutAt = 0;
					ctx.clearRect(120, 540, 100, 22);
					ctx.drawImage(pictures.resistenciaPanela, cutAt, 0, 100, 22, 119, 540, 100, 22);
					break;
				case 'manual':
					cutAt = comp.getInternalFlag() == 'on' ? 200 : 0;
					comp.setInternalFlag(comp.getInternalFlag() == 'on' ? 'off' : 'on');
					ctx.clearRect(120, 540, 100, 22);
					ctx.drawImage(pictures.resistenciaPanela, cutAt, 0, 100, 22, 119, 540, 100, 22);
					break;
				default:
					break;
			}
		});

		resistenciaCaldeira.onDraw((comp) => {
			let cutAt = 0;
			switch (comp.getStatus()) {
				case 'on':
					cutAt = comp.getInternalFlag() == 'on' ? 22 : 0;
					comp.setInternalFlag(comp.getInternalFlag() == 'on' ? 'off' : 'on');
					ctx.drawImage(pictures.resistenciaCaldeira, cutAt, 0, 22, 100, 322, 474, 22, 100);
					break;
				case 'off':
					cutAt = 0;
					ctx.drawImage(pictures.resistenciaCaldeira, cutAt, 0, 22, 100, 322, 474, 22, 100);
					break;
				case 'manual':
					cutAt = comp.getInternalFlag() == 'on' ? 44 : 0;
					comp.setInternalFlag(comp.getInternalFlag() == 'on' ? 'off' : 'on');
					ctx.drawImage(pictures.resistenciaCaldeira, cutAt, 0, 22, 100, 322, 474, 22, 100);
					break;
				default:
					break;
			}
		});

		valvularDirecional_1.onDraw((comp) => {
			let cutAt = 0;
			switch (comp.getStatus()) {
				case 'on':
					cutAt = comp.getInternalFlag() == 'on' ? 35 : 0;
					comp.setInternalFlag(comp.getInternalFlag() == 'on' ? 'off' : 'on');
					ctx.drawImage(pictures.valve, cutAt, 0, 35, 35, 8, 403, 35, 35);
					break;
				case 'off':
					cutAt = 0;
					ctx.drawImage(pictures.valve, cutAt, 0, 35, 35, 8, 403, 35, 35);
					break;
				case 'manual':
					cutAt = comp.getInternalFlag() == 'on' ? 70 : 0;
					comp.setInternalFlag(comp.getInternalFlag() == 'on' ? 'off' : 'on');
					ctx.drawImage(pictures.valve, cutAt, 0, 35, 35, 8, 403, 35, 35);
					break;
				default:
					break;
			}
		});

		valvularDirecional_2.onDraw((comp) => {
			let cutAt = 0;
			switch (comp.getStatus()) {
				case 'on':
					cutAt = comp.getInternalFlag() == 'on' ? 35 : 0;
					comp.setInternalFlag(comp.getInternalFlag() == 'on' ? 'off' : 'on');
					ctx.drawImage(pictures.valve, cutAt, 0, 35, 35, 154.5, 602, 35, 35);
					break;
				case 'off':
					cutAt = 0;
					ctx.drawImage(pictures.valve, cutAt, 0, 35, 35, 50, 603, 35, 35);
					break;
				case 'manual':
					cutAt = comp.getInternalFlag() == 'on' ? 70 : 0;
					comp.setInternalFlag(comp.getInternalFlag() == 'on' ? 'off' : 'on');
					ctx.drawImage(pictures.valve, cutAt, 0, 35, 35, 50, 603, 35, 35);
					break;
				default:
					break;
			}
		});

		motorBomba.onDraw((comp) => {
			let cutAt = 0;
			switch (comp.getStatus()) {
				case 'on':
					cutAt = comp.getInternalFlag() == 'on' ? 35 : 0;
					comp.setInternalFlag(comp.getInternalFlag() == 'on' ? 'off' : 'on');
					ctx.drawImage(pictures.motorBomba, cutAt, 0, 35, 35, 7, 601, 35, 35);
					break;
				case 'off':
					cutAt = 0;
					ctx.drawImage(pictures.motorBomba, cutAt, 0, 35, 35, 7, 601, 35, 35);
					break;
				case 'manual':
					cutAt = comp.getInternalFlag() == 'on' ? 70 : 0;
					comp.setInternalFlag(comp.getInternalFlag() == 'on' ? 'off' : 'on');
					ctx.drawImage(pictures.motorBomba, cutAt, 0, 35, 35, 7, 601, 35, 35);
					break;
				default:
					break;
			}
		});

		subscribe(resistenciaPrincipal);
		subscribe(resistenciaCaldeira);
		subscribe(valvularDirecional_1);
		subscribe(valvularDirecional_2);
		subscribe(motorBomba);

		valvularDirecional_1.setStatus('on');
		valvularDirecional_2.setStatus('on');
		resistenciaPrincipal.setStatus('on');
		resistenciaCaldeira.setStatus('on');
		motorBomba.setStatus('on');
	};

	/**
	 * Draw the plan monitor
	 */
	let cutAtWaterUp = 0;
	let cutAtWaterDown = 42;
	let waterSpeed = 10;
	let speedCount = 0;
	const draw = () => {
		if (speedCount % waterSpeed == 0) {
			ctx.clearRect(22, 438, 7, 164);
			ctx.drawImage(pictures.water_v, cutAtWaterUp, 0, 7, 164, 22, 438, 7, 164);

			ctx.clearRect(22, 278, 7, 124);
			ctx.drawImage(pictures.water_v, cutAtWaterUp, 0, 7, 124, 22, 278, 7, 124);

			ctx.clearRect(99, 277, 7, 50);
			ctx.drawImage(pictures.water_v, cutAtWaterDown, 0, 7, 50, 99, 277, 7, 50);

			ctx.clearRect(168, 573, 7, 29);
			ctx.drawImage(pictures.water_v, cutAtWaterDown, 0, 7, 29, 168, 573, 7, 29);

			ctx.clearRect(316, 588, 7, 36);
			ctx.drawImage(pictures.water_v, cutAtWaterDown, 0, 7, 36, 316, 588, 7, 36);

			// Horizontal water
			ctx.clearRect(30, 277, 67, 7);
			ctx.drawImage(pictures.water_h, 0, cutAtWaterUp, 67, 7, 30, 277, 67, 7);

			//ctx.color = 'red';
			ctx.clearRect(43, 418, 45, 7);
			ctx.drawImage(pictures.water_h, 0, cutAtWaterUp, 45, 7, 43, 418, 45, 7);

			ctx.clearRect(43, 616.5, 110, 7);
			ctx.drawImage(pictures.water_h, 0, cutAtWaterDown, 110, 7, 43, 616.6, 110, 7);

			ctx.clearRect(190, 616.5, 125, 7);
			ctx.drawImage(pictures.water_h, 0, cutAtWaterDown, 125, 7, 190, 616.5, 125, 7);
			//ctx.drawImage(pictures.water_h, 0, cutAtWaterUp, 67, 7, 30, 277, 67, 7);

			cutAtWaterUp = cutAtWaterUp == 35 ? 0 : cutAtWaterUp + 7;
			cutAtWaterDown = cutAtWaterDown == 0 ? 35 : cutAtWaterDown - 7;
		}

		notifyAll();
		requestAnimationFrame(draw);
		speedCount = speedCount == 60 ? 0 : speedCount + 1;
	};

	return {
		init,
		setContext,
		draw,
		setStatus,
	};
}

/**
 * Object to monitore the screen components
 */
function controlComponent(parameters) {
	this.id = '';
	this.status = 'not-called';
	this.callBack = null;
	this.internalFlag;
	this.actualState = 0;
	this.speed = 60;

	if (parameters) {
		if (parameters.id) this.id = parameters.id;
		if (parameters.speed) this.speed = parameters.speed;
	}

	const getId = () => {
		return this.id;
	};

	/**
	 * Sets the speed of animation
	 */
	const setAnimationSpeed = (sp) => {
		this.speed = sp;
	};

	/**
	 * Sets the speed of animation
	 */
	this.setInternalFlag = (intf) => {
		this.internalFlag = intf;
	};

	/**
	 * Gets the speed of animation
	 */
	this.getInternalFlag = () => {
		return this.internalFlag;
	};

	/**
	 * Set the status of the component
	 */
	const setStatus = (st) => {
		this.status = st;
	};

	/**
	 * Get the status of the component
	 */
	this.getStatus = () => {
		return this.status;
	};

	/**
	 * Ondraw event
	 */
	const onDraw = (cb) => {
		this.callBack = cb;
	};

	/**
	 * Runs the animation based on the speed
	 */
	const run = () => {
		this.actualState++;
		if (this.actualState >= this.speed) {
			this.callBack(this);
			this.actualState = 0;
		}
	};

	return {
		setStatus,
		setAnimationSpeed,
		onDraw,
		getId,
		run,
	};
}
