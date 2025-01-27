import useAuth from "../../Hooks/useAuth";

const UserHome = () => {
    const {user} = useAuth();

    return (
        <div>
            <h2 className="text-3xl"> Hi, user {user?.displayName ? <p> {user.displayName} </p> : "Back"} </h2>
        </div>
    );
};

export default UserHome;