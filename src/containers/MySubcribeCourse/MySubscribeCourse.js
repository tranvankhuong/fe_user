import React, {useReducer, useEffect} from 'react'
import DataTable, { createTheme } from 'react-data-table-component';
import { Container} from 'react-bootstrap';
import {getMySubscribeCourse} from '../../services/course.service'
import emptyCourse from '../../assets/images/emptyCourse.jpg'
import {Link} from 'react-router-dom'
import mySubscribeCourseReducer from './mySubscribeCourseReducer';
import {getFormattedDate} from '../../services/common.service'
// const CustomTitle = ({ row }) => (
//     <div>
//         {}
//         <div>{row.title}</div>
//         <div>
//         <div data-tag="allowRowEvents" style={{ color: 'grey', overflow: 'hidden', whiteSpace: 'wrap', textOverflow: 'ellipses' }}>
//             {}
//             {row.plot}
//         </div>
//         </div>
//     </div>
// );
createTheme('solarized', {
    text: {
      primary: 'black',
      secondary: '#2aa198',
    },
    background: {
      default: '#c6e4f5',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: '#073642',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
});



export default function MySubscribeCourse(){
  const initialSubscribeCourseState = {
    courses: []
  };
  const [store, dispatch] = useReducer(mySubscribeCourseReducer, initialSubscribeCourseState);  
  useEffect(()=>{
    async function loadMySubscribeCourse(){
      const res = await getMySubscribeCourse();
      if (res.status === 201){
        dispatch({
          type: 'init',
          payload: {
            courses:res.data
          }
        })
      }
    } 
    loadMySubscribeCourse();
  },[])  
  
  const columns = [
    {
        name: 'ID',
        selector: 'title',
        sortable: true,
        maxWidth: '20px', // when using custom you should use width or maxWidth, otherwise, the table will default to flex grow behavior
        cell: row => <div>{row.course_id}</div>,
    },
    {
      name: 'Name',
      selector: 'title',
      sortable: true,
      maxWidth: '600px', // when using custom you should use width or maxWidth, otherwise, the table will default to flex grow behavior
      cell: row => `${row.course_name.slice(0, 200)}...`,
    },  
    {
      name: 'Image',
      grow: 0,
      cell: row => <img height="84px" width="70px" alt={row.course_image} src={row.course_image?"https://bct-onlinecourses-be.herokuapp.com/uploads/images/"+row.course_image:emptyCourse} />,
    },
    // {
    //   name: 'Title',
    //   selector: 'plot',
    //   wrap: true,
    //   sortable: true,
    //   format: row => `${row.course_shortdescription.slice(0, 200)}...`,
    // },
    {
      name: 'Short Description',
      wrap: true,
      sortable: true,
      cell: row => `${row.course_shortdescription.slice(0, 200)}...`,
    },
    
    
    {
      name: 'Price',
      grow: 0,
      cell: row => <div>{row.purchased_total}</div>,
    },
    {
      name: 'Date',
      grow: 0,
      cell: row => <div>{getFormattedDate(row.purchased_date)}</div>,
    },
    
    {
      name: 'Status',
      maxWidth: "30px",
      cell: row => row.course_status && row.course_status === 1?<i class="fa fa-check-square-o fa-2x text-success"/>:<i class="fa fa fa-square-o fa-2x text-danger"/>,
    },
    {
      name: 'Link',
      button: true,
      cell: row => <a className="btn btn-secondary" target="_blank" rel="noopener noreferrer"><Link to={"/courses/"+row.course_id}>View</Link></a>,
    },
  ];
  const customStyles = {
      rows: {
        style: {
          minHeight: '72px', 
          fontSize: '16px',
        }
      },
      headCells: {
        style: {
          paddingLeft: '20px', // override the cell padding for head cells
          paddingRight: '20px',
          fontSize: '18px',
        },
      },
      cells: {
        style: {
          paddingLeft: '20px', // override the cell padding for data cells
          paddingRight: '20px',
        },
      },
  };
  return (
      <>
          <div className="dashboard-content">
              <Container >
                  
                  <span className="d-block d-sm-flex align-items-center d-flex justify-content-between">
                    <h2 className="course-card-title">My subscribe courses </h2>
                  </span>
                  <DataTable
                  // title="My course"
                  columns={columns}
                  data={store.courses?store.courses:[]}
                  highlightOnHover
                  pagination
                  paginationPerPage={10}
                  paginationRowsPerPageOptions={[10, 15, 25, 50]}
                  paginationComponentOptions={{
                    rowsPerPageText: 'Records per page:',
                    rangeSeparatorText: 'out of',
                  }}
                  // onChangePage={page => setPage(page)}
                  // selectableRows
                  // selectableRowsHighlight
                  customStyles={customStyles}
                  theme="solarized"
                  />
              </Container>
          
          </div>

          
      </>
  )
}