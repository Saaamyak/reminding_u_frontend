import { useState } from 'react';
import '../tablestyle.css';
function Mytable() {
  const [Timeanddate, setTimeanddate] = useState('');
  const [Message, setMessage] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [records, setRecords] = useState([]);
  const [id,setid] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const mydate=new Date(Timeanddate);
      const res = await fetch('http://localhost:5000/settimer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          timeanddate: Math.floor(mydate.getTime()/ 1000),
          message: Message,
          phonenumber: PhoneNumber,
        })
      })
      var data = await res.json();
      if (data.status === 200) {
        const myData = JSON.parse(data.data)
        const id=myData.id
        const newRecord = { Timeanddate, Message, PhoneNumber, id };
        console.log(id,data, newRecord)
        setRecords([...records, newRecord]);
        setTimeanddate('');
        setMessage('');
        setPhoneNumber('');
        setid('');
      } else {
        alert(data.message);
      }
    } catch (e) {
      alert(e.message);
      return;
    }

  }

  async function handleDelete(index) {
    const newRecords = [...records];
    try {
      const myid= records[index].id
      const res = await fetch('http://localhost:5000/deletetimer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          id:myid
        })
      })
      var data = await res.json();
      if (data.status === 200) {
        newRecords.splice(index, 1);
        setRecords(newRecords);
      } else {
        alert(data.message);
      }
    } catch (e) {
      alert(e.message);
      return;
    }
  
    
  }

  async function handleRemoveAll() {
    
    try {
      const res = await fetch('http://localhost:5000/deleteall', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        
        
      })
      var data = await res.json();
      if (data.status === 200) {
        setRecords([]);
      } else {
        alert(data.message);
      }
    } catch (e) {
      alert(e.message);
      return;
    }
  }

  return (
    <div className="tableinfo">
      <form onSubmit={handleSubmit}>
        <label>
          Time and Date:
          <input type="datetime-local" value={Timeanddate} onChange={event => setTimeanddate(event.target.value)} className="form-input" />
        </label>
        <label>
          Message:
          <input type="text" value={Message} onChange={event => setMessage(event.target.value)} className="form-input" />
        </label>
        <label>
          PhoneNumber:
          <input type="text" value={PhoneNumber} onChange={event => setPhoneNumber(event.target.value)} className="form-input" />
        </label>
        <button type="submit" className="form-button">Add Task</button>
      </form>
      <div>
        <h2>Records</h2>
        {records.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Timeanddate</th>
                <th>Message</th>
                <th>PhoneNumber</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={index}>
                  <td>{record.Timeanddate.replace('T', '   ')}</td>
                  <td>{record.Message}</td>
                  <td>{record.PhoneNumber}</td>
                  <td>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No records found.</p>
        )}
        <button onClick={handleRemoveAll} className="form-button">Remove All</button>
      </div>
    </div>
  );
}

export default Mytable;