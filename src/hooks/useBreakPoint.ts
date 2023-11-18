import useResponsiveObserver, { Breakpoint } from "antd/es/_util/responsiveObserver";
import { useEffect, useState } from "react";

export const useBreakPoint = () => {
    const [breakPoint, setBreakPoint] = useState<Partial<Record<Breakpoint, boolean>>>();
    const responsiveObserver = useResponsiveObserver();

    useEffect(() => {
        const observer = responsiveObserver.subscribe((responsiveObject) => setBreakPoint(responsiveObject));

        return (() => {
            responsiveObserver.unsubscribe(observer);
        })

    }, [responsiveObserver]);

    return breakPoint;
}