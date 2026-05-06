import type {
    AddContent,
    ControlButtons,
    ErrorMessage,
    HandleError
} from "../types";
import {
    useEffect,
    useState
} from "react"
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
    const [error, setError] = useState<ErrorMessage>(undefined)

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

    // check big number
    const isBigNumber = () => {
        if (monitor2 === "Infinity")
            return true;

        const number = monitor1
            .replaceAll(")", "")
            .split("(")
            .map(a => a.trim())
            .filter(a => a.match(/[0-9]/))
            .filter(a => !a.match(/1\//))[0];

        if (monitor1)
            if (monitor2 === "0" && number !== "0")
                return true;

        return false;
    }

    // inactive operators for error
    const handleError: HandleError = (content: string) => {
        if (error !== undefined) {
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

            return inactive_btns.includes(content)
        }

        setError(undefined);
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
        if (error) {
            setMonitor2("0");
            setMonitor1("");
            setResult("");
            setError(undefined)

            return;
        }

        else {
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
                setError(undefined)

                return;
            }

            // remove monitor2 and second number of monitor1
            if (content === "CE") {
                if (monitor1) {
                    if (
                        monitor1.startsWith("1/")
                        || monitor1.startsWith("sqr")
                        || monitor1.startsWith("²√")
                    ) {
                        setMonitor1("")
                    }

                    else {
                        const operator = monitor1
                            .split("")
                            .map(a => a.trim())
                            .filter(a => a.length > 0)
                            .filter(a => !a.match(/[0-9]/))[0];

                        setMonitor1(monitor1.split(operator)[0] + operator);
                    }
                }

                setMonitor2("0");
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
                                const proccess = (+monitor2 + +number).toString();
                                setMonitor2(proccess)
                                setResult(proccess);

                                setMonitor1(monitor2 + " " + operator + " " + number + " =");
                            }

                            else {
                                const proccess = (+number + +monitor2).toString();
                                setMonitor2(proccess)
                                setResult(proccess);
                            }

                            break;
                        }

                        case "−": {
                            // redo the proccess
                            if (monitor1.endsWith("=")) {
                                const number = monitor1.split(" ")[2]
                                const proccess = (+monitor2 - +number).toString();
                                setMonitor2(proccess)
                                setResult(proccess);

                                setMonitor1(monitor2 + " " + operator + " " + number + " =");
                            }

                            else {
                                const proccess = (+number - +monitor2).toString();
                                setMonitor2(proccess)
                                setResult(proccess);
                            }

                            break;
                        }

                        case "×": {
                            // redo the proccess
                            if (monitor1.endsWith("=")) {
                                const number = monitor1.split(" ")[2]
                                const proccess = (+monitor2 * +number).toString();
                                setMonitor2(proccess)
                                setResult(proccess);

                                setMonitor1(monitor2 + " " + operator + " " + number + " =");
                            }

                            else {
                                const proccess = (+number * +monitor2).toString();
                                setMonitor2(proccess)
                                setResult(proccess);
                            }

                            break;
                        }

                        case "÷": {
                            // redo the proccess
                            if (monitor1.endsWith("=")) {
                                const number = monitor1.split(" ")[2]
                                if (number === "0")
                                    setError("Cannot divide by zero!")

                                else {
                                    const proccess = (+monitor2 / +number).toString();
                                    setMonitor2(proccess)
                                    setResult(proccess);

                                    setMonitor1(monitor2 + " " + operator + " " + number + " =");
                                }
                            }

                            else {
                                if (monitor2 === "0")
                                    setError("Cannot divide by zero!")

                                else {
                                    const proccess = (+number / +monitor2).toString();
                                    setMonitor2(proccess)
                                    setResult(proccess);
                                }
                            }

                            break;
                        }
                    }
                }

                if (monitor1.slice(-1)[0] !== "=")
                    setMonitor1(monitor1 + " " + monitor2 + " =");

                if (isInvalid()) {
                    setError("Invalid Input!")

                    return;
                }

                if (isBigNumber()) {
                    setError("Overflow!")

                    return;
                }

                return;
            }

            // جذر بر 2
            if (content === "²√x") {
                setMonitor1("²√( " + (monitor1 ? monitor1 : monitor2) + " )")

                const proccess = ((+monitor2) ** (1 / 2)).toString();
                setMonitor2(proccess)
                setResult(proccess);

                if (isBigNumber()) {
                    setError("Overflow!")

                    return;
                }

                return;
            }

            // توان 2 عدد
            if (content === "x²") {
                setMonitor1("sqr( " + (monitor1 ? monitor1 : monitor2) + " )")

                const proccess = ((+monitor2) ** 2).toString();
                setMonitor2(proccess)
                setResult(proccess);

                if (isBigNumber()) {
                    setError("Overflow!")

                    return;
                }

                return;
            }

            // تقسیم عدد بر یک
            if (content === "¹∕x") {
                setMonitor1("1/(" + (monitor1 ? monitor1 : monitor2) + ")")

                if (monitor2 == "0")
                    setError("Cannot divide by zero!")

                else {
                    const proccess = ((1 / +monitor2)).toString();
                    setMonitor2(proccess)
                    setResult(proccess);

                    if (isBigNumber()) {
                        setError("Overflow!")

                        return;
                    }
                }

                return;
            }

            // نسبت درصد گیری
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
                    setResult(
                        result
                    )
                    setMonitor1(number + " " + operator + " " + result)
                }

                else {
                    setMonitor1("0")
                    setMonitor2("0")
                    setResult("0")
                }

                return;
            }

            // فیلتر کردن عملگر ها و افزودن به مانیتور 1
            if (isOperator(content)) {
                setMonitor1(monitor2 + " " + content);
                setResult(monitor2)

                return;
            }
        }

        return;
    }

    // افزودن عملگر یا عدد به مانیتور 2 و یا نمایش نتیجه
    const addContent: AddContent = (content) => {
        // فیلتر کردن دکمه های کنترلی گه برای نمایش خروجی هستن و یا پاک سازی مانیتور
        if (isController(content)) {
            controllerHandle(content)

            return;
        }

        // استفاده از اعشار
        if (content === ".") {
            if (monitor2 === "0") {
                setMonitor2("0.")

                return;
            }

            if (monitor2.includes(".")) {
                return;
            }
        }

        // منفی/مثبت کردن
        if (content === "+/-") {
            setMonitor2((+monitor2 * -1).toString())

            return;
        }

        // شرط وجود داشتن صفر در مانیتور برای حذفش در مانیتور
        if (monitor2 === "0") {
            setMonitor2(content);

            return
        }

        else {
            // هندل و نمایش ارور
            if (error) {
                setError(undefined)
                setResult("")
                setMonitor1("")
                setMonitor2(content);
            }

            else {
                // در صورت وجود نداشتن ارور محتوا به مانیتور اضافه شود
                // به شرطی محتوا عوض شود که اگر ورودی . بود به اعشار شود یعنی "0." و اگر نبود خود ورودی ثبت شود
                // این شرط فقط برای محتوایی هست که بعد از نمایش نتیحه = برای وارد کردن محتوای جدید هست
                if (result && result === monitor1.split(" ")[0]) {
                    setResult("")

                    if (content === ".")
                        setMonitor2("0.");

                    else
                        setMonitor2(content);

                }

                // اضافه کردن عدد جدید به عدد قبلی مانیتور2
                else {
                    if (monitor1) {
                        if (
                            monitor1.startsWith("1/")
                            || monitor1.startsWith("sqr")
                            || monitor1.startsWith("²√")
                        ) {
                            setResult("")
                            setMonitor1("")
                            setMonitor2(content)
                        }
                    }

                    else {
                        setResult("")
                        setMonitor2(monitor2 + content);
                    }
                }
            }
        }

        return;
    }

    // هندل کردن و نمایش ارور درصورت وجود ارور و در غیر این صورت حذف ارور
    // فعال شدن در صورت تغییر error
    useEffect(() => {
        if (error !== undefined) {
            setMonitor2(error)
        }

        else {
            setError(undefined)
        }
    }, [error])

    useEffect(() => {
        setResult(monitor2)
        if (isBigNumber()) {
            setError("Overflow!")

            return;
        }
    }, [monitor2, result])

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
                        handleError={handleError}
                        addContent={addContent}
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
