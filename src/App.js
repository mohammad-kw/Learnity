import "./App.css";
import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import AnnouncementBanner from "./components/common/AnnouncementBanner";
import OpenRoute from "./components/core/Auth/OpenRoute";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/constants";
import BackToTop from "./components/common/BackToTop";
import Spinner from "./components/common/Spinner";

// Lazily loaded routes (code-splitting)
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const UpdatePassword = lazy(() => import("./pages/UpdatePassword"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const MyProfile = lazy(() => import("./components/core/Dashboard/MyProfile"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Error = lazy(() => import("./pages/Error"));
const Settings = lazy(() => import("./components/core/Dashboard/Settings"));
const EnrolledCourses = lazy(
  () => import("./components/core/Dashboard/EnrolledCourses"),
);
const Cart = lazy(() => import("./components/core/Dashboard/Cart"));
const AddCourse = lazy(() => import("./components/core/Dashboard/AddCourse"));
const MyCourses = lazy(() => import("./components/core/Dashboard/MyCourses"));
const EditCourse = lazy(() => import("./components/core/Dashboard/EditCourse"));
const Catalog = lazy(() => import("./pages/Catalog"));
const CourseDetails = lazy(() => import("./pages/CourseDetails"));
const AllCourses = lazy(() => import("./pages/AllCourses"));
const ViewCourse = lazy(() => import("./pages/ViewCourse"));
const VideoDetails = lazy(
  () => import("./components/core/ViewCourse/VideoDetails"),
);
const Instructor = lazy(
  () => import("./components/core/Dashboard/InstructorDashboard/Instructor"),
);
const PrivacyPolicy = lazy(() => import("./pages/privacypolicy"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const Report = lazy(() => import("./pages/Report"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const AddCategory = lazy(() => import("./pages/AddCategory"));
const AdminDashboard = lazy(() => import("./pages/Admin/AdminDashboard"));
const ManageUsers = lazy(() => import("./pages/Admin/ManageUsers"));
const ManageCourses = lazy(() => import("./pages/Admin/ManageCourses"));
const ManageMessages = lazy(() => import("./pages/Admin/ManageMessages"));
const ManageReviews = lazy(() => import("./pages/Admin/ManageReviews"));
const ManageInstructors = lazy(() => import("./pages/Admin/ManageInstructors"));
const ManageAnnouncements = lazy(
  () => import("./pages/Admin/ManageAnnouncements"),
);

function App() {
  const { user } = useSelector((state) => state.profile);

  return (
    <div className="flex-1 w-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <AnnouncementBanner />
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="courses" element={<AllCourses />} />
          <Route path="catalog/:catalogName" element={<Catalog />} />
          <Route path="courses/:courseId" element={<CourseDetails />} />
          <Route
            path="signup"
            element={
              <OpenRoute>
                <Signup />
              </OpenRoute>
            }
          />
          <Route
            path="login"
            element={
              <OpenRoute>
                <Login />
              </OpenRoute>
            }
          />
          <Route
            path="forgot-password"
            element={
              <OpenRoute>
                <ForgotPassword />
              </OpenRoute>
            }
          />
          <Route
            path="verify-email"
            element={
              <OpenRoute>
                <VerifyEmail />
              </OpenRoute>
            }
          />
          <Route
            path="update-password/:id"
            element={
              <OpenRoute>
                <UpdatePassword />
              </OpenRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/report" element={<Report />} />

          <Route path="/terms" element={<TermsAndConditions />} />
          <Route
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route path="dashboard/my-profile" element={<MyProfile />} />
            <Route path="dashboard/settings" element={<Settings />} />
            {user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="dashboard/cart" element={<Cart />} />
                <Route
                  path="dashboard/enrolled-courses"
                  element={<EnrolledCourses />}
                />
              </>
            )}
            {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="dashboard/instructor" element={<Instructor />} />
                <Route path="dashboard/add-course" element={<AddCourse />} />
                <Route path="dashboard/my-courses" element={<MyCourses />} />
                <Route
                  path="dashboard/edit-course/:courseId"
                  element={<EditCourse />}
                />
              </>
            )}
            {user?.accountType === ACCOUNT_TYPE.ADMIN && (
              <>
                <Route path="dashboard/admin" element={<AdminDashboard />} />
                <Route
                  path="dashboard/manage-users"
                  element={<ManageUsers />}
                />
                <Route
                  path="dashboard/manage-courses"
                  element={<ManageCourses />}
                />
                <Route
                  path="dashboard/manage-messages"
                  element={<ManageMessages />}
                />
                <Route
                  path="dashboard/manage-reviews"
                  element={<ManageReviews />}
                />
                <Route
                  path="dashboard/manage-instructors"
                  element={<ManageInstructors />}
                />
                <Route
                  path="dashboard/manage-announcements"
                  element={<ManageAnnouncements />}
                />
                <Route
                  path="dashboard/add-category"
                  element={<AddCategory />}
                />
              </>
            )}
          </Route>
          <Route
            element={
              <PrivateRoute>
                <ViewCourse />
              </PrivateRoute>
            }
          >
            {user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route
                  path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                  element={<VideoDetails />}
                />
              </>
            )}
          </Route>

          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
      <BackToTop />
    </div>
  );
}

export default App;
