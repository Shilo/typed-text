type AnimationTiming = {
    totalDurationMs: number;
    charactersToAnimate: number;
    idealIntervalPerCharacter: number;
};

const MIN_ANIMATION_INTERVAL_MS = 16;

export default class TypedText {
    public onUpdate?: (currentValue: string) => void;

    private _current: string = "";
    private _target: string = "";
    private _animationDurationSeconds: number = 1.0;
    private _animatePerCharacter: boolean = false;
    private _animationID: number | null = null;
    private _animationTiming: AnimationTiming | null = null;

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

    set animationDurationSeconds(value: number) {
        this._animationDurationSeconds = value;

        if (this._animationID !== null)
            this.startAnimation();
    }

    get animationDurationSeconds(): number {
        return this._animationDurationSeconds;
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
        return this._animationDurationSeconds >= 0;
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

        this.updateAnimationTiming();
        const charactersPerUpdate = this.getCharactersPerTick();

        this._animationID = setInterval(() => {
            const currentLength = this._current.length;
            const targetLength = this._target.length;

            if (currentLength === targetLength) {
                this.stopAnimation();
                return;
            }

            if (currentLength < targetLength) {
                const charsToAdd = Math.min(charactersPerUpdate, targetLength - currentLength);
                this.current += this._target.slice(currentLength, currentLength + charsToAdd);
            } else {
                const charsToRemove = Math.min(charactersPerUpdate, currentLength - targetLength);
                this.current = this._current.slice(0, -charsToRemove);
            }
        }, this.animationIntervalDelayMilliseconds);
    }

    private stopAnimation() {
        if (this._animationID === null) return;

        clearInterval(this._animationID);
        this._animationID = null;
        this._animationTiming = null;
    }

    private get animationIntervalDelayMilliseconds(): number {
        if (this._animatePerCharacter
            || !this._animationTiming)
            return this._animationDurationSeconds * 1000;

        const { totalDurationMs, charactersToAnimate, idealIntervalPerCharacter } = this._animationTiming;

        if (charactersToAnimate === 0)
            return totalDurationMs;

        if (idealIntervalPerCharacter >= MIN_ANIMATION_INTERVAL_MS)
            return idealIntervalPerCharacter;

        const charactersPerUpdate = this.getCharactersPerTick();
        const numberOfTicks = charactersToAnimate / charactersPerUpdate;
        const calculatedInterval = totalDurationMs / numberOfTicks;

        return Math.max(calculatedInterval, MIN_ANIMATION_INTERVAL_MS);
    }

    private getCharactersPerTick(): number {
        if (this._animatePerCharacter
            || !this._animationTiming)
            return 1;

        const { charactersToAnimate, idealIntervalPerCharacter, totalDurationMs } = this._animationTiming;

        if (charactersToAnimate === 0
            || idealIntervalPerCharacter >= MIN_ANIMATION_INTERVAL_MS)
            return 1;

        const charactersPerMinInterval = (MIN_ANIMATION_INTERVAL_MS * charactersToAnimate) / totalDurationMs;
        return Math.max(1, Math.ceil(charactersPerMinInterval));
    }

    private updateAnimationTiming(): void {
        const totalDurationMs = this._animationDurationSeconds * 1000;
        const charactersToAnimate = Math.abs(this._target.length - this._current.length);
        const idealIntervalPerCharacter = charactersToAnimate > 0
            ? totalDurationMs / charactersToAnimate
            : 0;

        this._animationTiming = {
            totalDurationMs,
            charactersToAnimate,
            idealIntervalPerCharacter
        };
    }
}