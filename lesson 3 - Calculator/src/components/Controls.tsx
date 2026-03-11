import type { ControlHook } from "../types";

export default function Controls({ controls, addContent, handleError }: ControlHook) {
    const gen_controls =
        controls
            .map((content, index) => {
                if (!Array.isArray(content)) {
                    return <button
                        className="btn text-2xl rounded-xl text-(--calc-text) font-bold select-none cursor-pointer bg-(--calc-btn-operator) w-20 h-15 last:bg-(--calc-btn-operator-equl)"
                        onClick={() => addContent(content)}
                        key={index}
                        disabled={handleError(content)}
                    >
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