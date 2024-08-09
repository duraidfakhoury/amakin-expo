import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import './inputField.css';

const InputField = ({ type = 'text', placeholder, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  return (
    <div className="inputField">
      {type === 'date' ? (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className="customDatePicker"
            label={placeholder}
            value={value}
            onChange={onChange}
            renderInput={(params) => (
              <TextField
                className="customDatePicker"
                {...params}
                variant="outlined"
                margin="normal"
                fullWidth
              />
            )}
          />
        </LocalizationProvider>
      ) : (
        <TextField
          className="customTextField"
          variant="outlined"
          type={type === 'password' ? (showPassword ? 'text' : 'password') : 'text'}
          label={placeholder}
          value={value}
          onChange={onChange}
          InputProps={type === 'password' && {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  className="customIconButton"
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
    </div>
  );
};

export default InputField;
