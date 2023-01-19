import { Route, Routes } from "react-router-dom";
import { Layout } from "./components";
import { withAuthRedirect } from "./hocs/with-auth-redirect";
import { LoginPage, DiscoverPage, DiscussionPage, NotFound } from "./pages";

const DiscoverRoute = withAuthRedirect(DiscoverPage);
const DiscussionRoute = withAuthRedirect(DiscussionPage);

function App() {
  return (
    <Layout>
      <Routes>
        <Route index element={<DiscoverRoute />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="discussion" element={<DiscussionRoute />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
