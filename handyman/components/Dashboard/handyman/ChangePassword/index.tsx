import { Context } from "@/components/Common/DashboardLayout";
import { useContext, useState } from "react";
import ChangePassword from "../../components/ChangePassword";
export interface EmailErroType {
  password_Error: string;
  password_doNotMatch: string;
}
export type EmailType = {
  password:string,
  cPassword:string
}
export default function Index() {
  const { toggleSideBar } = useContext(Context);
  const [userPassword, setUserPassword] = useState<EmailType>({
    password: "",
    cPassword: "",
  });
  const [userError, setUserError] = useState<EmailErroType>({
    password_Error: "",
    password_doNotMatch: "",
  });
  const handleSave_password = () => {
    const errors: any = {};
    if (!userPassword.password) {
      errors.password_Error = "Se requiere contraseña";
    } else if (userPassword.password.length <= 5) {
      errors.password_Error = "La longitud de la contraseña debe ser al menos 6 caracteres";
    }else if (userPassword.password !== userPassword.cPassword) {
      errors.password_doNotMatch = "La contraseña no coincide";
    }
    if(Object.keys(errors).length === 0){
      // window.alert('Email change');
      setUserPassword({password:'',cPassword:''});
      setUserError({password_Error: "",password_doNotMatch: ""})
    }else{
      setUserError(errors);
    }
  };
  return (
    <div className={`w-full ${toggleSideBar ? "lg:mx-32" : "mx-0"} my-12`}>
      <ChangePassword userPassword={userPassword} setUserPassword={setUserPassword} handleSave_password={handleSave_password} userError={userError}/>
    </div>
  );
}
