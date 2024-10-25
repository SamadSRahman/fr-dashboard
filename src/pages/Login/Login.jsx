import styles from "./Login.module.css";
import logoicon from "./Group 13614.png"
import {  useState } from "react";
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { apiClientlogin } from "../../api/config.js";
import { useNavigate } from "react-router-dom";
import toyatalogo from "../../assets/logo.svg"
import PropTypes from 'prop-types'

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [ password, setPassword] = useState("");
  const [ username, setUsername] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);

    // Updated regex to allow alphanumeric usernames with underscores
    const usernameRegex = /^[a-zA-Z0-9_]{4,30}$/;

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


    const userloginfunc = async () => {

      setError(null); // Reset error on each attempt

      if (!usernameRegex.test(username)) {
        setError("Please enter a valid username (alphanumeric and underscores allowed)");
        return;
      }

          try {
            const response = await apiClientlogin.get(`?username=${username}&password=${password}`, {
          });

            console.log("login response",response)

          if (response.data.status === 'success'){
            localStorage.setItem("userName",username)
            localStorage.setItem("firstName",response.data.first_name)
            localStorage.setItem("permission",response.data.permission)
            localStorage.setItem("force_reset_password",response.data.force_reset_password)
            localStorage.setItem("isLoggedin",true)
            
            if(response.data.force_reset_password){
                    navigate('/resetPassword');
            }else{
                    window.location.href = ('/overview');
            }
                  
            }

            else {
              setError(response.data.error || "Error resetting password.");
            }

         } catch (error) {
          console.error('Error fetching data:', error);
          setError("An error occurred while resetting the password. Please try again.");
        }

  };

  return (
    <div className={styles.container}>
    
    <div className={styles.logincard}>     

      <div className={styles.cardheader}> 
       <img src={logoicon} alt="toyata logo" />
       <img src={toyatalogo} alt="Toyota text logo" />
        <h3>FR</h3>
      </div>

      <div className={styles.cardbodysection}>
         <div className={styles.cardtitle}> 
         <h3> Login </h3>
         </div>

         <div className={styles.cardform}>  

         {error && <p className={styles.errorText}>{error}</p>}

         <TextField
          required
          id="outlined-required"
           variant="outlined"
           fullWidth
          label="Username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          slotProps={{
            inputLabel: {
              shrink: true,
           },
         }}

         error={!!error && !usernameRegex.test(username)}
         helperText={!!error && !usernameRegex.test(username) ? error : ""}

       />

     <TextField
       required
       id="outlined-required"
       fullWidth
       label="Password"
       type={showPassword ? 'text' : 'password'}
       value={password}
       onChange={(e)=>setPassword(e.target.value)}
       variant="outlined"
       InputProps={{
         endAdornment: (
           <InputAdornment position="end">
             <IconButton
               aria-label={showPassword ? 'hide password' : 'show password'}
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
         shrink: true, // Keeps the label shrunk if needed
       }}
     />

         </div>
      
      </div>
     
       <div className={styles.cardfooter}>
         <button className={styles.loginbtn}  onClick={ userloginfunc}> Login </button>
       </div>
    
     </div>
   </div>

  )
}
Login.propTypes = {
  setIsLogged: PropTypes.bool
}
export default Login;