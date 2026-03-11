import type { MonitorHook } from "../types";

export default function Monitor({ monitor1, monitor2 }: MonitorHook) {
    return (
        <div className="monitor-shadow bg-black rounded-xl text-(--calc-text) w-86">
            <input className="text-xl w-full px-3.5 pt-2 text-left" type="text" disabled value={monitor1} name="monitor 1" />

            <input className="text-4xl w-full px-5 pb-4 text-right" type="text" disabled value={monitor2} name="monitor 2" />
        </div>
    )
}