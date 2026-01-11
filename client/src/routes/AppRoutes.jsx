import { Routes, Route, Navigate } from "react-router-dom";

/* ================= PUBLIC ================= */
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

/* ================= STUDENT ================= */
import StudentDashboard from "../pages/student/Dashboard";
import StudentCourses from "../pages/student/Courses";
import CourseDetail from "../pages/student/CourseDetail";
import LessonPlayer from "../pages/student/LessonPlayer";

/* ================= EDUCATOR ================= */
import EducatorDashboard from "../pages/educator/Dashboard";
import CreateCourse from "../pages/educator/CreateCourse";
import ManageCourse from "../pages/educator/ManageCourse";
import AddLesson from "../pages/educator/AddLesson";

/* ================= ROUTE GUARDS ================= */
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ================= PUBLIC ROUTES ================= */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ================= STUDENT ROOT ================= */}
      <Route
        path="/student"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["student"]}>
              <Navigate to="/student/dashboard" replace />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      {/* ================= STUDENT ROUTES ================= */}
      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/courses"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["student"]}>
              <StudentCourses />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/courses/:courseId"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["student"]}>
              <CourseDetail />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/courses/:courseId/lessons/:lessonId"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["student"]}>
              <LessonPlayer />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      {/* ================= EDUCATOR ROOT ================= */}
      <Route
        path="/educator"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["educator"]}>
              <Navigate to="/educator/dashboard" replace />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      {/* ================= EDUCATOR ROUTES ================= */}
      <Route
        path="/educator/dashboard"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["educator"]}>
              <EducatorDashboard />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/educator/create-course"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["educator"]}>
              <CreateCourse />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/educator/courses/:courseId"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["educator"]}>
              <ManageCourse />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/educator/courses/:courseId/add-lesson"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["educator"]}>
              <AddLesson />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      {/* ================= FALLBACK ================= */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
