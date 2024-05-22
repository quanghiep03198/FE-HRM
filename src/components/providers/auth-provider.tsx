import React from "react";

type Props = {};

export const AuthContext = React.createContext({});

const AuthProvider = (props: Props) => {
	return <div>AuthProvider</div>;
};

export default AuthProvider;
