import type {
    AddContent,
    ControlButtons,
    HandleError
} from "../types";
import { useState } from "react"
import Controls from "../components/Controls";
import Numbers from "../components/Numbers";
import Monitor from "../components/Monitor";

export default function CalculatorApp() {

    // math controls
    const controls: ControlButtons =
        [
            ["%", "CE", "C"],
            ["¹∕x", "x²", "²√x"],
            "←",
            "÷",
            "×",
            "+",
            "−",
            "="
        ];

    // numbers and other controls (+/- & .)
    const numbers =
        [
            ["7", "8", "9"],
            ["4", "5", "6"],
            ["1", "2", "3"],
            ["+/-", "0", "."]
        ];

    // Check error
    const [error, setError] = useState<boolean>(false)

    // monitor1 is for math showing numbers proccess
    const [monitor1, setMonitor1] = useState<string>("");
    // monitor2 is for showing input
    const [monitor2, setMonitor2] = useState<string>("0")

    // save proccess result to add monitor2
    const [result, setResult] = useState<string>("")

    // check invalid result
    const isInvalid = () => {
        if (monitor2 === "NaN")
            return true;

        return false;
    }

    // inactive operators for error
    const handleError: HandleError = (content: string) => {
        const isGetAnError = ["NaN", "Invalid Input!", "Infinity"].includes(monitor2);
        if (isGetAnError) {
            const inactive_btns = [...controls.filter(value => !Array.isArray(value) && !["←", "="].includes(value))];

            controls
                .filter(value => Array.isArray(value))
                .map(value => {
                    value.map(content => !["C", "CE"].includes(content) && inactive_btns.push(content))
                })

            numbers
                .map(value => {
                    value.map(content => ["+/-", "."].includes(content) && inactive_btns.push(content))
                })

            if (
                monitor1.split(" ").some(a => ["÷ 0", "1/(0)"].includes(a))
            )
                setMonitor2("Cannot divide by zero!")

            else
                setMonitor2("Invalid Input!")

            setError(true)
            return inactive_btns.includes(content)
        }

        setError(false)
        return false;
    }

    // check the input is operator chars
    const isOperator = (content: string) => {
        const operators = [...controls.filter(value => !Array.isArray(value) && !["←", "="].includes(value))];

        return operators.includes(content)
    }

    // check the input is controller
    const isController = (content: string) => {
        const real_controls = [...controls.filter(value => !Array.isArray(value))];

        controls
            .filter(value => Array.isArray(value))
            .map(value => {
                value.map(content => real_controls.push(content))
            })

        return real_controls.includes(content)
    }

    // handling the controls button
    const controllerHandle = (content: string) => {
        // remove the chars
        if (content === "←") {
            // remove one char of number and change it to 0
            if (monitor2.length < 2) {
                setMonitor2("0");

                return;
            }

            // remome last chars of monitor2
            setMonitor2(monitor2.slice(0, -1));

            return;
        }

        // remove all proccesses
        if (content === "C") {
            setMonitor2("0");
            setMonitor1("");
            setResult("");

            return;
        }

        // remove monitor2 and second number of monitor1
        if (content === "CE") {
            const operator = monitor1.split(/[0-9]/)[1].trim();
            setMonitor2("0");
            if (
                !monitor1.startsWith("¹∕")
                || !monitor1.startsWith("sqr(")
            )
                setMonitor1(monitor1.split(operator)[0] + operator);
                
            setResult("");

            return;
        }

        // show the proccess
        if (content === "=") {
            // add monitor2 to result
            if (!monitor1) {
                setResult(monitor2)
            }

            else {
                const operator = monitor1.split(" ")[1];
                const number = monitor1.split(" ")[0]

                // make proocess with numbers
                switch (operator) {
                    case "+": {
                        // redo the proccess
                        if (monitor1.endsWith("=")) {
                            const number = monitor1.split(" ")[2]
                            setMonitor2(
                                (+monitor2 + +number)
                                    .toString()
                            )

                            setMonitor1(monitor2 + " " + operator + " " + number + " =");
                        }

                        else {
                            setMonitor2(
                                (+number + +monitor2)
                                    .toString()
                            )
                        }

                        break;
                    }

                    case "−": {
                        // redo the proccess
                        if (monitor1.endsWith("=")) {
                            const number = monitor1.split(" ")[2]
                            setMonitor2(
                                (+monitor2 - +number)
                                    .toString()
                            )

                            setMonitor1(monitor2 + " " + operator + " " + number + " =");
                        }

                        else {
                            setMonitor2(
                                (+number - +monitor2)
                                    .toString()
                            )
                        }

                        break;
                    }

                    case "×": {
                        // redo the proccess
                        if (monitor1.endsWith("=")) {
                            const number = monitor1.split(" ")[2]
                            setMonitor2(
                                (+monitor2 * +number)
                                    .toString()
                            )

                            setMonitor1(monitor2 + " " + operator + " " + number + " =");
                        }

                        else {
                            setMonitor2(
                                (+number * +monitor2)
                                    .toString()
                            )
                        }

                        break;
                    }

                    case "÷": {
                        // redo the proccess
                        if (monitor1.endsWith("=")) {
                            const number = monitor1.split(" ")[2]
                            setMonitor2(
                                (+monitor2 / +number)
                                    .toString()
                            )

                            setMonitor1(monitor2 + " " + operator + " " + number + " =");
                        }

                        else {
                            setMonitor2(
                                (+number / +monitor2)
                                    .toString()
                            )
                        }

                        break;
                    }
                }
            }

            if (monitor1.slice(-1)[0] !== "=")
                setMonitor1(monitor1 + " " + monitor2 + " =");

            if (isInvalid()) {
                setMonitor2("Invalid Input!")

                return;
            }

            return;
        }

        // 
        if (content === "²√x") {
            setMonitor1("²√( " + (monitor1 ? monitor1 : monitor2) + " )")
            setMonitor2(
                ((+monitor2) ** (1 / 2)).toString()
            )

            return;
        }

        // square the number
        if (content === "x²") {
            setMonitor1("sqr( " + (monitor1 ? monitor1 : monitor2) + " )")
            setMonitor2(
                ((+monitor2) ** 2).toString()
            )

            return;
        }

        if (content === "¹∕x") {
            setMonitor1("1/(" + (monitor1 ? monitor1 : monitor2) + ")")
            setMonitor2(
                ((1 / +monitor2)).toString()
            )

            return;
        }

        if (content === "%") {
            const operator = monitor1 && monitor1.split(/[0-9]/)[1].trim();
            const number = monitor1 && monitor1.split(operator)[0].trim();
            if (operator) {
                let result = ((+monitor2 * 1) / 100).toString();
                if (["+", "−"].includes(operator)) {
                    result = ((+monitor2 * +number) / 100).toString();
                }

                setMonitor2(
                    result
                )
                setMonitor1(number + " " + operator + " " + result)
            }

            else {
                setMonitor1("0")
                setMonitor2("0")
            }

            return;
        }

        // proccess the operators
        if (isOperator(content)) {
            setMonitor1(monitor2 + " " + content);
            setResult(monitor2)

            return;
        }

        return;
    }

    const addContent: AddContent = (content) => {
        if (isController(content)) {
            controllerHandle(content)

            return;
        }

        if (content === ".") {
            if (monitor2 === "0") {
                setMonitor2("0.")

                return;
            }

            if (monitor2.includes(".")) {
                return;
            }
        }

        if (content === "+/-") {
            setMonitor2((+monitor2 * -1).toString())

            return;
        }

        if (monitor2 === "0") {
            setMonitor2(content);

            return
        }

        else {
            // 
            if (result && result === monitor1.split(" ")[0]) {
                setResult("")

                if (content === ".")
                    setMonitor2("0.");

                else
                    setMonitor2(content);

            }

            else {
                setResult("")
                setMonitor2(monitor2 + content);
            }
        }

        return;
    }

    return (
        <>
            <h1 className="text-center font-bold text-2xl">Calculator App</h1>

            <section className="bg-(--calc-main) inner-shadow m-8 rounded-3xl flex flex-col p-10 gap-2 items-center">
                {/* Monitor */}
                <Monitor
                    monitor1={monitor1}
                    monitor2={monitor2}
                />

                {/* Buttons */}
                <div className="flex felx-col items-end gap-2">
                    {/* Numbers */}
                    <Numbers
                        addContent={addContent}
                        handleError={handleError}
                        controls={controls}
                        numbers={numbers}
                    />

                    {/* Controls */}
                    <Controls
                        addContent={addContent}
                        handleError={handleError}
                        controls={controls}
                    />
                </div>
            </section>
        </>
    )
}
