import { useEffect, useState } from "react";

export default function useActionWithLoading(action: (totalPages?: number) => void) {
  const [isActionStatus, setIsActionStatus] = useState(1);

  const actionWithLoading = () => {
    setIsActionStatus(2);
  };

  useEffect(() => {
    let timer = 0;
    if (isActionStatus === 2) {
      setIsActionStatus(3);
    }
    if (isActionStatus === 3) {
      action();
      timer = setTimeout(() => setIsActionStatus(4), 300);
    }
    if (isActionStatus === 4) {
      clearTimeout(timer);
      timer = setTimeout(() => setIsActionStatus(1), 2000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isActionStatus]);

  return {
    isLoading: isActionStatus === 2 || isActionStatus === 3 ? true : false,
    actionWithLoading,
  };
}
