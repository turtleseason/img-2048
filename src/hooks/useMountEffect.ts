// https://stackoverflow.com/a/56767883
// Hook for effects that should only run once, when the component is mounted.

import { useEffect } from "react"

// eslint-disable-next-line react-hooks/exhaustive-deps
export const useMountEffect = (fn: any) => useEffect(fn, [])