export interface User {
  type:"teacher" | "student" |"admin";
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  password: string;
  subject: string;
  _id: string;
}
