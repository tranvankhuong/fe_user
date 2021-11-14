import "./App.css";
import {
  LoginRoute,
  UserRoute,
  VerifyRoute,
  LecturerRoute,
  HomeRoute,
} from "./utils/customRouter";
import {
  BrowserRouter as Router,
  Switch,
  // Route,
  Redirect,
} from "react-router-dom";
import Register from "./containers/Auth/Register";
import Login from "./containers/Auth/Login";
import Verify from "./containers/Auth/VerifyOTP";


import Home from './containers/Home/Home'
import Course from './containers/Course/Course'
import NotFound from './containers/NotFound';
import Settings from './containers/Settings/Settings';
import Profile from './containers/Profile/Profile';
import LecturerDashBoard from './containers/Daskboard/LecturerDashBoard';
import MySubscribeCourse from './containers/MySubcribeCourse/MySubscribeCourse'
import CourseEditing from './containers/CourseEditing/CourseEditing';
import WebCourse  from './containers/WebCourse/WebCourse';
import MobileCourse  from './containers/MobileCourse/MobileCourse';
import Checkout from "./containers/Checkout/Checkout";
import SearchResult from "./containers/SearchResult/SearchResult";
import CourseByCategory from './containers/CourseByCategory/CourseByCategory'
import 'react-quill/dist/quill.snow.css';
import AppProvider from './contexts/AppProvider';

function App() {
  return (
    <>
      <Router>
        <AppProvider>
          <Switch>
            <LoginRoute exact path="/register">
              <Register></Register>
            </LoginRoute>
            <LoginRoute exact path="/login">
              <Login></Login>
            </LoginRoute>
            <VerifyRoute exact path="/verify">
              <Verify></Verify>
            </VerifyRoute>
            {/* <HomeRoute exact path='/' >
                <Home></Home>
            </HomeRoute> */}
            <HomeRoute exact path="/">
              <Home></Home>
            </HomeRoute>
            <HomeRoute exact path="/courses/category/:categoryId">
              <CourseByCategory></CourseByCategory>
            </HomeRoute>
            <HomeRoute exact path="/courses/category/web-courses">
              <WebCourse></WebCourse>
            </HomeRoute>
            <HomeRoute exact path="/courses/category/mobile-courses">
              <MobileCourse></MobileCourse>
            </HomeRoute>
            <HomeRoute exact path="/courses/search">
              <SearchResult></SearchResult>
            </HomeRoute>

            <HomeRoute exact path="/checkout">
                <Checkout />
              </HomeRoute>
            <UserRoute exact path='/settings' >
                <Settings></Settings>
            </UserRoute>   
            <UserRoute exact path='/profile' >
                <Profile></Profile>
            </UserRoute>
            <UserRoute exact path='/mysubcribecourses' >
                <MySubscribeCourse></MySubscribeCourse>
            </UserRoute>
            <HomeRoute exact path="/courses/:courseId">
              <Course></Course>
            </HomeRoute>
            <LecturerRoute exact path="/mycourses">
              <LecturerDashBoard></LecturerDashBoard>
            </LecturerRoute>
            <LecturerRoute exact path="/mycourses/:courseId">
              <CourseEditing></CourseEditing>
            </LecturerRoute>
            <HomeRoute path="/not-found">
              <NotFound></NotFound>
            </HomeRoute>
            <Redirect to="/not-found"></Redirect>
            
          </Switch>
        </AppProvider>
      </Router>
    </>
  );
}

export default App;
