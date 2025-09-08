export const withWindowDebug = <T extends object>(manager: T, debugKey: string): T => {
      (window as any)[debugKey] = manager;
    return manager;
  };