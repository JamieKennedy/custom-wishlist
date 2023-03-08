import { RouterProvider } from "react-router";
import Footer from "./Components/PageElements/Footer";
import { router } from "./Router";

function App() {
    return (
        <div className="relative flex h-full min-h-screen w-screen bg-hexagon bg-cover bg-fixed">
            <RouterProvider router={router} />
            <Footer />
        </div>
    );
}

export default App;
