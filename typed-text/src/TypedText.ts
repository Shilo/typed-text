export default class TypedText {
    public onUpdate?: (currentValue: string) => void;

    private _current: string = "";
    private _target: string = "";
    private _animationID: number | null = null;
    private _animationSpeedSeconds: number = 1.0;
    private _animatePerCharacter: boolean = false;

    constructor(initialValue: string = "", onUpdate?: (value: string) => void) {
        this.onUpdate = onUpdate;
        this.current = this._target = initialValue;
    }

    set target(value: string) {
        if (this._target === value) return;

        this._target = value;

        // If the current and target are not derived from the same text,
        // restart the animation from an empty string.
        if (!this.isCurrentAndTargetRelated)
            this.current = "";

        this.startAnimation();
    }

    get target() {
        return this._target;
    }

    private set current(value: string) {
        if (this._current === value) return;

        this._current = value;
        this.onUpdate?.(value);
    }

    get current() {
        return this._current;
    }

    set animationSpeedSeconds(value: number) {
        this._animationSpeedSeconds = value;

        if (this._animationID !== null)
            this.startAnimation();
    }

    get animationSpeedSeconds(): number {
        return this._animationSpeedSeconds;
    }

    set animatePerCharacter(value: boolean) {
        this._animatePerCharacter = value;

        if (this._animationID !== null)
            this.startAnimation();
    }

    get animatePerCharacter(): boolean {
        return this._animatePerCharacter;
    }

    get isAnimatable(): boolean {
        return this._animationSpeedSeconds >= 0;
    }

    get isAnimating(): boolean {
        return this._animationID !== null;
    }

    private get isCurrentAndTargetRelated() {
        if (this._current.length < this._target.length) {
            if (this._target.startsWith(this._current))
                return true;
        }
        else {
            if (this._current.startsWith(this._target))
                return true;
        }

        return false;
    }

    toString() {
        return this._current;
    }

    private startAnimation() {
        this.stopAnimation();

        if (this._current === this._target)
            return;

        if (!this.isAnimatable) {
            this.current = this._target;
            return;
        }

        this._animationID = setInterval(() => {
            const currentLength = this._current.length;
            const targetLength = this._target.length;

            if (currentLength === targetLength) {
                this.stopAnimation();
                return;
            }

            this.current = currentLength < targetLength ?
                this._current + this._target[currentLength] :
                this._current.slice(0, -1);
        }, this.animationIntervalDelayMilliseconds);
    }

    private get animationIntervalDelayMilliseconds(): number {
        if (this._animatePerCharacter)
            return this._animationSpeedSeconds * 1000;

        const charactersToAnimate = Math.abs(this._target.length - this._current.length);

        if (charactersToAnimate === 0) {
            return this._animationSpeedSeconds * 1000;
        }

        return (this._animationSpeedSeconds * 1000) / charactersToAnimate;
    }

    private stopAnimation() {
        if (this._animationID === null) return;

        clearInterval(this._animationID);
        this._animationID = null;
    }
}