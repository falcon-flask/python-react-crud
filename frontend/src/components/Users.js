import React, {useState, useEffect} from 'react';

const API = process.env.REACT_APP_API;

export default function Users() {

    

    const [name, setName] =  useState('')
    const [email, setEmail] =  useState('')
    const [password, setPassword] =  useState('')
    const [users, setUsers] =  useState([])
    const [editing, setEditing] =  useState(false)
    const [id, setId] =  useState('')


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        
        if (!editing) {
            const url = `${API}/users`;
            const res = await fetch(url, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name,
                  email,
                  password,
                }),
              });

              const data = await res.json();
              
        } else {
            const url = `${API}/users/${id}`;
            const res = await fetch(url, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name,
                  email,
                  password,
                }),
              });
              const data = await res.json();
              console.log(data);
              setEditing(false);
              setId('');
        }
        
        
         await getUser()
          setName("");
          setEmail("");
          setPassword("");
    }


    const getUser = async () => {
        const url = `${API}/users`;
        const res = await fetch(url);
        const data = await res.json();
        setUsers(data);
    }

    useEffect(() => {
        getUser();
    }, [])

    const deleteUser = async (id) => {
        const useRespnse = window.confirm('Are you sure you want to delete?')
        if (useRespnse) {
                            const url = `${API}/users/${id}`;
                            const res = await fetch(url, {
                                method: "DELETE",
                            });
                            const data = await res.json();
                            console.log(data)
                            await getUser()
                       }
    }

    const editUser = async (id) => {

        const url = `${API}/user/${id}`;
        const res = await fetch(url);
        const data = await res.json();
        setEditing(true);
        setId(id);
        // Set Values
        setName(data.name);
        setEmail(data.email);
        setPassword(data.password);
    }

    return (
        <div className="row">
            <div className="col-md-4">
                <form onSubmit={handleSubmit} className="card card-body">
                    <div className="form-group">
                        <input 
                            type="text" 
                            onChange={e =>  setName(e.target.value)}
                            value={name}
                            className="form-control"
                            placeholder="Name"
                            autoFocus
                            />

                    <input 
                            type="email" 
                            onChange={e =>  setEmail(e.target.value)}
                            value={email}
                            className="form-control mt-2"
                            placeholder="Email"
                            />

                    <input 
                            type="password" 
                            onChange={e =>  setPassword(e.target.value)}
                            value={password}
                            className="form-control mt-2"
                            placeholder="Password"
                            />                  
                    </div>
                    <button className="btn btn-primary btn-block mt-2">
                        { editing ? 'Edit' : 'Create' }
                    </button>
                </form>
            </div>
            <div className="col-md-8">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Operations</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map(user => (
                                <tr key={user._id}>
                                   <td>{user.name}</td>
                                   <td>{user.email}</td>
                                   <td>{user.password}</td>
                                   <td>
                                       <button className="btn btn-secondary btn-sm btn-block"
                                            onClick={() => editUser(user._id)}
                                        >
                                            Edit
                                       </button>
                                       <button className="btn btn-danger btn-sm btn-block" style={{ marginLeft:3 }}
                                                onClick={() => deleteUser(user._id)}
                                       >
                                            Delete
                                       </button>
                                   </td>
                                </tr>
                        ))}
                        </tbody>
                    </table>
            </div>
        </div>
    )
}
