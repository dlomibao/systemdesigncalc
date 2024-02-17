import {Parser} from "expr-eval";

export interface Rule {
    search: string;
    replace: string;
    comment?: string | null;
    order?:number|null;//lower numbers first. TODO implement
}

export class CalcCore {

    private _postprocessRules: Rule[];
    private _parser: Parser;
    private _preprocessRules: Rule[];

    constructor() {
        this._parser = new Parser();
        this._preprocessRules = [
            {search: "/x/g", replace: "*"},
            {search: "=", replace: ""},
            {search: "/%/g", replace: "e-2 "},
            {search: "/KB/g", replace: "e3 "},
            {search: "/MB/g", replace: "e6 "},
            {search: "/GB/g", replace: "e9 "},
            {search: "/Kb/g", replace: "e3/8 "},
            {search: "/Mb/g", replace: "e6/8 "},
            {search: "/Gb/g", replace: "e9/8 "},
            {search: "/ms/g", replace: "e-3 "},
            {search: "/us/g", replace: "e-6 "},
            {search: "/ns/g", replace: "e-9 "},
            {search: "/s/g", replace: " "},
            {search: "/B/g", replace: "e9 "},
            {search: "/M/g", replace: "e6 "},
            {search: "/K/g", replace: "e3 "}
        ]
        this._postprocessRules = []

    }

    public calculate(text: string): string {
        try {
            var input = this.preprocess(text)
            var result = this._parser.parse(input).evaluate() + ''
            return this.postprocess(result)
                ;
        } catch (error) {
            // @ts-ignore
            console.error('Error in calculation:', error.message);
            return ''; // Return null for invalid expressions
        }
        return ''
    }

    private preprocess(text: string): string {
        for (const rule of this._preprocessRules) {
            try {
                text = text.replace(rule.search, rule.replace)
            } catch (e) {
                console.log(`failed to process rule: search:${rule.search}, replace:${rule.replace} for text ${text}`)
                console.error(e)
            }
        }
        return text
    }

    private postprocess(text: string): string {
        for (const rule of this._postprocessRules) {
            try {
                text = text.replace(rule.search, rule.replace)
            } catch (e) {
                console.log(`failed to process rule: search:${rule.search}, replace:${rule.replace} for text ${text}`)
                console.error(e)
            }
        }
        return text
    }

    get preprocessRules(): Rule[] {
        return this._preprocessRules;
    }

    set preprocessRules(value: Rule[]) {
        this._preprocessRules = value;
    }

    get postprocessRules(): Rule[] {
        return this._postprocessRules;
    }

    set postprocessRules(value: Rule[]) {
        this._postprocessRules = value;
    }
}