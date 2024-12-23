import { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./RoomStatus.css";
import { myContext } from "../../context/Context"; // Assuming context is set up to share data
import toast from "react-hot-toast";
import "./RoomStatus.css";

const RoomStatus = () => {
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [allottedRoom, setAllottedRoom] = useState("");
  const [roomNo, setRoomNo] = useState([]);

  // const { info } = useContext(myContext); // Using shared info data from context
  const url = "http://localhost:4001";

  // Fetch all applied room data
  const fetchRooms = async () => {
    try {
      const response = await axios.get(`${url}/api/applications`);
      if (response.status === 200) {
        setRooms(response.data.data);
        console.log('data' + response.data.data)
      } else {
        console.error("Failed to fetch room data.");
        toast.error("Failed to fetch room data.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching data:", error);
    }
  };



  useEffect(() => {
    fetchRooms();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${url}/api/applications/${id}`);
      if (response.data.success) {
        toast.success("Room entry deleted successfully.");
        fetchRooms();
      } else {
        toast.error("Failed to delete room entry.");
      }
    } catch (error) {
      console.error("Error deleting room entry:", error);
      toast.error("Error deleting room entry.");
    }
  };

  const openModal = (id) => {
    setSelectedRoomId(id);
    setShowModal(true);
    // fetchAvailableRooms(checkinDate, checkoutDate);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRoomId(null);
    setAllottedRoom("");
  };

  const handleAllotRoom = async () => {
    if (allottedRoom) {
      try {
        const response = await axios.patch(
          `${url}/api/applications/${selectedRoomId}`,
          {
            roomNumber: allottedRoom,
          }
        );

        if (response.status === 200 && response.data.success) {
          toast.success(`${allottedRoom} allotted successfully.`);

          // Fetch the updated room details for sending an email
          const roomDetails = rooms.find((room) => room._id === selectedRoomId);
          if (roomDetails) {
            // Construct the email address based on the roll number
            const email = `${roomDetails.studentRollNumber}@lnmiit.ac.in`;

            // Send email notification
            await axios.post(`${url}/api/send-email-confirm`, {
              email,
              name: roomDetails.studentName,
              roomNumber: allottedRoom,
            });
            toast.success("Email notification sent.");
          }

          closeModal();
          fetchRooms();
          setRoomNo([allottedRoom, ...roomNo]);
        } else {
          toast.error("Failed to allot room.");
        }
      } catch (error) {
        toast.error("Error allotting room.");
      }
    } else {
      toast("Please select a room.");
    }
  };

  const sendEmail = async (room) => {
    const email = `${room.studentRollNumber}@lnmiit.ac.in`;
    try {
      const response = await axios.post(`${url}/api/send-email-confirm`, {
        email,
        name: room.studentName,
        roomNumber: room.roomNumbers || "Not Allotted",
      });
      if (response.status === 200 && response.data.success) {
        toast.success("Email sent successfully.");
      } else {
        toast.error("Failed to send email.");
      }
    } catch (error) {
      toast.error("Error sending email.");
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="room-status-container">
      <h2>Room Status</h2>

      <div className="table-container">
        <table className="room-status-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll Number</th>
              <th>Status</th>
              <th>Room Number</th>
              <th>Allot Room</th>
              <th>Actions</th>
              <th>Email</th>
              
            </tr>
          </thead>
          <tbody>
          {rooms && rooms.length>0 && rooms.map((room) => (
              <tr key={room._id}>
                <td>{room.studentName}</td>
                <td>{room.studentRollNumber}</td>
                <td>{room.status || "Pending"}</td>
                <td>{room.roomNumbers ? room.roomNumbers : "Not Allotted"}</td>
                <td>
                <button
                    className="allot-button"
                    onClick={() =>
                      openModal(room._id)
                    }
                  >
                    Allot Room
                  </button>

                  

                 
                </td>
                <td>
                <button
                    className="delete-button"
                    onClick={() => handleDelete(room._id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                <button
                      className="email-button"
                      onClick={() => sendEmail(room)}
                    >
                      Send Email
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Select a Room</h3>
            <div className="room-selection">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((roomNumber) => (
                <button
                  key={roomNumber}
                  className={`room-button ${
                    allottedRoom === roomNumber ? "selected" : ""
                  }`}
                  onClick={() => setAllottedRoom(roomNumber)}
                >
                  Room {roomNumber}
                </button>
              ))}
            </div>
            <button className="allot-confirm-button" onClick={handleAllotRoom}>
              Confirm Allotment
            </button>
            <button className="close-button" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomStatus;