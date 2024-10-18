import { genSalt, hash } from "bcrypt";
import User, { findOneAndRemove } from "../models/User";

const createTestUser = async () =>{
    const username = "backendUnitTest";
    let password = "unitTest#0001";
    const salt = await genSalt();
    password = await hash(password, salt);
    const newUser = new User({ username: username, password: password, isAdmin: false });
    await newUser.save();
}


const deleteTestUser = async () =>{
   await findOneAndRemove({username: "backendUnitTest"});

}

export default {createTestUser,deleteTestUser}