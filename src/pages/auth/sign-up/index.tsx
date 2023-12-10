import { 
  useCallback, 
  useRef, 
  useState 
}                                 from "react";
import { Navigate }               from "react-router-dom";
import { useSelector }            from "react-redux";
import { IAppState }              from "@redux/store";
import { z }                      from "zod";
import { useSignUpMutation }      from "@redux/api/authAPI";
import { zodResolver }            from "@hookform/resolvers/zod";
import { useForm }                from "react-hook-form";
import { RtkError }               from "@typings/error";
import { Error }                  from "@components/index";
import eye                        from "@assets/icons/eye-solid.svg";
import eyeSlash                   from "@assets/icons/eye-slash-solid.svg";
import styles                     from "../auth.module.scss";
import userImg                    from "@assets/otherImages/userImg.png";
import { useUploadImageMutation } from "@redux/api/userAPI";

const signUpSchema = z.object({
  image   : z.string(),
  email   : z.string().email(),
  username: z.string().min(3),
  name    : z.string().min(2),
  password: z.string().min(8),
});

export type FormData = z.infer<typeof signUpSchema>;

export const SignUp = () => {
  const accessToken             = useSelector((state: IAppState) => state.auth.accessToken);
  const [signUp]                = useSignUpMutation();
  const [uploadImage]           = useUploadImageMutation();
  const [imageUrl, setImageUrl] = useState<any>();

  const { handleSubmit, setError, formState: { errors }, register } = useForm<FormData>({
    defaultValues: {
      image   : '',
      email   : '',
      username: '',
      name    : '',
      password: '',
    },
    resolver: zodResolver(signUpSchema),
  });

  const inputFileRef                    = useRef<HTMLInputElement | null>(null); 
  const [selectedFile, setSelectedFile] = useState<File | null>(null); 

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
  
    if (file) {
      setSelectedFile(file);
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await uploadImage(formData);
      if ('data' in response) {
        setImageUrl(response.data.imageUrl);
      }
    }
  };

  const onSubmit = useCallback(async (values: FormData) => {
    signUp(imageUrl ? {...values, image: imageUrl } : values).unwrap().catch((error: RtkError) => { 
      if (error.data.code === 'email-already-exist') {
        setError('email', { message: "Such email already exists!" });
      }

      if (error.data.code === 'username-already-exist') {
        setError('username', { message: "Such username already exist!" });
      }
    })
  }, [signUp, imageUrl]);

  const [inputType, setinputType] = useState("password");
  const handleChangeVisibility = (event: React.FormEvent) => {
    event.preventDefault();
    setinputType(inputType === 'password' ? 'text' : 'password');
  };

  if (accessToken) {
    return <Navigate to="/" />
  }

  return (
    <>
      <main className={styles.auth}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.authForm}>
          <h2 className={styles.authTitle}>EduPlanner</h2>
          <p className={[styles.authSubtitle, styles.authSubtitleReg].join(' ')}>Sign up to create your account</p>
          <div className={styles.authImageBtn}>
            <input type="file" ref={inputFileRef} hidden accept="image/*" onChange={handleImageChange} />
            <button onClick={() => inputFileRef.current?.click()} type="button">
              <img className={styles.authImage} src={selectedFile ? URL.createObjectURL(selectedFile) : userImg} alt="userImage" />
            </button>
          </div>
          <div className={styles.inputItem}>
            <label className={styles.authLabel} htmlFor="email">Email address</label>
            <input 
              className={[styles.authInput, errors.email ? styles.inputError : ''].join(' ')} 
              type="email" 
              {...register('email')}
              name="email" 
              placeholder="example@example.com"
            />
          </div>
          <div className={styles.inputItem}>
            <label className={styles.authLabel} htmlFor="username">Username</label>
            <input 
              className={[styles.authInput, errors.username ? styles.inputError : ''].join(' ')} 
              type="text" 
              {...register('username')}
              name="username" 
              placeholder="Enter your username"
            />
          </div>
          <div className={styles.inputItem}>
            <label className={styles.authLabel} htmlFor="name">Name</label>
            <input 
              className={[styles.authInput, errors.name ? styles.inputError : ''].join(' ')} 
              type="text" 
              {...register('name')}
              name="name" 
              placeholder="Your Name"  
            />
          </div>
          <div className={styles.inputItem}>
            <label className={styles.authLabel} htmlFor="password">Password</label>
            <input 
              className={[styles.authInput, errors.password ? styles.inputError : ''].join(' ')} 
              type={inputType}
              {...register('password')}
              name="password" 
              placeholder="Your Password"  
            />
            <button onClick={handleChangeVisibility} type="button"><img className={styles.authEye} src={inputType === 'password' ? eyeSlash : eye} alt="eye" /></button>
          </div>
          <button type="submit" className={styles.authButton}>Sign Up</button>
          <p className={styles.authLink}>Already have an account yet? <a className={styles.link} href="/sign-in">Sign In</a>.</p>
        </form>
      </main>
      {(errors.email || errors.username || errors.password) && (
        <Error 
          errorText={
            errors.email?.message    as string || 
            errors.username?.message as string || 
            errors.name?.message     as string ||
            errors.password?.message as string
          }
        />
      )}
    </>
  )
};