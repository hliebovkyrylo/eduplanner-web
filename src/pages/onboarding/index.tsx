import { useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import styles from "./onboarding.module.scss";
import { createUser, isOndoarded, uploadImage } from "../../redux/slices/user";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Onboarding = () => {
  const dispatch = useDispatch<any>();

  // Getting user info
  const { user } = useAuth0(); // Data of current user
  if (!user) { // If user is not found return null
    return null;
  }

  // Change user photo
  const inputFileRef = useRef<HTMLInputElement | null>(null); // Link to input element for loading image
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Create a state that will store the selected file

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => { // Called when the content of input changes to load a file.
    const file = event.target.files?.[0];

    if (file) { // If the file has been selected, update the state
      setSelectedFile(file);
    }
  };

  // Creating a user
  const navigate = useNavigate();

  const id = user?.sub;
  const [name, setName] = useState(user?.name || '');
  const [username, setUsername] = useState(user?.nickname || '');
  const [image, setImage] = useState(user?.picture);
  const userId = id;

  const handleSubmit = async (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault(); // Remove the standard behavior of the button

    try {
      let updatedImage = image;

      if (selectedFile && selectedFile !== null) { // Checking the authenticity of the uploaded photo
        
        const formData = new FormData();
        formData.append('image', selectedFile); // Add the selected file to FormData with the name 'image'

        const res = await dispatch(uploadImage(formData)); // Send a request to download an image using the dispatch function.
        
        updatedImage = res.payload.imageUrl;
        setImage(updatedImage);
      } 
      
      // Sending user input to the server
      await dispatch(createUser({
        userId,
        name,
        username,
        image: updatedImage,
      }));

      navigate('/home');
      
    } catch (error: any) {
      throw new Error(`Failed to create user: ${error.message}`); // If an error occurs, throw a new error with an error message
    }
  }

  // Checking whether the user is configured
  dispatch(isOndoarded(userId)).then((onboardedUser: any) => { // Search for user by ID
    if (onboardedUser.payload.userFound === true) {
      navigate('/home') // if the user is found, we redirect to the home page
    }
  })
  

  return (
    <main className={styles.onboarding}>
      <form className={styles.onboardingInner}>
        <h3>Complete your profile</h3>
        <div>
          <input type="file" ref={inputFileRef} onChange={handleImageChange} hidden />
          <button type="button" onClick={() => inputFileRef.current?.click()} className={styles.photoBtn}>
            <img className={styles.onboardingPicture} src={selectedFile ? URL.createObjectURL(selectedFile) : user?.picture} alt="User photo" />
          </button>
        </div>
        <div className={styles.inputItem}>
          <div>
            <span className={styles.inputPlaceholder}>Name</span>
          </div>
          <input className={styles.onboardingInput} type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className={styles.inputItem}>
          <div>
            <span className={styles.inputPlaceholder}>Username</span>
          </div>
          <input className={styles.onboardingInput} type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <button onClick={handleSubmit} className={styles.submitBtn}>Submit</button>
      </form>
    </main>
  )
}