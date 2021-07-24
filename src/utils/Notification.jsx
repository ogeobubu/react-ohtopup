import { Alert } from "@material-ui/lab";
import { useEffect } from "react";
import "./notification.css";

const Notification = ({ removeAlert, message, type }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [removeAlert]);

  return (
    <div className="notificationContainer">
      <Alert severity={type}>{message}</Alert>
    </div>
  );
};

export default Notification;
