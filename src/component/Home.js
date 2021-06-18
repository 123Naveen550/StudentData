import "./Css/Add.css";
import "./Css/Table.css";
import { Component } from "react";

class Home extends Component {
  constructor() {
    super();
    this.index = -1;
    this.StudentDetail = localStorage.StudentDetail ? JSON.parse(localStorage.StudentDetail) : [];
    this.state = {      
      studentlist:this.StudentDetail      
    }
  }

  submit = (event,index = -1) => {
    event.preventDefault();    
    let studentlist = this.state.studentlist;
    let name = this.refs.name.value;
    let email = this.refs.email.value;
    let qualification = this.refs.qualification.value;
    let date = new Date().toDateString()
    
      if (index === -1) {
        let data = {
          name, email, qualification, date
        }
        studentlist.push(data);
      }
      else {        
        studentlist[index].name = name;
        studentlist[index].email = email;
        studentlist[index].qualification = qualification;
    }
    this.StudentDetail = studentlist;
    localStorage.setItem('StudentDetail', JSON.stringify(studentlist));
    this.index = -1;
    
    window.location.href="/"
  }



  Remove = (index) => {
    let studentlist = this.StudentDetail;
    studentlist.splice(index, 1);
    localStorage.setItem('StudentDetail', JSON.stringify(studentlist));
    this.StudentDetail=studentlist
    this.setState({
      studentlist: studentlist
    });
   
  }

 

  Edit = (index) => {
    let data = this.StudentDetail[index];
    this.refs.name.value = data.name;
    this.refs.email.value = data.email;
    this.refs.qualification.value = data.qualification;
    this.index = index;    
  }
  
  render() {
    let  studentlist = this.state. studentlist;
    return (
      <>
       

        <div
          class="modal fade"
          id="addData"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          style={{ background: "rgba(21, 192, 178, 0.089)" }}
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5
                  class="modal-title"
                  id="exampleModalLabel"
                  style={{ color: "#DE781F" }}
                >
                  {" "}
                  New Student
                </h5>
                <button
                  type="button"
                  class="close "
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form className="form" ref="Form">
                  <div className="input_field">
                    <label>
                      Name<span className="span"></span> :
                    </label>
                    <input type="text" ref="name" className="input" />
                  </div>

                  <div className="input_field">
                    <label>
                      E-mail <span className="span"></span> :
                    </label>
                    <input type="text" ref="email" className="input" />
                  </div>

                  <div className="input_field">
                    <label>Qualification :</label>
                    <div className="custom_select">
                      <select ref="qualification">
                        <option value=" ">Select</option>
                        <option value="BCA">BCA</option>
                        <option value="MCA">MCA</option>
                        <option value="MBA">MBA</option>
                        <option value="B.Tech">B.Tech</option>
                        <option value="M.Tech">M.Tech</option>
                      </select>
                    </div>
                  </div>
                  <div className="input_field input_button">
                    <button className="btn" onClick={(event) => this.submit(event,this.index)}>
                      Sumbit
                    </button>
                    <button className="btn" type="reset">
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>


        <div className="Flex-box">
      <div className="Header">
        <div>Student list</div>
        <div className="btn-Add">
          <button
            type="button"
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#addData"
          >
            ADD
          </button>
        </div>
      </div>
      <div className="flex-table">
        <table className="Data-table">
          <tr className="Heading">
            <th>S.no</th>
            <th>Name</th>
            <th>Email</th>
            <th>Qualification</th>
            <th>Created On</th>
            <th>Action</th>
          </tr>
          {studentlist.map((ele,index)=> {
            return (
              <tr className="Table-data">
                <td>{index+1}</td>
                <td>{ele.name}</td>
                <td>{ele.email}</td>
                <td>{ele.qualification}</td>
                <td>{ele.date}</td>
                <td>
                  <div>
                    <button type="button" class="btn btn-light" data-toggle="modal" 
                            onClick={() => this.Edit(index)}
            data-target="#addData">
                      Edit
                    </button>
                    <button type="button" class="btn btn-light" onClick={() => this.Remove(index)}
                    
                   >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
      </>
    );
  }
}
export default Home;
