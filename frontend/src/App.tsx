import { useAtom } from "jotai";
import { RouterProvider } from "react-router";
import Footer from "./Components/PageElements/Footer";
import Header from "./Components/PageElements/Header";
import { router } from "./Router";
import { AppStateAtom } from "./State/AppState";

function App() {
    const [appState] = useAtom(AppStateAtom);

    return (
        <div className='relative flex h-full min-h-screen flex-col justify-between bg-hexagon bg-cover bg-fixed'>
            <RouterProvider router={router} />
            <Footer />
        </div>
    );
}

export default App;
