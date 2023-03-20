import { useAtom } from "jotai";
import { RouterProvider } from "react-router";
import Footer from "./Components/PageElements/Footer";
import { HttpClientProvider } from "./Providers/HttpClientProvider";
import { router } from "./Router";
import { AppStateAtom } from "./State/AppState";

function App() {
    const [appState] = useAtom(AppStateAtom);

    return (
        <HttpClientProvider baseURL={appState.api.baseUrl}>
            <div className='relative flex h-full min-h-screen w-screen bg-hexagon bg-cover bg-fixed'>
                <RouterProvider router={router} />
                <Footer />
            </div>
        </HttpClientProvider>
    );
}

export default App;
