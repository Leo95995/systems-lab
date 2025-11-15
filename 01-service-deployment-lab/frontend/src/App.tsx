// Types
import { Routes, Route } from "react-router";
// Components

import { Routes as AppRoutes } from "./routes/routes";
import Home from "./pages/home";
import DocsPage from "./pages/docs";
import PageLayout from "./components/Layout/pageLayout";
import Archive from "./pages/archive";

function App() {
  return (
    <>
      <PageLayout>
        <Routes>
          <Route index path={AppRoutes.home} element={<Home />} />

          <Route
            index
            path={AppRoutes.api}
            element={
              <>
                <DocsPage />
              </>
            }
          />
           <Route
            index
            path={AppRoutes.archive}
            element={
              <>
                <Archive/>
              </>
            }
          />
        </Routes>
      </PageLayout>
    </>
  );
}

export default App;
