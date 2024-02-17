//import {Parser} from "expr-eval";
import {CalcCore} from "./CalcCore.ts";

console.log("*** sysdesigncalc.js running ***")

const calc = new CalcCore()

function getSelectionText(): string {
    let text = "";
    if (window.getSelection) {
        // @ts-ignore
        text = window.getSelection().toString();
        // @ts-ignore
    } else if (document.selection && document.selection.type != "Control") {
        // @ts-ignore
        text = document.selection.createRange().text;
    }
    return text;
}

function init(): void {
    console.log("derekinput")

    document.addEventListener("keyup", (event) => {
            if (event.ctrlKey && event.key == ' ') {


                var selectedText = getSelectionText()
                if (selectedText && selectedText.length > 3) {
                    console.log(selectedText)
                    console.log("run calculate")
                    var result = calc.calculate(selectedText)
                    var equal = "="
                    if (selectedText.trimEnd().endsWith("=")) {
                        equal = ''
                    }
                    console.log("calculate result" + result)
                    if (result != null) {
                        navigator.clipboard.writeText(selectedText + equal + (parseFloat(result).toExponential().replace("e+0", ""))).then(
                            function () {
                                console.log("text copied")
                            })
                            .catch(
                                function () {
                                    alert("err"); // error
                                });
                    }

                }
            }
        }
    )

}

init()
