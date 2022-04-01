import React from "react";

const HookUseLayoutEffect = React.lazy(() =>
  import("src/hooks/useLayoutEffect")
);
const MemoDemo = React.lazy(() => import("@components/MemoDemo"));

export default function ReactPage() {
  return (
    <>
      <HookUseLayoutEffect />

      <p>【性能优化】使用memo或PureComponent前的思考</p>
      <MemoDemo />
    </>
  );
}
