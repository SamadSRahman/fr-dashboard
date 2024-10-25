import styles from "./Resetpassword.module.css";
import logoicon from "../Login/Group 13614.png";
import toyatalogo from "../../assets/logo.svg"
import { useState } from "react";
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { apiClientresetpassword } from "../../api/config.js";
import PropTypes from 'prop-types'

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [currentpassword, setCurrentPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
 

  // Updated regex to allow alphanumeric usernames with underscores
  const usernameRegex = /^[a-zA-Z0-9_]{4,30}$/;

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const userresetpassword = async () => {
    setError(null); // Reset error on each attempt

    if (!usernameRegex.test(username)) {
      setError("Please enter a valid username (alphanumeric and underscores allowed)");
      return;
    }

    if (currentpassword === newpassword) {
      setError("New password must be different from the current password.");
      return;
    }

    try {
      const response = await apiClientresetpassword.get(
        `?username=${username}&current_password=${currentpassword}&new_password=${newpassword}`
      );

      if (response.data.status === "success") {
        localStorage.setItem("isLoggedin", true);
        // setIsLogged(true)
        // navigate("/overview");
        window.location.href = "/overview";
      } else {
        setError(response.data.error || "Error resetting password.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("An error occurred while resetting the password. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logincard}>
        <div className={styles.cardheader}>
          <img src={logoicon} alt="Toyota logo" />   
          <img src={toyatalogo} alt="Toyota text logo" />
          <h3>FR</h3>
        </div>

        <div className={styles.cardbodysection}>
          <div className={styles.cardtitle}>
            <h3>Reset Password</h3>
          </div>

         <div className={styles.cardform}>

          {error && <p className={styles.errorText}>{error}</p>}

            <TextField
              required
              id="username"
              variant="outlined"
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={!!error && !usernameRegex.test(username)}
              helperText={!!error && !usernameRegex.test(username) ? error : ""}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              required
              id="current-password"
              fullWidth
              label="Current password"
              type={showPassword ? "text" : "password"}
              value={currentpassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showPassword ? "hide password" : "show password"}
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              required
              id="new-password"
              fullWidth
              label="New password"
              type={showPassword ? "text" : "password"}
              value={newpassword}
              onChange={(e) => setNewPassword(e.target.value)}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showPassword ? "hide password" : "show password"}
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                shrink: true,
              }}
              error={!!error && currentpassword === newpassword}
              helperText={!!error && currentpassword === newpassword ? error : ""}
            />
          </div>
        </div>

        <div className={styles.cardfooter}>
          <button className={styles.loginbtn} onClick={userresetpassword}>
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
};
ResetPassword.propTypes = {
  setIsLogged: PropTypes.bool
}
export default ResetPassword;
