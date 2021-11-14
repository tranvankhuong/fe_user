import React, {useState,useReducer, useEffect} from 'react'
import DataTable, { createTheme } from 'react-data-table-component';
import { Container, Button, Modal, Form, Col, Row } from 'react-bootstrap';
import dashboardReducer from './dashboardReducer'
import {loadAllCategory,loadAllPostedCourse,postNewCourse} from '../../services/course.service'
import emptyCourse from '../../assets/images/emptyCourse.jpg'
import Swal from "sweetalert2";
import {Link} from 'react-router-dom'
import { useForm } from 'react-hook-form';
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
      default: '#bdf3b2',
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



export default function LecturerDashBoard(){
  const {register,formState: { errors },handleSubmit} = useForm();
  const [newCourse, setNewCourse] = useState({ courseName: "", shortDescription: "",categoryId:1,price:0,saleoff:0,sectionCount:0 });
  const initialDashboardState = {
    categories:[],
    courses: []
  };
  const [store, dispatch] = useReducer(dashboardReducer, initialDashboardState);  
  useEffect(()=>{
    async function loadCategories(){
      const loadCateRes = await loadAllCategory();
      if (loadCateRes.status === 200){
        dispatch({
          type: 'init-categories',
          payload: {
            categories:loadCateRes.data
          }
        })
      }
    } 
    async function loadPostedCourse(){
      const loadPostedRes = await loadAllPostedCourse();
      if (loadPostedRes.status === 200){
        dispatch({
          type: 'init-all-posted',
          payload: {
            courses:loadPostedRes.data
          }
        })
      }
    } 
    loadCategories();
    loadPostedCourse();

    console.log(store);
  },[])  
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
      cell: row => <div>{row.price}</div>,
    },
    {
      name: 'Saleoff',
      grow: 0,
      cell: row => <div>{row.saleoff*100}%</div>,
    },
    {
      name: 'Image',
      grow: 0,
      cell: row => <img height="84px" width="70px" alt={row.course_image} src={row.course_image?"https://bct-onlinecourses-be.herokuapp.com/uploads/images/"+row.course_image:emptyCourse} />,
    },
    {
      name: 'Status',
      maxWidth: "30px",
      cell: row => `${row.course_status && row.course_status === 1?"Hoàn thành":"Chưa hoàn thành"}`,
    },
    {
      name: 'Link',
      button: true,
      cell: row => <a className="btn btn-secondary" target="_blank" rel="noopener noreferrer"><Link to={"/courses/"+row.course_id}>View</Link></a>,
    },
    {
      name: 'Edit Button',
      button: true,
      cell: row =>  <a className="btn btn-primary"><Link to={"/mycourses/"+row.course_id}>Edit</Link></a>,
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
  const onSubmit = async(data) => {
    // console.log(newCourse);
    // console.log(store)
    console.log(data)
    const newCourse1 = { 
      courseName: data.courseName1, 
      shortDescription: data.shortDescription1,
      categoryId:parseInt(data.categoryId1),
      price:parseInt(data.price1),
      saleoff:parseFloat(data.saleoff1),
      sectionCount:parseInt(data.sectionCount1)
    }
    console.log(newCourse1)

    const res = await postNewCourse(newCourse1);
    console.log(res.data);
    if(res.status===201){
      dispatch({
        type: "add-newcourse",
        payload:{
          newCourse: res.data.newCourse
        }
      })
      Swal.fire({
        title: "Thành công!",
        icon: "success"
      })
      setShow(false)
    }
  }

  const handleChange = (e) =>{
    const { name, value } = e.target;
    setNewCourse(prevState => ({
        ...prevState,
        [name]: value
    }));
  }
  return (
      <>
          <div className="dashboard-content">
              <Container >
                  
                  <span className="d-block d-sm-flex align-items-center d-flex justify-content-between">
                    <h2 className="course-card-title">My courses </h2>

                    <Button variant="success"  onClick={handleShow}>Add Course</Button>
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
          <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
              <Modal.Title>Add course(basic info)</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  

                  <Form.Group className="mb-3" controlId="courseName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="courseName" onChange={(e)=>handleChange(e)} placeholder="Abc programming course" {...register("courseName1",{required:true})}/>
                    {errors.courseName1?.type==="required" && "Course name is required"}
                    {/* <input type="text" className="form-control" id="inputRegisterForm-username" placeholder="abc1245"{...register("username",{maxLength:16})}required></input>
										{errors.username && "Max length 16"} */}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="shortDescription">
                    <Form.Label>Short Description</Form.Label>
                    <Form.Control name="shortDescription" onChange={(e)=>handleChange(e)} placeholder="learning abc" {...register("shortDescription1",{required:true})}/>
                    {errors.shortDescription1?.type==="required" && "Short Description is required"}
                  </Form.Group>

                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="price">
                      <Form.Label>Price</Form.Label>
                      <Form.Control name="price" onChange={(e)=>handleChange(e)}  type="number" {...register("price1",{required:true})}/>
                      {errors.price1?.type==="required" && "Price is required"}
                    </Form.Group>

                    
                    

                    <Form.Group as={Col} controlId="saleoff">
                      <Form.Label>Sale off</Form.Label>
                      <Form.Control name="saleoff" onChange={(e)=>handleChange(e)} type="number" {...register("saleoff1",{required:true,min:0,max:1})}  step="any" min="0" max="1"/>
                      {errors.saleoff1 && "Saleoff is required and value between(0,1)"}
                    </Form.Group>
                  </Row>

                  <Form.Group className="mb-3" controlId="categoryId">
                      <Form.Label>Category</Form.Label>
                      <Form.Select name="categoryId" onChange={(e)=>handleChange(e)} defaultValue="Chosoe..." {...register("categoryId1",{required:true})}>
                        {store.categories?store.categories.map((c)=><option value={c.category_id}>{c.category_name}</option>):""}
                      </Form.Select>
                      {errors.categoryId1?.type==="required" && "Category is required."}
                    </Form.Group>
                  
                  <Form.Group className="mb-3" controlId="sectionCount">
                    <Form.Label>Sections</Form.Label>
                    <Form.Control name="sectionCount" onChange={(e)=>handleChange(e)} type="number" {...register("sectionCount1",{required:true, min:0, max:20})}/>
                    {errors.sectionCount1 && "Sections is required and value between(0,20)"}
                  </Form.Group>
{/* 
                  <Form.Group className="mb-3" id="formGridCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                  </Form.Group>
*/}                   
                   <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                </Form>
              </Modal.Body>
              <Modal.Footer>
             
              </Modal.Footer>
          </Modal>

          
      </>
  )
}