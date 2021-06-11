import "./Css/Add.css";
import "./Css/Table.css";
import { Component } from "react";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      title: "Student List",
      Input: 0,
      index: "",
      StudentData: [],
    };
  }
  componentDidMount() {
    this.refs.name.focus();
  }

  submit = (event) => {
    event.preventDefault();
    let StudentData = this.state.StudentData;
    let name = this.refs.name.value;
    let email = this.refs.email.value;
    let qualification = this.refs.qualification.value;
    let date = new Date().toDateString();

    if (this.state.Input === 0) {
      let data = {
        name,
        email,
        qualification,
        date,
      };
      StudentData.push(data);
    } else {
      let index = this.state.index;
      StudentData[index].name = name;
      StudentData[index].email = email;
      StudentData[index].qualification = qualification;
    }

    this.setState({
      StudentData: StudentData,
      Input: 0,
    });
    this.refs.Form.reset();
    this.refs.name.focus();
  };

  // Remove

  Remove = (index) => {
    let StudentData = this.state.StudentData;
    StudentData.splice(index, 1);
    this.setState({
      StudentData: StudentData,
    });
    this.refs.Form.reset();
    this.refs.name.focus();
  };

  // Edit

  Edit = (index) => {
    let data = this.state.StudentData[index];
    this.refs.name.value = data.name;
    this.refs.email.value = data.email;
    this.refs.qualification.value = data.qualification;
    this.setState({
      Input: 1,
      index: 1,
    });
    this.refs.name.focus();
  };

  render() {
    let StudentData = this.state.StudentData;
    return (
      <>
        {/* ADDForm */}

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
                    <button className="btn" onClick={(event) => this.submit(event)}>
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

        {/* table */}

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
          {StudentData.map((ele,index)=> {
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
