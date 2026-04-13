import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks";
import {
  LoginPage,
  DashboardPage,
  DashboardHome,
  MasterHS,
  BC30,
  BC25,
  BC261,
  BC262,
  BC27Out,
  BC23CreateView,
  BC23ListView,
  BC23EditView,
  BC23View,
  BC23ViewPosting,
  BC23CopyView,
} from "./routeLoaders";

const RouteFallback = () => <div className="loading">Loading...</div>;

const withSuspense = (component: React.ReactNode) => (
  <Suspense fallback={<RouteFallback />}>{component}</Suspense>
);

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <div className="loading">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={withSuspense(<LoginPage />)} />
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          {withSuspense(<DashboardPage />)}
        </ProtectedRoute>
      }
    >
      <Route index element={withSuspense(<DashboardHome />)} />
        <Route path="masterHs" element={withSuspense(<MasterHS />)} />
        
        <Route path="peb/bc30" element={withSuspense(<BC30 />)} />
        {/* BC 23 */}
        <Route path="tpb/bc23" element={withSuspense(<BC23ListView />)} />
        <Route path="tpb/bc23/create" element={withSuspense(<BC23CreateView />)} />
        <Route path="tpb/bc23/edit" element={withSuspense(<BC23EditView />)} />
        <Route path="tpb/bc23/view" element={withSuspense(<BC23View />)} />
        <Route path="tpb/bc23/copy" element={withSuspense(<BC23CopyView />)} />
        <Route path="tpb/bc23/view/posting" element={withSuspense(<BC23ViewPosting />)} />

        <Route path="tpb/bc25" element={withSuspense(<BC25 />)} />
        <Route path="tpb/bc261" element={withSuspense(<BC261 />)} />
        <Route path="tpb/bc262" element={withSuspense(<BC262 />)} />
        <Route path="tpb/bc27out" element={withSuspense(<BC27Out />)} />
    </Route>
    <Route path="/" element={<Navigate to="/dashboard" replace />} />
    <Route path="*" element={<Navigate to="/dashboard" replace />} />
  </Routes>
);

export default AppRoutes;
