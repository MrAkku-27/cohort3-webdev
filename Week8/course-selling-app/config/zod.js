const {z}=require('zod');
const zoduser=z.object({
  name: z.string().min(4),
  email:z.string().email(),
  password:z.string()
  .regex(/^.{8,100}$/,{message:"password should contain minimum 8 character"},)
  .regex(/[a-z]/,{message:"password must contain atleast one lower character"},)
  .regex(/[A-Z]/,{message:"password must contain atleast one capital character"})
  .regex(/[!@#%^&*]/,{message:"password must contain one special character !@#$%^&* "})
  .regex(/\d/,{message:"password mus contain one number character"})
})

module.exports= zoduser;