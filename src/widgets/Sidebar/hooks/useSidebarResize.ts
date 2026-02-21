import { useEffect, useRef } from 'react';

type SidebarResizeOptions = {
  value: number;
  enabled?: boolean;
  minWidth?: number;
  maxWidth?: number;
  onChange?: (width: number) => void;
};

const useSidebarResize = ({
  value,
  enabled = true,
  minWidth = 256,
  maxWidth = 512,
  onChange,
}: SidebarResizeOptions) => {
  const dragRef = useRef({
    isActive: false,
    startX: 0,
    startWidth: 0,
  });

  const resizable = enabled && typeof onChange === 'function';

  const onPointerDown = (event: React.PointerEvent) => {
    if (!resizable) {
      return;
    }

    event.preventDefault();
    document.body.style.userSelect = 'none';

    dragRef.current.isActive = true;
    dragRef.current.startX = event.clientX;
    dragRef.current.startWidth = value;

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent) => {
    if (!resizable || !dragRef.current.isActive) {
      return;
    }

    event.preventDefault();

    const width =
      dragRef.current.startWidth + event.clientX - dragRef.current.startX;
    const clamped = Math.max(minWidth, Math.min(width, maxWidth));
    onChange(clamped);
  };

  const stop = (event: React.PointerEvent) => {
    if (!resizable) {
      return;
    }

    dragRef.current.isActive = false;
    document.body.style.removeProperty('user-select');

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  useEffect(() => {
    return () => {
      document.body.style.removeProperty('user-select');
    };
  }, []);

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp: stop,
    onPointerCancel: stop,
  };
};

export default useSidebarResize;
