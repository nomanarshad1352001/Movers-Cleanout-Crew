import { useEffect, useState } from "react";
import { initLenis } from "./lib/core";
import { initReveals } from "./anim/reveal";
import { RouterProvider, useRouter } from "./lib/router";
import Cursor from "./components/Cursor";
import Preloader from "./components/Preloader";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import ProcessPage from "./pages/ProcessPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

function Pages({ ready }: { ready: boolean }) {
  const { path } = useRouter();

  /* re-scan for reveal elements whenever the route content mounts */
  useEffect(() => {
    if (!ready) return;
    const teardown = initReveals(document);
    return () => {
      teardown();
    };
  }, [ready, path]);

  switch (path) {
    case "/services":
      return <ServicesPage />;
    case "/process":
      return <ProcessPage />;
    case "/about":
      return <AboutPage />;
    case "/contact":
      return <ContactPage />;
    default:
      return <Home ready={ready} />;
  }
}

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initLenis();
  }, []);

  return (
    <div className="bg-cream font-sans text-ink antialiased">
      <RouterProvider>
        <Cursor />
        <Preloader onDone={() => setReady(true)} />
        <Nav ready={ready} />
        <main>
          <Pages ready={ready} />
        </main>
        <Footer />
        <div className="grain" aria-hidden="true" />
      </RouterProvider>
    </div>
  );
}
