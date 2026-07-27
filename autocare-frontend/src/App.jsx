import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/layout/ScrollToTop";
import AppRoutes from "./routes/AppRoutes";


function App() {
    return (
        <>
            <Navbar />
            <ScrollToTop />
            <AppRoutes />
            <Footer />
        </>
    );
}

export default App;







