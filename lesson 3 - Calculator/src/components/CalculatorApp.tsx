import { useRef, useState } from "react"

export default function CalculatorApp() {

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

    const numbers =
        [
            ["7", "8", "9"],
            ["4", "5", "6"],
            ["1", "2", "3"],
            ["+/-", "0", "."]
        ];

    const [monitor1, setMonitor1] = useState<string>("");
    const [monitor2, setMonitor2] = useState<string>("0")

    const [result, setResult] = useState<string>("")

    const isOperator = (content: string) => {
        const operators = [...controls.filter(value => !Array.isArray(value) && !["←", "="].includes(value))];

        return operators.includes(content)
    }

    const isController = (content: string) => {
        const real_controls = [...controls.filter(value => !Array.isArray(value))];

        controls
            .filter(value => Array.isArray(value))
            .map(value => {
                value.map(content => real_controls.push(content))
            })

        return real_controls.includes(content)
    }

    const controllerHandle = (content: string) => {
        if (content === "←") {
            setMonitor2(monitor2.slice(0, -1));

            return;
        }

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

        if (content === "=") {
            if (!monitor1)
                setResult(monitor2)

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

                    case "-": {
                        setMonitor2(
                            (+number - +monitor2)
                                .toString()
                        )

                        break;
                    }
                }
            }

            if (result)
                setMonitor2(result)

            if (monitor1.slice(-1)[0] !== "=")
                setMonitor1(monitor1 + " " + monitor2 + " =");

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
            if (!monitor2) {
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
            if (content === result) {
                setResult("")
                setMonitor2(content);
            }

            else {
                setMonitor2(monitor2 + content);
            }
        }

        return;
    }

    const Monitor = () => {
        return (
            <div className="bg-amber-900 rounded-xs text-amber-100 py-2 h-20">
                <input className="text-xl pb-1 w-full px-3.5 text-left" type="text" disabled value={monitor1} />
                <input className="text-3xl w-full px-2 text-right" type="text" disabled value={monitor2} />
            </div>
        )
    }

    const Numbers = () => {
        const gen_numbers =
            numbers
                .map((value) =>
                    <div className="flex gap-2">
                        {
                            value.map((content) => (
                                <button className="text-2xl rounded-xs text-amber-100 select-none cursor-pointer bg-amber-900 w-20 h-15" onClick={() => addContent(content)}>
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
                        .map(value =>
                            <div className="flex gap-2">
                                {
                                    value.map(content =>
                                        <button className="text-2xl rounded-xs text-amber-100 select-none cursor-pointer bg-amber-950 w-20 h-15" onClick={() => addContent(content)}>
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
                .map((content) => {
                    if (!Array.isArray(content)) {
                        return <button className="text-2xl rounded-xs text-amber-100 select-none cursor-pointer bg-amber-950 w-20 h-15 last:bg-blue-600" onClick={() => addContent(content)}>
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

            <section className="flex flex-col p-10 gap-2">
                {/* Monitor */}
                <Monitor />

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
