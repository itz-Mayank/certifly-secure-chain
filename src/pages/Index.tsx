
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomePage from "@/pages/HomePage";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // This will modify the browser history, replacing the current entry
    // with our home path, ensuring we don't break the back button
    navigate("/", { replace: true });
  }, [navigate]);

  // Render the HomePage component directly so there's no flash of content
  return <HomePage />;
};

export default Index;
