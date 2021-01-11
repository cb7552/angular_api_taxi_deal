export class ratingElement {
    private _checkedColor: string;
    //private _unCheckedColor: string;
    private _size: number;
    private _value: number;
    private _readOnly: boolean;

    get checkedcolor(): string {
        return this._checkedColor;
    }

   

    get value(): number {
        return this._value;
    }

    get size(): number {
        return this._size;
    }

    get readonly(): boolean {
        return this._readOnly;
    }

    set checkedcolor(value: string) {
        this._checkedColor = value;
    }

    
    set value(value: number) {
        this._value = value;
    }

    set size(value: number) {
        if (!value || value == null) {
            value = 24;
        }
        this._size = value;
    }

    set readonly(value: boolean) {
        this._readOnly = value;
    }

    constructor() {
        
    }
}