import { useState } from "react";

export function useLoading(initial: boolean) {
  const [isLoading, setLoading] = useState<boolean>(initial);

  return {
    isLoading,
    setLoading,
  };
}
