import type { NumbersHook } from "../types";

export default function Numbers({
    controls,
    numbers,
    addContent,
    handleError
}: NumbersHook) {
    const gen_numbers =
        numbers
            .map(
                (value, index) =>
                    <div className="flex gap-2" key={index}>
                        {
                            value.map(
                                (content, index) => (
                                    <button
                                        className="btn text-2xl rounded-xl text-(--calc-text) font-bold select-none cursor-pointer bg-(--calc-btn-num) w-20 h-15"
                                        onClick={() => addContent(content)}
                                        key={index}
                                        disabled={handleError(content)}
                                    >
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
                    .map(
                        (value, index) =>
                            <div className="flex gap-2" key={index}>
                                {
                                    value.map((content, index) =>
                                        <button
                                            className="btn text-2xl rounded-xl text-(--calc-text) font-bold select-none cursor-pointer bg-(--calc-btn-operator) w-20 h-15"
                                            onClick={() => addContent(content)}
                                            key={index}
                                            disabled={handleError(content)}
                                        >
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