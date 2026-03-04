import { useState } from "react"

export default function CalculatorApp() {

    // math controls
    const controls =
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

    // monitor1 is for math showing numbers proccess
    const [monitor1, setMonitor1] = useState<string>("");
    // monitor2 is for showing input
    const [monitor2, setMonitor2] = useState<string>("0")

    // save proccess result to add monitor2
    const [result, setResult] = useState<string>("")

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
            if (monitor2.length < 2) {
                setMonitor2("0");

                return;
            }

            setMonitor2(monitor2.slice(0, -1));

            return;
        }

        // remove all proccesses
        if (content === "C") {
            setMonitor2("0");
            setMonitor1("");
            setResult("")

            return;
        }

        if (content === "CE") {
            setMonitor2("0");

            return;
        }

        // show the proccess
        if (content === "=") {
            if (!monitor1) {
                setResult(monitor2)
            }

            else {
                const operator = monitor1.slice(-1);
                const number = monitor1.split(" ")[0]

                switch (operator) {
                    case "+": {
                        setMonitor2(
                            (+number + +monitor2)
                                .toString()
                        )

                        break;
                    }

                    case "−": {
                        setMonitor2(
                            (+number - +monitor2)
                                .toString()
                        )

                        break;
                    }

                    case "×": {
                        setMonitor2(
                            (+number * +monitor2)
                                .toString()
                        )

                        break;
                    }

                    case "÷": {
                        setMonitor2(
                            (+number / +monitor2)
                                .toString()
                        )

                        break;
                    }
                }
            }

            if (monitor1.slice(-1)[0] !== "=")
                setMonitor1(monitor1 + " " + monitor2 + " =");

            return;
        }

        if (content === "²√x") {
            setMonitor1("²√" + monitor2)
            setMonitor2(
                ((+monitor2) ** (1 / 2)).toString()
            )

            return;
        }


        if (isOperator(content)) {
            setMonitor1(monitor2 + " " + content);
            setResult(monitor2)

            return;
        }

        return;
    }

    const addContent = (content: string) => {
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
            if (result && result === monitor1.split(" ")[0]) {
                setResult("")
                setMonitor2(content);
            }

            else {
                setResult("")
                setMonitor2(monitor2 + content);
            }
        }

        return;
    }

    const Monitor = () => {
        return (
            <div className="bg-black rounded-xl text-amber-100 w-86">
                <input className="text-xl w-full px-3.5 pt-2 text-left" type="text" disabled value={monitor1} name="monitor 1" />

                <input className="text-4xl w-full px-5 pb-4 text-right" type="text" disabled value={monitor2} name="monitor 2" />
            </div>
        )
    }

    const Numbers = () => {
        const gen_numbers =
            numbers
                .map((value, index) =>
                    <div className="flex gap-2" key={index}>
                        {
                            value.map((content, index) => (
                                <button className="btn text-2xl rounded-xl text-amber-100 font-bold select-none cursor-pointer bg-amber-900 w-20 h-15" onClick={() => addContent(content)} key={index}>
                                    {content}
                                </button>
                            ))
                        }
                    </div>
                )

        return (
            <div className="gap-2 flex flex-col">
                {
                    controls
                        .filter(content => Array.isArray(content))
                        .map((value, index) =>
                            <div className="flex gap-2" key={index}>
                                {
                                    value.map((content, index) =>
                                        <button className="btn text-2xl rounded-xl text-amber-100 font-bold select-none cursor-pointer bg-amber-950 w-20 h-15" onClick={() => addContent(content)} key={index}>
                                            {content}
                                        </button>
                                    )
                                }
                            </div>
                        )
                }

                {gen_numbers}
            </div>
        );
    }

    const Controls = () => {
        const gen_controls =
            controls
                .map((content, index) => {
                    if (!Array.isArray(content)) {
                        return <button className="btn text-2xl rounded-xl text-amber-100 font-bold select-none cursor-pointer bg-amber-950 w-20 h-15 last:bg-blue-600" onClick={() => addContent(content)} key={index}>
                            {content}
                        </button>
                    }
                })


        return (
            <div className="flex flex-col gap-2">
                {gen_controls}
            </div>
        );
    }

    return (
        <>
            <h1 className="text-center font-bold text-2xl">Calculator App</h1>

            <section className="bg-gray-500 shadow-inner shadow-black m-8 rounded-3xl flex flex-col p-10 gap-2 items-center">
                {/* Monitor */}
                <Monitor />

                {/* Buttons */}
                <div className="flex felx-col items-end gap-2">
                    {/* Numbers */}
                    <Numbers />

                    {/* Controls */}
                    <Controls />
                </div>
            </section>
        </>
    )
}
