import { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./store";
import "./i18n";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
// import { ReactQueryDevtools } from "react-query/devtools";
import { SENTRY_DSN } from "utils/constant";

Sentry.init({
  dsn: SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, cacheTime: 0, retry: false },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <HelmetProvider>
      <StrictMode>
        <Suspense fallback={<></>}>
          <QueryClientProvider client={queryClient}>
            <Router>
              <App />
            </Router>
            {/* {process.env.REACT_APP_REACT_QUERY_DEVTOOLS === "true" && (
              <ReactQueryDevtools initialIsOpen={false} />
            )} */}
          </QueryClientProvider>
        </Suspense>
      </StrictMode>
    </HelmetProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
