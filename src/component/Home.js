import './Css/Add.css'
import './Css/Table.css'
import { Component } from "react";

class Home extends Component{
  constructor() {
    super();
    this.state = {
      title: "Student List",
      Input:0,
      index: "",
      StudentData:[]
    }
  }
  componentDidMount() {
    this.refs.name.focus();
  }

  submit = (e) => {
    e.preventDefault();    
    let StudentData = this.state.StudentData;
    let name = this.refs.name.value;
    let email = this.refs.email.value;
    let qualification = this.refs.qualification.value;
    let date = new Date().toDateString()

    if (this.state.Input ===0) { 
      let data = {
        name,email,qualification,date
      }
      StudentData.push(data);      
    }
    else {
      let index = this.state.index;
      StudentData[index].name = name;
      StudentData[index].email = email;
      StudentData[index].qualification = qualification;
    }    
    
    this.setState({
      StudentData: StudentData,
      Input:0
    })
    this.refs.Form.reset();
    this.refs.name.focus();
  }

  // Remove

  Remove = (index) => {
    let StudentData = this.state.StudentData;
    StudentData.splice(index, 1);
    this.setState({
      StudentData: StudentData
    });
    this.refs.Form.reset();
    this.refs.name.focus();
  }

  // Edit

  Edit = (index) => {
    let data = this.state.StudentData[index];
    this.refs.name.value = data.name;
    this.refs.email.value = data.email;
    this.refs.qualification.value = data.qualification;
    this.setState({
      Input: 1,
      index: 1
    });
    this.refs.name.focus();
  }
  
  render() {
    let StudentData = this.state.StudentData;
    return (
      <>
        {/* ADDForm */}

        <div class="modal fade" id="addData" tabindex="-1" aria-labelledby="exampleModalLabel"  aria-hidden="true" style={{background:"rgba(21, 192, 178, 0.089)"}}>
            <div class="modal-dialog">
              <div class="modal-content">
                  <div class="modal-header">                   
                  <h5 class="modal-title" id="exampleModalLabel" style={{color:'#DE781F'}}> New Student</h5>
                  <button type="button" class="close " data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                  </div>                  
                <div class="modal-body" >
                <form className="form" ref="Form">
                                      <div className="input_field">
                        <label>Name<span className="span">*</span> :</label>                        
                              <input type="text" ref="name" className="input"  />
                                      </div>
          
                                      <div className="input_field">
                        <label>E-mail <span className="span">*</span> :</label>                        
                              <input type="text"  ref="email" className="input"   />
                                      </div>
          
                                      <div className="input_field">
                                <label>Qualification :</label>                              
                                      <div className ="custom_select">
                                          <select ref="qualification" >
                                              <option value=" ">Select</option>
                                              <option value="BCA">BCA</option>
                                              <option value="MCA">MCA</option>
                                              <option value="B.Tech">B.Tech</option>
                                              <option value="M.Tech">M.Tech</option>
                                          </select>
                                          </div>
                                      </div>
                                      <div className="input_field input_button">
                    <button className="btn" onClick={(e) => this.submit(e)}>Sumbit</button>
                    <button className="btn"  type="reset">Reset</button>
                                       </div>
                               </form>
                </div>      
              </div>
            </div>
        </div>
        


       {/* table */}

        <div className="body">
                <div className="tabel_responsive">
            <span className="header">
            <h2>Student List</h2>
                        <button className="btn-open" data-toggle="modal" data-target="#addData"><i class="fas fa-user-plus"></i> Add </button>
                    </span>
                    <table>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Name</th>
                                <th>E-mail</th>
                                <th>Qualification</th>
                                <th>Created On</th>
                                <th>Action</th>
                            </tr>
                        </thead>
    
              {
                StudentData.map((each, index) => {
                  // console.log(each);
                  return (
                    <tbody>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{each.name}</td>
                        <td>{each.email}</td>
                        <td>{each.qualification}</td>
                        <td>{each.date}</td>
                        <td>
                          <span className="action_btn">
                            <button className="btn-edit" data-toggle="modal" data-target="#addData" onClick={() => this.Edit(index)}>Edit  <i class="fas fa-user-edit"></i></button>
                            <button onClick={()=>this.Remove(index)}>Remove <i class="fas fa-trash"></i></button>
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  )
                })
              }
                           
                    </table>
                </div>
                </div>
                
      </>
    )
  }
}
export default Home;