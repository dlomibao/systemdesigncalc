import {Parser} from "expr-eval";

console.log("*** sysdesigncalc.js running ***")

const parser = new Parser();

function getSelectionText() {
    var text = "";
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


function calculateMath(text: string): string {
    var out = parser.parse(text).evaluate()
    return out + ""
}

function calculate(text: string): string | null {
    try {
        // Replace 'x' with '*' for multiplication
        text = text.replace(/x/g, '*');
        //text = text.replace("^","**");
        text = text.replace("=", '')
        text = text.replace(/%/g,'e-2 ')
        text = text.replace(/KB/g,'e3 ')
        text = text.replace(/MB/g,'e6 ')
        text = text.replace(/GB/g,'e9 ')
        text = text.replace(/Kb/g,'e3/8 ')
        text = text.replace(/Mb/g,'e6/8 ')
        text = text.replace(/Gb/g,'e9/8 ')
        text = text.replace(/ms/g,'e-3 ')
        text = text.replace(/us/g,'e-6 ')
        text = text.replace(/ns/g,'e-9 ')
        text = text.replace(/s/g,' ')
        text = text.replace(/B/g,'e9 ')
        text = text.replace(/M/g,'e6 ')
        text = text.replace(/K/g,'e3 ')




        // Evaluate the expression
        var result = calculateMath(text);//eval(text);

        // Check if the result is a valid number
        // if (isNaN(result) || !isFinite(result)) {
        //   throw new Error('Invalid expression');
        // }

        return result + "";
    } catch (error) {
        // @ts-ignore
        console.error('Error in calculation:', error.message);
        return null; // Return null for invalid expressions
    }
}

//chrome.runtime.onMessage.addListener()
function init() {
    console.log("derekinput")
    var input = document.createElement("input")
    input.id = "derekinput"
    document.body.appendChild(input)
    // input.addEventListener("click",(event)=>{
    //   console.log(event)
    // })
    document.addEventListener("keyup", (event) => {
            if (event.ctrlKey && event.key == ' '){


                var selectedText = getSelectionText()
                if (selectedText && selectedText.length > 3) {
                    console.log(getSelectionText())
                    // chrome.runtime.sendMessage({action:"textSelected",text:selectedText},response=>{
                    //   console.log("textSelectedResponse")
                    // })

                    if (true){//selectedText.trimEnd().endsWith("=")) {
                        console.log("run calculate")
                        var result = calculate(selectedText)
                        var equal="="
                        if(selectedText.trimEnd().endsWith("=")){
                            equal=''
                        }

                        console.log("calculate result" + result)
                        if (result != null) {
                            navigator.clipboard.writeText(selectedText +equal+ (parseFloat(result).toExponential().replace("e+0", ""))).then(
                                function () {
                                    //alert("yeah!"); // success
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
        }
    )

}

init()
