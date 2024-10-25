
import styles from "./Resetpassword.module.css";
import logoicon from "../Login/Group 13614.png"
import {  useState } from "react";
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { apiClientresetpassword } from "../../api/config.js";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [ currentpassword, setCurrentPassword] = useState("");
  const [ newpassword, setNewPassword] = useState("");
  const [ username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


    const userresetpassword = async () => {
     try {
          const response = await apiClientresetpassword.get(`?username=${username}&current_password=${currentpassword}&new_password=${newpassword}`, {
           });

          console.log("Reset response",response)
          if (response.data.status === 'success'){
               localStorage.setItem("isLoggedin",true)
               navigate('/overview');
          }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };



  return (
    <div className={styles.container}>
    
    <div className={styles.logincard}>     

      <div className={styles.cardheader}> 
       <img src={logoicon} alt="toyata logo" />
       <svg xmlns="http://www.w3.org/2000/svg" width="72" height="13" viewBox="0 0 72 13" fill="none">
         <path d="M63.2104 7.57357L64.8672 3.22855L66.5214 7.57357H63.2104ZM66.5869 0.761318H63.1462L58.3381 12.5424H61.3186L62.4137 9.6673H67.3189L68.4145 12.5424H71.3937L66.5869 0.761318ZM42.3196 10.4941C40.3781 10.4941 38.8067 8.74242 38.8067 6.58048C38.8067 4.41855 40.3778 2.66579 42.3196 2.66579C44.2613 2.66579 45.8317 4.41855 45.8317 6.58048C45.8317 8.74242 44.2579 10.4941 42.3196 10.4941ZM42.3196 0.357422C38.8825 0.357422 36.096 3.1437 36.096 6.58048C36.096 10.0173 38.8825 12.8022 42.3196 12.8022C45.7566 12.8022 48.5421 10.0173 48.5421 6.58048C48.5421 3.1437 45.7545 0.357422 42.3196 0.357422ZM17.7657 10.4941C15.8274 10.4941 14.2549 8.74242 14.2549 6.58048C14.2549 4.41855 15.8274 2.66579 17.7657 2.66579C19.704 2.66579 21.2791 4.41855 21.2791 6.58048C21.2791 8.74242 19.7064 10.4941 17.7657 10.4941ZM17.7657 0.357422C14.3294 0.357422 11.5455 3.1437 11.5455 6.58048C11.5455 10.0173 14.3294 12.8022 17.7657 12.8022C21.2019 12.8022 23.9882 10.0173 23.9882 6.58048C23.9882 3.1437 21.2019 0.357422 17.7657 0.357422ZM33.1456 0.761318L30.0968 5.52793L27.0457 0.761318H24.0641L28.7836 8.14927V12.5424H31.4084V8.15032L36.1277 0.761318H33.1458H33.1456ZM58.9656 0.761318H48.8942V3.02026H52.6244V12.5421H55.2518V3.02026H58.9656V0.761318ZM0.924316 3.02026H4.65583V12.5421H7.28192V3.02026H10.997V0.761318H0.924579L0.924316 3.02026Z" fill="black"/>
        </svg>
        <h3>FR</h3>
      </div>

      <div className={styles.cardbodysection}>
         <div className={styles.cardtitle}> 
         <h3> Reset Password </h3>
         </div>

         <div className={styles.cardform}>  

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
       />

       <TextField
       required
       id="outlined-required"
       fullWidth
       label="Current password"
       type={showPassword ? 'text' : 'password'}
       value={currentpassword}
       onChange={(e)=>setCurrentPassword(e.target.value)}
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


     <TextField
       required
       id="outlined-required"
       fullWidth
       label="New password"
       type={showPassword ? 'text' : 'password'}
       value={newpassword}
       onChange={(e)=>setNewPassword(e.target.value)}
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
         <button className={styles.loginbtn}  onClick={userresetpassword}> Reset password </button>
       </div>
    
     </div>
   </div>

  )
}

export default ResetPassword;