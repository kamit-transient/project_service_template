
"use client";

import { useAuth } from "../providers/auth.provider";


export function Profile() {

    let { signOut, user: a } = useAuth();

    let user: any = a?.profile
    console.log("@@@@@@", user);

    return (
        <>
            <h1>profile</h1>
            <h1>Hello {user?.name}!</h1>
            <hr />
            <div className="container">
                <table>
                    <tbody>
                        <tr>
                            <td>Username</td>
                            <td>{user?.email}</td>
                        </tr>
                        <tr>
                            <td>Display Name</td>
                            <td>{user?.name}</td>
                        </tr>
                        <tr>
                            <td>User ID</td>
                            <td>{user?.sub}</td>
                        </tr>
                        <tr>
                            <td>Avatar</td>
                            <td>
                                {/* {user.} */}
                                <img src={user?.avatar}></img>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <button onClick={signOut}>Logout</button>
            </div>
        </>
    );
}