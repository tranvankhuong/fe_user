import {
    Route,
    Redirect
} from 'react-router-dom';
import Header from '../containers/Header';
import Footer from '../containers/Footer';

export function LoginRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() =>
        !localStorage.accessToken ? (
          <>
        
            <Header></Header>
            {children}
            <Footer></Footer>
          </>
        ):
        (
          <Redirect
            to={{
              pathname: '/',
              // state: { from: location }
            }}
          />
        )
      }
    ></Route>
    
  );
}
export function HomeRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() =>

          <>
        
            <Header></Header>
            {children}
            <Footer></Footer>
          </>
      }
    ></Route>
    
  );
}
export function VerifyRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={() =>
          localStorage.usernameVerify ? (
            <>  
              <Header></Header>
              {children}
              <Footer></Footer>
            </>
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                // state: { from: location }
              }}
            />
          )
        }
      />
    );
}
export function UserRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() =>
        localStorage.accessToken ? (
          <>
            <Header></Header>
            {children}
            <Footer></Footer>
          </>
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              // state: { from: location }
            }}
          />
        )
      }
    />
  );
}
export function LecturerRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() =>
        localStorage.accessToken && localStorage.userRole ==="lecturer" ? (
          <>
            <Header></Header>
            {children}
            <Footer></Footer>
          </>
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              // state: { from: location }
            }}
          />
        )
      }
    />
  );
}
// export const SRoute = ({ component: Component, ...rest }) => {
//     const token = JSON.parse(localStorage.getItem("token"));
//     return (
//       <>
//         {token != null ? (
//           <Route
//             {...rest}
//             render={(props) => (
//               <>
//                 <Header></Header>
//                 <div className="clearfix" />
//                 <div className="content">
//                   <Component {...props}></Component>
//                 </div>
//                 <Footer></Footer>
//               </>
//             )}
//           ></Route>
//         ) : (
//           <Redirect to="/login"></Redirect>
//         )}
//       </>
//     );
// };
  
// export const PublicRoute = ({ component: Component, ...rest }) => {
//     return (
//       <Route
//         {...rest}
//         render={(props) => (
//           <>
//             <Header></Header>
//             <div className="clearfix" />
//             <div className="content">
//               <Component {...props}></Component>
//             </div>
//             <Footer></Footer>
//           </>
//         )}
//       ></Route>
//     );
// };
  
// export const LoginRoute = ({ component: Component, ...rest }) => {
//     const token = JSON.parse(localStorage.getItem("token"));
//     return (
//       <>
//         {token == null ? (
//           <Route
//             {...rest}
//             render={(props) => (
//               <>
//                 <Header></Header>
//                 <div className="clearfix" />
//                 <div className="content">
//                   <Component {...props}></Component>
//                 </div>
//                 <Footer></Footer>
//               </>
//             )}
//           ></Route>
//         ) : (
//           <Redirect to="/"></Redirect>
//         )}
//       </>
//     );
// };
  