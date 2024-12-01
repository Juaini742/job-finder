"use client";

import { Provider } from "react-redux";
import React, { useRef } from "react";
import { AppStore, makeStore } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { LineWave } from "react-loader-spinner";

export default function ReduxConfig({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  const persistor = persistStore(storeRef.current);

  return (
    <Provider store={storeRef.current}>
      <PersistGate
        loading={
          <div className="h-screen w-full flex flex-col justify-center items-center">
            <LineWave
              visible={true}
              height="200"
              width="200"
              color="#2563eb"
              ariaLabel="line-wave-loading"
              wrapperStyle={{}}
              wrapperClass=""
              firstLineColor=""
              middleLineColor=""
              lastLineColor=""
            />
          </div>
        }
        persistor={persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}
