import React from "react";

const HookUseLayoutEffect = React.lazy(() =>
  import("@src/hooks/useLayoutEffect")
);

export default function ReactPage() {
  return (
    <div>
      <HookUseLayoutEffect />
    </div>
  );
}
