import { useEffect } from "react";
import { useAppDispatch } from "./store/hooks";
import { loadAccounts } from "./store/socialSlice";
import Dashboard from "./pages/Dashboard/Dashboard";

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadAccounts());
  }, [dispatch]);

  return (
    <div className="container-fluid container-lg py-3 py-md-4 px-3 px-md-4" style={{ overflowX: "hidden" }}>
      <h1 className="text-center mb-3 mb-md-4 fw-bold" style={{ fontSize: "clamp(1.25rem, 4vw, 1.75rem)" }}>
        Social Media Dashboard
      </h1>
        <Dashboard />
    </div>
  );
}
