import React, { useEffect, useRef } from 'react'

export const useIsMount = () => {
  const isMountRef = useRef(false)
  useEffect(() => {
    isMountRef.current = true
  }, [])
  return isMountRef.current
}
