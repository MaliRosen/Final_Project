import { useHistory, Route, Switch, BrowserRouter as Router, useRouteMatch, Link  } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import '../style/header.css';
import '../style/headerS.css';
import Admin from './admin';
import StudentsList from './admin/studentsList';
import TeacherList from './admin/teachersList';

function AdminMainMenu(props){

  let history = useHistory();
  let { path, url } = useRouteMatch();

  return (
    <div>
       <Router>
      <div className="menu">
        <Link className=" menu-btn2" to={url+'/teachersList'} >  רשימת מורים   </Link>
        <Link className=" menu-btn2" to={url+'/studentsList'}> רשימת תלמידים   </Link>      
        <Link className=" menu-btn2" to={url+'/newTeacher'}> רישום מורה חדש   </Link>      
      </div>
    <Switch>
      <Route path={url+"/teachersList"}>
      <TeacherList />
      </Route>
      <Route path={url+"/studentsList"}>
      <StudentsList />
      </Route>
      <Route path={url+"/newTeacher"}>
      <Admin />
      </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default AdminMainMenu;

