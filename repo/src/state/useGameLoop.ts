import { useEffect } from 'react';

import { useGameStore } from './gameStore';

const MAX_DELTA_SECONDS = 1;

export const useGameLoop = () => {
  useEffect(() => {
    const runOffline = () => {
      if (useGameStore.persist.hasHydrated()) {
        useGameStore.getState().applyOfflineProgress();
        return;
      }

      const unsub = useGameStore.persist.onFinishHydration(() => {
        useGameStore.getState().applyOfflineProgress();
      });

      return () => {
        unsub?.();
      };
    };

    const cleanupOffline = runOffline();

    let animationFrame: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, MAX_DELTA_SECONDS);
      lastTime = time;
      useGameStore.getState().tick(delta, Date.now());
      animationFrame = requestAnimationFrame(loop);
    };

    animationFrame = requestAnimationFrame((time) => {
      lastTime = time;
      loop(time);
    });

    return () => {
      if (cleanupOffline) {
        cleanupOffline();
      }
      cancelAnimationFrame(animationFrame);
    };
  }, []);
};
